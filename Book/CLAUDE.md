# Portfolio — Lucas Schoenherr

> Lugar de consulta rápida ao iniciar nova sessão. Manter curto e atualizado.

---

## Visão geral

Portfólio online do **Lucas Schoenherr** (Senior Product Designer, foco em GenAI e Design Systems) para apresentação a recrutadores.

**Tema:** "Catalogue raisonné" — livro antigo / publicação editorial, mesclado com refinamento moderno. Cada case é uma **plate** (gravura/prancha numerada em romanos). Vocabulário editorial em vez de jargão de portfólio:

> Frontispiece · Argument · Dramatis Personæ · Acta · Plates · Errata · Colophon · Verso/Recto

**Stack:** HTML + CSS + JS puro. **Sem build step. Sem JSX. Sem dependências de bundler.** React 18 via UMD do CDN quando necessário (só na home).

**Compatibilidade obrigatória:** Claude Design (Figma) + Cowork.

---

## Regras ativas (1–9)

Detalhes completos em `memory/project_portfolio_rules.md`.

1. **Público:** recrutadores avaliando o trabalho do Lucas.
2. **Compatibilidade:** Claude Design + Cowork.
3. **Design system obrigatório**, consultável por humano e por agente (em `design-system/`).
4. **Tema:** livro antigo + modernidade. Nunca "feio ou chato".
5. **UX/UI:** sempre seguir boas práticas.
6. **Não assumir conteúdo.** Perguntar antes de inventar cases, bio, métricas.
7. **Código limpo:** HTML, CSS e JS em arquivos separados. Boas práticas.
8. **Originalidade sempre.** Reinterpretar padrões comuns no léxico do livro — nunca "Hero/Problem/Solution/Result".
9. **Responsividade séria** — tablet e mobile com experiência tão boa quanto desktop. Breakpoints: 1280 / 1024 / 768 / 640 / 380. Touch targets ≥44px. `prefers-reduced-motion` respeitado. Marginalia continua presente em mobile (vira footnote inline, não some).

---

## Mapa de arquivos

```
Book/
├── CLAUDE.md                    ← este arquivo (consulta rápida)
├── DESIGN.md                    ← notas de design (princípios visuais)
├── PRODUCT.md                   ← notas de produto (visão / escopo)
├── index.html                   ← home (catalogue raisonné). Carrega catalogue.css/js + home.css/js + quadro-3d.js. Meta sociais (og:image/twitter)
├── catalogue.css                ← estilos da home (usa tokens)
├── catalogue.js                 ← React UMD, JS puro — monta a home em #root. Também guarda os mapas de CV (CV_WEB/CV_DOWNLOAD/CV_THUMBS)
├── home.css                     ← chrome extra da home (dedicatória, edição de bolso, Index Rerum)
├── home.js                      ← camada de melhorias da home (Three.js sob demanda, dedicatória ?to=, bolso, Index Rerum ⌘K). JS puro, fora da árvore React; reinjeta ícones via MutationObserver
├── quadro-3d.js                 ← telas 3D (Three.js r128) das pranchas; aceita tiltX/rollZ/scale/tint + w/h/d/maxPixelRatio (wide)
├── favicon.svg                  ← ícone editorial (fica na raiz, por convenção)
├── design-system.html           ← página viva do DS (specimen-page.css + design-system-page.js)
├── 404.html                     ← erro (Errata · CDIV), física Matter.js — torre de livros 3D
├── errata-scene.css             ← CSS do cuboide 3D da 404 (:root local "gilt" intencional)
├── errata-physics.js            ← motor físico da 404 (Matter.js + canvas próprio)
├── tweaks-panel.jsx             ← painel React (dev); ainda carregado pela 404 via Babel
├── CV/                          ← currículos em PDF por idioma × estilo (ver "Currículos (CV)" abaixo)
│   ├── PT/{Modern,Themed}/      ← Web.pdf (abre no clique) + Print.pdf (botão baixar) + Thumbail.{webp,jpg}
│   └── EN/{Modern,Themed}/      ← Web.pdf + Print.pdf (sem Thumbail próprio → reusa o PT)
├── images/                      ← assets raster por área, em WebP (alpha preservado)
│   ├── home/                    ← chrome da home: S, I, Me, cafe, Lupa2, stamp, lights, lights-repeat, paint-front/back/side(-wide), Plateia, recto-canvas
│   ├── 404/                     ← table.webp (cena da 404)
│   ├── genai/                   ← prancha Gen.AI: capa, plates/, wireframes/, subpastas por POC
│   ├── lighthouse/              ← prancha Lighthouse (case Plate III)
│   ├── tools/                   ← 20 ícones de ferramentas (ToolsIndex em catalogue.js: images/tools/<slug>.webp)
│   ├── other/                   ← misc usados pela home (catalogue.js): Arrow, ai, cracha, data, sirio, valenews
│   └── services/                ← RESERVADO (ai/ds/ui/ux) — sem uso hoje, p/ futura seção de especialidades
├── design-system/
│   ├── tokens.css               ← FONTE ÚNICA dos tokens (cor, type, espaço, easing)
│   ├── tokens.studio.json       ← export dos tokens p/ Tokens Studio (Figma)
│   ├── case-template.css        ← estilos da página de case (plate) + da VITRINE
│   ├── specimen-page.css        ← estilos da design-system.html
│   ├── design-system-page.js    ← JS da design-system.html
│   └── DESIGN-SYSTEM.md         ← documentação consultável do DS
└── projects/
    ├── case-template.html       ← página-base de case (bilíngue PT/EN). Meta sociais com [placeholders]
    ├── case-template.js         ← interações compartilhadas (template + vitrine)
    ├── case-chrome.js           ← chrome de case (paridade c/ a home): Index Rerum (luneta + ⌘K, índice auto-derivado das seções da página + entradas globais) e Edição de bolso (livreto). Carregado por genai.html e case-template.html. Estilos .ed-* em design-system/case-template.css
    ├── genai.html               ← case Gen.AI (Plate I). CSS inline próprio; componentes novos (poc-grid, insight-card, learning, principle, outcome, sl-plate-flip, galeria lbg__) — candidatos a portar p/ o template. Nome do running-head linka p/ a index; carrega case-chrome.js
    ├── lighthouse.html          ← case Lighthouse (Plate III · Vale Corredor Norte). Linka tokens + catalogue.css + case-template.css + case-template.js
    ├── vitrine.html             ← PÁGINA DE PROJETOS ativa: Vitrine de Componentes (Formato A/B + "Ver o código") + Parecer do Editor. Carrega projects.css/js + Swiper (CDN)
    ├── projects.css             ← CSS único da vitrine.html: união enxuta (PurgeCSS) de catalogue+case-template+vitrine + parecer escopado. Tokens seguem em tokens.css
    ├── projects.js              ← JS único da vitrine.html: case-template.js + vitrine.js + parecer-do-editor.js (3 IIFEs)
    └── tools/                    ← RESERVADO (duplicata parcial de images/tools) — sem uso hoje
```

**Assets:** imagens vivem em `images/<área>/` (`home/`, `404/`, `genai/`, `lighthouse/`, `tools/`, `other/`, `services/`) em **WebP** (alpha preservado), exceto o `favicon.svg` (raiz). Os currículos ficam em `CV/<LANG>/<Estilo>/` em **PDF**. Referências relativas: `images/home/arquivo.webp` na raiz, `../images/...` em `projects/`. **Atenção a maiúsculas e espaços** — GitHub Pages é case-sensitive (`Lupa2.webp` ≠ `lupa2.webp`) e os PDFs de CV têm espaços no nome (o browser codifica; manter o nome exato).

**Regra de ouro:** ao mudar cor, tipo ou escala, editar **`design-system/tokens.css`** e atualizar a tabela correspondente em `DESIGN-SYSTEM.md`. Nunca redeclarar `:root` em outro CSS.

---

## Currículos (CV)

Mapas em **`catalogue.js`** (constantes `CV_THUMBS`, `CV_WEB`, `CV_DOWNLOAD` + helper `cvAsset`), exibidos no Ex Libris da home. Eixos: **idioma** (PT/EN) × **estilo** (Modern/Themed) × **uso** (Web/Print).

- **Clique na imagem do CV** → abre a versão **Web** (`...- <Estilo> - <LANG> - Web.pdf`) em nova aba.
- **Botão "baixar o currículo"** → baixa a versão **Print** (`...- <Estilo>- <LANG> - Print.pdf`; repare: no Print não há espaço antes do traço do estilo).
- **Toggle PT/EN** troca todos os caminhos. `CV_EN_READY = true` (4 PDFs EN no ar); `CV_DOWNLOAD_READY = true` (Print no ar — o botão é `<a download>`, não mais placeholder).
- **Thumbnails:** só PT tem (`Thumbail.webp`/`.jpg`); EN reusa a face PT (o mapa `CV_THUMBS.en` aponta p/ `CV/PT/...`). Se gerar thumbnails EN, trocar as duas linhas `en:`.
- A borda branca que aparece ao abrir um PDF está **dentro do arquivo** (MediaBox > arte), não vem do site.

---

## Memória relevante

- `memory/MEMORY.md` — índice.
- `memory/project_portfolio_rules.md` — regras 1–9 detalhadas com Why/How to apply.
- `memory/project_lucas_bio_draft.md` — bio, métricas, jornada profissional do Lucas extraídos do código antigo. **Confirmar com ele antes de publicar.**

---

## Decisões já tomadas (não revisitar sem motivo)

- **Vitrines unificadas (2026-06-01):** havia duas vitrines de assets — `mockup-showcase.html` (componentes A/B com código) e `specimen.html` (Vitrina Arcana). Fundidas numa só, `projects/vitrine.html`, com base no mockup-showcase. As seções únicas do specimen (Materiais & Pigmentos, Marginalia, Cronologia, Fragmenta) foram absorvidas como XVII–XX, cada uma com gaveta de código. **`mockup-showcase.html`, `specimen.html`, `specimen.js` e `specimen.css` foram apagados.** Navegação nova: índice lateral fixo (`.index-rail`) com scroll-spy, em `vitrine.css`/`vitrine.js`. (Não absorvidos do specimen, por decisão de escopo/responsividade: Atelier de posição absoluta, Vitrinarium de ícones SVG, Tabula Rerum — substituída pelo índice lateral.)
- **Página de projetos consolidada (2026-06-11):** a Vitrine e o Parecer do Editor viraram um trio único — `projects/projects.html` + `projects.css` + `projects.js`. Apagados: `vitrine.html`, `vitrine.js`, `design-system/vitrine.css`, `parecer-do-editor.{html,css,js}`. O `projects.css` é a união **enxuta** (PurgeCSS) de `catalogue.css` + `case-template.css` + `vitrine.css` (só as regras usadas; ~282 KB → ~150 KB) + o CSS do parecer escopado sob `.memo` (reset universal removido, `body`→`.memo`, `code`→`.memo code`). **Tokens continuam em `tokens.css` (link, fonte única — nunca duplicar `:root`).** O `projects.js` concatena `case-template.js` + `vitrine.js` + `parecer-do-editor.js` (3 IIFEs independentes); `catalogue.js` foi dispensado (só montava a home React em `#root`, ausente aqui — removê-lo também eliminou um erro latente de console). Swiper segue via CDN. Validado em jsdom: 0 erros, índice lateral, lang-toggle, 19 specimens de código, carrossel e demos do parecer inicializam. Limpeza junto: apagados os legados `mockup-showcase.html`, `specimen.html`, `specimen.js`, `design-system/specimen.css` e o órfão `errata-scene.js`. Link de `case-template.html` reapontado p/ `projects.html`.
- **Correção — página de projetos voltou a `vitrine.html` (2026-06-22):** ao contrário do que dizia a decisão de 2026-06-11, a página de projetos ativa hoje é **`projects/vitrine.html`** (e não `projects.html`, que foi removido). Ela continua carregando `projects.css` + `projects.js` (o trio enxuto descrito acima segue válido — só o nome do HTML mudou). `case-template.html` aponta p/ `./case-template.html` no chrome.
- **Limpeza & organização (2026-06-22):**
  - **CVs ligados** aos PDFs reais em `CV/<LANG>/<Estilo>/` (ver seção "Currículos (CV)"). `CV_EN_READY` e `CV_DOWNLOAD_READY` viraram `true`.
  - **WebP:** `CV/PT/Modern/Thumbail.jpg` (671 KB → 122 KB) e `images/other/Arrow.png` (→ 1 KB, alpha preservado) convertidos; refs atualizadas em `catalogue.js`. **Zero rasters não-webp** no projeto agora.
  - **Apagados (órfãos, não carregados por nenhuma página):** `catalogue-v2.css` + `catalogue-v2.js` (camada "V2" nunca ligada ao index, com dados de CV obsoletos); `projects/Aparato e Cronologia - *.dc.html` (×2) + `projects/support.js` + `projects/.rows.png` (artefatos do editor "design canvas", exploração da seção Aparato — não shipados); `quadro-wide-test.html` (sandbox da variação wide, já portada).
  - **Mantidos como RESERVADOS** (escolha do Lucas): `images/services/` (ai/ds/ui/ux) e `projects/tools/` (duplicata parcial de `images/tools/`) — sem uso hoje.
- Tema "Noir Cinematográfico" foi **descartado** em 2026-05-13. Apagado da pasta.
- JSX foi **eliminado**. JS puro com `React.createElement` quando precisar de React.
- Estrutura de pastas: raiz simples + `design-system/` + `projects/`. Sem subpastas por feature.
- Taxonomia de case (2026-05-21): `Argument · Acta · Plates · Reception · Errata · Instrumentarium · Colophon`, com interlúdios não numerados Epígrafe e Intermezzo. **Dramatis Personæ foi removida** — o byline em linha única no frontispício já cobre cliente/papel/ano/escopo.
- Navegação entre cases: Verso/Recto + atalho discreto "Return to catalogue" no chrome.
- **Efeito de flip 3D na troca PT/EN foi removido** em 2026-05-18 — troca instantânea.
- **Wax seal "Finis" e filigrana sob luz de vela foram removidos** em 2026-05-18 — não passaram no teste estético.
- **Foldable plate (orelha dobrada em hover)** foi **substituído por flip 3D com botão temático** em 2026-05-18. O hover colidia com a lupa.
- **Case Lighthouse criado (2026-06-14):** `projects/lighthouse.html` montado a partir do `case-template.html` com conteúdo real (fonte: `../lighthouse-app.html`) e fatos canônicos da home (Plate III / № 003 / Vale Corredor Norte / MMXXIII / Lead PD Mobile). Linka `tokens.css` + `catalogue.css` + `case-template.css` + `case-template.js`. **Imagens em placeholder** (telas antigas eram do CV velho) — todos os mockups/galeria usam `.screenshot-placeholder`/`.carousel-plate-cut`; único `<img>` real é o aro da luneta `images/home/Lupa2.webp`. Componentes da vitrine reaproveitados: before/after (intranet→mobile), molduras desktop/mobile, luneta, carrossel pasta-de-colecionador, flip 3D recto/verso, count-up. Seção própria "Sistema de Prioridades" usa `.pigment-swatch` p/ o código de cores (verde/amarelo/azul/vermelho). 18 folios, 0 erros de console, i18n PT/EN e count-up validados no preview. Pendente: trocar placeholders pelas telas reais; criar Plate II (`pmo-dashboards.html`, já linkada no verso).
- **Marquee de cards portado do app antigo (2026-06-24):** trazido o "loop-slider" do `lighthouse-app.html` (raiz) — as fileiras infinitas de cards coloridos da seção Solução — reinterpretado no tema editorial como **"Mostruário em fluxo"** (`.lh-flow`), CSS puro, no fim da Seção VII (Sistema de Prioridades), logo após os 4 cards estáticos. Duas fileiras em direções opostas (`--lh-flow-dur`/`--lh-flow-dir`), cada uma com a sequência de pigmentos (`card-g/y/b/r.webp`) **duplicada** para o loop fechar sem emenda (anda `translateX(0→-50%)`; espaçamento por `margin-right`, não `gap`, que desalinharia o `-50%`). Bordas esmaecidas com `linear-gradient` em `var(--paper)` (adapta ao modo vela); pausa no hover; `prefers-reduced-motion` para a animação. Imagens decorativas (`alt=""` — as 4 variações já estão descritas nos cards acima). Gated por `.reveal` como o resto da página. Validação estrutural no preview: 24/24 imagens, card 166×104, meia-pista 1090px ≫ fileira → loop sem emenda. (Pintura/animação não verificáveis no preview headless porque o documento fica `visibilityState:hidden`, o que pausa animações CSS e o IntersectionObserver do reveal.)
- **Carrossel coverflow portado, substituindo a Epígrafe (2026-06-24):** o interlúdio de abertura "Um farol não move o navio…" (`.case-epigraph`) foi trocado pelo **carrossel coverflow** do `lighthouse-app.html` (o `.custom-swiper` com `effect:"coverflow"` do `carossel.js`). Implementado via **Swiper Element** (`<swiper-container>` / CDN `swiper@11/swiper-element-bundle.min.js`, `type=module`) em vez do Swiper clássico: mesma config exata (coverflow, `loop`, `centered-slides`, `slides-per-view:auto`, `depth:100`, `rotate:0`, `space-between:20`, keyboard), mas com os estilos internos **isolados em shadow DOM** — assim NÃO colide com o carrossel caseiro (`.book-swiper` + `initFiveSlotCinemaCarousel`) da Seção VI, que reusa as classes `.swiper`/`.swiper-slide`. Os web components não têm essas classes, então o CSS de classe do projeto não os atinge e vice-versa. Nav tematizada em oxblood via `--swiper-theme-color`. Verificado no preview: elemento registrado, swiper iniciado, transforms coverflow `matrix3d`. **Atenção:** agora há DOIS carrosséis das mesmas telas (coverflow na abertura + cinema na Seção VI) — possível redundância a revisar. Para servir o preview a partir da raiz do repo criei `.claude/launch.json` (mesmo `python -m http.server 5599`, com `--directory Book`).
- **Ajustes no coverflow após feedback do Lucas (2026-06-24):** três correções. (1) **Qualidade:** as telas `screens/screen-01..08.webp` eram thumbnails de 139×285 (borravam ao ampliar). Convertidos os 12 PNGs originais (`img/works/ProductionApp/1..12.png`, 414×896) em WebP de alta qualidade (`images/lighthouse/coverflow/01..12.webp`, q88, ~7–36KB) via PIL; o coverflow agora usa essas **12 telas** (conjunto fiel do app antigo). (2) **Paginação removida** (`pagination` fora) — os bullets caíam sobre o telefone central. Restam setas + legenda. (3) **Full-bleed** (`.coverflow-inner { width:100vw; margin-left:calc(50% - 50vw) }`) — antes os slides laterais eram cortados dentro da coluna; agora recuam para fora da viewport. Mockups têm cantos transparentes (`cornerAlpha:0` confirmado), então a sombra usa `filter: drop-shadow` (segue a silhueta do device) em vez de `box-shadow`. As thumbnails `screen-01..08.webp` seguem em uso pelo carrossel cinema da Seção VI.
- **Coverflow — sombra, loop e altura (2026-06-24, 2ª rodada):** (a) a sombra dos slides era cortada pelo `overflow:hidden` interno do Swiper → liberado via `.lh-coverflow::part(container),::part(wrapper) { overflow: visible }`, com a seção usando `overflow-x: clip` (contém o full-bleed sem barra de rolagem) + `overflow-y: visible` (combinação não-coercida, deixa a sombra escapar). (b) espaço vazio ao avançar para a direita → `loop-additional-slides="5"` (Swiper 11 não clona DOM no loop; reposiciona slides — o buffer preenche os dois lados). (c) ao carregar, a seção tinha 808px (> viewport) e padding de topo de 80px, criando faixa vazia e cortando o telefone central → padding reduzido para `var(--sp-5)` (seção) e `var(--sp-2)` (swiper); seção agora ~664px, cabe na viewport. Telefones mantidos grandes (slide 264px desktop / 208 mobile). Peek residual de ~64px sob a frontispício (736px de conteúdo) é intencional/suave.
- **Coverflow — lado direito vazio no load (2026-06-24, 3ª rodada):** ao carregar, o loop do Swiper deixava o lado direito vazio (slides empilhados só à esquerda). Causa: o loop reescrito do **Swiper 11** desbalanceia `centeredSlides` + `slides-per-view:auto` no init, ainda mais quando as imagens lazy não deram dimensão aos slides. Correções: (a) **Swiper fixado em v10** (`swiper@10/swiper-element-bundle.min.js`) — loop mais estável; (b) `aspect-ratio: 414/896` nos `swiper-slide` (dimensão definida no init, independente do load da imagem); (c) **conjunto de slides duplicado → 24 slides** (as 12 telas 2×, 2º conjunto com `alt=""`) para o loop ter material e preencher os dois lados em qualquer largura. Verificado em 1280 (L4/R3) e 1920 (L6/R5): ambos os lados preenchidos no load e ao navegar, sem scroll horizontal. `loop-additional-slides="5"` mantido.

---

## Features originais (2026-05-18)

- **Plate flip 3D** — cada `PlateCard` na seção Works tem um botão temático abaixo da lista de metadados (depois de "Dimensões") com glifo de pena + arco de retorno. Clicar gira a `.plate-image` em rotateY -180° e revela o verso, um placeholder de wireframe (papel pautado em grid + caixas-blocos abstratos + linhas-guia diagonais). Estado por-plate (cada cartão independente). Lupa fica desabilitada via `pointer-events: none` quando flipped. i18n PT/EN em `t.works.flip`.
- **Demo de caligrafia** — `projects/calligraphy-demo.html` standalone com 5 variações de velocidade/timing. Avaliar antes de aplicar no Frontispiece.

### Mudanças 2026-05-20
- **Running head clicável** — "Catálogo de Obras" no topo (`.running-head-link`) agora é âncora para `#works`, com sublinhado animado e foco visível. Some no mobile junto com o resto do running head.
- **`lang` do `<html>` sincronizado** com o toggle PT/EN (a11y).
- **Assets reorganizados** em `images/`; removidos `Lupa.png`, `Me.jpg` (sem uso) e `catalogue.css.new` (vazio). Corrigido bug de case `./lupa2.png` → `images/Lupa2.png`.
- **Drop-cap EN do Prefácio** — `index.html` agora usa `images/I.png` (capitular iluminada "I", par do `S.png`) em paridade com o PT. Removida a regra `::first-letter` provisória. Cópia EN ajustada de "I'm" → "I am".
- **CV no modo vela legível** — a folha Ex Libris é papel claro mesmo no escuro; reaplicada a paleta de tinta do modo dia localmente (`body.candle .ti-stage .cv-slip`) e o café foi para trás do texto com menos opacidade.
- **`café.png` → `cafe.png`** — renomeado (sem acento) e referências atualizadas na `catalogue.css`.

### Página de case — base forte (2026-05-20)
- **i18n PT/EN funcional** no `case-template` (dupla-marcação `.t[lang]` + `body[data-lang]` + `initI18n`; persiste em localStorage, sincroniza `<html lang>`, atualiza lupa). Ver DESIGN-SYSTEM §5.2.
- **Page-counter ligado ao scroll** (folio atual/total via `[data-folio]`, com split-flap).
- **Novas seções editoriais:** Epígrafe (interlúdio), Intermezzo (banda full-bleed escura com pull-quote), Reception (depoimento como recorte colado), Instrumentarium (ferramentas como instrumentos). Erratas renumerada V→VI.
- Tooltip da lupa ("Ver a prancha"/"See the plate") agora vive no i18n (`LENS_TAG`), sem hardcode.

### Efeitos 3D & motion (2026-05-20)
- Criado `projects/motion-3d-demo.html` (lab com 4 efeitos: capa 3D, tilt, page-turn, motion de scroll). Lucas escolheu **ii (tilt)** e **iv (motion)**.
- **Aplicados ao case-template:** tilt 3D nas `.case-plate` (≤9°, hover only, convive com a lupa), parallax no Intermezzo (`[data-speed]`), reveal encadeado (`[data-stagger]` em dramatis/acta/instruments/errata) e count-up nas métricas (`.stat-val[data-count]`). Tudo CSS 3D puro, reduced-motion e print tratados. Ver DESIGN-SYSTEM §5.3.
- Não aplicados (no demo, p/ decisão futura): capa 3D e page-turn.

### 1º case real — Lighthouse (2026-05-21)
- Criado `projects/lighthouse.html` (Vale · Corredor Norte) a partir do template, **bilíngue PT/EN**, com **texto fiel** ao material original do Lucas.
- Fonte do conteúdo/imagens: `C:\Users\lucas\Desktop\PortifólioV2` (`lighthouse-app.html` + `img/works/ProductionApp`). Imagens curadas copiadas para `images/lighthouse/` (overview1-5, components, workflow as-is/to-be, 4 cards de prioridade, porto, capa).
- Mapeamento: Desafio→Argument, papel/stakeholders→Dramatis, processo→Acta (com strip dos 4 cards), aprendizado-tese→Intermezzo, telas→Plates (com tilt+lupa), entrega/impacto→Reception (aprovação unânime, sem citação fabricada), aprendizados→Errata, Figma/DT/Ágil/Handoff→Instrumentarium. KPIs reais no count-up (+40, 8, ~200, 100%).
- Disclaimer de **dados fictícios/projeções** preservado no Colophon.
- CSS genérico para imagens reais em case adicionado ao `case-template.css` (`.case-plate.shot`, `.case-figs`, `.case-figure`, `.act-figs`).
- Pendente: ligar a prancha do Lighthouse na home (href do PlateCard) e criar o próximo case (Sports Experience — DirecTV).

### Revisão visual do Lighthouse (2026-05-21)
Avaliação no navegador (Playwright headless) revelou problemas que só aparecem com conteúdo real; corrigidos no **template** (beneficia cases futuros):
- **Pranchas landscape em `.third` ficavam minúsculas** → rebalanceadas para `half`/`full`. Regra no DS §5.4: landscape nunca em `third`.
- **Fluxogramas as-is/to-be ilegíveis em 2 colunas** → `.case-figs.stack` (1 coluna, largura cheia).
- **Intermezzo invertia no modo vela** (virava banda clara, label sumia) → identidade escura fixa com cores literais + borda interna no vela.
- **Prefixos +/~ das métricas** desalinhados → `.unit-pre { align-self: center }`.
- **Pranchas escuras somiam no fundo plum** → sombra em `body.candle .case-plate`.

### Revisão pesada do Lighthouse + template (2026-05-21, feedback do Lucas)
- **Título em uma linha** (`.case-title--single`) — "Lighthouse App" sem "Case Vale".
- **Byline em linha única** (`.case-byline--inline`) com separadores `·` — não mais centralizado em grid.
- **Dramatis Personæ removida** (case + template) e seções renumeradas (Acta II … Instrumentarium VI). O byline cobre o "elenco".
- **Estatísticas em uma faixa** (`auto-fit`, não 2x2) com número grande **dominante** (upright, clamp até 96px).
- **Lupa removida; nova galeria modal** (`.case-gallery`, JS `initGallery`): clicar numa prancha abre a imagem grande num passe-partout de papel, com setas/contador/teclado, no tema livro. Tilt 3D mantido.
- **Pranchas** ganharam keyline + sombra ("tipped-in plate"). Imagens reais com fundo escuro: o tema livro vem (a) do passe-partout creme da galeria e (b) — definitivo — de um template de moldura no Figma (a criar).
- ATENÇÃO ao sandbox: o mount do bash às vezes serve cópias **truncadas** dos .js/.css editados via ferramenta de arquivo; validar no arquivo host. O Playwright headless lê o mount, então features no fim dos arquivos podem falhar no teste mas funcionam no host. (Confirmado de novo em 2026-05-23: o mount levou ~1min para sincronizar após edições grandes; aguardar e revalidar `wc -l`.)

### Vitrine de Componentes (2026-05-23, feedback do Lucas)
- **`mockup-showcase.html` reformulada** de "laboratório de molduras" para **VITRINE DE COMPONENTES** completa: catálogo consultável das peças do DS, cada uma em Formato A/B + gaveta **"Ver o código"** com HTML copiável (botão Copiar). Seções I–XIII: Tese · Desktop · Mobile · Tablet · Passe-partout · Cinema/Vídeo · Comparação&Restauro · Carrossel · Drop-cap · Plate flip · Luneta · Roseta · Ex Libris (CV).
- **Sistema de specimen** (DS §6): `.specimen` + `.specimen-stage` + `<details class="specimen-code">` com `<pre><code>` (HTML escapado) e `.specimen-copy`. JS `initCodeSpecimens` copia `code.textContent` (entidades viram HTML real) com fallback execCommand e estado `.copied`.
- **Elementos da home portados** para a vitrine (escolha do Lucas): drop-cap (`.dropcap-demo`, reusa `.drop-cap`), plate-flip (reusa `.plate-3d-card`+`initPlateFlip`), roseta (`.rosette-demo`+`.cv-slip-rosette`), **luneta-demo** contida (`.loupe-demo-plate`, novo `initVitrineLoupe` — clona `.loupe-demo-art` ampliado, escopado ao quadro, não segue o cursor pela tela toda como a home) e **Ex Libris autossuficiente** (`.exlibris-card`, sem depender do `.ti-stage`).
- **Novo carrossel** "pasta de colecionador" (`.vitrine-carousel`+`initCarousel`): lâminas com cantoneiras de montagem, setas em pena (oxblood), **contador romano** (I/III via `ROMAN()`), marcadores e teclado ←/→, loop.
- **Slider before/after estático** (pedido do Lucas): `initComparisonSlider` agora fixa a largura do `.slider-before .slider-content` na largura total do slider (e em `resize`). O texto NÃO reflui mais à esquerda ao arrastar — fica centralizado e só é revelado pelo clip, como comparação de provas.
- **Cinema/Vídeo refinados:** Formato A ganhou **plateia em silhueta** (`.cinema-audience`, SVG cabeças+ombros) na base + gradiente de projeção. Formato B virou **rolo de celuloide real** (`.film-strip` grid 30/1fr/30 + `.film-perfs` com perfurações que correm + `.film-window` com `.film-sheen` de projeção) em vez do quadrado preto.
- Validado em Playwright headless (host sincronizado): 0 erros de console, carrossel I→II→loop III, flip, copiar (clipboard recebe o HTML real), i18n EN. Estilos em `case-template.css` (§ VITRINE), interações em `case-template.js`.

### Quadros 3D da home — lupa, variação e placard (2026-06-08, feedback do Lucas)
- **Lupa-pêndulo de volta sobre as telas 3D.** O componente `Lens` (catalogue.js) foi reescrito: em vez de clonar DOM (que não existe mais — as pranchas viraram canvas WebGL), ele amplia os **pixels do canvas WebGL** com `drawImage` (o renderer usa `preserveDrawingBuffer`). Mantém a moldura fotográfica `images/Lupa2.png` e o pêndulo CSS (`.loupe-glass`/`.loupe-frame` `rotate(35°→0°)` no `.show`). Agora se prende a `.plate-quadro-stage`, não a `.plate-image`.
- **Lupa lisa embutida desligada:** `PlateCard` chama `mountQuadro` com `loupe:false`. A `.quadro-loupe` (CSS) ficou órfã, mantida sem uso.
- **Desktop-only:** o `Lens` aborta o `useEffect` em `(hover:none),(max-width:1024px)` (além do `display:none` que o CSS já fazia) — zero listeners/canvas em mobile/touch.
- **Três telas diferenciadas:** `quadro-3d.js` aceita `tiltX`, `rollZ`, `scale`, `tint`; `QUADRO_VARIANTS` (catalogue.js) dá ângulo/escala/tom distintos a cada uma. tiltX/rollZ são no eixo X/Z (independem do giro Y, sobrevivem ao flip).
- **Placard de interação:** `.plate-quadro-hint` sob cada tela ("✦ lupa amplia · vire para o verso" / EN), some no hover, oculto em mobile. i18n em `works.quadroHint`. *(Lucas pode pedir p/ remover.)*
- **Coerência "tela de pintura":** microcópia ajustada — `works.intro` (telas montadas, examinar/virar), `cursorLabels.seePlate` → "abrir a ficha"/"open the entry"; comentários do código atualizados.

### Variação de prancha WIDE — tela deitada (2026-06-18, feedback do Lucas)
- **Nova variação por obra na home.** Cada prancha pode ser **retrato** (padrão) ou **wide** (landscape). Opt-in: `p.format = "wide"` no dado da obra (`CONTENT.pt/en.works.plates[i]`, em ambos os idiomas). Hoje a **Plate I (Gen.AI)** está marcada como wide (demonstração) — mover/copiar o flag para escolher outra.
- **`quadro-3d.js`:** agora aceita dimensões custom `w`/`h`/`d` (default = retrato 6.08×9.64×0.38) e `maxPixelRatio` (teto de supersample p/ poupar GPU com texturas grandes). Wide usa `18.15×8.67×0.38` (arte 1815×867×38).
- **Arte landscape:** `images/home/paint-{front,back,side}-wide.webp` (feitas pelo Lucas; PNGs convertidas p/ WebP, nomes normalizados lowercase). O default de `PlateCard` escolhe a arte wide quando `isWide`.
- **Layout wide (`PlateCard` branch + CSS `.plate--wide` em `catalogue.css`):** luminária **centrada** sobre a tela (`.plate-rail--wide`, sem grid 3-col); botão **circular de virar** no canto sup. direito (`.plate-turn` + legenda Verso/Anverso via `flip.turnVerso`/`turnRecto`); ficha editorial em **3 faixas** — cabeçalho (romano + título + byline · ação "ler a ficha completa" ancorada à direita), corpo (ficha técnica `.plate-meta` | descrição), e **métricas agrupadas** (flex) na coluna direita sob a descrição. Reusa `.plate-title/.plate-sub/.plate-desc/.plate-stats/.plate-link`. Lupa-pêndulo `Lens` se prende ao `.plate-quadro-stage` como nas retrato.
- **Protótipo:** o sandbox `quadro-wide-test.html` (raiz, noindex) onde a variação foi desenhada **foi removido em 2026-06-22** após a variação ser portada p/ a home.
- *Atenção:* validar mudanças em janela anônima/cache off — o navegador segura `catalogue.js`/`.css` em cache agressivo no dev (GitHub Pages serve fresco no deploy).

### Otimização de imagens + reorganização de assets (2026-06-08)
- **Todos os PNGs decorativos da raiz de `images/` viraram WebP** (transparência preservada — café, lupa, capitulares etc. mantêm alpha). `images/` caiu de ~21 MB → 5,5 MB.
- **Assets reorganizados em subpastas:** `images/home/` (chrome da home: S, I, Me, cafe, Lupa2, stamp, lights, lights-repeat, paint-front/back/side, Plateia, recto-canvas) e `images/404/` (table). `genai/` e `lighthouse/` inalterados. Referências atualizadas em `catalogue.css`, `catalogue.js`, `quadro-3d.js`, `errata-physics.js` e nas páginas de `projects/`.