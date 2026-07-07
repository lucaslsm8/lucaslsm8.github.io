# Auditoria do portfólio — 2026-07-06

> Relatório de auditoria (não-corretiva) das 6 páginas públicas. Gerado com a skill **impeccable
> `audit`** + checagem manual de console/rede/responsividade via preview local (`:5891`).
> **Nenhum arquivo do site foi modificado nesta rodada.** As correções vêm numa etapa seguinte, com
> aprovação — ver "Plano de correção" no fim.

**Escopo:** `index.html`, `projects/genai.html`, `projects/pmo-dashboards.html`,
`projects/lighthouse.html`, `projects/sports-experience.html`, `design-system.html`.
(`404.html` entrou só em console/rede; `vitrine.html`/`case-template.html` ficaram fora — internos,
`noindex`.)

---

## 1. Audit Health Score

| # | Dimensão | Nota | Achado-chave |
|---|----------|------|--------------|
| 1 | Acessibilidade | 3 / 4 | Touch targets < 44px difusos no mobile; token terciário 3.32:1 falha AA em corpo; PMO sem reduced-motion |
| 2 | Performance | 3 / 4 | 0 erros de console; lazy-load presente; 2 PNGs violam "WebP-only" (1 é órfão) |
| 3 | Responsividade | 3 / 4 | 0 overflow horizontal em 375/768; dossiê colapsa OK; marginalia preservada — só touch targets pendentes |
| 4 | Theming | 4 / 4 | Sistema de tokens exemplar, fonte única, modo vela completo, `:root` não redeclarado |
| 5 | Anti-Patterns | 4 / 4 | Identidade editorial autoral e comprometida; zero slop de IA |
| **Total** | | **17 / 20** | **Good — endereçar as dimensões fracas (a11y/perf/responsivo), theming e anti-slop já no ponto** |

---

## 2. Anti-Patterns — veredito

**PASSA.** Não parece gerado por IA. A tese "catalogue raisonné" é um POV real e sustentado:
oxblood comprometido com a regra dos ≤15%, quatro famílias tipográficas com papéis distintos, sem
gradiente em texto, sem eyebrows em caps em toda seção, sem template hero-metric, sem grid de cards
idênticos, `border-radius: 0` coerente. O artefato é o argumento — exatamente o Design Principle nº 1.

**Ressalva de consciência (não é achado):** a lane *editorial-typographic* e a fonte *Instrument
Serif* constam nas listas de "reflex-reject" da skill (defaults saturados para trabalho greenfield).
Aqui **não são reflexo** — são a identidade já comprometida e shipada do produto, então
identity-preservation vence e o teste anti-slop passa. Registro só para consciência futura: qualquer
página *nova* deve justificar a lane, não herdá-la por inércia.

---

## 3. Sumário executivo

- **Score:** 17/20 (Good). O portfólio está sólido e distinto; o trabalho restante é de **rigor de
  acabamento**, não de reforma.
- **Contagem por severidade:** P0 = 0 · P1 = 2 · P2 = 4 · P3 = 3.
- **Base limpa confirmada:** 0 erros de console e 0 requests 4xx/5xx/imagens quebradas nas 6 páginas +
  404. 0 overflow horizontal em mobile (375) e tablet (768) em todas. Dossiê lateral colapsa para
  bloco estático sem quebrar. Marginalia visível como footnote no mobile (genai/lighthouse/sports).
- **Top 3 a corrigir:**
  1. **[P1] Touch targets < 44px** — problema sistêmico, presente em todas as páginas (chrome do
     dossiê, chips de filtro, setas/dots de carrossel, marcadores de footnote, swatches, toggles).
  2. **[P1] `pmo-dashboards.html` sem `prefers-reduced-motion`** — 41 declarações de animação/transição,
     zero fallback. Único case sem a regra; viola o Design Principle de acessibilidade do próprio
     PRODUCT.md.
  3. **[P2] Token terciário `breu-apagado` (#8b7f6e) = 3.32:1** — falha WCAG AA (4.5:1) para texto de
     corpo/meta em tamanho normal. Passa só o piso de 3:1 (texto grande).

---

## 4. Achados por severidade

### P1 — Major (corrigir antes de considerar "pronto")

**[P1] Touch targets abaixo de 44×44px no mobile — sistêmico**
- **Categoria:** Acessibilidade / Responsividade · **WCAG:** 2.5.5 (AAA) / 2.5.8 Target Size Minimum
  24px (AA) — vários casos ficam **abaixo até dos 24px de altura efetiva**.
- **Locais medidos (viewport 375):**
  - Home: `.rep-dot` **9×9**, `.rep-arrow` **40×40** (dots de paginação do reel).
  - Gen.AI: `.ga-ctrl` **≈15px de altura** ("desfazer/undo", "editar/edit"), `.ga-cite` **28px**, nós
    SVG `g` **18×18**.
  - PMO: `.spec-chip` **29px**, botões de setor da Mandala **26×26**, `.lib-tab` **37px**,
    `.mod-hero__plate` **42px** (27 elementos no total).
  - Lighthouse: `.lh-ic` **27×27**, `.fn` **22×22**, toggles de estado de prioridade **33px**.
  - Sports: `.carousel-arrow` **42×42** (só 2 elementos, quase no alvo).
  - Design System: `.swatch-btn` **30×30**, toggles PT/EN **≈30px**, `.btn` **38–39px**.
- **Impacto:** o Design Principle nº 4 do PRODUCT.md exige explicitamente **touch targets ≥ 44px**;
  o site declara isso mas não cumpre no chrome interativo. Setas/dots de carrossel a 9–40px e botões
  de controle a 15px são difíceis de acertar no toque — atrito direto para um recrutador em tablet.
- **Recomendação:** padronizar altura/área mínima de toque (44px, ou ao menos 24px + área de toque
  ampliada via padding/`::before` transparente) nos controles de chrome, carrossel, chips e toggles.
  Como é o mesmo punhado de componentes repetidos, é uma correção de padrão, não caso a caso.
- **Comando sugerido:** `/impeccable adapt` (ajuste de alvos por device).

**[P1] `pmo-dashboards.html` não respeita `prefers-reduced-motion`**
- **Categoria:** Acessibilidade · **WCAG:** 2.3.3 Animation from Interactions.
- **Local:** `projects/pmo-dashboards.html` — 41 declarações `animation:`/`transition:`/`@keyframes`
  inline, **0** blocos `@media (prefers-reduced-motion: reduce)`. As outras 3 pranchas + home +
  design-system têm a regra.
- **Impacto:** Mandala navegável, reveals e count-up animam sem alternativa para usuários com
  vestibular disorders. Além da a11y, é uma **inconsistência**: é o único case fora do padrão, e o
  próprio PRODUCT.md marca reduced-motion como "obrigatório em todas as animações".
- **Recomendação:** adicionar o bloco reduced-motion (crossfade/instantâneo) espelhando o que
  lighthouse/sports já fazem.
- **Comando sugerido:** `/impeccable harden` (edge cases/a11y) ou `/impeccable animate` (rever motion).

### P2 — Minor

**[P2] Token terciário `breu-apagado` (#8b7f6e) falha contraste AA para texto normal**
- **Categoria:** Acessibilidade · **WCAG:** 1.4.3. Medido: **3.32:1** sobre paper, **3.50:1** sobre
  card. AA exige 4.5:1 para corpo; passa só o 3:1 de texto grande.
- **Impacto:** usado em gloss, legendas, `meta` (JetBrains Mono 11–13px) e chrome em repouso — tamanho
  pequeno, então o piso aplicável é 4.5:1. Texto informativo (metadados, índice de ferramentas) nesse
  tom fica difícil de ler, sobretudo à luz de ambiente forte.
- **Nota:** os demais tokens de tinta passam com folga (corpo 15.26:1, secundário 8.48:1, couro
  8.38:1, nanquim 9.24:1). O problema é isolado ao terciário.
- **Recomendação:** escurecer o terciário ~1 passo em direção ao ink (mirar ≥4.5:1) **onde carrega
  texto real**; manter o tom atual só onde for ornamento documentado. Decisão de design — envolve o
  Lucas. Ajuste em `design-system/tokens.css` (fonte única) + tabela no `DESIGN-SYSTEM.md`.
- **Comando sugerido:** `/impeccable colorize` ou ajuste manual de token + `/impeccable audit` para reconferir.

**[P2] `breu-fantasma` (#c4b8a0) = 1.66:1 — confirmar que nunca carrega texto**
- **Categoria:** Acessibilidade · **WCAG:** 1.4.3.
- **Impacto:** documentado como divisor/hairline/**placeholder**. Como divisor (não-texto) está isento;
  como **placeholder de input** seria 1.66:1 — reprovação grave. A auditoria não encontrou input com
  placeholder visível nas páginas públicas, mas o DESIGN.md lista "placeholders" no papel do token.
- **Recomendação:** verificar (grep de `::placeholder`/inputs) e, se houver placeholder textual, trocar
  para o terciário corrigido. Se for só hairline, documentar a isenção decorativa.
- **Comando sugerido:** verificação manual + `/impeccable harden`.

**[P2] `mandala-estrategica.png` — raster fora de WebP (invariante do projeto)**
- **Categoria:** Performance / consistência.
- **Local:** `projects/pmo-dashboards.html:2045-2046` (`<img>` + link de lightbox). É o único raster
  não-WebP **em uso** no site.
- **Impacto:** PNG mais pesado que WebP; quebra a invariante "zero raster fora de WebP" que o resto do
  projeto mantém. Já tem `loading="lazy"`, então o impacto é peso, não bloqueio.
- **Recomendação:** converter para WebP (alpha preservado) e atualizar as 2 refs.
- **Comando sugerido:** `/impeccable optimize`.

**[P2] `images/samarco/mandala/mandala-full.png` — órfão + não-WebP**
- **Categoria:** Performance / higiene de assets.
- **Local:** arquivo em disco, **não referenciado** por nenhum HTML/CSS/JS (checado por caminho
  completo). O CLAUDE.md (2026-07-06) o lista como "em uso"; o repositório atual contradiz isso.
- **Impacto:** peso morto no repo; a nota do CLAUDE.md está desatualizada.
- **Recomendação:** confirmar com o Lucas (Read do conteúdo antes) e apagar; corrigir a nota do
  CLAUDE.md. Ação irreversível → mostrar antes.

### P3 — Polish

**[P3] Elementos decorativos mais largos que a viewport (sem causar overflow de página)**
- `div.reel-track` (home, 1760px), `.lh-flow__track`/`.sx-flow__track` (marquees), `.frontispiece-halo`.
  Todos ficam dentro de container clipado (`docScrollWidth === innerWidth`, overflow de página = 0).
  Comportamento intencional (loop infinito / halo). **Sem ação** — registrado para não reinvestigar.

**[P3] Marginalia no PMO ausente no mobile (margVisible = 0)**
- Diferente das outras 3 pranchas (1 gloss visível cada), o PMO não usa o padrão de marginalia/gloss —
  usa o layout "dossiê". Não é violação (não há gloss a preservar), mas vale confirmar que é escolha
  deliberada e não perda de conteúdo. **Verificar, provável não-ação.**

**[P3] Skill Impeccable desatualizada**
- Instalada v3.5.0, disponível v3.9.1. Atualização (`npx impeccable skills update`) só vale para a
  próxima sessão. Decisão do Lucas.

---

## 5. Padrões & questões sistêmicas

1. **Touch targets sub-44px são o tema recorrente** — não é erro pontual, é um padrão em todo o chrome
   interativo (dossiê, carrosséis, chips, toggles, footnotes). Uma correção de sistema (mínimos de alvo
   nos componentes compartilhados) resolve as 6 páginas de uma vez.
2. **Regras de a11y aplicadas por página, não globalmente** — reduced-motion existe em 20 arquivos mas
   faltou no PMO; o `body { overflow-x: clip }` do dossiê está duplicado inline em 4 páginas (nota do
   próprio CLAUDE.md). Ambos sugerem **consolidar regras compartilhadas de case em
   `design-system/case-template.css`** em vez de repetir inline — reduz o risco de esquecer numa página.
3. **Invariante "WebP-only" com 2 exceções** (1 em uso, 1 órfã), ambas na área samarco/mandala.

---

## 6. Achados positivos (manter e replicar)

- **Theming impecável (4/4):** token único em `tokens.css`, modo vela completo, `:root` nunca
  redeclarado fora da fonte, contraste de corpo/secundário/acento/link todos ≥8:1.
- **Zero regressão técnica:** 0 erros de console e 0 requests falhando nas 6 páginas + 404.
- **Responsividade real:** nenhum overflow horizontal em 375/768; dossiê colapsa graciosamente;
  marginalia sobrevive no mobile — o Design Principle nº 4 está majoritariamente honrado (só os alvos
  de toque destoam).
- **Identidade sem slop:** o conceito editorial é executado com disciplina (regra do couro ≤15%,
  quatro cadeiras tipográficas, sem os bans de IA). É o diferencial competitivo do portfólio.

---

## 7. Plano de correção (ordem sugerida)

### Correções seguras (podem ser aplicadas sem decisão de design do Lucas)
1. **[P1] Touch targets ≥44px** nos componentes de chrome/carrossel/chips/toggles — `/impeccable adapt`.
2. **[P1] Adicionar `prefers-reduced-motion` ao PMO** espelhando lighthouse/sports — `/impeccable harden`.
3. **[P2] Converter `mandala-estrategica.png` → WebP** e atualizar as 2 refs — `/impeccable optimize`.
4. **[P2] Verificar `breu-fantasma` em `::placeholder`** (grep) e corrigir se houver texto.
5. **(higiene) Confirmar e remover `mandala-full.png` órfão**; atualizar nota do CLAUDE.md (mostrar antes de apagar).

### Decisões de design (precisam do Lucas)
6. **[P2] Escurecer o token terciário `breu-apagado`** para ≥4.5:1 onde carrega texto real — mexe na
   identidade da paleta, então é escolha dele. Ajustar em `tokens.css` + `DESIGN-SYSTEM.md`.
7. **[P3] Confirmar** intenção da marginalia ausente no PMO no mobile.
8. **[P3] Atualizar a skill Impeccable** (v3.9.1), se quiser.

### Fecho
9. **[P1→P2] `/impeccable polish`** numa passada final após aplicar os itens acima.
10. **Re-rodar `/impeccable audit`** para ver o score subir (esperado 19–20/20 depois de 1, 2, 3 e 6).

---

> Você pode me pedir para executar estes itens um a um, todos de uma vez, ou na ordem que preferir.
> Recomendo começar pelas "correções seguras" (1–5), que não dependem de decisão de design.
