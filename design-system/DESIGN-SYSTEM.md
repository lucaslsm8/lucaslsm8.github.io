# Design System — Lucas Schoenherr Portfolio

**Tema:** livro antigo (catalogue raisonné) com refinamento moderno.
**Stack:** HTML + CSS + JS (sem build step). Compatível com Claude Design e Cowork.
**Fonte de verdade dos tokens:** `design-system/tokens.css`.

Este documento é a referência consultável do design system. Sempre que for criar ou editar componentes, abra este arquivo primeiro. Tokens novos entram em `tokens.css` e são documentados aqui.

---

## 1. Princípios

1. **Editorial primeiro.** Tipografia conduz, cor pontua. Linhas finas separam. Marginalia (gloss, footnotes, page counter) constrói atmosfera.
2. **Clássico, não datado.** Drop caps, romanos e EB Garamond convivem com layout em grid moderno, micro-interações sutis e responsividade séria.
3. **Restrição cromática.** A página é creme e tinta. Oxblood, cobalt e highlighter aparecem com parcimônia — quando aparecem, importam.
4. **Movimento contido.** Animações são curtas (≤1s), suaves (`--ease-power`) e nunca pirotécnicas.
5. **Acessibilidade.** Contraste AA mínimo. Foco visível. Targets touch ≥ 44px em mobile.

---

## 2. Cores

| Token              | Hex / RGBA              | Uso                                        |
|--------------------|-------------------------|--------------------------------------------|
| `--paper`          | `#f1ece0`               | Fundo principal                            |
| `--paper-shade`    | `#e8e1cd`               | Cards, colofão, superfícies elevadas       |
| `--paper-deep`     | `#ddd4bd`               | Sombra de papel                            |
| `--ink`            | `#1a1612`               | Texto principal, linhas fortes             |
| `--ink-soft`       | `#4a4136`               | Texto secundário                           |
| `--ink-faint`      | `#8b7f6e`               | Captions, metadados                        |
| `--ink-ghost`      | `#c4b8a0`               | Desabilitado, linhas pontilhadas           |
| `--hairline`       | `rgba(26,22,18,0.14)`   | Divisores sutis                            |
| `--hairline-strong`| `rgba(26,22,18,0.28)`   | Divisores principais                       |
| `--oxblood`        | `#7a2620`               | Drop caps, ornamentos, hover, acento       |
| `--cobalt`         | `#1d3a78`               | Acento secundário (links externos?)        |
| `--highlighter`    | `#f5e3a8`               | Marca-texto, `::selection`                 |

**Regra:** nunca usar cor crua (`#...`) em componentes. Sempre `var(--token)`.

---

## 3. Tipografia

Três famílias. Carregadas via Google Fonts no `index.html`:

| Família              | Token              | Uso                                          |
|----------------------|--------------------|----------------------------------------------|
| EB Garamond          | `--serif`          | Corpo, gloss, captions, parágrafos           |
| Instrument Serif     | `--serif-display`  | Títulos display, drop caps, números romanos  |
| JetBrains Mono       | `--mono`           | Metadados, page counter, números, labels SC  |

**Padrões editoriais:**
- Itálico marca **citação, ênfase, voz narrativa**, não puro decorativo.
- **Drop cap** no primeiro parágrafo de uma página/seção longa (`.preface .body p:first-of-type::first-letter`).
- **Smallcaps via mono** (uppercase + letter-spacing 0.06–0.12em) para labels e plate-meta.
- **Number formatting:** `font-variant-numeric: tabular-nums` em contadores e métricas. Roman numerals (`I, II, III, IV…`) marcam capítulos/plates.
- **Footnotes:** sobrescrito numérico em oxblood, com hover que destaca o `.fn-item` correspondente.

**Escala (tokens disponíveis):** `--fs-caption (10) | --fs-small (11) | --fs-meta (13) | --fs-body (19) | --fs-lead (22) | --fs-h4 (24) | --fs-h3 (36) | --fs-h2 (56) | --fs-h1 (120)`. Para títulos fluidos, usar `clamp()` referenciando esses valores como pisos/tetos.

---

## 4. Espaçamento e layout

Escala 4px-base. Tokens `--sp-1` (4) até `--sp-12` (160).

**Larguras de contêiner:**
- `--w-prose` (640px) — coluna de texto único, prefácio.
- `--w-narrow` (880px) — spread estreito, método.
- `--w-page` (1280px) — spread principal.

**Grids editoriais:**
- `.spread` — 3 colunas: `140px 1fr 140px` (margem esquerda/direita para gloss).
- `.plate-grid` — 3 colunas: `200px 1fr 1fr` (meta | imagem | descrição).
- `.toc-row` — 4 colunas: `80px 1fr auto 60px` (número | título + leader | página).

**Padding de página:** `.page` usa `96px 0`; em mobile, `64px 0`.

---

## 5. Componentes (catálogo do que existe na home)

| Componente            | Classe principal      | Função                                                      |
|-----------------------|------------------------|-------------------------------------------------------------|
| Page chrome top       | `.chrome-top`          | Cabeçalho fixo com running head e troca de idioma           |
| Page chrome bottom    | `.chrome-bot`          | Rodapé fixo com contador de página e progress bar           |
| Frontispiece          | `.frontispiece`        | Capa do livro (título display, autor, ornamento)            |
| Table of Contents     | `.toc` + `.toc-row`    | Sumário com leader dots                                     |
| Preface (drop cap)    | `.preface .body`       | Texto longo com drop cap automática no primeiro parágrafo   |
| Footnotes             | `.footnotes`           | Notas de rodapé numeradas (sincronizadas com `.fn` no corpo)|
| Plate                 | `.plate` + `.plate-grid`| Card de trabalho/case (meta + imagem + descrição + stats)  |
| Method / Tenets       | `.method` + `.tenets`  | Manifesto + 4 princípios                                    |
| Process diagram       | `.process-diagram`     | "Plate IV. Fig. 1 — Method" — engraving-style               |
| Apparatus             | `.apparatus`           | Tools / Languages / Curriculum                              |
| Correspondence card   | `.carta`               | Cartão de contato estilo carta, com **moldura airmail "par avion"** que troca de paleta por idioma: **PT → verde + ouro**, **EN → vermelho + azul** (via `html[lang]`, tokens `--air-green/--air-gold/--air-red/--air-blue`; anel `.carta::after` com listras diagonais + máscara `exclude`) |
| Colophon              | `.colophon`            | Fechamento do livro                                         |
| Errata                | `.errata`              | Easter egg (canto inferior direito)                         |
| Lens / magnifier      | `.lens`                | Lupa que segue o cursor sobre `.plate-image`                |
| Cursor glyph          | `.cursor-glyph`        | Cursor customizado com tag italic                           |
| Plate flip 3D         | `.plate-image-flip` + `.plate-flip-btn` | Wrapper 3D que gira a `.plate-image` para revelar `.plate-image-verso` (wireframe). Botão temático fica abaixo de "Dimensões" no `.plate-meta`. |

### 5.1 Página de case (`projects/case-template.html`)

Vocabulário editorial fixo. Cada bloco do case é uma "seção do livro":

| Componente               | Classe principal       | Função                                                       |
|--------------------------|------------------------|--------------------------------------------------------------|
| Case frontispiece        | `.case-frontispiece`   | Folha de rosto do case (título display, número, deck, byline)|
| Epígrafe (interlúdio)    | `.case-epigraph`       | Citação/tese de abertura, centrada, com aspa display oversized em oxblood. Não numerada. |
| Section head editorial   | `.case-section .section-head` | Cabeçalho com Roman, nome italic e gloss em mono     |
| Byline (frontispício)    | `.case-byline--inline` | Cliente · Ano · Papel · Escopo em **linha única** com separadores `.bl-sep`. Cobre o "elenco" — substitui a antiga seção Dramatis Personæ (removida em 2026-05-21). |
| Argument                 | `.case-section.argument` | Sinopse + drop cap do problema                             |
| Acta                     | `.acta > .act`         | Lista de "atos" do processo: número romano + nome + corpo    |
| Intermezzo (interlúdio)  | `.case-intermezzo`     | Banda **full-bleed escura** (`100vw`) com pull-quote em serif-display, label gilt e asterisco `⁂`. Quote faz leve `scale` no reveal. Não numerada. |
| Plates                   | `.case-plates`         | Grid 12-col de telas (`.full / .wide / .half / .third`) com lupa |
| Plate caption            | `.plate-caption`       | Legenda italic com número sobrescrito em oxblood             |
| Marginalia statistica    | `.marginalia-stat`     | Métricas como nota de margem — alternativa aos KPI cards     |
| Reception                | `.reception-clipping`  | Depoimento como recorte colado: levemente torto, endireita no hover, fitas (`.clip-tape`) nos cantos. + `.reception-note`. |
| Errata                   | `.errata-list > .errata-item` | Lições aprendidas em formato de fé de erratas         |
| Instrumentarium          | `.instruments > .instrument` | Ferramentas do ofício como lista de instrumentos: glifo + nome italic + descrição mono. Hover gira o glifo 90°. |
| Case colophon            | `.case-colophon`       | Créditos do case, ferramentas, agradecimentos                |
| Folio nav (Verso/Recto)  | `.folio-nav`           | Navegação fim-de-página: Verso (anterior) e Recto (próximo)  |
| To catalogue (chrome)    | `.chrome-top .to-catalogue` | Atalho discreto italic de volta ao catálogo             |

> **Ordem das seções no template (2026-05-21):** Frontispiece (com byline inline) → *Epígrafe* → I Argument → II Acta → *Intermezzo* → III Plates → IV Reception → V Errata → VI Instrumentarium → Colophon → Folio nav. Interlúdios (Epígrafe, Intermezzo) não recebem numeral romano. **Dramatis Personæ foi removida** (redundante com o byline).
>
> **Título:** `.case-title--single` para título curto numa linha (sem `<br>`).
> **Estatísticas:** `.marginalia-stat dl` usa `auto-fit` (uma faixa, não 2x2); número em `.serif-display` **upright** e grande (clamp até 96px) para dominar.
> **Pranchas → galeria:** a lupa foi substituída por um **modal de galeria** (`.case-gallery`, JS `initGallery`). Clicar em qualquer `.case-plate` abre a imagem num passe-partout de papel (tema livro), com setas, contador e teclado (←/→/Esc). O tilt 3D continua no hover. Todas as imagens das pranchas entram na galeria automaticamente.

> **Para adicionar um componente novo:** documente o nome, o seletor principal, sua função, estados (hover/active/focus/disabled), e variações em uma nova linha da tabela apropriada.

### 5.2 i18n PT/EN (páginas estáticas)

A home usa i18n via React (`t.*`). As páginas estáticas (case-template) usam **dupla-marcação**:

- Cada string traduzível aparece duas vezes, em spans irmãos: `<span class="t" lang="pt">…</span><span class="t" lang="en">…</span>`. Mantêm-se **adjacentes, sem espaço** entre eles. Para blocos com markup rico (`.it`, `.fn`, `<em>`), dualize **o texto interno** num único elemento-pai (um só `<p id>`), nunca duplique o `<p>` (evita IDs repetidos e quebra de `p + p`).
- O `<body data-lang="pt|en">` controla o idioma. CSS esconde o inativo: `body[data-lang="pt"] .t[lang="en"], body[data-lang="en"] .t[lang="pt"] { display: none; }`. O idioma inativo sai do layout **e** da árvore de acessibilidade.
- `case-template.js → initI18n()` faz o toggle real: seta `body[data-lang]`, sincroniza `<html lang>` (pt-BR/en), atualiza `aria-pressed` dos botões, persiste em `localStorage` (`ls-portfolio-lang`) e atualiza o rótulo da lupa.
- Strings geradas em JS (ex.: rótulo da lupa) vivem em `LENS_TAG = { pt, en }` e trocam via `updateLensLang()`.

### 5.3 Efeitos 3D & motion (case)

Tudo em **CSS 3D puro + JS vanilla** (sem deps). Protótipo de referência: `projects/motion-3d-demo.html` (lab com os 4 efeitos; só **ii** e **iv** foram aplicados ao template). Todos respeitam `prefers-reduced-motion` e `hover: none`.

| Efeito | Onde | Como | Acessibilidade |
|--------|------|------|----------------|
| **Tilt 3D nas pranchas** | `.case-plates` / `.case-plate` | `perspective` no grid; `initPlateTilt()` seta `--tx/--ty` (≤9°) no `mousemove`; `.case-plate::after` é o brilho (`--glare`). `.is-tilting` reforça a sombra. | Só `hover: hover` e sem reduced-motion. Convive com a lupa (tilt sutil = "examinar a gravura"). |
| **Parallax de scroll** | `.case-intermezzo` `.intermezzo-bg.l1/.l2` | `initParallax()` move `[data-speed]` conforme a posição relativa ao centro da viewport (rAF + throttle). | Desligado em reduced-motion. |
| **Reveal encadeado** | `[data-stagger]` (dramatis, acta, instruments, errata-list) | `initReveal()` observa `[data-stagger]`; ao entrar, escalona `transition-delay` dos filhos (i × 0.08s). Base: `[data-stagger] > * { opacity:0; translateY(16px) }`. | Delay 0 e estado final imediato em reduced-motion; visível no print. |
| **Count-up** | `.stat-val[data-count]` (marginalia-stat) | `initCountUp()` conta 0→alvo (easeOutCubic) ao entrar na tela; `data-dec` = casas decimais; `data-count` = alvo (autor edita). | Mostra o valor final direto em reduced-motion. |

> **Conflito tilt × stagger:** não aplicar `[data-stagger]` às `.case-plate` — ambos usariam a propriedade `transform`. As pranchas usam o `.reveal` do container (fade em bloco) + tilt no hover.

### 5.4 Imagens reais em cases (lições do Lighthouse)

Quando entram screenshots reais (em vez de placeholders), valem estas regras — aprendidas montando o case Lighthouse:

| Padrão | Regra |
|--------|-------|
| `.case-plate.shot` | Prancha com imagem real: altura **natural** (sem crop), `object-fit: contain`. Para imagens **landscape** (telas compostas, dashboards), usar `.full` ou `.half` — **nunca `.third`** (fica pequeno demais, ~90px). `.third` só serve a thumbnails muito pequenos. |
| `.case-figs` / `.case-figs.stack` | Par de figuras (as-is/to-be). 2 colunas por padrão; usar `.stack` (1 coluna, largura cheia) para **diagramas densos** (fluxogramas, mapas) que ficam ilegíveis lado a lado. |
| `.case-figure` | Imagem full-width avulsa (ex.: visão consolidada/impacto). |
| `.act-figs` | Tira de imagens pequenas dentro de um ato da Acta (ex.: 4 variações de card). |
| Intermezzo | A banda é **sempre escura** (cores literais `#161009` / `#f3ead0` / gilt `#e0a20f`), não usa tokens que invertem — assim mantém a identidade no modo vela. No vela ganha borda interna para se separar do plum. |
| Count-up | Prefixos (`+`, `~`) usam `.unit-pre` com `align-self: center` (centrados na altura do número, não na base). `data-count` = alvo; `data-dec` = casas decimais. |
| Modo vela | `.case-plate` ganha sombra para destacar imagens escuras do fundo plum. |

### 5.5 Molduras de mockup (Formato A / B)

Contêineres para apresentar telas/imagens dentro de um case. Todos têm duas variantes via classe: `.format-a` (editorial, linhas finas) e `.format-b` (artesanal/3D, textura). Trocar a peça = trocar a classe. CSS em `case-template.css`.

| Moldura | Classe | Notas |
|---------|--------|-------|
| Desktop (browser) | `.mockup-desktop` | `.mockup-header` (dots + address) + `.mockup-body > .mockup-screen-content` (16:10). A: latão fino; B: borda de madeira + rebites. Tilt 3D via `initMockupTilt`. |
| Mobile | `.mockup-mobile` | `.mockup-inner-frame` (speaker + body + home-button). A: contorno dourado; B: couro costurado. |
| Tablet | `.mockup-tablet` | 4:3. B simula livro de campo (lombada de couro). |
| Passe-partout | `.mockup-passepartout` | Montagem de museu: `.passepartout-cut` + `.passepartout-caption`. B com fitas washi (`.clip-tape`). |
| Cinema (sala) | `.mockup-cinema.format-a` | `.cinema-aspect-ratio` (2.39:1) + **`.cinema-audience`** (SVG cabeças/ombros em silhueta na base) + gradiente de projeção. |
| Vídeo (celuloide) | `.mockup-cinema.format-b` | **`.film-strip`** (grid `30px 1fr 30px`): `.film-perfs` (perfurações que correm, anim `film-run`) + `.film-window` com `.film-sheen` (brilho de projeção). Substitui o antigo "quadrado preto". |
| Glare | `.mockup-screen-glare` | Reflexo que segue o cursor (movido por `initMockupTilt`). |

### 5.6 Vitrine de componentes & specimen (`projects/projects.html`)

A **vitrine** é o catálogo vivo das peças do DS, cada uma com o HTML pronto para copiar. Desde 2026-06-11 vive em `projects/projects.html`, com CSS/JS próprios e autossuficientes (`projects.css` / `projects.js` — união enxuta de `catalogue` + `case-template` + `vitrine`, gerada via PurgeCSS, mais o Parecer do Editor como apêndice). Tokens continuam linkados de `tokens.css`.

| Padrão | Classe / função | Notas |
|--------|------------------|-------|
| Specimen | `.specimen` + `.specimen-stage` | Palco do elemento renderizado. `.specimen-stage--row` para itens lado a lado. |
| Gaveta de código | `<details class="specimen-code">` | `summary` (rótulo + chevron) → `.specimen-code-bar` (arquivo + `.specimen-copy`) → `<pre><code>` com **HTML escapado** (`&lt;`…). Fundo pautado. |
| Copiar código | `initCodeSpecimens()` | Copia `code.textContent` (entidades viram HTML real) via `navigator.clipboard` com fallback `execCommand`. Estado `.copied` por ~1.8s. |
| Carrossel | `.vitrine-carousel` + `initCarousel()` | "Pasta de colecionador": `.carousel-track` (translateX), `.carousel-plate` com `.carousel-plate-corner` (montagem), setas em pena (`.carousel-arrow`), **contador romano** (`[data-carousel-current]`/`[data-carousel-total]`, helper `ROMAN()`), `.carousel-dots` (gerados em JS), teclado ←/→, loop. |
| Luneta-demo | `.loupe-demo-plate` + `initVitrineLoupe()` | Versão **contida** da lupa da home: clona `.loupe-demo-art` ampliado dentro de `.loupe-demo-glass` (aro `.loupe-demo-ring`), escopada ao quadro. Some em touch/≤1024. |
| Cartão Ex Libris | `.exlibris-card` | Folha avulsa do CV **autossuficiente** (não depende do `.ti-stage` da home): moldura dupla, `.cv-slip-rosette` nos cantos, `.exlibris-stamp` (selo postal SVG), eyebrow/title/gloss/meta/cta/motto. |
| Drop-cap demo | `.dropcap-demo` | Reusa `.drop-cap` (imagem capitular `images/S.png`/`I.png`). |
| Plate flip demo | `.plate-3d-wrapper`/`.plate-3d-card` | Reusa o flip do template (`initPlateFlip` togla `.flipped`); `.btn-flip-trigger`. |
| Roseta demo | `.rosette-demo` + `.cv-slip-rosette` | Mostra o ornamento de canto (tl/tr/bl/br) num quadro de exemplo. |

> **Slider before/after estático:** `initComparisonSlider` fixa a largura do `.slider-before .slider-content` na largura total do slider (e em `resize`). Numa comparação o texto **não reflui** ao arrastar — fica centralizado e só é revelado pelo clip.

---

## 6. Movimento

| Token            | Valor                                | Uso                            |
|------------------|--------------------------------------|--------------------------------|
| `--ease-out`     | `cubic-bezier(0.22, 1, 0.36, 1)`     | Hovers, micro-interações       |
| `--ease-power`   | `cubic-bezier(0.16, 1, 0.3, 1)`      | Reveal, entrada de conteúdo    |
| `--ease-in-out`  | `cubic-bezier(0.65, 0, 0.35, 1)`     | Loops, respiração              |
| `--dur-fast`     | `200ms`                              | Cor, opacity                   |
| `--dur-base`     | `300ms`                              | Padrão                         |
| `--dur-slow`     | `600ms`                              | Reveal                         |
| `--dur-page`     | `1000ms`                             | Animações de página            |

**Regra:** transições nunca passam de `--dur-page`. Respeitar `prefers-reduced-motion` quando implementarmos.

---

## 7. Responsividade

Cinco breakpoints. Marginalia **nunca desaparece** — em telas ≤1024 vira nota inline com borda oxblood à esquerda. Touch targets ≥44×44 px a partir de ≤640.

| Breakpoint | Alvo                          | Mudanças principais                                                                 |
|------------|-------------------------------|--------------------------------------------------------------------------------------|
| `≥ 1280`   | Desktop largo                  | Layout pleno: spread 3-col, plate-grid 3-col, apparatus 2-col.                       |
| `≤ 1024`   | Laptop / tablet paisagem       | Spread 1-col. `.margin-l/.margin-r` viram bloco com `border-left: 2px solid oxblood`. Plate-grid e apparatus 1-col. Tenets 2-col. |
| `≤ 768`    | Tablet retrato                 | Padding de página reduz. `.case-frontispiece` `min-height: 80vh`. Stats menores. Footnote `.fn` ganha alvo ≥22×22. |
| `≤ 640`    | Mobile grande                  | Body 17px. Chrome compacto. `.lang-toggle button` `min: 44×44`. ToC sem leader. Tenets 1-col. Process row em pilha. Verso/Recto em pilha. |
| `≤ 380`    | Mobile pequeno (iPhone SE)     | Body 16px. Type-scale floor mais baixa. `.case-title` 44px. Acta em 1-col. Plate stats em 1-col. |

Tipografia fluida via `clamp(min, vw, max)` em todos os títulos display.

---

## 8. Acessibilidade

- [x] **`prefers-reduced-motion`** — regra global em `tokens.css` corta transitions, animations e smooth-scroll; reveal vira instantâneo; lupa e cursor glyph somem.
- [x] **Foco visível** — `:focus-visible` global com `outline: 2px solid var(--oxblood); outline-offset: 3px`.
- [x] **Touch targets ≥44×44** — `.lang-toggle button`, `.fn`, `.to-catalogue`, `.folio-nav a`. Aplicado em ≤640.
- [x] **Hover desligado em touch** — `@media (hover: none)` esconde `.lens` e `.cursor-glyph`.
- [x] **Contraste AA** — `--ink` sobre `--paper` está alto; `--ink-faint` é usado apenas para captions/metadados (ok WCAG AA para texto pequeno secundário, não para corpo principal).
- [ ] **Hierarquia semântica** — auditar que cada `case-template.html` tenha exatamente um `<h1>`, e que `<h2>/<h3>` sigam ordem.
- [ ] **Alt text em plates** — quando entrar imagem real, garantir `alt` descritivo.

---

## 9. Como usar este DS

**Para humanos:**
- Abra esta página antes de editar CSS.
- Mudança de cor/tipo/escala? Edite `tokens.css` e atualize a tabela aqui.

**Para Claude Design / Figma:**
- Os tokens em `tokens.css` são CSS custom properties — espelham a estrutura de Figma Variables (collection → mode → token). Para sincronizar com Figma, converter este arquivo para Tokens Studio JSON (futuro).

**Para agentes (Cowork, Claude Code):**
- Antes de gerar UI, leia `tokens.css` + esta doc. Componentes existentes estão catalogados na seção 5. Não criar duplicatas — estender o existente.

---

## 10. Pendências conhecidas

- Conteúdo dos cases de projeto é placeholder (bilíngue PT/EN). Aguardando insumos reais do Lucas — substituir os textos entre `[colchetes]`.
- `case-template.html` já está em **JS puro** (sem JSX/Babel) e com **i18n funcional** (ver 5.2). O toggle PT/EN da **home** ainda é inerte — unificar a experiência é decisão pendente.
- Sincronização Figma (Tokens Studio JSON) dos tokens segue como trabalho futuro.
