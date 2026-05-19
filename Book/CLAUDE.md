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
├── tweaks-panel.js              ← painel de "tweaks" reutilizável (dev only)
├── design-system/
│   ├── tokens.css               ← FONTE ÚNICA dos tokens (cor, type, espaço, easing)
│   ├── case-template.css        ← estilos da página de case (plate)
│   └── DESIGN-SYSTEM.md         ← documentação consultável do DS
└── projects/
    ├── case-template.html       ← página-base de case (template)
    ├── case-template.js         ← interações: reveal, marginalia, footnotes, lupa, progress
    └── calligraphy-demo.html    ← demo isolado de caligrafia traçada (avaliar antes de aplicar no Frontispiece)
```

**Regra de ouro:** ao mudar cor, tipo ou escala, editar **`design-system/tokens.css`** e atualizar a tabela correspondente em `DESIGN-SYSTEM.md`. Nunca redeclarar `:root` em outro CSS.

---

## Memória relevante

- `memory/MEMORY.md` — índice.
- `memory/project_portfolio_rules.md` — regras 1–9 detalhadas com Why/How to apply.
- `memory/project_lucas_bio_draft.md` — bio, métricas, jornada profissional do Lucas extraídos do código antigo. **Confirmar com ele antes de publicar.**

---

## Decisões já tomadas (não revisitar sem motivo)

- Tema "Noir Cinematográfico" foi **descartado** em 2026-05-13. Apagado da pasta.
- JSX foi **eliminado**. JS puro com `React.createElement` quando precisar de React.
- Estrutura de pastas: raiz simples + `design-system/` + `projects/`. Sem subpastas por feature.
- Taxonomia de case: `Argument · Dramatis Personæ · Acta · Plates · Errata · Colophon`.
- Navegação entre cases: Verso/Recto + atalho discreto "Return to catalogue" no chrome.
- **Efeito de flip 3D na troca PT/EN foi removido** em 2026-05-18 — troca instantânea.
- **Wax seal "Finis" e filigrana sob luz de vela foram removidos** em 2026-05-18 — não passaram no teste estético.
- **Foldable plate (orelha dobrada em hover)** foi **substituído por flip 3D com botão temático** em 2026-05-18. O hover colidia com a lupa.

---

## Features originais (2026-05-18)

- **Plate flip 3D** — cada `PlateCard` na seção Works tem um botão temático abaixo da lista de metadados (depois de "Dimensões") com glifo de pena + arco de retorno. Clicar gira a `.plate-image` em rotateY -180° e revela o verso, um placeholder de wireframe (papel pautado em grid + caixas-blocos abstratos + linhas-guia diagonais). Estado por-plate (cada cartão independente). Lupa fica desabilitada via `pointer-events: none` quando flipped. i18n PT/EN em `t.works.flip`.
- **Demo de caligrafia** — `projects/calligraphy-demo.html` standalone com 5 variações de velocidade/timing. Avaliar antes de aplicar no Frontispiece.

---

## Conteúdo pendente do Lucas

- Cases reais (Gen.AI, Lighthouse, PMO Dashboards ou outros) — problema, dramatis, atos, telas, métricas, erratas.
- Confirmação da bio rascunho preservada em memória.
- Decisão sobre i18n funcional (PT/EN) — hoje o toggle está inerte.
- Decidir qual variação da caligrafia traçada (i–v em `projects/calligraphy-demo.html`) aplicar no Frontispiece — ou descartar.
