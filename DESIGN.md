---
name: "Lucas Schoenherr — Portfólio"
description: "Catalogue raisonné online de Lucas Schoenherr, Senior Product Designer"
colors:
  folha-de-guarda:       "#f1ece0"
  folha-de-guarda-sombra: "#e8e1cd"
  folha-de-guarda-profunda: "#ddd4bd"
  folha-de-guarda-clara: "#f7f2e3"
  breu-de-copia:         "#1a1612"
  breu-de-copia-suave:   "#4a4136"
  breu-de-copia-apagado: "#8b7f6e"
  breu-de-copia-fantasma: "#c4b8a0"
  encadernacao-em-couro: "#7a2620"
  encadernacao-em-couro-profunda: "#5a1814"
  tinta-de-nanquim:      "#1d3a78"
  vinheta-dourada:       "#f5e3a8"
  ameixa-noturna:        "#1c1418"
  camara-escura:         "#241a1f"
typography:
  display:
    fontFamily: "'EB Garamond', Georgia, serif"
    fontSize: "clamp(72px, 10vw, 96px)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "'EB Garamond', Georgia, serif"
    fontSize: "clamp(36px, 5vw, 56px)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "'Instrument Serif', Georgia, serif"
    fontSize: "clamp(22px, 3vw, 36px)"
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "'EB Garamond', Georgia, serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'JetBrains Mono', 'Courier New', monospace"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "0.08em"
  meta:
    fontFamily: "'JetBrains Mono', 'Courier New', monospace"
    fontSize: "13px"
    fontWeight: 400
    letterSpacing: "0.04em"
  handwritten:
    fontFamily: "'Caveat', cursive"
    fontSize: "16px"
    fontWeight: 400
rounded:
  none: "0"
  sm:   "2px"
  md:   "4px"
  pill: "999px"
spacing:
  1:  "4px"
  2:  "8px"
  3:  "12px"
  4:  "16px"
  5:  "24px"
  6:  "32px"
  7:  "48px"
  8:  "64px"
  9:  "80px"
  10: "96px"
components:
  running-head-link:
    textColor: "{colors.breu-de-copia}"
    backgroundColor: "transparent"
  running-head-link-hover:
    textColor: "{colors.breu-de-copia}"
  plate-card:
    backgroundColor: "{colors.folha-de-guarda}"
    rounded: "{rounded.none}"
    padding: "0"
  plate-card-hover:
    backgroundColor: "{colors.folha-de-guarda-sombra}"
  tool-index-row-hover:
    backgroundColor: "{colors.vinheta-dourada}"
    padding: "8px 18px"
  lang-toggle:
    textColor: "{colors.breu-de-copia-apagado}"
    rounded: "{rounded.none}"
    padding: "4px 8px"
  lang-toggle-active:
    textColor: "{colors.breu-de-copia}"
---

# Design System: Biblioteca do Colecionador

## 1. Overview

**Creative North Star: "A Biblioteca do Colecionador"**

Este sistema é uma coleção curada, não uma loja. Cada peça foi escolhida com intenção e ocupa o seu lugar no acervo com a dignidade de um objeto que sobreviveu ao tempo. O portfólio não tenta vender — apresenta. A diferença é de postura: o colecionador não grita o preço da peça; ergue a luz sobre ela e espera que o visitante seja capaz de ver.

O vocabulário é editorial clássico: frontispício, argumento, acta, prancha, colofão. O papel tem textura. A tinta tem peso. As transições têm a lentidão adequada de quem virar páginas com cuidado. Tudo comunica que o artefato foi feito por alguém que domina o ofício — e que isso importa.

Este sistema rejeita explicitamente: portfólio SaaS/Dribbble genérico (cards com gradiente, hero com métrica grande, eyebrows em caps em toda seção), Behance corporativo (grid uniforme, processo documentado sem voz autoral), tema Noir Cinematográfico (descartado em 2026-05-13), e minimalismo vazio ("clean" como desculpa para ausência de opinião).

**Key Characteristics:**
- Papel com textura, tinta com peso — materiais físicos como metáfora do digital
- Tipografia hierárquica em quatro famílias com papéis distintos e sem sobreposição
- Paleta de dois modos: luz do dia (vellum creme) e modo vela (plum noturno)
- Interações contidas: confirmam sem anunciar; o hover é uma luva, não um alarme
- Baixo relevo editorial — sombras como luz lateral em mesa de colecionador, nunca como efeito

## 2. Colors: A Paleta da Folha de Guarda

A paleta é derivada de materiais físicos do livro encadernado: o papel, a tinta, o couro da capa, a vinheta dourada do frontispício.

### Primary

- **Encadernação em Couro** (`#7a2620`): O acento primário. Oxblood profundo — cor de couro antigo, não vermelho vivo. Usado em títulos de destaque, ícones de acção editorial (marcadores, selos), hovers de links de navegação, e no logo da lupa. Aparece com parcimônia: quando surge, sinaliza importância.
- **Encadernação em Couro — Profunda** (`#5a1814`): Variante de estado activo/pressionado do primário. Nunca usado como cor de superfície; só como reforço de interacção.

### Secondary

- **Tinta de Nanquim** (`#1d3a78`): Azul-cobalto profundo, cor da tinta de nanquim e da gravura a buril. Reservado para hyperlinks, cobalt-highlights, e acento secundário em contextos editoriais específicos. Nunca usado como cor de superfície.
- **Vinheta Dourada** (`#f5e3a8`): Amarelo-palha, a cor de vinheta impressa a ouro vegetal. Usado exclusivamente como fundo de hover em listas do índice de ferramentas — o equivalente de marcar uma linha com o dedo.

### Neutral

- **Folha de Guarda** (`#f1ece0`): O fundo base da página — papel de algodão envelhecido. Quente mas não bege-AI; a saturação é intencional e derivada da hue do couro, não do default de treinamento.
- **Folha de Guarda — Sombra** (`#e8e1cd`): Superfícies levemente elevadas (cards, painéis). O equivalente de um papel de segunda camada sobre a mesa.
- **Folha de Guarda — Profunda** (`#ddd4bd`): Bordas sutis, divisores, fundo de elementos de formulário. A "borda do livro" quando fechado.
- **Folha de Guarda — Clara** (`#f7f2e3`): Superfícies mais claras que o fundo base — usado em cards que precisam flutuar sobre o papel base.
- **Breu de Cópia** (`#1a1612`): O preto da tinta de impressão — não neutro, levemente tostado para harmonizar com o papel. Texto de corpo, headings, UI de alta importância.
- **Breu de Cópia — Suave** (`#4a4136`): Texto secundário — metadados, captions, bylines.
- **Breu de Cópia — Apagado** (`#8b7f6e`): Texto terciário — gloss, legendas, elementos de chrome em repouso.
- **Breu de Cópia — Fantasma** (`#c4b8a0`): Divisores, bordas de hairline, placeholders. A linha tênue que separa sem dividir.

### Modo Vela (Candlelight Mode)

Activado por `body.candle`. Todos os tokens são sobrescritos — a paleta troca para edição "Plum":

- **Ameixa Noturna** (`#1c1418`): Fundo principal em carvão com sub-hue de ameixa envelhecida.
- **Câmara Escura** (`#241a1f`): Cards e superfícies elevadas no modo escuro.
- Acento primário no modo vela: `#c46a78` (rosa-tinto, não oxblood — o couro à luz de vela).
- Acento secundário no modo vela: `#a08fc6` (lavanda, não nanquim — o azul suavizado pela chama).

### Named Rules

**A Regra da Economia do Couro.** A Encadernação em Couro (oxblood) cobre ≤15% de qualquer tela. A raridade é o ponto. Quando o vermelho profundo surge, o leitor sabe que algo importa. Diluído em todo o layout, perde o poder de marcar.

**A Regra da Hue Intencional.** O fundo creme não é "warm by default" — é derivado da hue do couro (`#7a2620`) com chroma atenuado. Se um futuro agente trocar o fundo por `#fafafa` ou qualquer neutro frio, quebra a coerência do sistema.

## 3. Typography: Quatro Famílias, Quatro Papéis

**Display / Body Font:** EB Garamond (com Georgia, serif como fallback)
**Title / Accent Font:** Instrument Serif (com Georgia, serif como fallback)
**Code / Label Font:** JetBrains Mono (com Courier New, monospace como fallback)
**Handwritten / Marginalia Font:** Caveat (cursive como fallback)

**Character:** EB Garamond carrega o texto como tinta no papel — humanista, levemente irregular, com serifas como terminações de pena. Instrument Serif serve como alternativa expressiva nos títulos de seção, com personalidade mais contemporânea. JetBrains Mono aparece nos metadados e labels como o carimbo do arquivista — preciso, datado. Caveat surge só nas marginalia e anotações manuscritas — a voz pessoal do autor nos rodapés.

### Hierarchy

- **Display** (EB Garamond, 400, `clamp(72px, 10vw, 96px)`, line-height 0.92, letter-spacing −0.025em): Nome do autor no frontispício e títulos de case. Nunca acima de 96px — o volume não grita.
- **Headline** (EB Garamond, 400, `clamp(36px, 5vw, 56px)`, line-height 1.1): Títulos de seção principais (Argument, Acta, Plates, Reception).
- **Title** (Instrument Serif, 400, `clamp(22px, 3vw, 36px)`, line-height 1.25): Subtítulos, nomes de casos no catálogo, pull-quotes.
- **Body** (EB Garamond, 400, 19px, line-height 1.65): Todo o texto de corpo. Máximo de 70ch de largura de linha. `text-wrap: pretty` nos parágrafos longos para evitar orphans.
- **Lead** (EB Garamond, 400, 22px, line-height 1.55): Parágrafos de abertura de seção — o primeiro parágrafo depois do título principal.
- **Label** (JetBrains Mono, 400, 11px, letter-spacing 0.08em): Chrome fixo (page counter, running head), metadados de prancha, carimbo de data.
- **Meta** (JetBrains Mono, 400, 13px, letter-spacing 0.04em): Gloss, atribuições, índice de ferramentas.
- **Handwritten** (Caveat, 400, 16px): Marginalia inline, anotações do editor. Nunca em corpo principal.

### Named Rules

**A Regra das Quatro Cadeiras.** Cada família tipográfica ocupa uma cadeira na mesa: EB Garamond fala, Instrument Serif apresenta, JetBrains Mono anota, Caveat sussurra. Nenhuma família senta na cadeira da outra. Usar Caveat para um título de seção ou JetBrains Mono para corpo de texto é uma infração de protocolo.

**A Regra do Tecto de 96px.** Nenhum tipo display ultrapassa 96px (`6rem`). Acima disso o volume está gritando, não desenhando. O clamp cap é `96px` — não `120px`, não `200px`.

## 4. Elevation: Baixo Relevo Editorial

Este sistema usa sombras como luz lateral sobre mesa de colecionador — difusas, calibradas, nunca decorativas. A analogia física é: objetos que repousam sobre papel iluminado por uma janela à esquerda. A sombra confirma a presença material do objeto, não o exibe.

Por padrão, superfícies são planas. Sombra aparece em dois contextos:

### Shadow Vocabulary

- **ambient-soft** (`0 4px 12px rgba(26, 22, 18, 0.08)`): Hover de PlateCards e elementos de CV. A sombra mínima que confirma "este objeto pode ser tocado". Aparece só em estado hover, nunca em repouso.
- **lens-lift** (`0 0 0 1px var(--hairline), 0 16px 40px rgba(26, 22, 18, 0.2)`): A lupa (Lens component) e o modal de galeria. Objetos que efetivamente flutuam sobre o restante do conteúdo.

No modo vela, as sombras são recalculadas com a opacidade do ink claro sobre o fundo escuro — o efeito físico é preservado, os valores absolutos mudam.

### Named Rules

**A Regra do Repouso Plano.** Superfícies em repouso não têm sombra. Uma grade de PlateCards sem hover mostra todos os objetos na mesma mesa, sem hierarquia falsa. A sombra é um evento, não um estado.

## 5. Components

### Links e Navegação (Running Head)

Caráter: contidos e precisos — confirmam sem anunciar.

- **Shape:** sem raio (rectangular sharp — `border-radius: 0`)
- **Default:** cor herdada (`color: inherit`), sem sublinhado
- **Hover / Focus:** sublinhado deslizante via `background-image: linear-gradient(currentColor, currentColor)` — `background-size` anima de `0% 1px` a `100% 1px` em 450ms `cubic-bezier(0.22, 1, 0.36, 1)`. Nunca `text-decoration` nativo — a curva de easing é parte do caráter.
- **Focus-visible:** `outline: 1px solid var(--ink-ghost)`, `outline-offset: 3px`, sem raio.

### Plate Cards (Pranchas do Catálogo)

- **Shape:** sem raio, borda de hairline (`1px solid var(--ink-ghost)`) — o "passepartout" da gravura
- **Background:** `var(--paper-card)` — levemente mais claro que o fundo base
- **Hover:** `background: var(--paper-shade)` + `shadow-soft` lift + tilt 3D leve (≤9°, CSS puro) — o objeto responde ao toque sem saltar
- **Lupa / Galeria:** clique abre galeria modal com passepartout creme, setas em pena, contador romano. O tilt é desabilitado enquanto a galeria está aberta.
- **Flip 3D:** botão temático (glifo de pena) gira a `.plate-image` em `rotateY(-180°)` — revela o verso (wireframe/esboço). Estado por-card, independente.

### Tool Index Rows (Índice de Ferramentas / Instrumentarium)

- **Shape:** retangular, sem raio
- **Default:** `background: transparent`, `padding-left: 9px`
- **Hover:** `background: var(--vinheta-dourada)` — a cor de marcador sobre a linha, como dedo sobre o índice — `padding-left: 18px` (transição 160ms ease-out). Sem side-stripe; o amarelo sozinho é suficiente.
- **Leader:** linha pontilhada `1px dotted var(--ink-ghost)` entre o nome e o valor.

### Candle Toggle

- **Shape:** ícone lunar/solar (`☽` / `☼`), sem borda
- **Default:** `color: var(--ink-faint)`, `font-size: 18px`
- **Hover / Active:** `color: var(--encadernacao-em-couro)`
- **Transição de modo:** 600ms ease-out em `background-color` e `color` do `body`

### CV Slip (Ex Libris)

- **Shape:** sem raio, borda fina — simula folha de papel
- **Background:** creme explícito mesmo no modo vela (o passe-partout da folha é sempre claro)
- **Flip 3D:** alternância entre edição temática e moderna via `rotateY(-180°)` no `.cv-stack` — estado em `useState` React

### Page Counter (Bottom Chrome)

- **Label:** "P." + número romano + "/ XXII" em JetBrains Mono 11px
- **Animação de virada:** split-flap — a `.num` recebe `.flip-out` (scale Y 0) seguido de `.flip-in` em 160ms por passo. Reduced-motion: troca instantânea sem animação.

## 6. Do's and Don'ts

### Do:

- **Faça** usar `var(--encadernacao-em-couro)` (`#7a2620`) somente em acento — ≤15% de qualquer tela. A escassez é o ponto.
- **Faça** animar sublinhados com `background-size` em vez de `text-decoration` — a curva de easing `cubic-bezier(0.22, 1, 0.36, 1)` é parte da identidade.
- **Faça** manter o fundo em `var(--folha-de-guarda)` (`#f1ece0`) — não troque por neutro frio ou branco puro; a hue quente deriva do couro e é intencional.
- **Faça** usar `text-wrap: balance` em `h1`–`h3` e `text-wrap: pretty` em parágrafos longos.
- **Faça** usar Caveat exclusivamente para marginalia, anotações, e voz manuscrita do autor. Nunca para títulos ou corpo principal.
- **Faça** respeitar `prefers-reduced-motion` em todas as animações — crossfade ou troca instantânea como alternativa.
- **Faça** manter `border-radius: 0` em cards e pranchas — o sistema é angular como livros encadernados, não arredondado como apps.
- **Faça** documentar qualquer nova cor em `design-system/tokens.css` e atualizar `DESIGN-SYSTEM.md`. Nunca redeclarar `:root` em outro arquivo CSS.

### Don't:

- **Não** use `border-left` ou `border-right` maior que 1px como acento colorido em cards, listas ou alertas. Isso é side-stripe — banido. Substitua por tint de fundo, borda superior, ou nenhum ornamento.
- **Não** use gradiente em texto (`background-clip: text`). Banido. Ênfase via peso ou tamanho.
- **Não** glassmorfismo decorativo. Blur e vidro só em componentes de overlay com propósito claro (lupa, modal).
- **Não** cards idênticos em grade. Cada prancha tem variação de escala, ângulo, conteúdo.
- **Não** eyebrow em todas as seções (small-caps tracked acima de cada heading). Uma seção com kicker nomeado é voz; em toda seção é gramática de AI.
- **Não** numeração decorativa 01/02/03 em seções que não são sequências reais.
- **Não** portfólio SaaS/Dribbble: cards com gradiente, hero com métrica grande, template de hero-metric (número grande + label pequeno + gradiente).
- **Não** Behance corporativo: grid uniforme de projetos, processo documentado sem personalidade, sem voz autoral.
- **Não** ultrapasse 96px (`6rem`) no clamp de qualquer tipo display — acima disso é gritar.
- **Não** use JetBrains Mono para corpo de texto ou Caveat para títulos principais. Cada família tipográfica tem sua cadeira.
- **Não** adicione sombras em superfícies em repouso — sombra é um evento de hover/elevação, não um estado padrão.
- **Não** hardcode cores fora de `tokens.css`. Se um valor não tem token, não pertence ao sistema ou precisa de um token novo.
