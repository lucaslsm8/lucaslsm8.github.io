# TODO — backlog vivo

> Itens em aberto e decisões pendentes. Manter curto.

## Feito recentemente (2026-06-11)
- **Nova seção "Pranchas menores" (Miscellanea)** adicionada ao `index.html` — entre o Catálogo de obras (Cap. II) e o Aparato técnico (Cap. III). Componente React `MinorWorks` em `catalogue.js`; estilos `.ot-reel`/`.reel-lightbox` em `catalogue.css`; dados `minorWorks` (PT/EN). É um **rolo de filme 35 mm** full-bleed em loop infinito; clicar numa prancha amplia num lightbox com setas/teclado e scroll para imagens altas. Perfurações = SVG inline repetido (sem assets pesados).
- Imagens da seção em `images/other/` (WebP): `sirio`, `valenews`, `cracha` (cantos preenchidos), `data` (Power BI), `ai`. PNGs de origem convertidos e apagados.
- Removida a seção "Sobre o método" do index; capítulos renumerados (I Prefácio · II Catálogo · III Aparato · IV Correspondência).
- Lixo do sistema removido (`.thumbnail`, `.fuse_hidden…`).

## Pendências

### Conteúdo / decisões
- **Seção "Especialidade"** — 3 variantes prontas em `projects/secoes-novas-demo.html` (Quatro princípios · Disciplinas ilustradas · Verbetes iluminados). **Escolher uma e integrar** ao index. Imagens em `images/services/` (ui/ux/ds/ai.webp).
- **"Outros trabalhos"** — variante 3 (fita de filme) foi escolhida e integrada. Variantes 1 (cartela) e 2 (registro) seguem só na demo, para referência.

### Bugs / consertos
- **Links quebrados nas pranchas do Catálogo:** `catalogue.js` aponta para `projects/pmo-dashboards.html` e `projects/lighthouse.html`, que **não existem**. Só `genai.html` existe. Decidir: criar as páginas, ou desativar/ajustar os `href` até existirem.

### Limpeza adiada (a confirmar antes de apagar)
- ~~**Legado órfão**: `projects/mockup-showcase.html`, `projects/specimen.html`, `projects/specimen.js`, `design-system/specimen.css`.~~ **Apagados em 2026-06-11.** Também apagado o órfão `errata-scene.js`.
- ~~Vitrine + Parecer espalhados em vários arquivos.~~ **Fundidos em 2026-06-11** num trio único: `projects/projects.{html,css,js}`; `vitrine.*` e `parecer-do-editor.*` apagados.
- **Código morto do "Método"** (não é mais renderizado): em `catalogue.js` a função `Method`, `ProcessDiamond`, `PP_SVG` e os dados `method:` (PT/EN); em `catalogue.css` os blocos `.method`, `.method-credo`, `.pp`. Manter `.tenets/.tenet` enquanto a demo de especialidade os usar.
- Avaliar demo standalone não linkada do index: `projects/cv-slip-demo.html`. (`case-template.*` segue como página-base do template.)

### Notas de ambiente
- O preview/sandbox às vezes atrasa a sincronização de edições grandes — se algo não aparecer, dar **hard refresh** (Ctrl/Cmd+Shift+R).
