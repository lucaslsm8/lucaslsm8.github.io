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
| Half-title / Epigraph | `.half-title`          | Página de epígrafe                                          |
| Table of Contents     | `.toc` + `.toc-row`    | Sumário com leader dots                                     |
| Preface (drop cap)    | `.preface .body`       | Texto longo com drop cap automática no primeiro parágrafo   |
| Footnotes             | `.footnotes`           | Notas de rodapé numeradas (sincronizadas com `.fn` no corpo)|
| Plate                 | `.plate` + `.plate-grid`| Card de trabalho/case (meta + imagem + descrição + stats)  |
| Method / Tenets       | `.method` + `.tenets`  | Manifesto + 4 princípios                                    |
| Process diagram       | `.process-diagram`     | "Plate IV. Fig. 1 — Method" — engraving-style               |
| Apparatus             | `.apparatus`           | Tools / Languages / Curriculum                              |
| Correspondence card   | `.corr-card`           | Cartão de contato estilo carta                              |
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
| Section head editorial   | `.case-section .section-head` | Cabeçalho com Roman, nome italic e gloss em mono     |
| Argument                 | `.case-section.argument` | Sinopse + drop cap do problema                             |
| Dramatis Personæ         | `.dramatis` (`dl`)     | Cast: cliente, papel, time, período — em `dt/dd`             |
| Acta                     | `.acta > .act`         | Lista de "atos" do processo: número romano + nome + corpo    |
| Plates                   | `.case-plates`         | Grid 12-col de telas (`.full / .wide / .half / .third`) com lupa |
| Plate caption            | `.plate-caption`       | Legenda italic com número sobrescrito em oxblood             |
| Marginalia statistica    | `.marginalia-stat`     | Métricas como nota de margem — alternativa aos KPI cards     |
| Errata                   | `.errata-list > .errata-item` | Lições aprendidas em formato de fé de erratas         |
| Case colophon            | `.case-colophon`       | Créditos do case, ferramentas, agradecimentos                |
| Folio nav (Verso/Recto)  | `.folio-nav`           | Navegação fim-de-página: Verso (anterior) e Recto (próximo)  |
| To catalogue (chrome)    | `.chrome-top .to-catalogue` | Atalho discreto italic de volta ao catálogo             |

> **Para adicionar um componente novo:** documente o nome, o seletor principal, sua função, estados (hover/active/focus/disabled), e variações em uma nova linha da tabela apropriada.

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

- Conflito de temas: `styles.css` + `project-styles.css` + páginas em `/projects/*.html` ainda usam um tema "Noir" (escuro, Inter). Decisão pendente: migrar para livro antigo ou justificar duas estéticas.
- Conteúdo dos cases de projeto é placeholder. Aguardando insumos do Lucas.
- Páginas de projeto ainda usam JSX via Babel inline; migração para `.js` puro deve seguir após a redefinição do tema.
