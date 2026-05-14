---
title: "AI Context — Portfólio Lucas Schoenherr"
purpose: "Briefing denso e estruturado do portfólio completo, otimizado para leitura por agentes de IA (Claude, GPT, Gemini, etc.)."
audience: "LLM / AI assistant"
updated: 2026-04-24
maintainer: "Lucas Schoenherr"
read_time_target: "60 segundos"
tags: [_meta, ai-context, portfolio-index, briefing]
---

# AI Context — Portfólio Lucas Schoenherr

> **Para IAs lendo este vault pela primeira vez:** este arquivo é o ponto de entrada. Leia na ordem: §1 (pessoa) → §2 (regras) → §3 (projetos) → §6 (temas). Para cada projeto existe uma nota completa em `Projetos/<slug>/`. Nunca invente métricas ou stakeholders — use apenas o que está aqui ou nas notas referenciadas.

---

## 1. Snapshot da pessoa

```yaml
nome: Lucas Schoenherr
titulo_atual: Senior Product Designer
experiencia_anos: 13
base: Rio de Janeiro, Brasil
empregador_atual: Accenture — One Studio (Senior Product Designer)
empregos_anteriores:
  - Accenture — Vale Digital Lab (Product Design Specialist)
  - TI Vale / projetos corporativos (Designer)
clientes_diretos: [Vale, Accenture, DirecTV, Vivo, Samarco, FIFA]
expertise_core:
  - UX/UI end-to-end
  - Design Systems (produto e data-viz)
  - Produtos com IA — LLMs in-house, Generative AI, Creative AI
  - Discovery qualitativo + arquitetura de informação
  - Multi-plataforma (mobile, web, TV, desktop, BI)
ferramentas_principais: [Figma, Framer, Cursor, Claude]
linguas: [Português (nativo), Inglês (fluente)]
site_portfolio: https://lucasschoenherr.com
email: lucas.schoenherr@gmail.com
```

---

## 2. Regras para a IA (comportamento esperado)

1. **Fonte da verdade por projeto:** `Projetos/<nome>/<nome>.md`. Este `_AI-Context.md` é apenas índice.
2. **Disclaimer obrigatório:** números exibidos nos cases públicos podem ser fictícios/projeções (ver campo `disclaimer` em cada nota). Stakeholders e escopo são fatos.
3. **Confidencialidade:** Figmas originais são propriedade dos clientes (Samarco, DirecTV, Vale, Accenture). Nunca sugerir publicação externa de frames brutos.
4. **Ao resumir um projeto:** sempre usar o campo `pitch_frase` + `pitch_numero` do frontmatter — são as formulações aprovadas pelo autor.
5. **Padrão de resposta para entrevista:** formato STAR, 30–60s falados. Bancos prontos na §7 de cada nota.
6. **Antes de editar uma nota:** ler o template canônico em `Templates/Template - Projeto.md`.

---

## 3. Projetos catalogados (ordem de destaque)

### 3.1 Samarco — Dashboards PMO Estratégico `[2025 · entregue · destaque]`

```yaml
slug: samarco-dashboard
nota: "[[Samarco - Dashboard PMO]]"
cliente: Samarco (joint venture Vale + BHP)
setor: Mineração
papel: Senior Product Designer (end-to-end, solo no design)
periodo: "2025 — ~4 meses (Discovery + V1)"
plataforma: Web / Desktop (BI executivo)
stakeholders: [Diretoria, PMO Estratégico, Finanças, Riscos, TI/BI]
entregaveis: [Discovery, DS de data-viz +60 componentes, Protótipo V1, Handoff]
problema: "Portfólio estratégico fragmentado em +20 planilhas; 3–4 dias de consolidação manual por comitê; cada área com códigos de cor próprios."
solucao: "6 módulos (Visão Executiva, Portfólio, Projeto em detalhe, Riscos, CAPEX, OKRs) sobre DS próprio de data-viz com sistema RAG unificado (verde/amarelo/vermelho + 'sem dado' como 4º estado)."
key_results: ["6 módulos", "+60 componentes DS", "1 fonte da verdade (vs +20)", "~70% ↓ prep de comitê (projeção)"]
assinatura: "Design system como instrumento de governança corporativa."
pitch_frase: "Dashboard executivo não é decisão de gráfico — é decisão de governança."
visuais: "Inline SVG/CSS autoral (Figma original é confidencial)."
case_publico: samarco-dashboard.html
```

### 3.2 Lighthouse — Vale `[mobile-first · entregue · destaque]`

```yaml
slug: lighthouse-vale
nota: "[[Lighthouse - Vale]]"
cliente: Vale (mineração)
setor: Mineração / Operações
papel: Senior Product Designer (end-to-end)
plataforma: Mobile App (iOS + Android)
entregaveis: [Discovery, UX/UI, Design System, MVP navegável, Handoff]
problema: "Sistemas legados de monitoramento de produção, desktop-only, sem alerta em tempo real para equipes de campo."
solucao: "App mobile-first que substitui desktops legados — visualização de dados de produção em tempo real, notificações personalizáveis, comunicação entre equipes."
key_results: ["MVP entregue para dev", "Design System próprio", "Mobile-first substituindo legado desktop"]
assinatura: "Design system como ponte entre contexto operacional (campo) e corporativo (sala de controle)."
case_publico: lighthouse-app.html
```

### 3.3 Sports Experience — DirecTV (Copa Qatar 2022) `[multi-plataforma · entregue · destaque]`

```yaml
slug: sports-experience-directv
nota: "[[Sports Experience - DirecTV]]"
cliente: DirecTV GO
setor: Streaming / Mídia esportiva
papel: Senior Product Designer (liderança de design cross-empresa)
periodo: "2022 — pré-Copa do Mundo Qatar"
plataforma: Mobile + Web + TV (3 superfícies)
regioes: [Brasil, América Latina]
stakeholders: [DirecTV (design+produto), FIFA (dados oficiais), Accenture (dev+QA)]
entregaveis: [Design System cross-platform, 5 módulos, Handoff contínuo]
problema: "Prazo imóvel (estreia da Copa) + diferenças regulatórias BR × LatAm + dados FIFA em tempo real variáveis."
solucao: "Design system único com tokens de plataforma + regionalização como configuração (não fork). 5 módulos: Home, Calendário, Partida ao vivo, Perfil, Multi-plataforma."
key_results: ["3 plataformas", "2 regiões", "64 partidas ao vivo cobertas", "100% on-time", "0 fork de produto"]
assinatura: "Regionalização como configuração, não como fork."
pitch_frase: "Quando o prazo é imóvel, design vira negociação — escopo, regionalização e dados em tempo real precisam caber na mesma semana."
case_publico: Sportsexp.html
```

### 3.4 Gen.AI — Accenture One Studio `[9 POCs · ecossistema · destaque]`

```yaml
slug: gen-ai-accenture
nota: "(ainda não catalogado no Obsidian — ver GenAI.html)"
cliente: Accenture — One Studio (iniciativa interna)
setor: Consultoria / IA generativa
papel: Lead Product Designer (end-to-end)
plataforma: Web / desktop (aplicações internas)
entregaveis: [Discovery, 9 POCs em paralelo, Design System unificado, Handoffs]
problema: "Validar potencial da GenAI em processos internos (DevOps, engenharia, jurídico, marketing, supply chain) sem criar 9 produtos desconectados."
solucao: "9 POCs desenhadas em paralelo sobre um único design system — economia de tempo, coerência visual, DS vira ativo reutilizável pós-projeto."
key_results: ["9 POCs", "3–5 evoluíram para desenvolvimento", "DS virou ativo reutilizável para iniciativas posteriores"]
assinatura: "Design system multiplica velocidade de POC — uma árvore, nove frutos."
case_publico: GenAI.html
status_obsidian: pendente_catalogar
```

---

## 4. Galeria / trabalhos secundários

> Presentes na masonry gallery de `index.html`, sem página própria de case.

| Item | Cliente | Tipo |
|---|---|---|
| Vale News | Vale | Mobile App (UI/UX) |
| Vale — Leap to the new branding | Vale | Rebrand (múltiplas mídias) |
| Vale PowerBI Dashboard | Vale | BI / UX |
| Accenture — Múltiplos sistemas de AI | Accenture | AI / UI/UX |
| MeliPlay | Mercado Livre (challenge) | UX Challenge (pasta `MeliPlay/` no repo) |

---

## 5. Tabela-resumo (leitura rápida)

| Projeto | Cliente | Ano | Papel | Plataforma | Status | Assinatura |
|---|---|---|---|---|---|---|
| Samarco Dashboards PMO | Samarco | 2025 | Senior PD (solo) | Web/BI | Entregue V1 | DS como governança |
| Lighthouse | Vale | — | Senior PD | Mobile | Entregue MVP | Mobile-first substitui legado |
| Sports Experience | DirecTV | 2022 | Senior PD | Mobile/Web/TV | Entregue | Regionalização como config |
| Gen.AI | Accenture | — | Lead PD | Web | Entregue (múltiplas POCs) | DS multiplica POCs |

---

## 6. Temas transversais (padrões recorrentes no portfólio)

1. **Design System como instrumento de negociação.** Aparece em todos os 4 cases destacados — DS não é galeria de componentes, é ferramenta política/operacional para destravar escopo, prazo ou governança.
2. **End-to-end sozinho ou liderando.** Em 3 dos 4 cases destaque, Lucas foi o único designer (Samarco, Lighthouse, Sports). No Gen.AI atuou como Lead. Padrão de **senioridade de escopo**, não só de execução.
3. **Trabalho com restrição extrema.** Prazo imóvel (Sports), confidencialidade (Samarco), contexto operacional hostil (Lighthouse), paralelismo de 9 frentes (Gen.AI). O portfólio é propositalmente um catálogo de **design sob restrição**.
4. **Data-viz e densidade informacional.** Samarco (data-viz DS), Lighthouse (produção em tempo real), Sports (estatísticas FIFA), Gen.AI (outputs de LLM) — todos lidam com *alta densidade de informação sob pressão de decisão*.
5. **Confidencialidade e reconstrução autoral.** Todos os Figmas originais são de propriedade do cliente; o portfólio público usa reconstruções (ex: Samarco em SVG/CSS, Sports com screenshots anonimizados).

---

## 7. Taxonomia de tags usadas no vault

```yaml
dominios: [projeto, case-study, design-system, data-visualization, ai, llm, genai, mobile-app, dashboard, multiplatform, mvp, poc]
setores: [mineração, streaming, consultoria, esportes, pmo]
clientes_tag: [vale, samarco, directv, accenture, fifa]
papel: [senior-product-designer, lead-product-design, product-design-specialist]
meta: [_meta, ai-context, portfolio-index, briefing]
```

---

## 8. Estrutura do vault (para navegação pela IA)

```
Vaults/Work/
├── _AI-Context.md                       ← este arquivo (briefing global)
├── Templates/
│   └── Template - Projeto.md            ← template v2 canônico para novas notas
└── Projetos/
    ├── Lighthouse - Vale/
    │   ├── Lighthouse - Vale.md
    │   └── assets/                      ← imagens embedadas (.webp, .png)
    ├── Sports Experience - DirecTV/
    │   ├── Sports Experience - DirecTV.md
    │   └── assets/
    └── Samarco - Dashboard PMO/
        ├── Samarco - Dashboard PMO.md
        └── assets/                      ← Capa.svg (reconstrução)
```

### Estrutura interna padrão de cada nota de projeto (10 seções)

```
Frontmatter (28 campos)
§0  TL;DR · Key Results · Pitch-bandeira · Links rápidos · Disclaimer
§1  Contexto (empresa, problema, hipótese)
§2  Meu papel (eu / time / decisões finais / rituais)
§3  Processo (Discovery · Definição · Design · Validação · Handoff)
§4  Solução (módulos com objetivo + decisão-chave)
§5  Métricas & impacto (tabela antes/depois · premissas · evidências · o que não deu certo)
§6  Aprendizados + "o que faria diferente hoje"
§7  Banco de perguntas STAR para entrevista (~14 perguntas, 5 blocos)
§8  Artefatos · §8b Galeria
§9  Notas soltas / ideias
§10 Log de atualizações
```

---

## 9. Campos de frontmatter canônicos (usar ao criar novas notas)

```yaml
# Identificação: title, subtitulo, cliente, setor, ano, periodo, status, destaque, disclaimer, pitch_frase, pitch_numero
# Envolvimento: papel, squad, escopo, stakeholders, time
# Stack: plataforma, ferramentas, metodologias, entregaveis
# Links: portfolio_url, figma_url, deck_url, repo_url, case_publico
# Organização: tags, relacionados, criado, atualizado
```

---

## 10. Backlog de documentação (prioridade)

- [ ] **Gen.AI — Accenture** (alto · case destacado no portfólio público, ainda sem nota)
- [ ] `Projetos/_Index.md` com Dataview listando projetos catalogados
- [ ] Catalogar itens da galeria secundária (Vale News, PowerBI, Leap branding) — baixa prioridade
- [ ] MeliPlay (UX Challenge Mercado Livre) — decidir se entra como case completo ou fica só no repo

---

*Atualize este arquivo sempre que: (a) um novo projeto for catalogado, (b) um projeto pendente sair do backlog, (c) mudarem papéis/cargo/stack principal de Lucas, ou (d) novos padrões transversais emergirem do conjunto.*
