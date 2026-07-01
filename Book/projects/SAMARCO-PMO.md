# Briefing — Case "Dashboards PMO Estratégico · Samarco"

> Documento de contexto **autossuficiente** para qualquer IA (ou pessoa) que vá trabalhar
> nesta prancha. Lê isto primeiro. Para o tema/visual geral do portfólio, ver
> `../CLAUDE.md` e `../design-system/DESIGN-SYSTEM.md`. Atualizar este arquivo quando
> algo mudar.
>
> Última atualização: 2026-06-29.

---

## 0. O que é este case

Prancha **II** (№ 002) do portfólio editorial "catalogue raisonné" do Lucas Schoenherr.
Documenta o trabalho dele como **Senior Product Designer** no **PMO Estratégico da Samarco**:
o desenho de uma **cabine de comando executiva** em **Power BI customizado** — a *Mandala
Estratégica* (home navegável) + **+30 indicadores (KPIs)** e **+60 componentes** de data-viz,
criados do zero e componentizados no Figma, que substituíram 20+ planilhas reconciliadas à mão.

**Arquivos da prancha:**
- `pmo-dashboards.html` — a página de case publicável (a "prancha"). Bilíngue PT/EN.
- `samarco-lab.html` — **sandbox de validação** (noindex). Onde protótipos de conceitos
  interativos são testados antes de entrar na prancha. NÃO é publicado.
- `SAMARCO-PMO.md` — este briefing.

---

## 1. Objetivo da página (a régua de toda decisão)

> **Mensagem ao recrutador:** "O Lucas sabe criar dashboards e KPIs **prontos para produção**,
> compatíveis com tecnologias modernas, que apresentam **dados reais e importantes** de forma
> rápida, objetiva, bonita e visual."

- O herói é o **MÉTODO**, não o resultado final. Mostrar **como** se chegou lá: os KPIs
  criados do zero, a navegação da Mandala, a gramática visual componentizada.
- Pode haver um **gancho** visual de abertura, mas o foco é o conteúdo criado e como ele
  ajuda gestores/usuários a ler dados complexos rápido.
- **Piso de qualidade:** o case Lighthouse (`lighthouse.html`). A meta é **superá-lo** com
  UX moderna, mantendo o tema "livro antigo".

---

## 2. Fatos do projeto (confirmados pelo Lucas — NÃO inventar)

| Item | Verdade |
|---|---|
| Produto | Dashboard executivo em **Power BI** (página web navegável, dados em tempo real) |
| Entregável-chave | A **Mandala** como home navegável + biblioteca de indicadores |
| Escala | **+30 indicadores (KPIs)** e **+60 componentes** (inclui tabelas etc.), criados do zero |
| Componentização | Tudo **componentizado no Figma** (variantes + tokens) → criar/alterar indicador é montar, não desenhar |
| Autoria do Lucas | **Todos os KPIs customizáveis + o layout do dashboard** são dele |
| Base técnica | KPIs customizados baseados nos visuais **nativos do Power BI** — restrição real da plataforma (não adianta indicador que o Power BI não renderiza). Isso É parte da história. |
| Time | Lucas **+ outra designer** + time de PMs, liderança e stakeholders |
| Período | MMXXV (~4 meses) — confirmar com o Lucas se exibir |

**Datas:** sempre em numerais.

---

## 3. Restrições rígidas

1. **Números: SEMPRE fictícios/ilustrativos.** Os reais são confidenciais e **proibidos**.
   Qualquer KPI, meta, valor exibido = ilustrativo. Onde houver badge de "atualização",
   escrever **"Dados ilustrativos"** (o produto real dizia "Dados Reais").
2. **Screenshots reais PODEM aparecer** (estão em `../images/samarco/`). Lucas aponta
   censura caso necessário.
3. **Cores:** o *chrome* da página segue o tema livro (tokens editoriais); o **conteúdo do
   produto** (Mandala, indicadores, mini-vizes) pode manter o **tom original navy/lime**
   para não descaracterizar. Aumentar a influência do tema só se o Lucas pedir.
4. **Originalidade editorial** (regra global do portfólio): nada de "Hero/Problem/Solution".
   Usar o léxico do livro (Argument, Acta, Plates, Errata, Colophon…).

---

## 4. A Mandala Estratégica (o coração do produto)

A **home real** do dashboard. Reconstruída fielmente a partir do Figma (ver `samarco-lab.html`).

**Os 6 pilares de negócio** (áreas da Samarco monitoradas constantemente) — nomes canônicos:

| # | Pilar | Status (anel) no mock real |
|---|---|---|
| I | **Cultura e desenvolvimento organizacional** | âmbar (atenção) |
| II | **Sustentabilidade** | verde |
| III | **Retomada do crescimento** | verde |
| IV | **Novos Negócios** | azul/neutro |
| V | **Modelo Operacional** | âmbar (atenção) |
| VI | **Reserva, rejeitos e estéril** | verde |

**Anatomia do home real:**
- Roda **navy** dividida em **6 gomos**, com **medidor circular** no centro.
- Cada pilar = um **ícone** em disco branco com **anel colorido = status RAG** do pilar.
- **Labels em abas** saindo para fora: esquerda para Cultura · Reserva · Modelo;
  direita para Sustentabilidade · Retomada · Novos.
- Link **"⚠ Riscos"** no canto inferior esquerdo.
- **Navegação:** clicar num pilar (ou na aba) abre, à direita, o **painel-tabela** de
  indicadores daquele eixo. (Lucas também menciona menu lateral esquerdo como rota alternativa.)
- **Painel-tabela** "Indicadores · {pilar}": colunas **status • Indicador • Unidade • Meta •
  Realizado/YTD**; linhas **agrupadas por família** (ex.: "Diversidade & Inclusão",
  "Saúde & Conhecimento"); status por bolinha (verde/âmbar/vermelho/cinza/branco=sem dado).

**Disposição geométrica dos 6 nós** (hexágono de 2 colunas, % do quadrado da roda):

```
Cultura (26,9)            Sustentabilidade (73,9)
Reserva (3,50)   ⊙ centro   Retomada (97,50)
Modelo (26,91)            Novos Negócios (73,91)
```

---

## 5. Design tokens REAIS (extraídos do Figma via MCP)

Fonte: `get_variable_defs` no arquivo Figma. Usar estes valores para o "conteúdo do produto".

**Cores**
| Token Figma | Hex | Uso |
|---|---|---|
| Brand/Azul Primário | `#004170` | cor-mãe do produto (roda, headers) |
| Brand/Azul Secundário | `#719DC6` | acento, séries secundárias |
| Brand/Cinza Primário | `#B6C0C6` | neutros, "sem dado" |
| Brand/Cinza Secundário | `#657681` | rótulos |
| Feedback/Verde | `#95C11F` | status "no alvo" (lima) |
| Feedback/Amarelo | `#FFCC00` | status "atenção" |
| Feedback/Vermelho | `#DD6A84` | status "crítico" |
| Variable/Verde Claro | `#96F199` | realces |
| Variable/Verde Escuro | `#6E8E15` | deltas positivos |
| Neutrals/Cinza Escuro | `#1D1823` | tinta escura |
| Component/Roxo Componente | `#9747FF` | badge "Indicador em construção" (interno do Figma) |

**Tipografia (do produto):** títulos em **Montserrat Bold**; dados/legendas em **Arial**.
(No portfólio o chrome usa EB Garamond / Instrument Serif / JetBrains Mono — não misturar:
Montserrat/Arial só nas peças que reproduzem o produto.)

---

## 6. Assets

Raiz dos assets: `../images/samarco/` (referência relativa a partir de `projects/`).

- `capa.webp` — cockpit estilizado escuro (recriação do Lucas, não o Power BI cru).
- `capa-indicators.webp` — colagem dos Power BI reais (fundo branco).
- `indicators/` — 14 screenshots reais de indicadores
  (capacidade-rejeitos, central-relacionamento, comparacao-planos, conformidade-sst,
  conhecimentos-criticos, descarbonizacao, emissoes-gee, fortalecimento-economico,
  minerio-marginal, nivel-risco-global, piis-investimento-social, recuperacao-ambiental,
  recuperacao-nascentes, reputacao-global).
- `forms/` — 5 (benchmark-agua, donut-mulheres, gauge-condicionantes, mapa-piis, piis-avanco).
- `mandala/` — **7 ícones dos pilares** em WebP lossless (alpha): `mandala`, `cultura`,
  `sustentabilidade`, `reserva-rejeitos`, `modelo-operacional`, `retomada`, `novos-negocios`.

**Invariante do projeto:** **zero raster fora de WebP** (alpha preservado). Converter PNG/JPG
novos via PIL antes de commitar. **Case-sensitive** (GitHub Pages): respeitar maiúsculas.

---

## 7. Figma

- **Arquivo online:** `https://www.figma.com/design/ltQ9I804eVnPVewW8dz5dm/...`
  - `fileKey` = `ltQ9I804eVnPVewW8dz5dm`
  - Página única "👋 Welcome". O metadata raso só lista a capa — os componentes ficam
    **soltos no canvas**, então é preciso **pedir o node-id específico** de cada frame.
  - Nodes conhecidos: `1385:108036` = **Mandala / home**; `2737:76709` = componente real
    "Matriz de riscos associados aos conhecimentos críticos".
- **Acesso:** via Figma MCP (read) — `get_design_context`, `get_screenshot`, `get_metadata`,
  `get_variable_defs`. Extrair tokens/specs daqui.
- O **`.fig` físico** (Desktop) **não é abrível** por IA — usar sempre o online.

---

## 8. Conceitos interativos — decisões (sandbox `samarco-lab.html`)

Quatro conceitos foram prototipados; o Lucas decidiu:

| Conceito | Decisão |
|---|---|
| **i · Mandala navegável** | **MANTER e refinar.** É o produto real; protagonista da prancha. |
| ii · Anatomia de um indicador (raio-X anotado) | **DESCARTADO.** |
| iii · Antes/Depois (planilha↔dashboard) | **DESCARTADO.** |
| **iv · Specimen de componentes** | **MANTER e refinar.** Prova a tese da componentização. |

**Estado atual do lab (i):** roda fiel (6 gomos SVG + medidor central + ícones reais com anel
de status), clique acende o gomo e abre o painel-tabela com dados ilustrativos.
**Estado atual do lab (iv):** grade de espécimes (mini-vizes SVG + 2 screenshots reais),
chips de filtro por família, badge de variantes, e um **demo de token de marca ao vivo**
(trocar o azul repinta a biblioteca) que prova a componentização.

---

## 9. Como continuar (próximos passos)

> **CONSTRUÇÃO POR SEÇÃO — fonte de verdade do conteúdo: `https://designbylucas.com/V2/samarco-dashboard.html`.**
> O Lucas decidiu reconstruir cada seção traduzindo a referência V2 para o tema livro, **uma de cada vez**.
> Padrão: pegar informações/tags/elementos interativos da V2 e reinterpretar no léxico editorial.
>
> **✅ I · Overview — FEITO (2026-06-30).** Traduzido da V2 (seção "Overview do projeto"). Tem: lead
> (plataforma + Mandala), 2 parágrafos de contexto/papel, **3 objetivos numerados**, **ficha técnica**
> (sidebar sticky de 8 campos: Cliente/Ano/Duração/Papel/Plataforma/Stakeholders/Metodologia/Entregáveis)
> e o **elemento interativo**: os **6 eixos como tags clicáveis** (`.ov-axis`, `role=tablist`) — clicar/teclas
> revela no painel (`#ovAxisPanel`) o **status RAG** do eixo + as **famílias/módulos** em que ele se desdobra.
> Ordem e rótulos seguem a V2 (01 Cultura & Desenvolvimento … 06 Novos Negócios). Status e famílias são os
> **dados canônicos** do §4 (não inventados). i18n PT/EN re-renderiza o painel no toggle. CSS `.ov-*` no
> `<style>`; JS num `<script>` próprio no fim do arquivo. Validado por DOM (:5599): 6 chips, 8 campos de
> ficha, 3 objetivos, clique/seleção/painel OK, EN re-renderiza, grid 2-col, 0 erros. (Screenshot headless
> segue travando — validar por DOM.)
>
> **✅ II · Desafio — FEITO (2026-06-30).** Traduzido do texto do Lucas em quatro movimentos editoriais
> (classes `.dz-*` no `<style>`, sem JS próprio — i18n via `.t`, count-up via `.stat-val` do `case-template.js`):
> **(a) A pergunta** (`.dz-question`) — a questão central do caso como tese em destaque: caixa com filete
> oxblood à esquerda + glifo `?` grande em serif-display na margem (Lucas preferiu esta versão à de epígrafe
> com aspas/fleuron, testada e descartada). **(b) O levantamento** (`.dz-ledger`) — discovery como **livro-razão**:
> 4 instrumentos em linhas com a quantidade alinhada à margem direita (count-up `+10` entrevistas · `2`
> workshops; análise heurística e auditoria de planilhas/decks recebem fleuron `❧` no lugar do número, por
> serem qualitativos); caption `~6 semanas de campo`. **(c) Três achados estruturais**
> (`.dz-findings`, `data-stagger`) — fichas I/II/III com glifo SVG próprio (folhas dispersas / nós sem centro /
> formas díspares): Fragmentação · Sem organizador único · Sem linguagem visual comum. **(d) O encargo de design**
> (`.dz-charge`) — o briefing reformulado num bloco oxblood + 3 requisitos com check SVG (clareza em escala ·
> vários níveis de leitura · base única). Validado por DOM (:5599): 1 pergunta + fleuron, ledger 4 linhas
> right-aligned (mesma margem), count-up `+10/2`, 3 achados + glifos, 3 requisitos + checks, i18n PT/EN,
> modo vela (fundo oxblood no charge), 0 erros. Restam 11 placeholders no dossiê.
> **(2ª versão após feedback do Lucas:** a 1ª tinha 2 listas empilhadas — 3 números soltos + 3 métodos i/ii/iii —
> com o `+10` desalinhado pelo baseline; unificadas num só registro/ledger.)
>
> **✅ III · Meu papel — FEITO (2026-06-30).** Texto do Lucas em quatro movimentos (classes `.rp-*`, reusa
> `.dz-block`/`.dz-h`/`.pmo-lead`; sem JS próprio): **lead** com a síntese end-to-end; **(b) O alcance da
> comissão** (`.rp-stations`) — o end-to-end virado **régua de 6 estações** conectadas por filete (estratégia →
> discovery → Mandala → DS de data-viz → fluxos & telas dos 6 módulos → handoff p/ BI); horizontal no desktop,
> rail vertical em ≤760; **(c) Articulação entre áreas** (`.rp-tags`) — parágrafo + fileira de tags (Cadência
> quinzenal + PMO/Finanças/Riscos/TI/Sustentabilidade); **(d) Três frentes em paralelo** (`.rp-board`,
> `data-stagger`) — **tábua de espécimes** adaptada do componente "Materiais & Pigmentos" da vitrine (pin em
> romano na borda + prancha 4:3 com **emblema de traço SVG** + legenda em serif/mono): I Discovery & arquitetura
> (árvore de IA + lupa) · II DS de data-viz (grade de mini-vizes, tag `+60 componentes`) · III Desenvolvimento
> dos módulos (6 telas, tag `6 módulos`). **Trocou as fichas-cartão (`.rp-stream`) a pedido do Lucas — ele
> achou redundante reusar o mesmo elemento de card da seção II/Desafio; pesquisamos a vitrine e adaptamos outro.**
> **(e)**
> nota de continuidade (`.rp-legacy`) com glifo de livro sobre o **guia do Design System**. Validado por DOM
> (:5599): 6 estações (dots alinhados numa linha @1280; rail vertical @630), 6 tags, 3 frentes em fileira,
> glifo de continuidade, i18n PT/EN, 0 erros. Restam 10 placeholders no dossiê.
>
> **✅ IV · Solução — FEITO (2026-06-30).** Traduzida do texto do Lucas ("A solução") em quatro movimentos
> editoriais (classes `.sol-*` no `<style>`; reusa `.pmo-lead`, `.dz-block`/`.dz-h` e a legenda `.rag-states`;
> sem JS próprio — i18n via `.t`): **(a) lead-fórmula** — a resposta numa linha (Mandala + 5 módulos + DS de
> data-viz, ancorados no RAG). **(b) A arquitetura da resposta** (`.sol-arch`) — diagrama *exploded* em tema
> híbrido: **núcleo** = a Mandala em esquema (hexágono SVG navy + **linhas ciano** = interdependências, medidor
> central, 6 nós nos vértices com anel de status RAG dos §4) → **stem** → **5 módulos** (`.sol-mods`, conectados
> por filete superior com tick ciano): I Status Ações·Gantt 2023–2028 · II Indicadores de Sustentabilidade·9 ESG ·
> III Riscos·heatmap 5×5 · IV Programas Estratégicos · V Grupos·OKRs → **fundação** (`.sol-base`) = o Design
> System de data-viz (+60 componentes; tokens de cor · escalas numéricas · tipografia · padrões gráficos
> bar/line/donut/gantt/heatmap). **(c) O sistema RAG unificado** — a legenda `.rag-states` (4 estados:
> Normal/Alerta/Crítico/Sem dado, este como **estado de design**) + fileira de chips "aplicado em" (setores da
> Mandala · ações do Gantt · barras ESG · células do heatmap · OKRs). **(d) Navegação cruzada** (`.sol-flow`) —
> rota **Eixo → Risco → Ação** em 3 passos com seta (vira vertical em ≤760) + **edições futuras** (`.sol-future`,
> marginalia tracejada): drill-down por diretoria · timeline interativa do Gantt · exportação para comitê ·
> integração com ERP. Novo token `--sol-cyan: #1fb6c4` no `:root` (ciano das interdependências). Cor híbrido (§3):
> núcleo/diagrama no tom real navy/ciano, RAG nas cores reais, resto no tema livro. Validado **estaticamente**
> (parser HTML): 0 erros de balanceamento, i18n PT/EN 59/59 balanceado na seção, contagens OK (núcleo · 5 módulos ·
> fundação · 4 RAG · 5 chips · 3 passos+2 setas · 4 evoluções). Restam **9 placeholders** (V–XIII). *(O preview
> :5599 estava ocupado por outra sessão — não deu p/ validar o re-render i18n ao vivo, mas a seção é só `.t`/`reveal`/
> `data-stagger`, herdando o comportamento já validado de II/III.)* **Não incorporei a faixa de 4 passos do processo
> (Discovery → Mandala & módulos → DS → Protótipo V1 & handoff) que o Lucas colou como referência — é redundante com
> a régua de 6 estações da seção III/Meu papel; aguardando decisão dele se quer mesmo assim.**
>
> **✅ V · Mandala & módulos — FEITO (2026-06-30).** Traduzido o grid de cards da V2 ("A Mandala e seus 5
> módulos satélite") no tema livro (classes `.mod-*` no `<style>`; reusa `.pmo-lead`; sem JS próprio — i18n via
> `.t`, stagger via `data-stagger`). Tem: **lead** (home = Mandala + 5 módulos, paleta navy/ciano + RAG
> compartilhados); **fita de paleta** (`.mod-legend`) — swatches Navy/Cyan + 4 RAG (Normal/Alerta/Crítico/Sem
> dado), `aria-hidden`; e o **atlas de 6 cards** (`.mod-grid` 3-col → 2 → 1) em **dois níveis** fiéis à V2:
> **NÚCLEO** (top-border ciano, ícone ciano, tag ciano) = I Mandala·Painel Geral (Home·Diretoria) · II Status
> Ações (Gantt 2023–2028) · III Indicadores ESG (9 grupos); **SATÉLITE** (top-border/ícone/tag neutros) = IV
> Riscos (heatmap 5×5) · V Programas Estratégicos (Portfólio·PMO) · VI Grupos (Sustentabilidade·Governança).
> Cada card: tile de ícone navy + glifo SVG próprio (hexágono / calendário-check / folha / triângulo-alerta /
> nós conectados / pessoas), kicker em mono, nome em serif-display itálico, descrição fiel à V2 (ações críticas
> Dry Stacking etc.; 9 grupos ESG nomeados; categorias de risco de mineração), tag de nível. **Decisão de cor:**
> reinterpretado no tema livro (cards em papel) com acentos navy/ciano do produto — **não** copiei o dark navy da
> V2, seguindo a regra §9 do briefing ("reinterpretar no léxico editorial", consistente com II/III/IV). A
> **Mandala navegável de verdade** (portada do lab) **não** entra aqui — vai na **peça de impacto full-bleed**
> (`.pmo-impact`, hoje placeholder circular entre frontispício e dossiê). Validado estaticamente (parser HTML):
> 0 erros, 6 cards (3 núcleo/3 satélite), 6 ícones/nomes/tags, 6 swatches, i18n PT/EN 29/29 na seção. Restam
> **8 placeholders** (VI–XIII).
>
> **✅ VI–XIII — FEITAS (2026-06-30).** Extraídas da referência V2 (`designbylucas.com/V2/samarco-dashboard.html`,
> via WebFetch) e reinterpretadas no tema livro. **O dossiê inteiro (I–XIII) saiu do esqueleto — 0 placeholders.**
> Reaproveitou-se todo o CSS/JS preservado da "reformulação grande" (specimen, galeria, matriz, padrões, lightbox,
> count-up); lightbox e `.sl-gallery` vivem em `case-template.css`.
>   - **VI · Indicadores reais** (`.idx-*`): lead (gramática visual única, +30 KPIs sync Power BI) + **faixa de 4
>     métricas com count-up** (`.stat-val`: +30 · 6 · 5 · 100%) + **nota de calibração** ("antes do DS cada área
>     fazia PPT próprio…") + **specimen vivo religado** (`#specFilters`/`#specGrid`/`#tokenSw` — filtro por família +
>     12 mini-vizes + token de marca ao vivo que repinta a biblioteca).
>   - **VII · Biblioteca curada** (`.cur-*` + galeria `.pmo-group-head`/`.pmo-grid`/`.pmo-shot` em `.sl-gallery`):
>     critério editorial + regra de curadoria (caixa oxblood) + chips "fora da narrativa" (line-through) + **galeria
>     de 15 screenshots reais** agrupada nas 4 famílias da V2 (Ambiental/Operação/Social/Governança), tudo abre no
>     **lightbox**. Wide: emissoes-gee, comparacao-planos, conformidade-sst.
>   - **VIII · Catálogo ESG** (`.esg-*`): 6 cards de família (letra E/S/G colorida + N KPIs + amostra + **mini-viz
>     dominante SVG**): Ambiental(8·Linha P×R), Operacional(6·YoY+meta), Social(6·Multi-KPI RAG), Governança(5·Combo),
>     Pessoas(4·Donut, amostras 71/89/64/52%), Risco(3·Big-number 2.534).
>   - **IX · Anatomia** (`.anat-*`): Índice de Reputação — Panorama Global. Screenshot real `reputacao-global.webp`
>     (plate no lightbox) + **5 dimensões** com valor e status RAG (geral 71,3 / Desempenho 74,7 / Ambiente 73,6 /
>     Governança 70,7 ok · Operações 66,3 warn) + **régua da escala** (Pobre<39 … Excelente>80).
>   - **X · Padrões de viz** (`.pmo-patterns`): os 5 padrões (~90% dos indicadores) com mini-viz SVG + nota "BI extrai
>     em horas".
>   - **XI · Mapa de riscos** (`.pmo-matrix`/`.pmo-risk`): **heatmap 5×5 SVG** (impacto × probabilidade, eixos
>     rotulados, célula-poço) + **lista de 6 riscos** com severidade/categoria (barragens, ambiental, SST, jurídico,
>     reputacional, ESG) ligados ao eixo da Mandala + nota de dados ilustrativos.
>   - **XII · Entrega & impacto** (`.imp-*`): 2 parágrafos de entrega (protótipo V1 + DS + handoff, validado/aprovado)
>     + **pull-quote** da liderança do PMO ("Pela primeira vez… mesma tela que a diretoria") + **2 colunas** Impacto
>     de Produto / Impacto de Design (4 itens cada).
>   - **XIII · Aprendizados** (`.lesson`): as 4 lições (governança não gráficos · metáfora forte · "sem dado" é estado
>     de design · data-viz é DS à parte).
> Validado **estaticamente** (parser HTML): 0 erros de balanceamento, **0 placeholders**, i18n PT/EN balanceado em
> todas as 8 seções, contagens OK (6 ESG · 5 padrões · 6 riscos · 4 lições · 4 métricas · 6 dimensões · 16 links de
> lightbox · specimen targets presentes). *(Preview :5599 ocupado por outra sessão — não deu p/ validar ao vivo o
> specimen/lightbox/count-up/i18n; mas todo o JS é preservado e já provado, e os targets agora existem no DOM.)*
>
> **✅ Comparação com a V2 + faixa Resultados-chave (2026-06-30).** Feito o cotejo título-a-título do dossiê contra a
> lista completa da V2 (17 blocos). Achados: (a) **"Mais de 30 indicadores / gramática visual"** = nossa **VI ·
> Indicadores reais** (não faltava; só o nome difere). (b) **"Um sistema único de status"** (RAG) está **embutido na
> IV · Solução** (legenda dos 4 estados), sem seção própria. (c) **Gap real:** a faixa **"Resultados-chave"** da V2 §2
> (6 eixos · 6 módulos · +60 comp · 2023–2028) não existia — **adicionada agora** como `.pmo-results` (seção
> full-width entre o frontispício e a peça de impacto; sem `section-head` → fora do menu, como a impacto/impact do LH;
> count-up nos 3 primeiros números, 2023–2028 como texto; i18n 5/5). **Perguntei ao Lucas** (via AskUserQuestion)
> sobre (1) onde pôr a faixa, (2) promover o RAG a seção própria, (3) renomear a VI — ele **não respondeu**; segui só
> com a opção recomendada e de baixo risco (adicionar a faixa após o herói). **As duas mudanças estruturais foram
> aprovadas e FEITAS (2026-06-30):**
>   - **"Um sistema único de status" promovido a seção própria** — nova **VI** (`.section-head` "Um sistema único de
>     status / O código"), com a legenda `.rag-states` reescrita nas **definições de governança da V2** (Normal =
>     dentro do plano, sem ação · Alerta = desvio controlado, PMO monitora, ainda não é comitê · Crítico = desvio
>     relevante de escopo/prazo/compromisso, decisão executiva · Sem dado = não reportado, estado visual próprio,
>     nunca "verde por omissão") + chips "aplicado em". A **duplicata foi removida da IV** (o movimento (c) da
>     Solução; a IV ficou com lead + arquitetura + navegação cruzada — o lead ainda ancora o RAG e o hexágono ainda
>     usa os anéis RAG, então a referência sobrevive).
>   - **VI antiga renomeada** para **VII · "Uma gramática visual"** (gloss "+30 indicadores"), alinhada à V2 §9.
>   - **Dossiê renumerado I→XIV** (o menu lateral lê o `.roman` de cada `.section-head`, então bastou atualizar os
>     romanos + comentários; Biblioteca VII→VIII, Catálogo →IX, Anatomia →X, Padrões →XI, Mapa →XII, Entrega →XIII,
>     Aprendizados →XIV). **Nova sequência:** I Overview · II Desafio · III Meu papel · IV Solução · V Mandala &
>     módulos · **VI Um sistema único de status** · **VII Uma gramática visual** · VIII Biblioteca curada · IX
>     Catálogo ESG · X Anatomia · XI Padrões de viz · XII Mapa de riscos · XIII Entrega & impacto · XIV Aprendizados.
>   - Validado por parser: sequência I–XIV sem furos, `rag-states` só 1× (na VI), 0 erros de tag, i18n balanceado em
>     todas as seções.
>
> **Pendências agora:**
> 1. **Peça de impacto full-bleed** (`.pmo-impact`, placeholder circular) — a **Mandala navegável** de verdade: o JS
>    (`#mdWheel`/`#mdPanel`/`#mdSector`, 6 pilares + tabelas ilustrativas) está preservado e pronto; falta recriar o
>    **SVG base da roda** (6 gomos navy + medidor + `<path id="mdSector">`) e os alvos no HTML.
> 2. Rodar validação **ao vivo** quando a :5599 liberar (specimen popula? lightbox abre? count-up dispara? toggle
>    PT/EN re-renderiza specimen?).

> **RESET PARA ESQUELETO (2026-06-30, 2ª rodada).** A pedido do Lucas, a prancha foi **reduzida a um
> esqueleto** para reconstrução colaborativa seção por seção. O **menu lateral agora tem 13 seções**
> (auto-derivadas dos `.section-head` no `.lh-dossier__spine`), todas com **conteúdo em placeholder**
> (`.pmo-ph` — caixa tracejada com romano + nome + nota "conteúdo a construir"). A seção standalone
> "Argumento" (fora do dossiê) foi **removida** — Overview agora é a 1ª seção dentro do dossiê. O
> texto de argumento que o Lucas passou (autoria + escopo + 6 eixos + 5 módulos) **ainda não foi
> recolocado** — vai entrar quando construirmos Overview/Desafio.
>
> **Sequência nova (I–XIII):** I Overview · II Desafio · III Meu papel · IV Solução ·
> V Mandala & módulos · VI Indicadores reais · VII Biblioteca curada · VIII Catálogo ESG ·
> IX Anatomia · X Padrões de viz · XI Mapa de riscos · XII Entrega & impacto · XIII Aprendizados.
> **Peça de impacto (full-bleed):** entre o frontispício e o dossiê há uma seção `.pmo-impact`
> (espelha o coverflow do Lighthouse — momento visual largura-de-viewport antes do corpo). Hoje é
> um **placeholder circular** (evoca a roda da Mandala); vai receber a **Mandala Estratégica
> navegável**. Não tem `section-head`, então **não entra no menu lateral** (igual ao coverflow do LH).
> O bloco de metadados (Comissão/Papel/Período/Plataforma) foi **removido do rail** a pedido do Lucas.
> Cada uma é bilíngue (PT/EN) com gloss curto. **CSS `.pmo-ph` e `.pmo-impact`** adicionados ao `<style>` da página.
> Os scripts da Mandala/specimen e do lightbox **foram mantidos** (guardam com `if (el)` → no-op
> seguro sem alvos), prontos para religar quando o conteúdo voltar. Validado no preview (`portfolio`
> :5599): 13 links no dossiê, 13 seções, 13 placeholders, 0 erros de console, scroll-spy ativo,
> Overview ativo no índice. **O conteúdo antigo (Mandala navegável, tabelas, galerias, matriz de
> risco, specimen, princípios, resultados) foi removido do HTML** — referência abaixo descreve a
> versão anterior, a recriar peça por peça.

> **Reformulação grande concluída (2026-06-30).** A prancha `pmo-dashboards.html` foi reestruturada
> para espelhar o layout do case de referência `designbylucas.com/V2/samarco-dashboard.html`, no tema
> livro, com o **menu lateral "dossiê" do Lighthouse** (índice sticky + scroll-spy). Sequência atual
> (I–XII): I Argumento (+ faixa Overview) · II Cabine · **III Desafio antes/depois** · **IV Mandala
> navegável** (portada do lab — substituiu o SVG estático) · **V Sistema RAG** · **VI Módulos do
> Painel** (Gantt de ações + matriz de risco 5×5 reconstruídos no tema; ESG 9 grupos / Programas /
> Grupos como blocos editoriais) · VII Princípios (4, alinhados à V2) · VIII Atlas (galeria real) ·
> **IX Espécime** (specimen interativo portado do lab + 5 padrões de viz da V2) · X Resultados
> (+ entregáveis/impacto) · XI Errata · XII Instrumentarium. Cor: **híbrido** — Mandala/screenshots no
> tom real navy/lime; peças novas no tema livro com cores RAG preservadas. Validado por DOM no preview
> (`portfolio` :5599): 0 erros, dossiê 11 links + scroll-spy, Mandala 6 nós + painel troca por eixo,
> specimen 12 cards + filtro + token ao vivo, i18n PT/EN (painel re-renderiza no toggle), modo vela,
> 27 assets 200.

Pendências/refinos possíveis:
1. Se possível, pegar do Figma o node do **painel-tabela real** para acertar colunas/agrupamentos
   com mais fidelidade (hoje os dados da tabela são ilustrativos).
2. Avaliar reagrupar o **Atlas (VIII)** estritamente pelas famílias da V2 (Ambiental, Operacional,
   Social/Reputação, Governança, Pessoas, Risco) — hoje usa 4 grupos temáticos próximos.
3. O `samarco-lab.html` (sandbox) permanece como referência dos protótipos; pode ser aposentado se o
   Lucas confirmar que não precisa mais dele.
4. Padrões do portfólio mantidos: bilíngue PT/EN, `reveal`, responsividade (1280/1024/768/640/380),
   touch ≥44px, modo vela, disclaimer de dados ilustrativos no Colophão.

---

## 10. Notas de verificação

- **Preview:** `python -m http.server 5599` servindo a raiz do repo com `--directory Book`
  (config em `../.claude/launch.json`). Página em `:5599/projects/samarco-lab.html`.
- **Screenshot headless trava** nesta página pelo peso (roda + tabela + specs). Validar por
  **DOM** (contagens, posições, `getBoundingClientRect`, status de assets via `fetch`) — é o
  método confiável aqui. Console deve ficar limpo (0 erros).
