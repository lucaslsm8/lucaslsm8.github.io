# Lighthouse redesign — notes (from designbylucas.com/lighthouse-app.html)

## Goal
Redesign content presentation FROM section II "Minha Participação" onward.
Keep old-book portfolio theme (tokens: paper/ink/oxblood/cobalt, EB Garamond / Instrument Serif / JetBrains Mono).
Adopt a LEFT STICKY SIDEBAR nav + RIGHT SCROLL content layout (like the reference).
Keep intact above the redesign: hero/frontispiece (0), coverflow interlude, section I Argumento.

## Reference sidebar nav (book-ize the labels)
Overview · Desafio · Papel · Solução · Entrega · Galeria
Book labels idea: "Index Capitulorum" sidebar -> V. Argumentum / VI. Officium (Papel) / VII. Solutio / VIII. Acta (Entrega) / IX. Tabulæ (Galeria). Keep PT/EN toggle working.

## Sidebar meta block (top of sidebar)
Tipo: Aplicativo Mobile · Ano: 2023 · Papel: Lead Product Designer · Cliente: Vale

## Section content (PT — translate EN alongside, keep .t lang spans)

### Overview do Projeto
O Lighthouse representa uma transformação significativa na forma como a Vale monitora e gerencia sua produção. Nascido da necessidade de modernizar um sistema legado, concebido para substituir uma solução baseada em intranet que já não atendia às demandas de segurança e usabilidade.
Como Lead Product Designer, liderei o desenvolvimento de uma solução mobile-first que unifica dados críticos de múltiplos corredores em uma única interface intuitiva. Dois objetivos: agilizar a tomada de decisão via visualizações em tempo real, e criar canal de comunicação eficiente entre equipes via notificações personalizáveis.
Abordagem MVP focada no corredor norte: dados em tempo real, permissões hierárquicas, comunicação entre equipes. Bases para expansão futura (geolocalização, upload de imagens, mapas interativos).
Images: Overview/Overview1..5.png

### O Desafio
Sessões de Design Thinking com stakeholders e usuários-chave revelaram desafios críticos.
Sistema legado (intranet): interface desatualizada, problemas de segurança, UX inadequada. Gerentes não acessavam informações críticas em tempo hábil.
Maior desafio de design: interface mobile que apresenta grande volume de dados complexos de forma clara. Equilibrar densidade x usabilidade em telas menores, considerando níveis de permissão e perfis.
Images: Desafio/Workflow.png, Desafio/Workflow2.png (workflow/fluxos)

### Meu Papel
Metodologia ágil; processo de design focado em escalabilidade, ênfase em componentização e melhores práticas mobile/web. Produto robusto preparado para expansão.
Gestão de relacionamentos e expectativas: reuniões semanais de alinhamento com stakeholders, dev e usuários-chave — atualizações, feedback, negociação de prazos.
Entrega: protótipo otimizado e completamente navegável, design system integrado e preparado para escala. Aprendizados em gestão de projetos, negociação, componentização.

### A Solução
Foco em modularidade e escalabilidade; experiência mobile intuitiva, acesso rápido a info crítica. Coração: cards responsivos com dados em tempo real + sistema de cores (verde, amarelo, azul, vermelho) para prioridade/status.
Sistema robusto: 8 variações de cards de informação, cada um otimizado p/ tipo de dado/contexto. Hierarquia visual prioriza info-chave no feed; detalhamentos via interações.
Notificações altamente personalizáveis: filtros por área (porto, minas, ferrovias). Componentes: filtros dinâmicos, indicadores de status, visualizações gráficas. Base p/ comentários, upload de imagens, mapas interativos.
Arquitetura modular; reusabilidade e consistência.
Images (card system, 4 prioridade colors x 3 densities): Solucao/Cardg|Cardb|Cardy|Cardr.webp (full), compactg|b|y|r.webp (compact), ultrag|b|y|gr.webp (ultra). g=verde b=azul y=amarelo r=vermelho.

### A Entrega
Apresentação final do MVP recebida com entusiasmo. Demonstração de funcionalidades, implementação e projeções futuras; feedback positivo e interesse em expansão.
Protótipo cumpriu todos os objetivos; destaque p/ visualização e compartilhamento de dados em tempo real. Design moderno e intuitivo elogiado.
Encaminhado ao time de desenvolvimento avançado da Vale com documentação detalhada e design system robusto. Bases para implementações futuras já mapeadas.
Image: Impacto/Porto.png

### Galeria
Materiais complementares: detalhamentos de componentes, telas adicionais, materiais de apresentação. Visão ampla do processo e complexidade.
Images: Galeria/MVP.png, Galeria/mock.png, Galeria/Components.png (full width)

## NOTE on images
Reference images live on designbylucas.com (Overview/, Desafio/, Solucao/, Impacto/, Galeria/). NOT yet in our project. Imported project images are under Book/images/lighthouse/ (coverflow/ + others — need to ls to see what's available). Must map redesign image slots to whatever exists in Book/images/lighthouse/, OR download the reference images, OR use striped placeholders. CHECK Book/images/lighthouse/ contents first next turn.
