/* ============================================================
   ERRATA · CDIV — Cena física (v3) com Matter.js
   ------------------------------------------------------------
   Uma torre de livros assentada sobre uma prateleira. Ao tocar
   a pilha, o cursor torna-se um corpo físico: empurra os volumes
   e injeta momento proporcional à VELOCIDADE do mouse — devagar,
   a torre tomba; rápido, os livros voam.
   Render próprio em <canvas> (sprites de livro), sem o renderer
   de arame do Matter.
   ============================================================ */
(function () {
  "use strict";

  if (typeof Matter === "undefined") return;

  var Engine = Matter.Engine,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Body   = Matter.Body,
      Composite = Matter.Composite,
      Events = Matter.Events,
      Sleeping = Matter.Sleeping;

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var rnd = function (a, b) { return a + Math.random() * (b - a); };
  var clamp = function (v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; };

  /* ---- Paletas (espelham errata-scene.css) ---- */
  var PALETTES = {
    leather: {
      tones: [
        { cover: "#3a2f26", cover2: "#4a3d31", ink: "#e0bd6a" },
        { cover: "#5a1814", cover2: "#6e211b", ink: "#e0bd6a" },
        { cover: "#2a241d", cover2: "#3a3128", ink: "#c79a3a" },
        { cover: "#44382c", cover2: "#564636", ink: "#e0bd6a" }
      ],
      accent: { cover: "#1c1813", cover2: "#2a241d", ink: "#c79a3a" },
      pages: "#e8dcbf", pagesLine: "#cdbf9a", gilt: "#c79a3a"
    },
    oxblood: {
      tones: [
        { cover: "#e3dac0", cover2: "#efe7d2", ink: "#4a4136" },
        { cover: "#d8ccab", cover2: "#e6ddc2", ink: "#4a4136" },
        { cover: "#cdbf9a", cover2: "#dccfac", ink: "#1a1612" },
        { cover: "#c2b48d", cover2: "#d0c29c", ink: "#1a1612" }
      ],
      accent: { cover: "#7a2620", cover2: "#8e3029", ink: "#f1ece0" },
      pages: "#efe7d0", pagesLine: "#d8cdae", gilt: "#7a2620"
    },
    editorial: {
      tones: [
        { cover: "#e6ddc2", cover2: "#efe7d2", ink: "#4a4136" },
        { cover: "#1d3a78", cover2: "#2c4d92", ink: "#dfe6f2" },
        { cover: "#cdbf9a", cover2: "#dccfac", ink: "#1a1612" },
        { cover: "#7a2620", cover2: "#8e3029", ink: "#f1ece0" }
      ],
      accent: { cover: "#1a1612", cover2: "#2a241d", ink: "#e0bd6a" },
      pages: "#efe7d0", pagesLine: "#d8cdae", gilt: "#c79a3a"
    }
  };

  var ROMAN = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI"];

  /* ---- Estado ---- */
  var state = {
    palette: "leather",
    spines: "numerals",
    gravity: 1.0,
    tower: 28,        // total de volumes, distribuído entre as pilhas (ajustado pelo responsive)
    piles: 4,         // ajustado dinamicamente por responsivePiles()
    sensitivity: 1.0,
    click: "restack"
  };

  /* retorna quantidade de pilhas e volumes baseado na largura do stage */
  function responsivePiles(w) {
    if (w >= 1200) return { piles: 5, tower: 35 };
    if (w >= 960)  return { piles: 4, tower: 28 };
    if (w >= 700)  return { piles: 3, tower: 20 };
    return           { piles: 2, tower: 14 };
  }

  var canvas, ctx, stage, dpr = 1;
  var W = 760, H = 440;
  var OVERHEAD = 300;   // pixels extras acima do stage para livros voadores
  var tableImg = null;
  var TABLE_H = 60;     // altura de exibição do tampo (px)
  var engine, runner;
  var books = [];
  var cursor = null, cursorActive = false;
  var mouse = { x: -999, y: -999 };
  var lastMouse = { x: -999, y: -999 };
  var mouseVel = { x: 0, y: 0 };
  var hasInteracted = false;

  /* =========================================================
     CONSTRUÇÃO DA TORRE
     ========================================================= */
  function clearWorld() {
    if (!engine) return;
    Composite.clear(engine.world, false, true);
    books = [];
    cursor = null;
  }

  function buildWalls() {
    var t = 200;
    var opt = { isStatic: true, friction: 0.9, restitution: 0.02 };
    Composite.add(engine.world, [
      Bodies.rectangle(W / 2, H - 22 - TABLE_H + t / 2, W * 3, t, opt), // chão / topo do tampo da mesa
      Bodies.rectangle(-t / 2 + 2, H / 2, t, H * 3, opt),             // parede esq.
      Bodies.rectangle(W + t / 2 - 2, H / 2, t, H * 3, opt),          // parede dir.
      Bodies.rectangle(W / 2, -t / 2 - H, t * 0 + W * 3, t, opt)      // teto (alto)
    ]);
  }

  function spineLabel(meta) {
    if (state.spines === "blank") return "";
    if (meta.accent) return "CDIV";
    return ROMAN[meta.idx % ROMAN.length];
  }

  function makeBook(opts) {
    var pal = PALETTES[state.palette] || PALETTES.leather;
    var colors = opts.accent ? pal.accent : pal.tones[opts.toneIdx % pal.tones.length];
    var b = Bodies.rectangle(opts.x, opts.y, opts.w, opts.h, {
      friction: 0.62,
      frictionStatic: 0.9,
      frictionAir: 0.012,
      restitution: 0.04,
      density: 0.0014,
      chamfer: { radius: Math.min(3, opts.h / 4) },
      angle: opts.angle || 0
    });
    b.isBook = true;
    b.bw = opts.w;
    b.bh = opts.h;
    b.colors = colors;
    b.pal = pal;
    b.accent = !!opts.accent;
    b.spineSide = Math.random() < 0.5 ? -1 : 1;
    b.meta = { idx: opts.metaIdx, accent: !!opts.accent };
    b.label = spineLabel(b.meta);
    return b;
  }

  /* distribui `total` volumes entre `n` pilhas, com variedade de altura */
  function distribute(total, n) {
    var arr = [];
    var base = Math.floor(total / n);
    for (var i = 0; i < n; i++) arr.push(base);
    var rem = total - base * n;
    while (rem > 0) { arr[Math.floor(Math.random() * n)]++; rem--; }
    // troca alguns volumes de lugar p/ pilhas de alturas distintas
    for (var k = 0; k < n; k++) {
      var a = Math.floor(Math.random() * n), b = Math.floor(Math.random() * n);
      if (a !== b && arr[a] > 2) { arr[a]--; arr[b]++; }
    }
    return arr;
  }

  function buildPiles() {
    var total = clamp(Math.round(state.tower), 6, 36);
    var nPiles = clamp(Math.round(state.piles), 1, 8);
    var floorY = H - 22 - TABLE_H;   // topo do tampo da mesa
    var added = [];
    var metaIdx = 0;

    var counts = distribute(total, nPiles);
    var band = W / nPiles;                       // largura disponível por pilha
    var accentPile = Math.floor(Math.random() * nPiles);
    var accentRow = Math.floor(rnd(0, Math.max(1, counts[accentPile])));

    for (var p = 0; p < nPiles; p++) {
      var px = band * (p + 0.5) + rnd(-band * 0.05, band * 0.05);
      // Dimensões fixas em px — livros não escalam com a viewport
      var baseW = clamp(rnd(110, 155), 60, band * 0.96);
      // alvo de inclinação da coluna (gentil — torre de Pisa, não desmoronando)
      var leanTarget = rnd(-0.055, 0.055);
      var stackAngle = leanTarget * 0.5 + rnd(-0.02, 0.02);   // ângulo corrente
      var drift = 0;                             // deslocamento horizontal acumulado
      var prevH = 0;
      var y = floorY;

      for (var i = 0; i < counts[p]; i++) {
        var depth = counts[p] > 1 ? i / (counts[p] - 1) : 0;   // 0 base .. 1 topo
        var taper = 1 - depth * 0.14;                          // afina para o topo
        // VARIEDADE de largura e espessura — calibre próprio por volume
        var w = clamp(baseW * rnd(0.70, 1.18) * taper, 60, band * 0.98);
        var h = clamp(rnd(13, 33) * (1 - depth * 0.10), 12, 35);

        // ROTAÇÃO: ângulo varia SUAVEMENTE em direção ao alvo da coluna, com
        // jitter mínimo — sub-pilhas inclinadas coerentes e estáveis (sem zigue-zague).
        stackAngle += (leanTarget - stackAngle) * 0.25 + rnd(-0.014, 0.014);
        stackAngle = clamp(stackAngle, -0.12, 0.12);
        var angle = stackAngle + rnd(-0.018, 0.018);

        // empilha sobre o volume anterior, deslocando NA DIREÇÃO do tombo
        // (a coluna pende de verdade — sai do mesmo eixo, mas continua estável)
        if (i > 0) drift += Math.tan(stackAngle) * (h * 0.5 + prevH * 0.5);
        var jitterX = rnd(-baseW * 0.06, baseW * 0.06);
        y -= h / 2;

        var accent = (p === accentPile && i === accentRow);
        added.push(makeBook({
          x: px + drift + jitterX, y: y, w: w, h: h, angle: angle,
          accent: accent, toneIdx: metaIdx % 4, metaIdx: metaIdx
        }));
        metaIdx++;
        prevH = h;
        y -= h / 2 + 0.4;
      }

      // no máximo 1 volume encostado por pilha, inclinado no flanco
      var props = (counts[p] >= 4 && Math.random() < 0.5) ? 1 : 0;
      for (var q = 0; q < props; q++) {
        var side = Math.random() < 0.5 ? -1 : 1;
        var lw = baseW * rnd(0.80, 1.05);
        var lh = clamp(rnd(17, 30), 14, 33);
        var tilt = side * rnd(0.95, 1.28);       // ~54–73°
        var lx = px - side * (baseW * 0.48 + lw * 0.16) + rnd(-6, 6);
        var ly = floorY - (lw * 0.5) * Math.sin(Math.abs(tilt)) + 2;
        added.push(makeBook({
          x: lx, y: ly, w: lw, h: lh, angle: tilt,
          accent: false, toneIdx: metaIdx % 4, metaIdx: metaIdx
        }));
        metaIdx++;
      }

      // ocasional volume caído no pé (deitado, levemente torto)
      if (Math.random() < 0.33) {
        var fw = baseW * rnd(0.85, 1.12);
        var fh = clamp(rnd(16, 26), 14, 28);
        var fside = Math.random() < 0.5 ? -1 : 1;
        added.push(makeBook({
          x: px + fside * (baseW * 0.55) + rnd(-10, 10),
          y: floorY - fh / 2,
          w: fw, h: fh, angle: rnd(-0.06, 0.06),
          accent: false, toneIdx: metaIdx % 4, metaIdx: metaIdx
        }));
        metaIdx++;
      }
    }

    Composite.add(engine.world, added);
    books = added;
    // assentamento sob gravidade antes de habilitar interação
    for (var s = 0; s < 50; s++) Engine.update(engine, 1000 / 60);
  }

  function rebuild() {
    clearWorld();
    applyGravity();
    buildWalls();
    buildPiles();
    cursorActive = false;
    hasInteracted = false;
  }

  function applyGravity() {
    engine.gravity.y = state.gravity;
    engine.gravity.scale = 0.0012;
  }

  /* =========================================================
     CURSOR FÍSICO
     ========================================================= */
  function ensureCursor() {
    if (cursor) return;
    cursor = Bodies.circle(mouse.x, mouse.y, 22, {
      isStatic: true,
      isSensor: false,
      friction: 0.4,
      restitution: 0.1
    });
    cursor.isCursor = true;
    Composite.add(engine.world, cursor);
  }
  function dropCursor() {
    if (cursor) { Composite.remove(engine.world, cursor); cursor = null; }
  }

  /* injeta momento proporcional à velocidade do mouse */
  function onCollisionActive(ev) {
    if (!cursor) return;
    var speed = Math.hypot(mouseVel.x, mouseVel.y);
    if (speed < 0.6) return;                         // mouse parado: só empurrão posicional
    var kv = 0.32 * state.sensitivity;
    var pairs = ev.pairs;
    for (var i = 0; i < pairs.length; i++) {
      var p = pairs[i];
      var bk = p.bodyA === cursor ? p.bodyB : (p.bodyB === cursor ? p.bodyA : null);
      if (!bk || !bk.isBook) continue;
      hasInteracted = true;
      Sleeping.set(bk, false);
      var addx = clamp(mouseVel.x * kv, -46, 46);
      var addy = clamp(mouseVel.y * kv, -46, 46);
      Body.setVelocity(bk, {
        x: clamp(bk.velocity.x + addx, -60, 60),
        y: clamp(bk.velocity.y + addy, -60, 60)
      });
      Body.setAngularVelocity(bk, clamp(bk.angularVelocity + (Math.random() < 0.5 ? -1 : 1) * speed * 0.0016 * state.sensitivity, -0.4, 0.4));
    }
  }

  /* =========================================================
     INTERAÇÃO — ações de clique
     ========================================================= */
  function explode() {
    hasInteracted = true;
    var cx = W / 2, cy = H * 0.55;
    books.forEach(function (bk) {
      Sleeping.set(bk, false);
      var dx = bk.position.x - cx, dy = bk.position.y - cy;
      var d = Math.hypot(dx, dy) || 1;
      var f = rnd(16, 30);
      Body.setVelocity(bk, { x: (dx / d) * f, y: (dy / d) * f - rnd(4, 12) });
      Body.setAngularVelocity(bk, rnd(-0.5, 0.5));
    });
  }

  function onCanvasClick() {
    if (state.click === "home") {
      window.location.href = "index.html";
    } else if (state.click === "restack") {
      rebuild();
    } else if (state.click === "explode") {
      explode();
    }
  }

  /* =========================================================
     PONTEIRO
     ========================================================= */
  function toLocal(e) {
    var r = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - r.left) * (W / r.width),
      y: (e.clientY - r.top) * (H / r.height)
    };
  }

  function wirePointer() {
    canvas.addEventListener("pointerenter", function (e) {
      var p = toLocal(e);
      mouse = p; lastMouse = { x: p.x, y: p.y };
      mouseVel = { x: 0, y: 0 };
      cursorActive = true;
      ensureCursor();
      Body.setPosition(cursor, mouse);
    });
    canvas.addEventListener("pointermove", function (e) {
      mouse = toLocal(e);
    });
    canvas.addEventListener("pointerleave", function () {
      cursorActive = false;
      dropCursor();
      mouseVel = { x: 0, y: 0 };
    });
    canvas.addEventListener("click", onCanvasClick);
    // toque: derruba na direção do arrasto
    canvas.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") {
        var p = toLocal(e);
        mouse = p; lastMouse = { x: p.x, y: p.y };
        cursorActive = true; ensureCursor(); Body.setPosition(cursor, mouse);
      }
    });
  }

  /* atualiza posição/velocidade do cursor antes de cada passo */
  function onBeforeUpdate() {
    if (!cursorActive || !cursor) return;
    mouseVel = { x: mouse.x - lastMouse.x, y: mouse.y - lastMouse.y };
    lastMouse = { x: mouse.x, y: mouse.y };
    Body.setPosition(cursor, mouse);
    // mantém despertos os volumes próximos ao cursor (sleeping desativado,
    // mas garante reação mesmo em pilhas totalmente assentadas)
    var r2 = 70 * 70;
    for (var i = 0; i < books.length; i++) {
      var b = books[i];
      var dx = b.position.x - mouse.x, dy = b.position.y - mouse.y;
      if (dx * dx + dy * dy < r2) Sleeping.set(b, false);
    }
  }

  /* =========================================================
     RENDER
     ========================================================= */
  function roundRect(c, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
  }

  function drawShelf() {
    var dark   = state.palette === "leather";
    var floorY = H - 22;
    var topY   = floorY - TABLE_H;

    ctx.save();

    // Sombra abaixo do tampo
    var dropG = ctx.createLinearGradient(0, floorY, 0, floorY + 32);
    dropG.addColorStop(0, dark ? "rgba(0,0,0,0.30)" : "rgba(0,0,0,0.16)");
    dropG.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = dropG;
    ctx.fillRect(0, floorY, W, 32);

    // Tampo com imagem (repeat-x) ou fallback gradiente
    if (tableImg && tableImg.complete && tableImg.naturalWidth > 0) {
      var imgNatW = tableImg.naturalWidth;
      var imgNatH = tableImg.naturalHeight;
      var tileH   = TABLE_H;
      var tileW   = Math.round(imgNatW * (tileH / imgNatH));
      if (tileW < 1) tileW = 1;
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, topY, W, tileH);
      ctx.clip();
      for (var xi = 0; xi <= W; xi += tileW) {
        ctx.drawImage(tableImg, xi, topY, tileW, tileH);
      }
      ctx.restore();
    } else {
      var fb1 = dark ? "#7a5438" : "#c49470";
      var fb2 = dark ? "#3e2818" : "#7a5438";
      var fbG = ctx.createLinearGradient(0, topY, 0, floorY);
      fbG.addColorStop(0, fb1); fbG.addColorStop(1, fb2);
      ctx.fillStyle = fbG;
      ctx.fillRect(0, topY, W, TABLE_H);
    }

    // Envernizamento: reflexo especular suave
    var sheenG = ctx.createRadialGradient(W * 0.5, topY + 4, 0, W * 0.5, topY + 8, W * 0.6);
    sheenG.addColorStop(0,   dark ? "rgba(255,220,140,0.10)" : "rgba(255,250,220,0.18)");
    sheenG.addColorStop(0.5, "rgba(255,255,255,0.02)");
    sheenG.addColorStop(1,   "rgba(255,255,255,0)");
    ctx.fillStyle = sheenG;
    ctx.fillRect(0, topY, W, TABLE_H * 0.5);

    // Highlight na aresta superior
    var hlG = ctx.createLinearGradient(0, topY, 0, topY + 4);
    hlG.addColorStop(0, dark ? "rgba(255,230,160,0.28)" : "rgba(255,255,255,0.50)");
    hlG.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = hlG;
    ctx.fillRect(0, topY, W, 4);

    // Escurecimento gradual (profundidade)
    var depthG = ctx.createLinearGradient(0, topY, 0, floorY);
    depthG.addColorStop(0,   "rgba(0,0,0,0)");
    depthG.addColorStop(0.6, "rgba(0,0,0,0)");
    depthG.addColorStop(1,   dark ? "rgba(0,0,0,0.28)" : "rgba(0,0,0,0.18)");
    ctx.fillStyle = depthG;
    ctx.fillRect(0, topY, W, TABLE_H);

    // Face frontal do tampo (espessura)
    var edge1 = dark ? "#2e1e10" : "#5a3c26";
    var edge2 = dark ? "#1a100a" : "#3a2418";
    var edgeG = ctx.createLinearGradient(0, floorY, 0, floorY + 14);
    edgeG.addColorStop(0, edge1);
    edgeG.addColorStop(1, edge2);
    ctx.fillStyle = edgeG;
    ctx.fillRect(0, floorY, W, 14);

    // Chanfro topo -> frente
    var chmG = ctx.createLinearGradient(0, floorY - 2, 0, floorY + 5);
    chmG.addColorStop(0, dark ? "rgba(255,210,120,0.22)" : "rgba(255,240,200,0.34)");
    chmG.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = chmG;
    ctx.fillRect(0, floorY - 1, W, 6);

    // Sombra de contato dos livros
    var cntG = ctx.createLinearGradient(0, topY - 24, 0, topY);
    cntG.addColorStop(0, "rgba(0,0,0,0)");
    cntG.addColorStop(1, dark ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.20)");
    ctx.fillStyle = cntG;
    ctx.fillRect(0, topY - 24, W, 24);

    ctx.restore();
  }


  function drawBook(b) {
    var w = b.bw, h = b.bh, c = b.colors, P = b.pal;
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);

    // sombra projetada
    ctx.shadowColor = "rgba(26,22,18,0.28)";
    ctx.shadowBlur = 9;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;
    var g = ctx.createLinearGradient(0, -h / 2, 0, h / 2);
    g.addColorStop(0, c.cover2);
    g.addColorStop(0.5, c.cover);
    g.addColorStop(1, c.cover2);
    ctx.fillStyle = g;
    roundRect(ctx, -w / 2, -h / 2, w, h, 3);
    ctx.fill();
    ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

    // miolo de páginas
    var lip = Math.min(5.5, h * 0.24);
    var spineW = Math.min(15, w * 0.12);
    var px = b.spineSide < 0 ? -w / 2 + spineW : -w / 2 + 2.5;
    var pr = b.spineSide < 0 ? w / 2 - 2.5 : w / 2 - spineW;
    var py = -h / 2 + lip, ph = h - lip * 2, pw = pr - px;
    if (pw > 4 && ph > 2) {
      ctx.save();
      roundRect(ctx, px, py, pw, ph, 1);
      ctx.clip();
      ctx.fillStyle = P.pages;
      ctx.fillRect(px, py, pw, ph);
      ctx.strokeStyle = P.pagesLine;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.65;
      for (var yy = py + 1.6; yy < py + ph; yy += 2.3) {
        ctx.beginPath();
        ctx.moveTo(px, Math.round(yy) + 0.5);
        ctx.lineTo(px + pw, Math.round(yy) + 0.5);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      // sombra interna na boca das folhas (lado oposto à lombada)
      var fgX0 = b.spineSide < 0 ? px : px + pw;
      var fg = ctx.createLinearGradient(b.spineSide < 0 ? px + pw - 8 : px, 0, b.spineSide < 0 ? px + pw : px + 8, 0);
      fg.addColorStop(0, "rgba(26,22,18,0)");
      fg.addColorStop(1, "rgba(26,22,18,0.18)");
      ctx.fillStyle = fg;
      ctx.fillRect(px, py, pw, ph);
      ctx.restore();
    }

    // lombada (cap colorido na ponta)
    var sx0 = b.spineSide < 0 ? -w / 2 : w / 2 - spineW;
    var sg = ctx.createLinearGradient(sx0, 0, sx0 + spineW, 0);
    sg.addColorStop(0, c.cover2);
    sg.addColorStop(0.45, c.cover);
    sg.addColorStop(1, c.cover2);
    ctx.save();
    roundRect(ctx, -w / 2, -h / 2, w, h, 3);
    ctx.clip();
    ctx.fillStyle = sg;
    ctx.fillRect(sx0, -h / 2, spineW, h);
    // filetes gilt
    ctx.fillStyle = c.ink;
    ctx.globalAlpha = 0.85;
    ctx.fillRect(sx0 + 2, -h / 2 + h * 0.24, spineW - 4, 1);
    ctx.fillRect(sx0 + 2, -h / 2 + h * 0.74, spineW - 4, 1);
    ctx.globalAlpha = 1;
    ctx.restore();

    // rótulo (algarismo romano) na lombada — só se couber
    if (b.label && h >= 18) {
      ctx.save();
      ctx.translate(sx0 + spineW / 2, 0);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = c.ink;
      ctx.globalAlpha = 0.92;
      ctx.font = (b.accent ? "600 " : "") + "8.5px 'JetBrains Mono', ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(b.label, 0, 0.5);
      ctx.restore();
    }

    // brilho na aresta superior
    ctx.strokeStyle = "rgba(255,255,255,0.10)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-w / 2 + 3, -h / 2 + 0.5);
    ctx.lineTo(w / 2 - 3, -h / 2 + 0.5);
    ctx.stroke();

    ctx.restore();
  }

  function drawCursor() {
    if (!cursorActive || !cursor) return;
    var pal = PALETTES[state.palette] || PALETTES.leather;
    ctx.save();
    ctx.translate(cursor.position.x, cursor.position.y);
    var sp = clamp(Math.hypot(mouseVel.x, mouseVel.y) / 24, 0, 1);
    // halo difuso
    var g = ctx.createRadialGradient(0, 0, 2, 0, 0, 22);
    g.addColorStop(0, "rgba(199,154,58," + (0.10 + sp * 0.18) + ")");
    g.addColorStop(1, "rgba(199,154,58,0)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(0, 0, 22, 0, Math.PI * 2); ctx.fill();
    // anel fino
    ctx.strokeStyle = "rgba(199,154,58," + (0.35 + sp * 0.4) + ")";
    ctx.lineWidth = 1.25;
    ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  }

  var hintAlpha = 1;
  function drawHint() {
    if (prefersReduced) return;
    var target = hasInteracted ? 0 : 1;
    hintAlpha += (target - hintAlpha) * 0.08;
    if (hintAlpha < 0.01) return;
    ctx.save();
    ctx.globalAlpha = hintAlpha * 0.9;
    ctx.fillStyle = (state.palette === "leather") ? "rgba(224,189,106,0.85)" : "rgba(123,38,32,0.7)";
    ctx.font = "10px 'JetBrains Mono', ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    var txt = "EMPURRE  AS  PILHAS";
    // letter-spacing manual
    var ls = 3.5;
    var total = 0;
    for (var i = 0; i < txt.length; i++) total += ctx.measureText(txt[i]).width + ls;
    total -= ls;
    var x = W / 2 - total / 2;
    var yb = H - 4;
    for (var j = 0; j < txt.length; j++) {
      ctx.fillText(txt[j], x + ctx.measureText(txt[j]).width / 2, yb);
      x += ctx.measureText(txt[j]).width + ls;
    }
    ctx.restore();
  }

  function drawFrame() {
    ctx.clearRect(0, -OVERHEAD, W, H + OVERHEAD);
    drawShelf();
    for (var i = 0; i < books.length; i++) drawBook(books[i]);
    drawCursor();
  }

  function render() {
    drawFrame();
    requestAnimationFrame(render);
  }

  /* =========================================================
     SETUP / RESIZE
     ========================================================= */
  function sizeCanvas() {
    var r = stage.getBoundingClientRect();
    W = Math.max(360, Math.round(r.width));
    H = Math.max(280, Math.round(r.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = W * dpr;
    canvas.height = (H + OVERHEAD) * dpr;
    canvas.style.width   = W + "px";
    canvas.style.height  = (H + OVERHEAD) + "px";
    canvas.style.position = "absolute";
    canvas.style.top      = -OVERHEAD + "px";
    canvas.style.left     = "0";
    ctx.setTransform(dpr, 0, 0, dpr, 0, OVERHEAD * dpr);
    // ajusta pilhas e volumes conforme largura
    var resp = responsivePiles(W);
    state.piles = resp.piles;
    state.tower = resp.tower;
  }

  var resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      sizeCanvas();
      rebuild();
    }, 200);
  }

  /* =========================================================
     API pública (consumida pelo painel de Tweaks)
     ========================================================= */
  function recolorBooks() {
    var pal = PALETTES[state.palette] || PALETTES.leather;
    books.forEach(function (bk) {
      bk.pal = pal;
      bk.colors = bk.accent ? pal.accent : pal.tones[(bk.meta.idx) % pal.tones.length];
    });
  }
  function relabelBooks() {
    books.forEach(function (bk) { bk.label = spineLabel(bk.meta); });
  }

  window.ErrataPhysics = {
    setPalette: function (v) { state.palette = v; recolorBooks(); },
    setSpines: function (v) { state.spines = v; relabelBooks(); },
    setGravity: function (v) { state.gravity = v; applyGravity(); },
    setTower: function (v) { state.tower = v; rebuild(); },
    setPiles: function (v) { state.piles = v; rebuild(); },
    setSensitivity: function (v) { state.sensitivity = v; },
    setClick: function (v) { state.click = v; },
    restack: rebuild,
    explode: explode
  };

  /* =========================================================
     INIT
     ========================================================= */
  function init() {
    stage = document.querySelector(".stage");
    canvas = document.getElementById("physics-canvas");
    if (!stage || !canvas) return;
    ctx = canvas.getContext("2d");

    engine = Engine.create({ enableSleeping: false });
    engine.world.gravity.scale = 0.0012;

    tableImg = new Image();
    tableImg.src = "images/table.png";

    sizeCanvas();
    rebuild();

    if (prefersReduced) {
      // sem física contínua: assenta a torre e desenha estático
      for (var s = 0; s < 60; s++) Engine.update(engine, 1000 / 60);
      ctx.clearRect(0, -OVERHEAD, W, H + OVERHEAD);
      drawShelf();
      books.forEach(drawBook);
      // ainda permite clique
      canvas.addEventListener("click", onCanvasClick);
      return;
    }

    runner = Runner.create();
    Runner.run(runner, engine);
    Events.on(engine, "beforeUpdate", onBeforeUpdate);
    Events.on(engine, "collisionActive", onCollisionActive);
    Events.on(engine, "collisionStart", onCollisionActive);
    wirePointer();
    window.addEventListener("resize", onResize);
    drawFrame();                 // pinta a torre imediatamente (mesmo sem RAF ativo)
    requestAnimationFrame(render);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
