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
My Portifolio/
├── CLAUDE.md                    ← este arquivo (consulta rápida)
├── index.html                   ← home (catalogue raisonné)
├── catalogue.css                ← estilos da home (usa tokens)
├── catalogue.js                 ← React UMD compilado, JS puro
├── favicon.svg                  ← ícone editorial (fica na raiz, por convenção)
├── 404.html                     ← página de erro (Errata · CDIV) com física Matter.js — torre de livros 3D interativa
├── errata-scene.css             ← CSS do cuboide de livros 3D (usado pela 404)
├── errata-scene.js              ← JS CSS-3D da 404 (não usado na v. física, mas mantido p/ referência)
├── errata-physics.js            ← motor físico da 404 (Matter.js + canvas próprio)
├── tweaks-panel.jsx             ← painel de ajustes React (dev only, não carregado na 404 de produção)
├── deploy-to-github.ps1         ← script de deploy p/ GitHub Pages
├── images/                      ← TODOS os assets raster (ver regra abaixo)
│   ├── S.png                    ← capitular iluminada "S" (drop-cap do Prefácio · PT → "Sou")
│   ├── I.png                    ← capitular iluminada "I" (drop-cap do Prefácio · EN → "I am")
│   ├── Me.png                   ← retrato do autor
│   ├── Lupa2.png                ← textura/arte da lupa
│   ├── stamp.png                ← ferramenta de carimbo (lacre na Correspondência)
│   └── cafe.png                 ← mancha de café (Method + folha do CV). Renomeado de café.png (sem acento, p/ deploy)
├── design-system/
│   ├── tokens.css               ← FONTE ÚNICA dos tokens (cor, type, espaço, easing)
│   ├── case-template.css        ← estilos da página de case (plate)
│   ├── vitrine.css              ← estilos da VITRINE: índice lateral fixo (scroll-spy) + seções absorvidas (Materiais, Marginalia, Cronologia, Fragmenta)
│   └── DESIGN-SYSTEM.md         ← documentação consultável do DS
└── projects/
    ├── case-template.html       ← página-base de case (template, bilíngue PT/EN). Seções: Frontispiece · Epígrafe · I Argument · II Dramatis · III Acta · Intermezzo · IV Plates · V Reception · VI Errata · VII Instrumentarium · Colophon · Folio nav
    ├── case-template.js         ← interações compartilhadas (template + vitrine): reveal+stagger, marginalia, footnotes, slider before/after, plate-flip, tilt 3D, progress, page-counter, count-up, i18n PT/EN + (vitrine) copiar-código, carrossel, luneta-demo
    ├── vitrine.html             ← VITRINE ÚNICA (fusão de mockup-showcase + specimen). Catálogo consultável das peças do DS em Formato A/B com gaveta "Ver o código" (I–XVI) + specimens absorvidos da antiga Vitrina Arcana: XVII Materiais & Pigmentos · XVIII Marginalia · XIX Cronologia · XX Fragmenta. Índice lateral fixo com scroll-spy. Reaproveita catalogue.css + case-template.css/.js + vitrine.css/.js
    └── vitrine.js               ← constrói o índice lateral (scroll-spy via IntersectionObserver), toggle mobile e flash das footnotes da Marginalia. Complementa catalogue.js + case-template.js
```

**Assets:** todo arquivo de imagem (`.png/.jpg/.svg` raster) vive em `images/`, exceto o `favicon.svg` (raiz, convenção web). Referências sempre relativas: `images/arquivo.png` no CSS/JS da raiz. **Atenção a maiúsculas** — GitHub Pages é case-sensitive (`Lupa2.png` ≠ `lupa2.png`).

**Regra de ouro:** ao mudar cor, tipo ou escala, editar **`design-system/tokens.css`** e atualizar a tabela correspondente em `DESIGN-SYSTEM.md`. Nunca redeclarar `:root` em outro CSS.

---

## Memória relevante

- `memory/MEMORY.md` — índice.
- `memory/project_portfolio_rules.md` — regras 1–9 detalhadas com Why/How to apply.
- `memory/project_lucas_bio_draft.md` — bio, métricas, jornada profissional do Lucas extraídos do código antigo. **Confirmar com ele antes de publicar.**

---

## Decisões já tomadas (não revisitar sem motivo)

- **Vitrines unificadas (2026-06-01):** havia duas vitrines de assets — `mockup-showcase.html` (componentes A/B com código) e `specimen.html` (Vitrina Arcana). Fundidas numa só, `projects/vitrine.html`, com base no mockup-showcase. As seções únicas do specimen (Materiais & Pigmentos, Marginalia, Cronologia, Fragmenta) foram absorvidas como XVII–XX, cada uma com gaveta de código. **`mockup-showcase.html`, `specimen.html`, `specimen.js` e `specimen.css` foram apagados.** Navegação nova: índice lateral fixo (`.index-rail`) com scroll-spy, em `vitrine.css`/`vitrine.js`. (Não absorvidos do specimen, por decisão de escopo/responsividade: Atelier de posição absoluta, Vitrinarium de ícones SVG, Tabula Rerum — substituída pelo índice lateral.)
- Tema "Noir Cinematográfico" foi **descartado** em 2026-05-13. Apagado da pasta.
- JSX foi **eliminado**. JS puro com `React.createElement` quando precisar de React.
- Estrutura de pastas: raiz simples + `design-system/` + `projects/`. Sem subpastas por feature.
- Taxonomia de case (2026-05-21): `Argument · Acta · Plates · Reception · Errata · Instrumentarium · Colophon`, com interlúdios não numerados Epígrafe e Intermezzo. **Dramatis Personæ foi removida** — o byline em linha única no frontispício já cobre cliente/papel/ano/escopo.
- Navegação entre cases: Verso/Recto + atalho discreto "Return to catalogue" no chrome.
- **Efeito de flip 3D na troca PT/EN foi removido** em 2026-05-18 — troca instantânea.
- **Wax seal "Finis" e filigrana sob luz de vela foram removidos** em 2026-05-18 — não passaram no teste estético.
- **Foldable plate (orelha dobrada em hover)** foi **substituído por flip 3D com botão temático** em 2026-05-18. O hover colidia com a lupa.

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

---

## Conteúdo pendente do Lucas

- Cases reais (Gen.AI, Lighthouse, PMO Dashboards ou outros) — problema, dramatis, atos, telas, métricas, erratas. Substituir os textos entre `[colchetes]` no template (já bilíngues).
- Confirmação da bio rascunho preservada em memória.
- i18n: **case-template já é funcional**; falta decidir se a **home** ganha toggle funcional também (hoje inerte) para unificar a experiência.
- Decidir qual variação da caligrafia traçada (i–v em `projects/calligraphy-demo.html`) aplicar no Frontispiece — ou descartar.
