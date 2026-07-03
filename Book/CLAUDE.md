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
├── home.css                     ← chrome extra da home (dedicatória, Index Rerum)
├── home.js                      ← camada de melhorias da home (Three.js sob demanda, dedicatória ?to=, Index Rerum ⌘K). JS puro, fora da árvore React; reinjeta ícones via MutationObserver
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
│   ├── home/                    ← chrome da home: S, I, Me, cafe, Lupa2, stamp, lights, lights-repeat, paint-front/back/side(-wide), Plateia
│   ├── 404/                     ← table.webp (cena da 404)
│   ├── genai/                   ← prancha Gen.AI: capa, plates/, wireframes/, subpastas por POC
│   ├── lighthouse/              ← prancha Lighthouse (Plate III): capa, porto, components, overview1-5, workflow-asis/tobe, card-{g,y,b,r} + cards/ (vitrine ao vivo), coverflow/01..12 (telas MVP — usadas pelo coverflow E pelo carrossel cinema), gallery/ (mvp-screens, mockup-trio — pranchas extras da Seção XII), ícones ic-{bars,line,image}+explore (webp)
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
    ├── case-chrome.js           ← chrome de case (paridade c/ a home): Index Rerum (luneta + ⌘K, índice auto-derivado das seções da página + entradas globais). Carregado por genai.html e case-template.html. Estilos .ed-* em design-system/case-template.css
    ├── genai.html               ← case Gen.AI (Plate I). CSS inline próprio; componentes novos (poc-grid, insight-card, learning, principle, outcome, sl-plate-flip, galeria lbg__) — candidatos a portar p/ o template. Nome do running-head linka p/ a index; carrega case-chrome.js. **Único case que ainda tem seção "Dramatis Personæ"** (os outros 3 a removeram — ver nota em "As 4 pranchas — estado atual")
    ├── lighthouse.html          ← case Lighthouse (Plate III · Vale Corredor Norte). Linka tokens + catalogue.css + case-template.css + case-template.js + case-chrome.js
    ├── pmo-dashboards.html      ← case PMO Estratégico · Samarco (Plate II). Dossiê "lombada" I–XIV (índice lateral + scroll-spy), inclui a **Mandala Estratégica navegável** (roda SVG + painel-tabela por eixo, i18n) como peça de impacto full-bleed. Briefing completo em `SAMARCO-PMO.md` — ler antes de mexer
    ├── sports-experience.html   ← case Sports Experience · DirecTV/FIFA (Plate IV). Estrutura enxuta (Overview→Desafio→Papel→Solução→Telas→Entrega→Galeria), sem Dramatis Personæ
    ├── samarco-lab.html         ← sandbox (noindex) onde os conceitos da Mandala/specimen do PMO foram prototipados antes de entrar na prancha; mantido como referência
    ├── lightbox.js              ← lightbox compartilhado (`.lightboxgallery-link` → overlay `.lbg-overlay` com zoom/fullscreen/share/close); usado por lighthouse.html e pmo-dashboards.html
    ├── SAMARCO-PMO.md           ← briefing autossuficiente do case PMO (fatos confirmados, tokens Figma, decisões, pendências) — atualizar sempre que a prancha mudar
    ├── vitrine.html             ← Vitrine de Componentes (Formato A/B + "Ver o código") + Parecer do Editor. Carrega projects.css/js + Swiper (CDN). **Não linkada no nav público** — referência interna do DS, não descoberta por recrutador
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
- **Case Lighthouse criado (2026-06-14):** `projects/lighthouse.html` montado a partir do `case-template.html` com conteúdo real (fonte: `../lighthouse-app.html`) e fatos canônicos da home (Plate III / № 003 / Vale Corredor Norte / MMXXIII / Lead PD Mobile). Linka `tokens.css` + `catalogue.css` + `case-template.css` + `case-template.js`. **Imagens em placeholder** (telas antigas eram do CV velho) — todos os mockups/galeria usam `.screenshot-placeholder`/`.carousel-plate-cut`; único `<img>` real é o aro da luneta `images/home/Lupa2.webp`. Componentes da vitrine reaproveitados: before/after (intranet→mobile), molduras desktop/mobile, luneta, carrossel pasta-de-colecionador, flip 3D recto/verso, count-up. Seção própria "Sistema de Prioridades" usa `.pigment-swatch` p/ o código de cores (verde/amarelo/azul/vermelho). 18 folios, 0 erros de console, i18n PT/EN e count-up validados no preview. **(Placeholders trocados pelas telas reais em 2026-06-26 — ver "Fechamento do Lighthouse" abaixo.)** ~~Pendente: criar Plate II (`pmo-dashboards.html`)~~ **Feito** — ver "Reformulação grande da Prancha II · Samarco" abaixo; hoje as 4 pranchas (Gen.AI, PMO/Samarco, Lighthouse, Sports) estão todas construídas e linkadas (ver "As 4 pranchas — estado atual", 2026-07-02).
- **Marquee de cards portado do app antigo (2026-06-24):** trazido o "loop-slider" do `lighthouse-app.html` (raiz) — as fileiras infinitas de cards coloridos da seção Solução — reinterpretado no tema editorial como **"Mostruário em fluxo"** (`.lh-flow`), CSS puro, no fim da Seção VII (Sistema de Prioridades), logo após os 4 cards estáticos. Duas fileiras em direções opostas (`--lh-flow-dur`/`--lh-flow-dir`), cada uma com a sequência de pigmentos (`card-g/y/b/r.webp`) **duplicada** para o loop fechar sem emenda (anda `translateX(0→-50%)`; espaçamento por `margin-right`, não `gap`, que desalinharia o `-50%`). Bordas esmaecidas com `linear-gradient` em `var(--paper)` (adapta ao modo vela); pausa no hover; `prefers-reduced-motion` para a animação. Imagens decorativas (`alt=""` — as 4 variações já estão descritas nos cards acima). Gated por `.reveal` como o resto da página. Validação estrutural no preview: 24/24 imagens, card 166×104, meia-pista 1090px ≫ fileira → loop sem emenda. (Pintura/animação não verificáveis no preview headless porque o documento fica `visibilityState:hidden`, o que pausa animações CSS e o IntersectionObserver do reveal.)
- **Carrossel coverflow portado, substituindo a Epígrafe (2026-06-24):** o interlúdio de abertura "Um farol não move o navio…" (`.case-epigraph`) foi trocado pelo **carrossel coverflow** do `lighthouse-app.html` (o `.custom-swiper` com `effect:"coverflow"` do `carossel.js`). Implementado via **Swiper Element** (`<swiper-container>` / CDN `swiper@11/swiper-element-bundle.min.js`, `type=module`) em vez do Swiper clássico: mesma config exata (coverflow, `loop`, `centered-slides`, `slides-per-view:auto`, `depth:100`, `rotate:0`, `space-between:20`, keyboard), mas com os estilos internos **isolados em shadow DOM** — assim NÃO colide com o carrossel caseiro (`.book-swiper` + `initFiveSlotCinemaCarousel`) da Seção VI, que reusa as classes `.swiper`/`.swiper-slide`. Os web components não têm essas classes, então o CSS de classe do projeto não os atinge e vice-versa. Nav tematizada em oxblood via `--swiper-theme-color`. Verificado no preview: elemento registrado, swiper iniciado, transforms coverflow `matrix3d`. **Atenção:** agora há DOIS carrosséis das mesmas telas (coverflow na abertura + cinema na Seção VI) — possível redundância a revisar. Para servir o preview a partir da raiz do repo criei `.claude/launch.json` (mesmo `python -m http.server 5599`, com `--directory Book`).
- **Ajustes no coverflow após feedback do Lucas (2026-06-24):** três correções. (1) **Qualidade:** as telas `screens/screen-01..08.webp` eram thumbnails de 139×285 (borravam ao ampliar). Convertidos os 12 PNGs originais (`img/works/ProductionApp/1..12.png`, 414×896) em WebP de alta qualidade (`images/lighthouse/coverflow/01..12.webp`, q88, ~7–36KB) via PIL; o coverflow agora usa essas **12 telas** (conjunto fiel do app antigo). (2) **Paginação removida** (`pagination` fora) — os bullets caíam sobre o telefone central. Restam setas + legenda. (3) **Full-bleed** (`.coverflow-inner { width:100vw; margin-left:calc(50% - 50vw) }`) — antes os slides laterais eram cortados dentro da coluna; agora recuam para fora da viewport. Mockups têm cantos transparentes (`cornerAlpha:0` confirmado), então a sombra usa `filter: drop-shadow` (segue a silhueta do device) em vez de `box-shadow`. ~~As thumbnails `screen-01..08.webp` seguem em uso pelo carrossel cinema da Seção VI.~~ **(Desatualizado: o carrossel cinema da Seção VI passou a usar as mesmas `coverflow/01..12.webp`; a pasta `images/lighthouse/screens/` ficou órfã e foi removida em 2026-06-26.)**
- **Coverflow — sombra, loop e altura (2026-06-24, 2ª rodada):** (a) a sombra dos slides era cortada pelo `overflow:hidden` interno do Swiper → liberado via `.lh-coverflow::part(container),::part(wrapper) { overflow: visible }`, com a seção usando `overflow-x: clip` (contém o full-bleed sem barra de rolagem) + `overflow-y: visible` (combinação não-coercida, deixa a sombra escapar). (b) espaço vazio ao avançar para a direita → `loop-additional-slides="5"` (Swiper 11 não clona DOM no loop; reposiciona slides — o buffer preenche os dois lados). (c) ao carregar, a seção tinha 808px (> viewport) e padding de topo de 80px, criando faixa vazia e cortando o telefone central → padding reduzido para `var(--sp-5)` (seção) e `var(--sp-2)` (swiper); seção agora ~664px, cabe na viewport. Telefones mantidos grandes (slide 264px desktop / 208 mobile). Peek residual de ~64px sob a frontispício (736px de conteúdo) é intencional/suave.
- **Coverflow — lado direito vazio no load (2026-06-24, 3ª rodada):** ao carregar, o loop do Swiper deixava o lado direito vazio (slides empilhados só à esquerda). Causa: o loop reescrito do **Swiper 11** desbalanceia `centeredSlides` + `slides-per-view:auto` no init, ainda mais quando as imagens lazy não deram dimensão aos slides. Correções: (a) **Swiper fixado em v10** (`swiper@10/swiper-element-bundle.min.js`) — loop mais estável; (b) `aspect-ratio: 414/896` nos `swiper-slide` (dimensão definida no init, independente do load da imagem); (c) **conjunto de slides duplicado → 24 slides** (as 12 telas 2×, 2º conjunto com `alt=""`) para o loop ter material e preencher os dois lados em qualquer largura. Verificado em 1280 (L4/R3) e 1920 (L6/R5): ambos os lados preenchidos no load e ao navegar, sem scroll horizontal. `loop-additional-slides="5"` mantido.
- **Fechamento do Lighthouse (2026-06-26):** o case foi dado por concluído. Quatro frentes:
  - **Seção XII · Galeria** nova (`.sl-gallery`, após o Instrumentarium) com duas pranchas extras que estavam fora do fluxo principal: `images/lighthouse/gallery/mvp-screens.webp` (corte do escopo do MVP — o que entra/fica de fora) e `mockup-trio.webp` (mockup de apresentação em três aparelhos). Bilíngue, `reveal`, abrem no lightbox.
  - **Lightbox repaginado (`lbg__`)** — os glifos de texto (‹ › ×), que ficavam tortos no círculo por causa das métricas de fonte, viraram **ícones SVG de traço** opticamente centrados. Nova **barra de ferramentas** (`.lbg__toolbar`) com **zoom 1:1 · tela cheia (Fullscreen API) · compartilhar (Web Share API + fallback "link copiado") · fechar**, recolorida ao tema livro; atalhos `f` (tela cheia), `espaço/enter` (zoom), `Esc` (sai da tela cheia ou fecha). Toast efêmero (`.lbg__toast`) para o link copiado. i18n PT/EN nos rótulos. Tudo no `<script>` inline do `lighthouse.html`.
  - **Limpeza de assets:** os 4 ícones PNG do card (`explore`, `ic-bars`, `ic-line`, `ic-image`) convertidos p/ **WebP lossless** (alpha preservado, ~2× menores) — refs atualizadas, invariante "zero raster não-webp" restaurada. Removida a pasta órfã `images/lighthouse/screens/` (8 thumbnails `screen-01..08.webp` + `_contact.png` — abandonadas quando o carrossel cinema migrou p/ `coverflow/`). Removido o rascunho de dev `projects/_lighthouse-redesign-notes.md`.
  - **Home:** o link do PlateCard III já estava cabeado (`projects/lighthouse.html`, PT+EN) — confirmado.
  - Validado no preview (`portfolio` em :5599): 0 erros de console, ícones/galeria carregam, lightbox abre com os 4 botões SVG + 2 setas, fecha via Esc restaurando o scroll. (Screenshot headless trava pelo peso da página — coverflow + carrossel + count-up; validação por DOM, como de praxe.)
- **Reformulação grande da Prancha II · Samarco (2026-06-30):** `pmo-dashboards.html` reestruturada para espelhar o layout do case de referência `designbylucas.com/V2/samarco-dashboard.html`, no tema livro, adotando o **menu lateral "dossiê" do Lighthouse** (`.lh-dossier` rail sticky + `.lh-dossier__spine` lombada + scroll-spy; CSS/JS portados inline). Seção I (Argumento + nova faixa Overview) fica fora do dossiê; II→XII entram na lombada. Sequência nova: III **Desafio antes/depois** (`showcases-comparison-grid`), IV **Mandala navegável** (portada do `samarco-lab.html` — substituiu o SVG estático de 6 nós; CSS órfão `.pmo-mandala*` removido), V **Sistema RAG** (4 estados, "sem dado" como estado de design), VI **Módulos do Painel** (Gantt de ações + matriz de risco 5×5 reconstruídos no tema + ESG 9 grupos/Programas/Grupos como blocos editoriais), VII Princípios (agora 4, alinhados à V2), VIII Atlas (galeria real mantida), IX **Espécime** (specimen interativo portado do lab — chips de família + token de marca ao vivo — + os 5 padrões de viz da V2), X Resultados (+ entregáveis/impacto). **Cor: híbrido** — Mandala/screenshots no tom real navy/lime (regra §3 do `projects/SAMARCO-PMO.md`); peças novas no tema livro com cores RAG preservadas. i18n: o painel da Mandala e os chips do specimen re-renderizam no toggle PT/EN. Validado por DOM (:5599): 0 erros, dossiê 11 links + scroll-spy, 6 nós da Mandala + painel por eixo, 12 specimens + filtro + token, 27 assets 200, modo vela. **(`SAMARCO-PMO.md` passou por um ciclo de reset-e-reconstrução seção-por-seção depois desta entrada — ver o próprio arquivo p/ a sequência final I–XIV; a Mandala navegável sobreviveu a todos os resets e está completa, ver nota abaixo.)**
- **As 4 pranchas — estado atual (2026-07-02):** levantamento completo do portfólio a pedido do Lucas. Achados:
  - **As 4 pranchas existem e estão linkadas** na home em PT+EN (`catalogue.js`): Gen.AI, PMO/Samarco, Lighthouse, Sports Experience. Todas carregam `case-chrome.js` (Index Rerum + edição de bolso).
  - **A Mandala Estratégica navegável do PMO já estava construída** (HTML + JS completos em `pmo-dashboards.html`, com i18n) — a nota de pendência em `SAMARCO-PMO.md` §9 ("falta recriar o SVG da roda") estava **desatualizada**; a implementação real supera a do `samarco-lab.html` (painel re-renderiza no toggle PT/EN). Removida a classe CSS morta `.pmo-impact__ph` que sobrava do tempo em que era placeholder.
  - **QA ao vivo (desktop 1280 + tablet 768 + mobile 375)** nas 4 pranchas + home via preview: 0 erros de console, 0 requests falhando, 0 imagens quebradas, sem overflow horizontal, touch targets ≥44px, marginalia visível em mobile. Testado e funcionando ao vivo: Mandala (clique troca setor+tabela), specimen (filtro + token de marca repinta a biblioteca), lightbox (`lightbox.js`, abre/zoom/fecha), coverflow (Swiper), toggle PT/EN (persiste via localStorage entre páginas), Index Rerum.
  - **Limitação do harness de preview confirmada:** `.reveal`/count-up (`IntersectionObserver` + rAF) não disparam neste preview headless mesmo com scroll forçado via JS, porque `document.visibilityState` fica `hidden` — já documentado em entradas anteriores (marquee do Lighthouse, fechamento do Lighthouse); validação dessas features segue sendo por estrutura DOM, não visual.
  - **Falso alarme corrigido:** achei inicialmente que `genai.html` teria uma seção "Dramatis Personæ" fora do padrão (a decisão de 2026-05-21 dizia tê-la removido do template/Lighthouse). Comparação linha a linha mostrou que **`lighthouse.html` também tem** — "II. Minha Participação" com gloss "Dramatis personæ", mesma estrutura de `bill-role` (4 itens, mesmos cues "No papel principal"/"Em cena com"/"Com a deixa"). Ou seja: a nota de 2026-05-21 está desatualizada (o padrão foi reinstaurado como gloss em algum momento posterior não documentado) — **não há inconsistência real aqui**; `genai.html` já segue o padrão vigente.
  - ~~Inconsistência: `genai.html` não tinha o índice lateral "dossiê"~~ **Corrigido — ver "Dossiê adicionado ao Gen.AI" abaixo.**
  - **`vitrine.html`** confirmado como não-linkado no nav público (só referenciado por si mesmo/documentação) — é uma peça de referência interna do DS, não descoberta por recrutador navegando o site.
- **Dossiê adicionado ao Gen.AI (2026-07-02):** `genai.html` ganhou o mesmo índice lateral sticky + scroll-spy que Lighthouse/PMO/Sports já tinham (`.ga-dossier` — CSS/JS portados quase verbatim do `.sx-dossier` do Sports, prefixo próprio). Escopo: **Seções II→VIII** entram na lombada (7 links auto-derivados de `.section-head`); **Seção I fica de fora**, mesmo padrão do Lighthouse, porque é a única com marginalia (`.margin-l`/`.margin-r`) de conteúdo real (glosses i/ii ligadas a notas de rodapé) — nas Seções II→VIII o gloss lateral é sempre vazio/decorativo em todo o case, então `.ga-dossier__spine .margin-l, .margin-r { display:none }` não perde conteúdo (mesma verificação feita no Lighthouse antes de portar a regra). Validado no preview: 0 erros, 7 links corretos, clique rola e ativa o link certo, scroll-spy atualiza sozinho, mobile (375px) sem overflow com rail colapsando para bloco estático. **(Este trabalho corrigiu a suposição errada, registrada acima, de que a "inconsistência" do Gen.AI era a Dramatis Personæ — na verdade era a ausência do dossiê.)**
  - **Bug pós-implantação — rail não grudava (2026-07-02):** o Lucas reportou que o menu lateral não ficava fixo ao rolar. Causa: `catalogue.css` define `html, body { overflow-x: hidden }`; `hidden` num só eixo força o navegador a computar o outro eixo (`overflow-y`) como `auto` — isso transforma `body` num scroll container próprio, e como o scroll real da página acontece no `html`/viewport (não no `body`), o `position: sticky` do rail passa a calcular sua "trava" relativa a um container que nunca rola, então nunca gruda. `design-system/case-template.css` já corrige isso pra `html` (`html { overflow-x: clip }` — comentário no arquivo explica que `clip` não cria scroll container, ao contrário de `hidden`), e Lighthouse/PMO/Sports **já tinham a mesma correção repetida para `body`** (`body { overflow-x: clip; }`, logo no topo do bloco de CSS do dossiê em cada página) — só esqueci de portar essa linha para o Gen.AI. Adicionada; sticky confirmado ao vivo (rail gruda em `top:88px` a partir de scrollY≈3000 e permanece). **Nota para o futuro:** qualquer novo case com dossiê sticky precisa dessa linha `body { overflow-x: clip; }` — considerar mover para `case-template.css` como regra global, já que hoje está duplicada em 4 arquivos por decisão histórica de manter CSS de dossiê inline por página.
  - **Colofão padronizado (2026-07-02):** `genai.html` era o único case sem o "colofão enriquecido" (pressmark do compositor `.colo-press` com monograma "LS" em círculo duplo + regra floral `.colo-rule` "❦" + linha `.colo-finis` "Finis · fim da prancha") que Lighthouse/PMO/Sports já tinham. Portado o HTML + CSS verbatim de `lighthouse.html`. Validado no preview: 0 erros, screenshot confirma paridade visual.
  - ~~Achado não corrigido: a cadeia Verso/Recto entre pranchas está incompleta~~ **Corrigido — ver "Auditoria geral" abaixo.**

---

## Auditoria geral do portfólio (2026-07-02)

A pedido do Lucas, revisão completa de organização/otimização em todo o site (não só os cases). Achados e correções:

- **Cadeia Verso/Recto corrigida.** Antes, só o trecho PMO→Lighthouse estava certo; os demais versos/rectos apontavam pro catálogo em vez do vizinho real. Agora: catálogo ↔ **I Gen.AI** ↔ **II PMO** ↔ **III Lighthouse** ↔ **IV Sports** ↔ catálogo, nos dois sentidos, com título/rótulo corretos em cada ponta (`genai.html`, `pmo-dashboards.html`, `lighthouse.html` editados; `sports-experience.html` já estava certo).
- **Link morto em `case-template.html`:** apontava para `projects.html` (página apagada em 2026-06-22) em vez de `vitrine.html`. Corrigido (2 ocorrências, PT/EN).
- **`case-template.html` sem `noindex`:** é um scaffold com case fictício ("Aura App", metas sociais com `[placeholders]` literais) — se indexado, apareceria no Google com título quebrado. Adicionado `<meta name="robots" content="noindex, nofollow">`. Também troquei os 4 rótulos hardcoded "Prancha/Plate **IV**" → **V**, já que IV foi ocupado pelo Sports Experience nesse meio tempo (o template agora aponta pro próximo número livre).
- **`design-system.html` sem tags sociais:** único documento público sem `og:*`/`twitter:*`/`canonical` (os 4 cases e a home já tinham completo). Adicionado o conjunto completo (usa `images/home/Me.webp` como imagem, já que não há capa dedicada da página de DS). `<html lang="en">` **não é bug** — a página inteira é escrita em inglês de propósito (documentação técnica p/ humano e agente), diferente do pt-BR do resto do site.
- **Canonical ausente em todas as páginas exceto a home.** Adicionado `<link rel="canonical">` nos 4 cases + design-system.html (404.html não recebeu — já tem `noindex`, que é o sinal suficiente ali).
- **`robots.txt` e `sitemap.xml` criados na raiz** (não existiam). Sitemap lista home + 4 cases + design-system; robots.txt libera tudo exceto `case-template.html` e `samarco-lab.html` (ambos já `noindex` via meta, reforço redundante mas inofensivo) e aponta pro sitemap.
- **10 imagens órfãs encontradas e apagadas** (3,9 MB, nenhuma referenciada por nenhum HTML/CSS/JS — checado por caminho completo, não só nome do arquivo, pra evitar falso positivo entre pastas). A exclusão em massa foi bloqueada pelo classificador de auto-mode na 1ª tentativa (ação irreversível não nomeada explicitamente) — mostrei as 10 imagens ao Lucas (Read direto, sem upload externo) antes de apagar; ele confirmou todas após ver o conteúdo real:
  - `images/home/cv-Modern.webp`, `cv-Themed.webp` — CVs antigos com PII real (email/LinkedIn), **superados** pelas thumbnails em uso (`CV/PT/{Modern,Themed}/Thumbail.webp` — pastas diferentes, confirmado antes de apagar).
  - `images/home/gen.ai-front.png` — mockup "Campaign Genius" com texto "Lorem ipsum" visível na própria imagem (inacabado); era a única raster **não-webp** do projeto — o invariante "zero raster fora de WebP" está restaurado.
  - `images/home/recto-canvas.webp` — textura de papel em branco, sobra de um efeito de virar página já substituído. **(A menção a ele no mapa de arquivos abaixo foi removida.)**
  - `images/samarco/capa-indicators.webp`, `images/samarco/forms/mapa-piis.webp`, `piis-avanco.webp` — conteúdo real e acabado (colagem de Power BI, mapa e gráfico PIIS) mas nunca wireado na prancha final; Lucas optou por não manter peso morto. Documentado em `SAMARCO-PMO.md` §6.
  - `images/sports/hero-1.webp`, `hub-collage.webp`, `static.webp` — `hero-1`/`hub-collage` pareciam rascunhos/duplicatas de telas já usadas; `static.webp` (stats Messi/Barcelona) não batia com a marca DirecTV do case — provável material de referência de outro projeto.
  - `images/services/*` (RESERVADO, decisão anterior) e `projects/tools/` (RESERVADO) foram propositalmente **preservados**, não entraram nessa exclusão.
- **Falsos positivos descartados** durante a auditoria (documentados pra não re-investigar à toa): os 20 ícones de `images/tools/` pareciam órfãos porque `catalogue.js` monta o caminho dinamicamente (`"images/tools/" + slug + ".webp"`) — todos os 20 slugs em `TOOL_ICONS` batem 1:1 com os arquivos, nenhum órfão real. `images/lighthouse/paint-front.webp`/`paint-back.webp` pareciam desalinhados do mapa de arquivos (que só cita `images/home/paint-*`) mas são um asset **separado e usado** (textura própria da tela 3D do Lighthouse na home, distinta da de `images/home/`). Os `sua-tela.png`/`seu-cv.pdf`/etc. em `vitrine.html` são exemplos de código dentro de `<pre><code>` (HTML escapado) mostrados como template copiável — não são links reais.
- **Validação:** todas as páginas + `robots.txt`/`sitemap.xml` respondem 200; 0 erros de console em todas; 0 imagens quebradas.

## Edição de bolso — removida (2026-07-02)

**A feature "Edição de bolso" (ícone de livreto no chrome, abria um resumo do currículo numa lauda) foi completamente removida** — decisão do Lucas, não agregava o suficiente. Removido de:
- `home.js`/`home.css` (home): dados `POCKET`, `buildPocket`/`openPocket`/`closePocket`, o ícone `.ed-icon--pocket` (`POCKETBOOK_SVG`) e sua entrada no Index Rerum, CSS `.ed-pocket*`/`.ed-pw-*` e a regra de impressão `body.ed-pocket-open`.
- `projects/case-chrome.js` (as 4 pranchas): mesma remoção (`POCKET`, `buildPocket`/`openPocket`/`closePocket`, ícone, entrada no Index Rerum).
- `design-system/case-template.css`: CSS `.ed-pocket*`/`.ed-pw-*` correspondente.
- Comentários de carregamento do chrome nas 5 páginas de case + `index.html` atualizados (não citam mais "edição de bolso").
- `projects/vitrine.html` (Parecer do Editor): Addendum IV reescrito para registrar a remoção (numeração mantida — Addendum V em diante não foi renumerado, pra não quebrar as referências cruzadas do texto); a recomendação de prioridade na seção "Ordem sugerida" também ajustada.
- **O Index Rerum (⌘K · luneta) continua intacto** — era um atalho remissivo independente, não fazia parte da edição de bolso.

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
- ~~Pendente: ligar a prancha do Lighthouse na home (href do PlateCard)~~ **Feito** — o PlateCard III aponta para `projects/lighthouse.html` em PT (`catalogue.js:231`) e EN (`catalogue.js:735`). ~~Próximo case: Sports Experience — DirecTV.~~ **Feito** — `projects/sports-experience.html` existe e está linkado (ver "As 4 pranchas — estado atual", 2026-07-02).

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