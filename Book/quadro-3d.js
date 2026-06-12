/* ============================================================
   Quadro 3D — objeto de tela (frente / verso / bordas) em WebGL.
   Reaproveitado pela home (pranchas) e pela página de teste.

   Uso:
     const inst = window.mountQuadro(containerEl, {
       front: "images/home/paint-front.webp",
       back:  "images/home/paint-back.webp",
       side:  "images/home/paint-side.webp",
       loupe: true,           // lupa de aumento ao passar o mouse
       flipStep: 0.008        // velocidade do giro (menor = mais lento)
     });
     inst.flip();             // gira para o outro lado
     inst.isFlipped();        // true se mostrando o verso
     inst.destroy();          // remove e libera recursos

   Requer THREE (r128) carregado antes. Se ausente, retorna null
   e quem chamou deve exibir um fallback (ex.: <img> da frente).
   ============================================================ */
(function () {
  window.mountQuadro = function (container, opts) {
    opts = opts || {};
    if (!window.THREE || !container) return null;

    var FRONT = opts.front || "images/home/paint-front.webp";
    var BACK  = opts.back  || "images/home/paint-back.webp";
    var SIDE  = opts.side  || "images/home/paint-side.webp";
    var flipStep = opts.flipStep || 0.008;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function vw() { return container.clientWidth  || 1; }
    function vh() { return container.clientHeight || 1; }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(40, vw() / vh(), 0.1, 100);

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    // Supersample: a lupa amplia ~2.8×, então renderizamos o canvas com
    // densidade extra de pixels para que o aumento não fique pixelado.
    renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio || 1, 1) * 2, 3));
    renderer.setSize(vw(), vh());
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    function render() { renderer.render(scene, camera); drawLoupe(); }

    // ---- lupa (loupe): magnifica o canvas sob o cursor (opt-in) ----
    var loupe = null, loupeVisible = false, lastX = 0, lastY = 0;
    function drawLoupe() {
      if (!loupe || !loupeVisible) return;
      var cnv = renderer.domElement;
      var rect = cnv.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      var srcSide = (loupe.L / loupe.Z) * (cnv.width / rect.width);
      var sx = (lastX - rect.left) * (cnv.width  / rect.width);
      var sy = (lastY - rect.top)  * (cnv.height / rect.height);
      var ox = Math.max(0, Math.min(cnv.width  - srcSide, sx - srcSide / 2));
      var oy = Math.max(0, Math.min(cnv.height - srcSide, sy - srcSide / 2));
      loupe.ctx.clearRect(0, 0, loupe.cv.width, loupe.cv.height);
      loupe.ctx.drawImage(cnv, ox, oy, srcSide, srcSide, 0, 0, loupe.cv.width, loupe.cv.height);
    }

    // luzes — chave quente + preenchimento suave, como uma galeria
    scene.add(new THREE.AmbientLight(0xffffff, 0.78));
    var key  = new THREE.DirectionalLight(0xfff4e2, 0.95); key.position.set(5, 8, 10);  scene.add(key);
    var fill = new THREE.DirectionalLight(0xbfd0ff, 0.42); fill.position.set(-6, -3, -8); scene.add(fill);

    // dimensões proporcionais (frente 608x964, espessura 38)
    var W = 6.08, H = 9.64, D = 0.38;

    var loader = new THREE.TextureLoader();
    function tex(url, rot) {
      var t = loader.load(url, render);
      t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      t.encoding = THREE.sRGBEncoding;
      if (rot) { t.center.set(0.5, 0.5); t.rotation = rot; }
      return t;
    }

    // ordem das faces da BoxGeometry: +x,-x,+y,-y,+z,-z (dir,esq,topo,base,frente,verso)
    var matSideV = new THREE.MeshStandardMaterial({ map: tex(SIDE), roughness: 0.9 });
    var matSideH = new THREE.MeshStandardMaterial({ map: tex(SIDE, Math.PI / 2), roughness: 0.9 });
    var materials = [
      matSideV.clone(),
      matSideV.clone(),
      matSideH.clone(),
      matSideH.clone(),
      new THREE.MeshStandardMaterial({ map: tex(FRONT), roughness: 0.85 }),
      new THREE.MeshStandardMaterial({ map: tex(BACK),  roughness: 0.95 })
    ];
    var painting = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), materials);
    scene.add(painting);

    // Variações leves por tela — cada pintura "montada" num ângulo,
    // escala e tom de luz ligeiramente diferentes, para dar ritmo de
    // coleção (não três cópias idênticas). Tudo opcional via opts.
    if (opts.scale) painting.scale.setScalar(opts.scale);
    painting.rotation.x = opts.tiltX || 0;   // inclina p/ frente/trás
    painting.rotation.z = opts.rollZ || 0;   // leve cant lateral
    // tiltX/rollZ são independentes do giro (eixo Y), então sobrevivem ao flip.
    if (opts.tint) {
      var tintC = new THREE.Color(opts.tint);
      materials.forEach(function (m) { m.color = tintC; });
    }

    // ---- enquadramento da câmera ----------------------------------------
    // Parado, a pintura preenche ~100% da altura do palco (antes ~83%, dava
    // sensação de "quadro pequeno"). Mas a 100% a quina mais próxima da
    // câmera estoura o topo/base ao girar (perspectiva amplia a borda). Por
    // isso a câmera recua o necessário DURANTE o giro e volta no fim: grande
    // parado, sem corte na animação.
    var sc = opts.scale || 1;
    var halfH = (H * sc) / 2, halfW = (W * sc) / 2;
    var halfFov = (camera.fov * Math.PI / 180) / 2;
    var clearance = halfH / Math.tan(halfFov); // distância p/ preencher a altura
    var baseZ = opts.camZ || clearance + 0.06;  // pequena folga estética
    // distância mínima para a quina próxima (a halfW de profundidade ao girar)
    // não ultrapassar o palco; halfW*|sin θ| é o quanto a borda avança em Z.
    function camZForRot(ry) {
      return Math.max(baseZ, clearance + halfW * Math.abs(Math.sin(ry)) + 0.06);
    }
    camera.position.set(0, 0, camZForRot(painting.rotation.y));

    // ---- lupa: cria o overlay circular + listeners (opt-in) ----
    if (opts.loupe) {
      var L = opts.loupeSize || 190;
      var Z = opts.loupeZoom || 2.3;
      var ldpr = Math.min(window.devicePixelRatio, 2);
      var el = document.createElement("div");
      el.className = "quadro-loupe";
      el.style.width = L + "px"; el.style.height = L + "px";
      var lcv = document.createElement("canvas");
      lcv.width = Math.round(L * ldpr); lcv.height = Math.round(L * ldpr);
      lcv.style.width = L + "px"; lcv.style.height = L + "px";
      el.appendChild(lcv);
      container.appendChild(el);
      loupe = { el: el, cv: lcv, ctx: lcv.getContext("2d"), L: L, Z: Z };

      var cnv = renderer.domElement;
      var onMoveLoupe = function (ev) {
        lastX = ev.clientX; lastY = ev.clientY;
        var crect = container.getBoundingClientRect();
        el.style.left = (lastX - crect.left) + "px";
        el.style.top  = (lastY - crect.top)  + "px";
        drawLoupe();
      };
      cnv.addEventListener("pointerenter", function () { loupeVisible = true; el.classList.add("show"); container.style.cursor = "none"; });
      cnv.addEventListener("pointermove", onMoveLoupe);
      cnv.addEventListener("pointerleave", function () { loupeVisible = false; el.classList.remove("show"); container.style.cursor = ""; });
    }

    render();

    // ---- giro pelo método flip() (sem rotação automática / arrastar / zoom) ----
    var flipping = false, flipFrom = 0, flipTo = 0, flipT = 0, raf = null;
    function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

    function tick() {
      flipT += flipStep;
      var t = Math.min(flipT, 1);
      painting.rotation.y = flipFrom + (flipTo - flipFrom) * ease(t);
      camera.position.z = camZForRot(painting.rotation.y); // recua no giro, volta no fim
      render();
      if (t < 1) { raf = requestAnimationFrame(tick); } else { flipping = false; raf = null; }
    }

    function flip() {
      if (flipping) return;
      flipFrom = painting.rotation.y;
      var showingBack = Math.round(flipFrom / Math.PI) % 2 !== 0;
      flipTo = Math.round(flipFrom / Math.PI) * Math.PI + (showingBack ? -Math.PI : Math.PI);
      if (reduceMotion) { painting.rotation.y = flipTo; render(); }
      else { flipT = 0; flipping = true; raf = requestAnimationFrame(tick); }
    }

    function isFlipped() { return Math.round(painting.rotation.y / Math.PI) % 2 !== 0; }

    function onResize() {
      camera.aspect = vw() / vh();
      camera.updateProjectionMatrix();
      renderer.setSize(vw(), vh());
      render();
    }
    window.addEventListener("resize", onResize);

    function destroy() {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      if (loupe && loupe.el && loupe.el.parentNode) loupe.el.parentNode.removeChild(loupe.el);
      container.style.cursor = "";
      try { renderer.dispose(); } catch (e) {}
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }

    return { flip: flip, isFlipped: isFlipped, destroy: destroy };
  };
})();
