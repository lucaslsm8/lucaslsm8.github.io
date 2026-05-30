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
  /* pseudo-aleatório determinístico 0..1 a partir de (i, salt) — props estáveis por volume */
  function frand(i, salt) { var x = Math.sin(i * 127.1 + (salt || 0) * 311.7) * 43758.5453; return x - Math.floor(x); }

  /* ---- Paletas (espelham errata-scene.css) ---- */
  var PALETTES = {
    leather: {
      tones: [
        { cover: "#3a2f26", cover2: "#4a3d31", ink: "#e0bd6a" },   /* dark calf */
        { cover: "#5a1814", cover2: "#6e211b", ink: "#e0bd6a" },   /* oxblood */
        { cover: "#2a3a2c", cover2: "#374a38", ink: "#c79a3a" },   /* forest green calf */
        { cover: "#44382c", cover2: "#564636", ink: "#e0bd6a" },   /* mid brown */
        { cover: "#22304a", cover2: "#2e3f5e", ink: "#c79a3a" },   /* navy morocco */
        { cover: "#2a241d", cover2: "#3a3128", ink: "#c79a3a" },   /* near-black */
        { cover: "#6b5236", cover2: "#7d6446", ink: "#e0bd6a" }    /* tan russia */
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

  /* ---- Títulos curtos para lombadas (catálogo de obras) ---- */
  /* curtos de propósito: a lombada plana é estreita (~15px) e baixa (~h). */
  var TITLES = [
    "FORMA", "OBJETS", "ÉTUDES", "SCHEMA", "APPARAT", "MÉTHODE",
    "SPECIMEN", "MECHANICA", "DE·RE", "PRAXIS", "ATLAS", "OPVS",
    "MODELO", "CORPVS", "NOTA", "ESSAI", "PLANCHE", "RECVEIL"
  ];
  /* anos de impressão (algarismos romanos abreviados, p/ pé da lombada) */
  function romanYear(n) {
    var map = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],
               [50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
    var s = "";
    for (var i = 0; i < map.length; i++) { while (n >= map[i][0]) { s += map[i][1]; n -= map[i][0]; } }
    return s;
  }
  /* cores de fita de seda para os marca-páginas */
  var RIBBONS = ["#7a2620", "#1d3a78", "#9a7a2a", "#3a5a3a", "#5a3a52"];

  /* ---- Estado ---- */
  var state = {
    palette: "leather",
    spines: "numerals",
    gravity: 1.0,
    tower: 28,        // total de volumes, distribuído entre as pilhas (ajustado pelo responsive)
    piles: 4,         // ajustado dinamicamente por responsivePiles()
    sensitivity: 1.0,
    click: "restack",
    /* --- enriquecimento visual (v2) --- */
    style: "enriched",   // "enriched" | "classic"
    bands: true,         // nervuras em relevo na lombada
    headbands: true,     // cabeçados (faixas de seda no topo/pé)
    giltEdge: true,      // fio dourado no corte das páginas (acentos)
    grain: true,         // grão de couro
    light: true,         // iluminação direcional + oclusão
    /* --- v3 --- */
    titles: true,        // títulos/etiquetas de couro reais nas lombadas
    bindingVariety: true,// mistura couro + pano editorial
    edgeVariety: true,   // cortes salpicados / marmorizados / dourados
    ribbons: true,       // marca-páginas de fita pendurados
    wear: true,          // desgaste honesto (cantos puídos, brilho desigual)
    flip3d: false,       // (removido) virada pseudo-3D ao voar
    heavy: true,         // física com mais peso + squash no impacto
    dust: true,          // poeira ao desmoronar
    idleLife: true,      // micro-assentamento quando ocioso
    animatedRestack: false// (removido) reempilhar voando de volta
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
    var heavy = state.heavy;
    var b = Bodies.rectangle(opts.x, opts.y, opts.w, opts.h, {
      friction: heavy ? 0.7 : 0.62,
      frictionStatic: 1.0,
      frictionAir: heavy ? 0.018 : 0.012,
      restitution: heavy ? 0.015 : 0.04,
      density: heavy ? 0.0022 : 0.0014,
      chamfer: { radius: Math.min(3, opts.h / 4) },
      angle: opts.angle || 0
    });
    var i = opts.metaIdx;
    b.isBook = true;
    b.bw = opts.w;
    b.bh = opts.h;
    b.colors = colors;
    b.pal = pal;
    b.accent = !!opts.accent;
    b.spineSide = frand(i, 1) < 0.5 ? -1 : 1;
    b.meta = { idx: i, accent: !!opts.accent };
    b.label = spineLabel(b.meta);
    b.seed = (i * 2654435761) % 1000 / 1000;   // 0..1 determinístico
    b.nBands = 2 + (i % 3);                      // 2..4 nervuras

    /* ---- v3: matéria por volume (determinístico) ---- */
    b.title = TITLES[i % TITLES.length];
    b.year = romanYear(1890 + Math.floor(frand(i, 7) * 130));   // MDCCC… anos de impressão
    // pano editorial em ~28% dos volumes (nunca no acento)
    b.material = (!b.accent && frand(i, 2) < 0.28) ? "cloth" : "leather";
    // etiqueta de couro contrastante em ~45% (clássico spine label)
    b.hasLabel = frand(i, 3) < 0.45 || b.accent;
    b.labelColor = b.accent ? "#1c1813"
                  : (frand(i, 4) < 0.5 ? "#5a1814" : "#1c1813");   // oxblood ou near-black
    // corte das páginas: dourado (acento), salpicado, marmorizado ou liso
    var er = frand(i, 5);
    b.edgeStyle = b.accent ? "gilt" : (er < 0.22 ? "sprinkled" : er < 0.40 ? "marbled" : "plain");
    b.edgeHue = ["#7a2620", "#3a5a3a", "#5a3a52", "#9a7a2a"][i % 4];
    // marca-páginas de fita em ~30% dos volumes
    b.hasRibbon = frand(i, 6) < 0.30;
    b.ribbonColor = RIBBONS[i % RIBBONS.length];
    b.ribbonLen = 16 + frand(i, 8) * 22;
    b.ribbonSway = 0;          // ângulo animado da fita
    // desgaste 0..1 — alguns volumes mais puídos que outros
    b.wearAmt = 0.25 + frand(i, 9) * 0.6;

    /* ---- v3: estado de animação ---- */
    b.flip = 0;                // fase de virada (rad)
    b.faceFlip = false;        // mostrando o "verso" no momento
    b.squash = 1;              // compressão no impacto (1 = neutro)
    b.appearAlpha = 1;         // opacidade (usada na anim. de reempilhar)
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

  function buildPiles(animate) {
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
          accent: accent, toneIdx: metaIdx, metaIdx: metaIdx
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
          accent: false, toneIdx: metaIdx, metaIdx: metaIdx
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
          accent: false, toneIdx: metaIdx, metaIdx: metaIdx
        }));
        metaIdx++;
      }
    }

    Composite.add(engine.world, added);
    books = added;

    if (animate) {
      // modo reempilhar: cada volume guarda seu alvo, congela (estático) e
      // parte de uma posição espalhada acima/ao lado, para voltar flutuando.
      for (var ai = 0; ai < added.length; ai++) {
        var b = added[ai];
        b.tx = b.position.x; b.ty = b.position.y; b.ta = b.angle;
        b.sx = b.position.x + rnd(-50, 50);
        b.sy = b.position.y - rnd(150, 360);
        b.sa = b.angle + rnd(-0.7, 0.7);
        b.appearDelay = Math.random() * 0.4;
        b.appearAlpha = 0;
        b.flip = 0; b.squash = 1;
        Body.setStatic(b, true);
        Body.setPosition(b, { x: b.sx, y: b.sy });
        Body.setAngle(b, b.sa);
      }
      return;
    }

    // assentamento sob gravidade antes de habilitar interação
    for (var s = 0; s < 50; s++) Engine.update(engine, 1000 / 60);
  }

  function rebuild() {
    var wasActive = cursorActive;
    clearWorld();
    applyGravity();
    buildWalls();
    buildPiles();
    hasInteracted = false;
    // se o mouse ainda estava sobre o canvas, restaura o cursor imediatamente
    if (wasActive) {
      cursorActive = true;
      ensureCursor();
      Body.setPosition(cursor, mouse);
    } else {
      cursorActive = false;
    }
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
      markInteract();
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

  /* impacto livro-livro / livro-chão: squash + baforada de poeira */
  function onImpact(ev) {
    if (restackAnim.active) return;
    var pairs = ev.pairs;
    for (var i = 0; i < pairs.length; i++) {
      var p = pairs[i];
      var a = p.bodyA, b = p.bodyB;
      var bookA = a.isBook ? a : null, bookB = b.isBook ? b : null;
      if (!bookA && !bookB) continue;
      var rvx = a.velocity.x - b.velocity.x, rvy = a.velocity.y - b.velocity.y;
      var rel = Math.hypot(rvx, rvy);
      if (rel < 6) continue;
      var mag = clamp((rel - 6) / 22, 0, 1);
      if (state.heavy) {
        if (bookA) bookA.squash = clamp(bookA.squash - mag * 0.26, 0.72, 1);
        if (bookB) bookB.squash = clamp(bookB.squash - mag * 0.26, 0.72, 1);
      }
      if (rel > 9 && p.collision && p.collision.supports && p.collision.supports[0]) {
        var sp = p.collision.supports[0];
        spawnDust(sp.x, sp.y, 1 + Math.round(mag * 4), 0.5 + mag * 0.8);
      }
    }
  }

  /* =========================================================
     INTERAÇÃO — ações de clique
     ========================================================= */
  function explode() {
    hasInteracted = true;
    markInteract();
    var cx = W / 2, cy = H * 0.55;
    books.forEach(function (bk) {
      Sleeping.set(bk, false);
      var dx = bk.position.x - cx, dy = bk.position.y - cy;
      var d = Math.hypot(dx, dy) || 1;
      var f = rnd(16, 30);
      Body.setVelocity(bk, { x: (dx / d) * f, y: (dy / d) * f - rnd(4, 12) });
      Body.setAngularVelocity(bk, rnd(-0.5, 0.5));
      spawnDust(bk.position.x, bk.position.y, 3, 1.0);
    });
  }

  function onCanvasClick() {
    if (state.click === "home") {
      window.location.href = "index.html";
    } else if (state.click === "restack") {
      restackAnimated();
    } else if (state.click === "explode") {
      explode();
    }
  }

  /* =========================================================
     PONTEIRO
     ========================================================= */
  function toLocal(e) {
    var r = canvas.getBoundingClientRect();
    // O canvas tem H + OVERHEAD de altura e fica posicionado com top: -OVERHEAD.
    // e.clientY - r.top inclui a zona invisível acima; subtraímos OVERHEAD para
    // converter para o sistema de coordenadas da física (y=0 = topo do stage).
    var scaleX = W / r.width;
    var scaleY = (H + OVERHEAD) / r.height;
    return {
      x: (e.clientX - r.left) * scaleX,
      y: (e.clientY - r.top) * scaleY - OVERHEAD
    };
  }

  function wirePointer() {
    // --- Mouse: comportamento original ---
    canvas.addEventListener("pointerenter", function (e) {
      if (e.pointerType === "touch") return; // touch tem lógica própria abaixo
      var p = toLocal(e);
      mouse = p; lastMouse = { x: p.x, y: p.y };
      mouseVel = { x: 0, y: 0 };
      cursorActive = true;
      ensureCursor();
      Body.setPosition(cursor, mouse);
    });
    canvas.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;
      mouse = toLocal(e);
    });
    canvas.addEventListener("pointerleave", function (e) {
      if (e.pointerType === "touch") return;
      cursorActive = false;
      dropCursor();
      mouseVel = { x: 0, y: 0 };
    });
    canvas.addEventListener("click", onCanvasClick);

    // --- Touch: threshold de intenção ---
    // Aguarda o primeiro movimento para decidir se é scroll (vertical)
    // ou interação com a física (horizontal/diagonal).
    var touchState = "idle"; // "idle" | "deciding" | "physics" | "scroll"
    var touchOrigin = { x: 0, y: 0 };
    var THRESHOLD = 8; // px antes de decidir a intenção

    canvas.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "touch") return;
      touchState = "deciding";
      var p = toLocal(e);
      touchOrigin = { x: e.clientX, y: e.clientY };
      mouse = p; lastMouse = { x: p.x, y: p.y };
      mouseVel = { x: 0, y: 0 };
    });

    canvas.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "touch") return;

      if (touchState === "deciding") {
        var dx = Math.abs(e.clientX - touchOrigin.x);
        var dy = Math.abs(e.clientY - touchOrigin.y);
        var dist = Math.hypot(dx, dy);
        if (dist < THRESHOLD) return; // ainda não se moveu o suficiente

        if (dy > dx * 1.2) {
          // predominantemente vertical → scroll
          touchState = "scroll";
          cursorActive = false;
          dropCursor();
          return;
        } else {
          // horizontal ou diagonal → física
          touchState = "physics";
          cursorActive = true;
          ensureCursor();
          Body.setPosition(cursor, mouse);
          canvas.style.touchAction = "none"; // captura o toque
        }
      }

      if (touchState === "physics") {
        mouse = toLocal(e);
        e.preventDefault(); // evita scroll enquanto interage
      }
    }, { passive: false });

    canvas.addEventListener("pointerup", function (e) {
      if (e.pointerType !== "touch") return;
      if (touchState === "physics") {
        cursorActive = false;
        dropCursor();
        mouseVel = { x: 0, y: 0 };
      }
      touchState = "idle";
      canvas.style.touchAction = "pan-y"; // restaura scroll vertical
    });

    canvas.addEventListener("pointercancel", function (e) {
      if (e.pointerType !== "touch") return;
      cursorActive = false;
      dropCursor();
      mouseVel = { x: 0, y: 0 };
      touchState = "idle";
      canvas.style.touchAction = "pan-y";
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
     SISTEMAS DE ANIMAÇÃO (v3)
     ========================================================= */
  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  var lastT = 0;
  var lastInteract = -1e9;
  function markInteract() { lastInteract = performance.now(); }

  /* ---- partículas de poeira ---- */
  var particles = [];
  function spawnDust(x, y, n, scale) {
    if (!state.dust || prefersReduced) return;
    scale = scale || 1;
    for (var i = 0; i < n; i++) {
      particles.push({
        x: x + rnd(-6, 6), y: y + rnd(-4, 4),
        vx: rnd(-0.7, 0.7) * scale, vy: rnd(-0.9, -0.1) * scale,
        life: 1, decay: rnd(0.006, 0.014), r: rnd(3, 9) * scale
      });
    }
    if (particles.length > 240) particles.splice(0, particles.length - 240);
  }
  function updateParticles(dt) {
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.life -= p.decay * dt;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.vy += 0.012 * dt;     // a poeira sobe, desacelera e assenta de leve
      p.vx *= 0.985; p.vy *= 0.99;
      p.r += 0.18 * dt;       // expande conforme dispersa
    }
  }
  function drawParticles() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var a = p.life * p.life * 0.22;
      var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, "rgba(176,164,138," + a + ")");
      g.addColorStop(1, "rgba(176,164,138,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }
  }

  /* ---- marca-páginas de fita (desenhados em coords. do mundo) ---- */
  function drawRibbons() {
    if (!state.ribbons) return;
    for (var i = 0; i < books.length; i++) {
      var b = books[i];
      if (!b.hasRibbon) continue;
      var w = b.bw, h = b.bh;
      // ponto de saída: borda do corte (oposta à lombada), perto do topo
      var lx = b.spineSide < 0 ? (w / 2 - 4) : (-w / 2 + 4);
      var ly = -h / 2 + 2;
      var ca = Math.cos(b.angle), sa = Math.sin(b.angle);
      var ax = b.position.x + ca * lx - sa * ly;
      var ay = b.position.y + sa * lx + ca * ly;
      var len = b.ribbonLen;
      var sw = b.ribbonSway;
      // dois segmentos: leve curva, balança com a inércia
      var mx = ax + Math.sin(sw) * len * 0.5;
      var my = ay + Math.cos(sw * 0.6) * len * 0.5;
      var tx = mx + Math.sin(sw * 1.5) * len * 0.5;
      var ty = my + Math.cos(sw * 0.9) * len * 0.5;
      ctx.save();
      ctx.globalAlpha = b.appearAlpha;
      // sombra
      ctx.strokeStyle = "rgba(0,0,0,0.18)"; ctx.lineWidth = 4; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(ax + 1, ay + 1); ctx.lineTo(mx + 1, my + 1); ctx.lineTo(tx + 1, ty + 1); ctx.stroke();
      // fita
      ctx.strokeStyle = b.ribbonColor; ctx.lineWidth = 3.2;
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(mx, my); ctx.lineTo(tx, ty); ctx.stroke();
      // realce de seda
      ctx.strokeStyle = lighten(b.ribbonColor, 0.35); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(mx, my); ctx.lineTo(tx, ty); ctx.stroke();
      // ponta em rabo-de-andorinha (V)
      var dx = tx - mx, dy = ty - my, dl = Math.hypot(dx, dy) || 1;
      var nx = -dy / dl, ny = dx / dl;
      ctx.strokeStyle = b.ribbonColor; ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(tx + nx * 2.4, ty + ny * 2.4);
      ctx.lineTo(tx - dx * 0.18, ty - dy * 0.18);
      ctx.lineTo(tx - nx * 2.4, ty - ny * 2.4);
      ctx.stroke();
      ctx.restore();
    }
  }

  /* ---- atualização por quadro: virada, squash, fitas, vida ociosa ---- */
  function updateScene() {
    var now = performance.now();
    var dt = lastT ? clamp((now - lastT) / 16.67, 0.25, 3) : 1;
    lastT = now;

    if (restackAnim.active) tickRestack(dt);

    for (var i = 0; i < books.length; i++) {
      var b = books[i];
      var speed = Math.hypot(b.velocity.x, b.velocity.y);
      var av = Math.abs(b.angularVelocity);

      // virada pseudo-3D — acompanha a rotação real quando o volume voa
      if (state.flip3d && !restackAnim.active) {
        var airborne = (speed > 2.4 || av > 0.07) && !b.isStatic;
        if (airborne) {
          b.flip += b.angularVelocity * 2.6 * dt;
        } else if (b.flip !== 0) {
          // assenta mostrando sempre a FACE (múltiplo par de π → cos=1)
          var target = Math.round(b.flip / (2 * Math.PI)) * 2 * Math.PI;
          b.flip += (target - b.flip) * 0.16 * dt;
          if (Math.abs(target - b.flip) < 0.01) b.flip = target % (2 * Math.PI);
        }
      }

      // squash do impacto relaxa de volta a 1
      if (state.heavy && b.squash !== 1) {
        b.squash += (1 - b.squash) * 0.16 * dt;
        if (Math.abs(1 - b.squash) < 0.004) b.squash = 1;
      }

      // balanço da fita: inércia horizontal + assentamento
      if (b.hasRibbon) {
        var swTarget = clamp(-b.velocity.x * 0.05 + b.angle * 0.5, -1.1, 1.1);
        b.ribbonSway += (swTarget - b.ribbonSway) * 0.12 * dt;
      }
    }

    updateIdle(now, dt);
    updateParticles(dt);
  }

  /* ---- vida ociosa: micro-assentamento ocasional ---- */
  var nextIdleNudge = 0;
  function updateIdle(now, dt) {
    if (!state.idleLife || prefersReduced || restackAnim.active) return;
    if (now - lastInteract < 5000) return;          // só quando realmente ocioso
    if (now < nextIdleNudge) return;
    nextIdleNudge = now + rnd(4500, 9000);
    if (!books.length) return;
    // escolhe um volume do alto de uma pilha e dá um suspiro mínimo
    var top = null, bestY = 1e9;
    for (var k = 0; k < books.length; k++) {
      var bk = books[k];
      if (bk.position.y < bestY && Math.abs(bk.angularVelocity) < 0.02) { bestY = bk.position.y; top = bk; }
    }
    if (top) {
      Sleeping.set(top, false);
      Body.setAngularVelocity(top, (Math.random() < 0.5 ? -1 : 1) * rnd(0.004, 0.012));
      Body.applyForce(top, top.position, { x: (Math.random() < 0.5 ? -1 : 1) * 1e-5 * top.mass, y: -2e-6 * top.mass });
    }
  }

  /* ---- reempilhar como animação: volumes voltam flutuando ---- */
  var restackAnim = { active: false, t: 0, dur: 48, wasActive: false };
  function tickRestack(dt) {
    restackAnim.t += dt;
    var p = clamp(restackAnim.t / restackAnim.dur, 0, 1);
    for (var i = 0; i < books.length; i++) {
      var b = books[i];
      var lp = clamp((p - b.appearDelay) / (1 - b.appearDelay), 0, 1);
      var e = easeOutCubic(lp);
      Body.setPosition(b, { x: lerp(b.sx, b.tx, e), y: lerp(b.sy, b.ty, e) });
      Body.setAngle(b, lerp(b.sa, b.ta, e));
      b.appearAlpha = clamp(lp * 1.6, 0, 1);
    }
    if (p >= 1) {
      restackAnim.active = false;
      for (var j = 0; j < books.length; j++) {
        var bk = books[j];
        Body.setStatic(bk, false);
        Body.setVelocity(bk, { x: 0, y: 0 });
        Body.setAngularVelocity(bk, 0);
        bk.appearAlpha = 1;
        Sleeping.set(bk, false);
      }
      if (restackAnim.wasActive) { cursorActive = true; ensureCursor(); Body.setPosition(cursor, mouse); }
    }
  }
  function restackAnimated() {
    if (!state.animatedRestack || prefersReduced) { rebuild(); return; }
    restackAnim.wasActive = cursorActive;
    cursorActive = false; dropCursor();
    clearWorld();
    applyGravity();
    buildWalls();
    buildPiles(true);   // monta estático + espalha posições iniciais
    hasInteracted = false;
    restackAnim.active = true;
    restackAnim.t = 0;
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
      for (var xi = 0; xi < W + tileW; xi += tileW) {
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


  /* ---- utilidades de cor (v2) ---- */
  function hexToRgb(h) {
    h = h.replace("#", "");
    if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    return { r: parseInt(h.slice(0,2),16), g: parseInt(h.slice(2,4),16), b: parseInt(h.slice(4,6),16) };
  }
  function mix(hex, target, t) {
    var c = hexToRgb(hex), d = hexToRgb(target);
    return "rgb(" + Math.round(c.r+(d.r-c.r)*t) + "," + Math.round(c.g+(d.g-c.g)*t) + "," + Math.round(c.b+(d.b-c.b)*t) + ")";
  }
  function lighten(hex, t) { return mix(hex, "#ffffff", t); }
  function darken(hex, t)  { return mix(hex, "#000000", t); }

  /* ---- grão de couro: tile de ruído gerado uma vez ---- */
  var grainTile = null, grainPattern = null;
  function ensureGrain() {
    if (grainTile) return;
    grainTile = document.createElement("canvas");
    grainTile.width = grainTile.height = 96;
    var g = grainTile.getContext("2d");
    var img = g.createImageData(96, 96);
    for (var i = 0; i < img.data.length; i += 4) {
      var n = Math.random();
      var v = n < 0.78 ? 0 : 255;           // escuro (poros) vs claro (realce)
      var a = n < 0.5 ? 0 : (n < 0.78 ? 15 : 13);
      img.data[i] = v; img.data[i+1] = v; img.data[i+2] = v; img.data[i+3] = a;
    }
    g.putImageData(img, 0, 0);
  }

  /* ---- grão de pano editorial: tecelagem fina (cross-hatch) ---- */
  var clothTile = null, clothPattern = null;
  function ensureCloth() {
    if (clothTile) return;
    clothTile = document.createElement("canvas");
    clothTile.width = clothTile.height = 8;
    var g = clothTile.getContext("2d");
    g.clearRect(0, 0, 8, 8);
    // trama vertical clara + horizontal escura → tecido
    g.strokeStyle = "rgba(255,255,255,0.07)"; g.lineWidth = 1;
    for (var x = 0.5; x < 8; x += 2) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 8); g.stroke(); }
    g.strokeStyle = "rgba(0,0,0,0.10)";
    for (var y = 1.5; y < 8; y += 2) { g.beginPath(); g.moveTo(0, y); g.lineTo(8, y); g.stroke(); }
  }

  /* ---- cabeçado: faixinha de seda no topo/pé da lombada ---- */
  function drawHeadband(sx0, y, spineW) {
    var hbH = 2.4;
    ctx.save();
    ctx.beginPath(); ctx.rect(sx0 + 1, y, spineW - 2, hbH); ctx.clip();
    ctx.fillStyle = "#efe7d0"; ctx.fillRect(sx0 + 1, y, spineW - 2, hbH);
    ctx.fillStyle = "#7a2620";
    for (var x = sx0; x < sx0 + spineW; x += 2.4) ctx.fillRect(x + 1, y, 1.2, hbH);
    ctx.restore();
  }

  /* ---- render enriquecido (v2 + v3) ---- */
  function drawBookRich(b) {
    var w = b.bw, h = b.bh, c = b.colors, P = b.pal;
    var lit = state.light;
    var cloth = state.bindingVariety && b.material === "cloth";

    // ---- transformações v3: virada pseudo-3D + squash + opacidade ----
    var cosF = state.flip3d ? Math.cos(b.flip) : 1;
    var faceBack = state.flip3d && cosF < 0;            // mostrando o "verso"
    var flipX = state.flip3d ? clamp(Math.abs(cosF), 0.10, 1) : 1;
    var sq = state.heavy ? b.squash : 1;
    var sgn = faceBack ? -1 : 1;                        // espelha o miolo no verso

    ctx.save();
    ctx.globalAlpha = b.appearAlpha;
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);
    ctx.scale((flipX / Math.sqrt(sq)) * sgn, sq);       // sgn espelha em X no verso

    // sombra projetada (contato / oclusão entre volumes) — só na face cheia
    ctx.shadowColor = "rgba(20,16,12," + (0.30 * b.appearAlpha) + ")";
    ctx.shadowBlur = (lit ? 12 : 9) * flipX;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = (lit ? 6 : 4);

    // corpo da capa — gradiente vertical com luz direcional do topo
    var g = ctx.createLinearGradient(0, -h/2, 0, h/2);
    if (lit) {
      g.addColorStop(0,    lighten(c.cover2, cloth ? 0.10 : 0.18));
      g.addColorStop(0.32, c.cover2);
      g.addColorStop(0.62, c.cover);
      g.addColorStop(1,    darken(c.cover, 0.30));
    } else {
      g.addColorStop(0, c.cover2); g.addColorStop(0.5, c.cover); g.addColorStop(1, c.cover2);
    }
    ctx.fillStyle = g;
    roundRect(ctx, -w/2, -h/2, w, h, 3);
    ctx.fill();
    ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

    // textura: pano editorial (trama) ou grão de couro
    if (cloth) {
      ensureCloth();
      if (!clothPattern) clothPattern = ctx.createPattern(clothTile, "repeat");
      if (clothPattern) {
        ctx.save();
        roundRect(ctx, -w/2, -h/2, w, h, 3); ctx.clip();
        ctx.globalAlpha = 0.9 * b.appearAlpha;
        ctx.fillStyle = clothPattern;
        ctx.fillRect(-w/2, -h/2, w, h);
        ctx.restore();
      }
    } else if (state.grain) {
      ensureGrain();
      if (!grainPattern) grainPattern = ctx.createPattern(grainTile, "repeat");
      if (grainPattern) {
        ctx.save();
        roundRect(ctx, -w/2, -h/2, w, h, 3); ctx.clip();
        ctx.globalAlpha = 0.6 * b.appearAlpha;
        ctx.translate((b.seed * 47) | 0, (b.seed * 73) | 0);
        ctx.fillStyle = grainPattern;
        ctx.fillRect(-w, -h, w * 2 + 96, h * 2 + 96);
        ctx.restore();
      }
    }

    // ---- desgaste honesto: brilho desigual + cantos puídos ----
    if (state.wear) {
      ctx.save();
      roundRect(ctx, -w/2, -h/2, w, h, 3); ctx.clip();
      // mancha de brilho descentrada (couro gasto pega luz irregular)
      var bx = (frand(b.meta.idx, 11) - 0.5) * w * 0.7;
      var by = (frand(b.meta.idx, 12) - 0.5) * h * 0.6;
      var sh = ctx.createRadialGradient(bx, by, 1, bx, by, w * 0.45);
      sh.addColorStop(0, "rgba(255,248,230," + (0.05 + b.wearAmt * 0.06) + ")");
      sh.addColorStop(1, "rgba(255,248,230,0)");
      ctx.fillStyle = sh; ctx.fillRect(-w/2, -h/2, w, h);
      // cantos puídos: o couro/pano clareia onde é manuseado
      var scuff = 4 + b.wearAmt * 5;
      var corners = [[-w/2, -h/2], [w/2, -h/2], [-w/2, h/2], [w/2, h/2]];
      for (var ci = 0; ci < 4; ci++) {
        var cn = corners[ci];
        var cg = ctx.createRadialGradient(cn[0], cn[1], 0, cn[0], cn[1], scuff);
        cg.addColorStop(0, "rgba(190,175,150," + (0.16 + b.wearAmt * 0.20) + ")");
        cg.addColorStop(1, "rgba(190,175,150,0)");
        ctx.fillStyle = cg; ctx.fillRect(cn[0] - scuff, cn[1] - scuff, scuff * 2, scuff * 2);
      }
      // arranhão fino ocasional
      if (b.wearAmt > 0.6) {
        ctx.globalAlpha = (b.wearAmt - 0.6) * 0.5;
        ctx.strokeStyle = "rgba(0,0,0,0.4)"; ctx.lineWidth = 0.6;
        var ry = (frand(b.meta.idx, 13) - 0.5) * h * 0.5;
        ctx.beginPath(); ctx.moveTo(-w * 0.3, ry); ctx.lineTo(w * 0.28, ry + 1.5); ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.restore();
    }

    // geometria do miolo / lombada
    var lip = Math.min(5.5, h * 0.24);
    var spineW = Math.min(15, w * 0.12);
    var px = b.spineSide < 0 ? -w/2 + spineW : -w/2 + 2.5;
    var pr = b.spineSide < 0 ? w/2 - 2.5 : w/2 - spineW;
    var py = -h/2 + lip, ph = h - lip * 2, pw = pr - px;

    // miolo de páginas (corte / fore-edge)
    if (pw > 4 && ph > 2) {
      ctx.save();
      roundRect(ctx, px, py, pw, ph, 1); ctx.clip();
      // base quente com luz do topo
      var pg = ctx.createLinearGradient(0, py, 0, py + ph);
      pg.addColorStop(0,   lit ? lighten(P.pages, 0.10) : P.pages);
      pg.addColorStop(0.5, P.pages);
      pg.addColorStop(1,   lit ? darken(P.pages, 0.16) : P.pages);
      ctx.fillStyle = pg; ctx.fillRect(px, py, pw, ph);

      // ---- v3: estilo de corte ----
      var es = state.edgeVariety ? b.edgeStyle : (b.accent && state.giltEdge ? "gilt" : "plain");
      if (es === "gilt" && state.giltEdge) {
        ctx.fillStyle = "rgba(199,154,58,0.42)"; ctx.fillRect(px, py, pw, ph);
      } else if (es === "sprinkled") {
        // corte salpicado: pingos finos de pigmento
        ctx.fillStyle = b.edgeHue;
        for (var sp = 0; sp < pw * ph * 0.08; sp++) {
          ctx.globalAlpha = 0.10 + frand(b.meta.idx * 31 + sp, 1) * 0.28;
          var dx0 = px + frand(b.meta.idx * 17 + sp, 2) * pw;
          var dy0 = py + frand(b.meta.idx * 19 + sp, 3) * ph;
          ctx.fillRect(dx0, dy0, 0.9, 0.9);
        }
        ctx.globalAlpha = 1;
      } else if (es === "marbled") {
        // corte marmorizado: veios sinuosos em duas tintas
        ctx.globalAlpha = 0.5;
        for (var mv = 0; mv < 5; mv++) {
          ctx.strokeStyle = mv % 2 ? b.edgeHue : darken(b.edgeHue, 0.3);
          ctx.lineWidth = 0.8 + frand(b.meta.idx + mv, 4) * 0.8;
          ctx.beginPath();
          for (var mx = 0; mx <= pw; mx += 2) {
            var my = py + (mv + 0.5) / 5 * ph + Math.sin(mx * 0.5 + b.seed * 10 + mv) * 1.6;
            mx === 0 ? ctx.moveTo(px + mx, my) : ctx.lineTo(px + mx, my);
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      // folhas com espaçamento IRREGULAR + cadernos (gatherings) mais escuros
      ctx.strokeStyle = es === "gilt" ? "#b08a3a" : P.pagesLine;
      ctx.lineWidth = 1;
      var sv = b.seed * 1000, yy = py + 1.4, k = 0;
      while (yy < py + ph) {
        var frac = Math.sin(sv + k * 1.7) * 0.5 + 0.5;
        var heavyL = (Math.floor(sv + k * 0.9) % 7 === 0);
        ctx.globalAlpha = (heavyL ? 0.82 : 0.45 + frac * 0.22) * (es === "marbled" || es === "sprinkled" ? 0.5 : 1);
        ctx.beginPath();
        ctx.moveTo(px, Math.round(yy) + 0.5);
        ctx.lineTo(px + pw, Math.round(yy) + 0.5);
        ctx.stroke();
        yy += 1.9 + frac * 1.2; k++;
      }
      ctx.globalAlpha = 1;
      // sombra interna na boca das folhas (lado oposto à lombada)
      var fg = ctx.createLinearGradient(b.spineSide < 0 ? px+pw-8 : px, 0, b.spineSide < 0 ? px+pw : px+8, 0);
      fg.addColorStop(0, "rgba(26,22,18,0)"); fg.addColorStop(1, "rgba(26,22,18,0.20)");
      ctx.fillStyle = fg; ctx.fillRect(px, py, pw, ph);
      ctx.restore();
    }

    // lombada
    var sx0 = b.spineSide < 0 ? -w/2 : w/2 - spineW;
    var sg = ctx.createLinearGradient(sx0, 0, sx0 + spineW, 0);
    sg.addColorStop(0,   lit ? darken(c.cover2, 0.10) : c.cover2);
    sg.addColorStop(0.4, lighten(c.cover, 0.06));
    sg.addColorStop(1,   lit ? darken(c.cover2, 0.18) : c.cover2);
    ctx.save();
    roundRect(ctx, -w/2, -h/2, w, h, 3); ctx.clip();
    ctx.fillStyle = sg; ctx.fillRect(sx0, -h/2, spineW, h);

    var showBands = state.bands && !cloth && h >= 20;
    if (showBands) {
      // nervuras em relevo
      var n = b.nBands;
      var top = -h/2 + lip * 0.7, bot = h/2 - lip * 0.7, span = bot - top;
      for (var bi = 1; bi <= n; bi++) {
        var by2 = top + span * (bi / (n + 1));
        ctx.globalAlpha = 0.7; ctx.fillStyle = darken(c.cover, 0.45);
        ctx.fillRect(sx0 + 1, by2 + 1.0, spineW - 2, 1.1);              // sombra abaixo
        ctx.globalAlpha = 0.8; ctx.fillStyle = lighten(c.cover, 0.28);
        ctx.fillRect(sx0 + 1, by2 - 1.4, spineW - 2, 1.1);              // realce acima
        ctx.globalAlpha = 0.5; ctx.fillStyle = c.ink;
        ctx.fillRect(sx0 + 2, by2 - 0.5, spineW - 4, 1);               // filete dourado
        ctx.globalAlpha = 1;
      }
    } else {
      ctx.fillStyle = c.ink; ctx.globalAlpha = 0.85;
      ctx.fillRect(sx0 + 2, -h/2 + h * 0.24, spineW - 4, 1);
      ctx.fillRect(sx0 + 2, -h/2 + h * 0.74, spineW - 4, 1);
      ctx.globalAlpha = 1;
    }
    ctx.restore();

    // cabeçados (topo + pé da lombada)
    if (state.headbands && h >= 16) {
      drawHeadband(sx0, -h/2 + 0.4, spineW);
      drawHeadband(sx0, h/2 - 2.8, spineW);
    }

    // ---- v3: etiqueta de couro + título tooled (só na face frontal) ----
    if (!faceBack) drawSpine(b, sx0, spineW, h, c, lip);

    // fios dourados nas bordas da capa (cantos das tábuas)
    if (state.giltEdge && !cloth) {
      ctx.fillStyle = "rgba(199,154,58,0.30)";
      ctx.fillRect(-w/2 + 3, -h/2 + lip * 0.4, w - 6, 0.8);
      ctx.fillRect(-w/2 + 3, h/2 - lip * 0.4 - 0.8, w - 6, 0.8);
    }

    // brilho na aresta superior
    ctx.strokeStyle = lit ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.10)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-w/2 + 3, -h/2 + 0.6); ctx.lineTo(w/2 - 3, -h/2 + 0.6); ctx.stroke();

    // oclusão sutil na base do volume
    if (lit) {
      ctx.save();
      roundRect(ctx, -w/2, -h/2, w, h, 3); ctx.clip();
      var ao = ctx.createLinearGradient(0, h/2 - 5, 0, h/2);
      ao.addColorStop(0, "rgba(0,0,0,0)"); ao.addColorStop(1, "rgba(0,0,0,0.22)");
      ctx.fillStyle = ao; ctx.fillRect(-w/2, h/2 - 5, w, 5);
      ctx.restore();
    }

    ctx.restore();
  }

  /* ---- lombada tooled: etiqueta de couro contrastante + título/numeral em ouro ---- */
  function drawSpine(b, sx0, spineW, h, c, lip) {
    if (!state.titles && !b.label) {
      // fallback v2: só numeral
      if (b.label && h >= 18) spineNumeral(b, sx0, spineW, c);
      return;
    }
    var cx = sx0 + spineW / 2;
    var gilt = c.ink;
    var num = b.label;                              // numeral romano (ou "CDIV"/"")
    var hasLabel = state.titles && b.hasLabel;

    // etiqueta de couro contrastante (morocco label) — banda no terço central
    if (hasLabel && h >= 18) {
      var lblH = clamp(h * 0.34, 7, 12);
      var lblY = -lblH / 2 + (h >= 28 ? h * 0.06 : 0);   // levemente acima do centro
      ctx.save();
      roundRect(ctx, sx0 + 1.5, lblY, spineW - 3, lblH, 1.5);
      ctx.fillStyle = b.labelColor; ctx.fill();
      // bordas em ouro da etiqueta
      ctx.strokeStyle = "rgba(199,154,58,0.6)"; ctx.lineWidth = 0.6; ctx.stroke();
      ctx.clip();
      // título tooled em ouro, rodado para correr ao longo da lombada
      ctx.translate(cx, lblY + lblH / 2);
      ctx.rotate(-Math.PI / 2);
      var label = (h >= 30 ? b.title : b.title.slice(0, 4)).replace("·", "");
      fitGiltText(label, lblH * 0.62, spineW - 4, "#e6c878");
      ctx.restore();
    }

    // numeral do volume em ouro, no pé da lombada (sempre que houver e couber)
    if (num && h >= 18) {
      var ny = hasLabel ? (h >= 28 ? h * 0.34 : h * 0.30) : 0;
      ctx.save();
      ctx.translate(cx, ny);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = gilt; ctx.globalAlpha = 0.95;
      ctx.font = (b.accent ? "600 " : "") + "8px 'JetBrains Mono', ui-monospace, monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(num, 0, 0);
      ctx.restore();
    }
  }

  /* desenha texto ajustando o tamanho para caber no comprimento disponível */
  function fitGiltText(txt, maxFont, maxLen, color) {
    var fs = maxFont;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    do {
      ctx.font = "600 " + fs.toFixed(1) + "px 'EB Garamond', Georgia, serif";
      if (ctx.measureText(txt).width <= maxLen || fs <= 3.5) break;
      fs -= 0.5;
    } while (true);
    // leve sombra de gravação + ouro
    ctx.fillStyle = "rgba(0,0,0,0.45)"; ctx.fillText(txt, 0.4, 0.5);
    ctx.fillStyle = color; ctx.fillText(txt, 0, 0);
  }

  function spineNumeral(b, sx0, spineW, c) {
    ctx.save();
    ctx.translate(sx0 + spineW / 2, 0);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = c.ink; ctx.globalAlpha = 0.95;
    ctx.font = (b.accent ? "600 " : "") + "8.5px 'JetBrains Mono', ui-monospace, monospace";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(b.label, 0, 0.5);
    ctx.restore();
  }

  /* despacha entre render clássico e enriquecido */
  function drawBook(b) {
    if (state.style === "classic") return drawBookClassic(b);
    return drawBookRich(b);
  }

  function drawBookClassic(b) {
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
    drawRibbons();
    drawParticles();
    drawCursor();
  }

  function render() {
    updateScene();
    drawFrame();
    requestAnimationFrame(render);
  }

  /* =========================================================
     SETUP / RESIZE
     ========================================================= */
  function sizeCanvas() {
    var r = stage.getBoundingClientRect();
    // Largura = largura TOTAL da janela (innerWidth = o que 100vw do .plate
    // resolve), para a mesa alcançar a borda direita real sem deixar vão.
    // O overflow horizontal é travado (overflow-x:hidden em html E body),
    // então a parte que passa da área visível nunca pode ser revelada por
    // arraste. As paredes do mundo usam esse mesmo W → livros contidos.
    var visW = window.innerWidth || document.documentElement.clientWidth || r.width;
    W = Math.max(240, Math.round(visW));
    H = Math.max(240, Math.round(r.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = W * dpr;
    canvas.height = (H + OVERHEAD) * dpr;
    canvas.style.width   = W + "px";
    canvas.style.height  = (H + OVERHEAD) + "px";
    canvas.style.position = "absolute";
    canvas.style.top      = -OVERHEAD + "px";
    // alinha a borda esquerda do canvas à borda esquerda do viewport,
    // compensando o deslocamento do stage (full-bleed)
    canvas.style.left     = -Math.round(r.left) + "px";
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
    setStyle: function (v) { state.style = v; },
    setBands: function (v) { state.bands = !!v; },
    setHeadbands: function (v) { state.headbands = !!v; },
    setGiltEdge: function (v) { state.giltEdge = !!v; },
    setGrain: function (v) { state.grain = !!v; },
    setLight: function (v) { state.light = !!v; },
    /* --- v3 --- */
    setTitles: function (v) { state.titles = !!v; },
    setBindingVariety: function (v) { state.bindingVariety = !!v; },
    setEdgeVariety: function (v) { state.edgeVariety = !!v; },
    setRibbons: function (v) { state.ribbons = !!v; },
    setWear: function (v) { state.wear = !!v; },
    setFlip3d: function (v) { state.flip3d = !!v; if (!v) books.forEach(function (b) { b.flip = 0; }); },
    setHeavy: function (v) { state.heavy = !!v; rebuild(); },
    setDust: function (v) { state.dust = !!v; if (!v) particles.length = 0; },
    setIdleLife: function (v) { state.idleLife = !!v; },
    setAnimatedRestack: function (v) { state.animatedRestack = !!v; },
    restack: restackAnimated,
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
      drawRibbons();
      // ainda permite clique
      canvas.addEventListener("click", onCanvasClick);
      return;
    }

    runner = Runner.create();
    Runner.run(runner, engine);
    Events.on(engine, "beforeUpdate", onBeforeUpdate);
    Events.on(engine, "collisionActive", onCollisionActive);
    Events.on(engine, "collisionStart", onCollisionActive);
    Events.on(engine, "collisionStart", onImpact);
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
