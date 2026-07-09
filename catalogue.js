// catalogue.jsx — A Catalogue Raisonné (editorial publication)

const {
  useState,
  useEffect,
  useRef
} = React;

/* ============================================================
   CV Timeline — posição e largura de cada período na régua
   Coordenadas em anos; used by Apparatus visual timeline.
   ============================================================ */
const CV_TIMELINE = [
  { start: 2024, end: 2026, current: true },
  { start: 2022, end: 2024 },
  { start: 2020, end: 2022 },
  { start: 2019, end: 2020 },
  { start: 2011, end: 2019 }
];
const CV_FIRST = 2011;
const CV_LAST  = 2026;
const CV_SPAN  = CV_LAST - CV_FIRST; // 15 anos

/* ============================================================
   i18n — bilingual content
   ============================================================ */
const CONTENT = {
  pt: {
    runningHead: "Lucas Schoenherr · Catálogo de Obras",
    stamp: "Volume I · MMXXVI",
    title: ["Lucas", "Schoenherr"],
    sub: ["Um catálogo de obras em ", {
      it: "design de produto"
    }, ", com notas sobre método, sistemas e interfaces generativas."],
    smallcaps: "Privately set & published",
    meta: ["Rio de Janeiro, Brasil", "Treze anos de prática contínua", "Volume I · Composto em 2026"],
    invite: "Vire a página",
    epigraph: ["O melhor design é ", {
      em: "discreto"
    }, ". Sistemas eficazes promovem a ", {
      em: "criatividade"
    }, ". Rigor e empatia podem coexistir. A inteligência artificial, em vez de substituir o trabalho humano, ", {
      em: "amplia seu alcance"
    }, "."],
    epigraphAttr: ["— do prefácio", "L. S."],
    toc: {
      label: "Sumário",
      num: "iii",
      rows: [{
        num: "I.",
        title: ["Prefácio do autor"],
        page: "iv",
        href: "#preface"
      }, {
        num: "II.",
        title: ["Catálogo de obras"],
        page: "viii",
        href: "#works"
      }, {
        num: "III.",
        title: ["Artes do ofício"],
        page: "xii",
        href: "#specialties"
      }, {
        num: "IV.",
        title: ["Aparato técnico"],
        page: "xvi",
        href: "#apparatus"
      }, {
        num: "V.",
        title: ["Correspondência"],
        page: "xx",
        href: "#contact"
      }]
    },
    preface: {
      label: "Capítulo I",
      title: ["Prefácio"],
      page: "iv",
      glossLeft: ["¹ Rio de Janeiro", "Estado do Rio de Janeiro", "lat. -22.90"],
      glossRight: ["² O termo \"catálogo raisonné\"", "designa, na tradição editorial", "a compilação crítica das obras", "de um autor — geralmente", "publicada póstuma. Aqui,", "tomamos a liberdade do", "presente."],
      portrait: "L. Schoenherr",
      portraitCap: ["O autor, retratado em estúdio."],
      body: [[{img: {src: "images/home/S.webp", alt: "S", className: "drop-cap"}}, "ou Lucas Schoenherr, designer de produto sênior, baseado no Brasil¹. Esta publicação reúne, num único volume, treze anos de prática em design — com notas sobre método, sistemas, interfaces para modelos de linguagem, e sobre as ", {
        it: "questões inacabadas"
      }, " que continuam a animar o trabalho."], ["Como ", {
        it: "catálogo raisonné"
      }, "², o presente volume não pretende ser exaustivo. Reúne, antes, as obras mais representativas — aquelas que melhor exemplificam a ", {
        strong: "espinha dorsal"
      }, " do ofício: clareza, sistema, velocidade e impacto."], ["Trabalhei nos últimos anos em iniciativas para Vale, Samarco e times de produto diversos, em escala corporativa. Hoje, minha atenção está dirigida à fronteira entre ", {
        strong: "design e inteligência artificial generativa"
      }, " — onde se desenham, pela primeira vez na história, interfaces para máquinas que ", {
        it: "respondem como pessoas"
      }, "."]],
      footnotes: [["¹", " Atualmente no Rio de Janeiro, RJ. Disponível para correspondência em qualquer fuso, com leve preferência por ", {
        it: "manhã, café."
      }], ["²", " ", {
        it: "Catalogue raisonné"
      }, " (fr.): compilação crítica das obras de um autor, ordenadas, anotadas, e — convencionalmente — póstuma. Esta publicação, evidentemente, toma a liberdade do presente."]]
    },
    works: {
      label: "Capítulo II",
      title: ["Catálogo de obras"],
      page: "viii",
      intro: "Três obras representativas, montadas como telas e dispostas em ordem cronológica decrescente. Examine cada tela de perto com a lupa, vire-a para ver o esboço no verso — ou abra a ficha completa.",
      flip: {
        toVerso:     "Ver o verso",
        toRecto:     "Voltar ao anverso",
        ariaVerso:   "Virar a prancha para revelar o wireframe do verso",
        ariaRecto:   "Virar a prancha de volta para a arte final",
        versoLabel:  "Wireframe",
        versoCaption:"Estado anterior · esboço de composição",
        turnVerso:   "Verso",
        turnRecto:   "Anverso"
      },
      plates: [{
        roman: "Quadro I",
        num: "001",
        title: ["Lighthouse", {
          reg: ""
        }],
        sub: "Vale · Mobile · Industrial · 2023",
        meta: [{
          dt: "Comissão",
          dd: "Vale — Corredor Logístico Norte"
        }, {
          dt: "Função",
          dd: "Lead Product Designer · Mobile"
        }, {
          dt: "Período",
          dd: "2023 (~6 meses)"
        }, {
          dt: "Materiais",
          dd: "Figma, Miro, DS mobile"
        }, {
          dt: "Dimensões",
          dd: "iOS · Android · +40 comp. DS"
        }],
        desc: [["Uma aplicação projetada para substituir a intranet legada do corredor logístico norte da Vale. Dados de produção passaram a ser acessíveis aos gestores em qualquer lugar, não restritos à sala de controle."], ["Atuei como único designer. Conduzi a fase de discovery, criei o ", {
          strong: "design system com mais de quarenta componentes"
        }, " e um protótipo aprovado por todas as áreas envolvidas. A arquitetura modular foi projetada para escalar a outros corredores logísticos."]],
        stats: [{
          val: "+40",
          lab: "Componentes\nno design system"
        }, {
          val: "~200",
          lab: "Gestores\nimpactados"
        }, {
          val: "02",
          lab: "Plataformas\niOS · Android"
        }],
        link: "ler a ficha completa",
        href: "projects/lighthouse.html",
        imgClass: "plate-img-3",
        quadro: {
          front: "images/lighthouse/paint-front.webp",
          back:  "images/lighthouse/paint-back.webp",
          side:  "images/home/paint-side.webp"
        }
      }, {
        roman: "Quadro II",
        num: "002",
        title: ["Dashboards", {
          reg: " PMO"
        }],
        sub: "Samarco · PMO Estratégico · 2025",
        meta: [{
          dt: "Comissão",
          dd: "Samarco — PMO Estratégico"
        }, {
          dt: "Função",
          dd: "Senior Product Designer · End-to-end"
        }, {
          dt: "Período",
          dd: "2025 (~4 meses)"
        }, {
          dt: "Materiais",
          dd: "Figma, DS de data-viz, sistema RAG"
        }, {
          dt: "Dimensões",
          dd: "Mandala · 6 módulos · +60 comp."
        }],
        desc: [["Projeto da cabine de comando executiva do PMO Estratégico da Samarco. A ", {
          strong: "Mandala Estratégica"
        }, " ocupa o centro: uma visualização hexagonal que reúne os seis eixos da estratégia em um painel único e verificável."], ["O desafio era substituir mais de vinte planilhas conciliadas manualmente por uma interface capaz de destacar desvios sem excesso de ruído. Também era necessário unificar, ", {
          it: "pela primeira vez"
        }, ", a linguagem visual de Finanças, Riscos, Sustentabilidade e Operações."]],
        stats: [{
          val: "+60",
          lab: "Componentes\ndata-viz"
        }, {
          val: "06",
          lab: "Módulos\nintegrados"
        }, {
          val: "20+",
          lab: "Planilhas\nsubstituídas"
        }],
        link: "ler a ficha completa",
        href: "projects/pmo-dashboards.html",
        imgClass: "plate-img-2",
        quadro: {
          front: "images/samarco/paint-front.webp",
          back:  "images/samarco/paint-back.webp",
          side:  "images/home/paint-side.webp"
        }
      }, {
        roman: "Quadro III",
        num: "003",
        title: ["Sports", {
          reg: " Experience"
        }],
        sub: "DirecTV · Multiplataforma · Copa 2022",
        meta: [{
          dt: "Comissão",
          dd: "DirecTV GO — Copa 2022"
        }, {
          dt: "Função",
          dd: "Senior Product Designer"
        }, {
          dt: "Período",
          dd: "2022 (Copa do Qatar)"
        }, {
          dt: "Materiais",
          dd: "Figma, DS multiplataforma, dados FIFA"
        }, {
          dt: "Dimensões",
          dd: "Mobile · Web · TV · 64 partidas"
        }],
        desc: [["Uma plataforma que reúne ", {
          strong: "mobile, web e TV"
        }, " em um só percurso. Estatísticas oficiais da FIFA chegam em tempo real; o conteúdo se adapta ao contexto do Brasil e da América Latina. O objetivo: fazer da Copa do Mundo de 2022 uma experiência contínua, não fragmentada."], ["O trabalho exigiu alinhar design, desenvolvimento e dados sob um prazo que não admitia extensão. A solução foi um ", {
          it: "sistema de design único"
        }, ", capaz de sustentar a experiência do usuário do mobile à TV sem perder o rigor."]],
        stats: [{
          val: "03",
          lab: "Plataformas\nmobile · web · TV"
        }, {
          val: "64",
          lab: "Partidas\nao vivo"
        }, {
          val: "02",
          lab: "Versões\nregionais"
        }],
        link: "ler a ficha completa",
        href: "projects/sports-experience.html",
        imgClass: "plate-img-2",
        quadro: {
          front: "images/sports/paint-front.webp",
          back:  "images/sports/paint-back.webp",
          side:  "images/home/paint-side.webp"
        }
      }, {
        roman: "Quadro IV",
        num: "004",
        title: ["Gen", {
          reg: "."
        }, "AI"],
        sub: "Accenture · Design System · GenAI · 2023 — 2024",
        meta: [{
          dt: "Comissão",
          dd: "Accenture — One Studio"
        }, {
          dt: "Função",
          dd: "Lead Product Designer · UI · Sistema"
        }, {
          dt: "Período",
          dd: "2023 — 2024 (~3 meses)"
        }, {
          dt: "Materiais",
          dd: "Figma, Variables, padrões para LLMs"
        }, {
          dt: "Dimensões",
          dd: "9 POCs"
        }],
        desc: [["Como designer líder do programa na Accenture One Studio, desenvolvi ", {
          strong: "nove provas de conceito"
        }, " de IA generativa em DevOps, jurídico, marketing e supply chain, todas integradas por um design system dedicado."], ["A premissa era ", {
          it: "desenhar o sistema antes dos produtos"
        }, ". Como resultado, cinco POCs avançaram para protótipo e desenvolvimento, e o vocabulário de UX para IA generativa serviu de base para iniciativas futuras na empresa."]],
        stats: [{
          val: "09",
          lab: "POCs\nentregues"
        }, {
          val: "05",
          lab: "Avançaram\npara dev"
        }, {
          val: "~3m",
          lab: "End-to-end"
        }],
        link: "ler a ficha completa",
        href: "projects/genai.html",
        imgClass: "plate-img-1",
        format: "wide"
      }]
    },
    method: {
      label: "Capítulo III",
      title: ["Sobre o método"],
      page: "xii",
      credo: ["Acredito que o melhor design é ", {
        ox: "invisível."
      }, " Que sistemas bem feitos liberam ", {
        reg: "criatividade."
      }, " Que rigor e calor ", {
        reg: "podem coexistir."
      }, " E que a IA, longe de substituir o ofício, ", {
        ox: "o expande."
      }],
      tenets: [{
        num: "i.",
        glyph: "✱",
        title: "Clareza",
        desc: "Cada elemento tem propósito. Hierarquia que orienta, não distrai."
      }, {
        num: "ii.",
        glyph: "◊",
        title: "Sistema",
        desc: "Decisões reutilizáveis. Consistência sem sacrificar personalidade."
      }, {
        num: "iii.",
        glyph: "→",
        title: "Velocidade",
        desc: "Decidir rápido em low-fi, polir devagar em hi-fi."
      }, {
        num: "iv.",
        glyph: "✶",
        title: "Impacto",
        desc: "Métricas de negócio e métricas humanas — ambas importam."
      }],
      diagram: {
        spaces: [
          { label: "Espaço do problema", sub: "achar a coisa certa" },
          { label: "Espaço da solução", sub: "fazer a coisa bem feita" }
        ],
        flow: { diverge: "divergir", converge: "convergir" },
        nodes: [{
          roman: "I",
          name: "Descobrir",
          note: "Entrevistas · Dados"
        }, {
          roman: "II",
          name: "Definir",
          note: "Síntese · Hipóteses"
        }, {
          roman: "III",
          name: "Desenhar",
          note: "Wireframes · Sistema"
        }, {
          roman: "IV",
          name: "Entregar",
          note: "QA · Métricas"
        }],
        loop: "↻  duplo diamante, em iteração contínua — nunca em cascata."
      }
    },
    minorWorks: {
      label: "Miscellanea",
      title: ["Pranchas menores"],
      page: "xi",
      hint: "clique numa prancha para ampliar",
      items: [
        { roman: "Prancha I", title: "Aplicativo Sírio-Libanês", tag: "Mobile App · UI/UX", img: "images/other/sirio.webp",
          desc: "Aplicativo do Hospital Sírio-Libanês: oferece jornada do paciente, agendamento e acesso ao prontuário em uma experiência mobile clara e acolhedora.",
          label: "Sírio-Libanês", labelSub: "Mobile · UI/UX" },
        { roman: "Prancha II", title: "Vale News", tag: "Mobile App · UI/UX", img: "images/other/valenews.webp",
          desc: "O aplicativo de comunicação interna da Vale oferece notícias, comunicados e informações sobre a cultura organizacional diretamente aos colaboradores.",
          label: "Vale News", labelSub: "Mobile · UI/UX" },
        { roman: "Prancha III", title: "Leap to the new branding", tag: "Vale · múltiplas mídias", img: "images/other/cracha.webp",
          desc: "Aplicação do novo branding da Vale em diversas mídias gráficas, digitais e físicas, abrangendo desde crachás até sinalização.",
          label: "New branding", labelSub: "Vale · mídias" },
        { roman: "Prancha IV", title: "Power BI Dashboard", tag: "Vale · data viz", img: "images/other/data.webp",
          desc: "Painéis de visualização de dados no Power BI para a Vale: indicadores operacionais transformados em informações que apoiam decisões antecipadas.",
          label: "Power BI", labelSub: "Vale · data viz" }
      ],
      close: "Fechar", prev: "Prancha anterior", next: "Próxima prancha"
    },
    specialties: {
      label: "Capítulo III",
      title: ["Artes do ofício"],
      page: "xii",
      intro: "Treze anos de prática end-to-end — do discovery à entrega — unindo estratégia de produto, design centrado no usuário, design systems e experiências AI-native, com liderança cross-functional.",
      ui: { index: "Índice do ofício", entries: "quatro verbetes", plate: "Prancha", of: "de", keywords: "Palavras-chave", terms: "termos", prev: "Prancha anterior", next: "Próxima prancha", hint: "use as setas ou os marcadores para folhear" },
      items: [
        { roman: "I", img: "images/services/ai.webp", alt: "Estudo de IA generativa",
          title: "IA Generativa", cat: "GenAI · AI-native",
          desc: "Design de produtos AI-native de ponta a ponta: interfaces conversacionais, fluxos com LLMs e agentes — do discovery e prototipação à prova de conceito validada.",
          kw: ["LLM", "Agentic UX", "Prompt Design", "Conversational UI"] },
        { roman: "II", img: "images/services/ux.webp", alt: "Wireframes e mapeamento de jornada",
          title: "Experiência", cat: "UX · Research",
          desc: "Pesquisa com usuários, testes de usabilidade e arquitetura de informação — discovery centrado no usuário, orientado por dados, que eleva satisfação e retenção.",
          kw: ["User Research", "Usability Testing", "Journey Mapping", "Data-driven"] },
        { roman: "III", img: "images/services/ui.webp", alt: "Estudo de interface",
          title: "Interface", cat: "UI · Visual",
          desc: "Do wireframe ao pixel: interaction design, design visual, motion e acessibilidade (WCAG) — design responsivo que traduz complexidade em clareza e converte.",
          kw: ["Interaction Design", "Prototyping", "Accessibility", "Responsive"] },
        { roman: "IV", img: "images/services/ds.webp", alt: "Componentes e tokens",
          title: "Design Systems", cat: "DS · DesignOps",
          desc: "Design systems escaláveis em Figma — design tokens, bibliotecas de componentes e governança (DesignOps) que aceleram times e garantem consistência.",
          kw: ["Design Tokens", "Component Library", "Figma", "DesignOps"] }
      ]
    },
    apparatus: {
      label: "Capítulo IV",
      title: ["Aparato técnico"],
      page: "xvi",
      intro: "Instrumentos correntes e cronologia de prática.",
      tools: {
        label: "Instrumentos",
        sup: "tab. i",
        groups: [{
          roman: "i",
          label: "Design & Prototipação",
          list: ["Figma", "FigJam", "Framer", "Photoshop", "Illustrator"]
        }, {
          roman: "ii",
          label: "Pesquisa & Testes",
          list: ["Maze", "Mural", "Miro", "Flowmapp"]
        }, {
          roman: "iii",
          label: "IA & Desenvolvimento",
          list: ["Claude", "Claude Design", "Cursor", "Google Antigravity", "VS Code", "Azure DevOps"]
        }, {
          roman: "iv",
          label: "Produtividade & Colaboração",
          list: ["Notion", "Milanote", "Obsidian", "Jira", "Agile / Scrum"]
        }]
      },
      langs: {
        label: "Idiomas falados",
        sup: "tab. ii",
        list: [{
          name: "Português",
          level: "Nativo"
        }, {
          name: "English",
          level: "Advanced"
        }, {
          name: "Español",
          level: "Intermediate"
        }]
      },
      cv: {
        label: "Cronologia de prática",
        sup: "tab. iii",
        rows: [{
          period: "2022 — 2024",
          role: "Designer de Produto Especialista (UI/UX)",
          firm: "Accenture · One Studio",
          current: true,
          bullets: [
            "Design de POCs e produtos baseados em LLMs, incluindo LLMs in-house na VIVO.",
            "Design systems reutilizáveis e governança de componentes.",
            "Dashboards executivos e visualização de dados.",
            "Projetos para hospitais e instituições de saúde.",
            "Colaboração na transmissão da Copa do Mundo com a FIFA.",
            "Segurança de barragens e minas para a Vale.",
            "Entrega de protótipos e POCs, nacional e internacionalmente."
          ]
        }, {
          period: "2020 — 2022",
          role: "Designer de Produto Sênior (UI/UX)",
          firm: "Accenture · Vale Digital Lab",
          bullets: [
            "Liderança e gestão do time de design do Digital Lab.",
            "Sistema de pesquisa apoiado em metodologias de UX.",
            "Aprimoramento da esteira de entrega de protótipos e POCs.",
            "Projetos Vale: controle robótico, segurança on-site, prevenção de quarentena, processos financeiros e otimização de rotas."
          ]
        }, {
          period: "2019 — 2020",
          role: "Analista de Sistemas Sênior",
          firm: "Infobase TI",
          bullets: [
            "Pesquisa e prototipação de projetos de TI: serviços, portais, apps mobile e desktop.",
            "Reestruturação da UX do sistema de transição de serviços da Vale.",
            "Design do portal de acesso da Vale.",
            "Design system baseado no branding da Vale."
          ]
        }, {
          period: "2011 — 2019",
          role: "Outras experiências",
          firm: "Múltiplas empresas",
          bullets: [
            "Freelancer — design de arquitetura, cenários e gráfico.",
            "PTT Eletronuclear — técnico de informática em áreas controladas.",
            "Interart — modelador 3D e cenógrafo.",
            "Fidelity — estágio em design gráfico e TI."
          ]
        }]
      },
      edu: {
        label: "Formação",
        sup: "tab. iv",
        rows: [{
          period: "2022",
          kind: "Pós-graduação",
          course: "User Experience Design and Beyond (UX/UI)",
          inst: "PUC-RS"
        }, {
          period: "2014",
          kind: "Certificação",
          course: "Cambridge Advanced English — exame e aulas",
          inst: "Cambridge Certificate Training Center"
        }, {
          period: "2013",
          kind: "Graduação",
          course: "3D para Interiores e Cenários · Design Gráfico p/ Marketing Digital",
          inst: "Universidade Veiga de Almeida"
        }, {
          period: "2012",
          kind: "Graduação",
          course: "Design Gráfico, Ilustração e Animação",
          inst: "Universidade Veiga de Almeida"
        }]
      },
      cvSlip: {
        eyebrow: "Ex Libris",
        titleLead: "Curriculum ",
        titleEm: "vitæ",
        contextLabel: "Argumento · recto",
        contextBody: [
          "Este volume reúne provas críticas do trabalho de Lucas Schoenherr entre MMXII e MMXXVI, organizadas como pranchas de um catálogo de razão. Cada prancha traz o argumento, o elenco, os atos e as erratas — vocabulário emprestado da tradição editorial e ajustado ao ofício do design de produto.",
          "O leitor encontrará, encartada nesta página, uma feuille volante com o currículo do autor, disponível para retirada imediata. As demais pranchas seguem em ordem romana, de I a III."
        ],
        contextNote: "vide infra",
        gloss: "Currículo do autor, em duas folhas — treze anos de product design, sistemas e interfaces generativas.",
        motto: "Ars longa, vita brevis",
        meta: ["PDF", "2 pp", "240 KB", "2026"],
        printCta: "Abrir a folha",
        cta: "Pegue uma folha",
        aria: "Folha avulsa — Curriculum Vitæ de Lucas Schoenherr",
        editions: { themed: "Composição temática", modern: "Composição moderna" },
        peek: "ver esta edição",
        download: { label: "Baixar o currículo", note: "em breve" },
        switchHint: { prefix: "Mudar para a versão", themed: "temática", modern: "moderna" },
        stamp: { roman: "v.", country: "Brasil", postmark: "MMXXVI" }
      }
    },
    contact: {
      label: "Capítulo V",
      title: ["Correspondência"],
      page: "xx",
      titleDisplay: ["Vamos", {
        reg: " conversar."
      }],
      body: ["Estou disponível para conversas sobre comissões, colaborações e ", {
        em: "boas perguntas."
      }, " Toda correspondência será respondida dentro de poucos dias."],
      cardName: "L. Schoenherr",
      cardAddr: ["Rio de Janeiro, RJ", "República Federativa do Brasil", "Fuso horário GMT-3 · pt · en · es"],
      fields: [{
        lab: "Email",
        val: "lucas.schoenherr@gmail.com",
        href: "mailto:lucas.schoenherr@gmail.com"
      }, {
        lab: "LinkedIn",
        val: "/in/lucas-scho",
        href: "https://www.linkedin.com/in/lucas-scho"
      }],
      stamp: ["MMXXVI", "BR"],
      ui: {
        viaAerea: 'via aérea · pt-br',
        para: 'Para',
        ref: 'Ref: Comissão · N.º MMXXVI-V',
        datadaDe: 'Datada de',
        dateFmt: 'dmy',
        timezone: 'Fuso horário GMT−3',
        langsAriaLabel: 'Idiomas: português, inglês, espanhol',
        ariaCard: 'Cartão de contato',
        ariaEmail: 'Copiar endereço de email',
        ariaLinkedin: 'Abrir perfil LinkedIn',
        copiar: 'copiar',
        copiado: 'copiado',
        abrir: 'abrir',
        wd: ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'],
        mo: ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']
      }
    },
    colophon: {
      pressCap: "Marca do compositor",
      body: ["Este volume foi composto em ", {
        em: "EB Garamond"
      }, ", ", {
        em: "Instrument Serif"
      }, ", ", {
        em: "JetBrains Mono"
      }, " e ", {
        em: "Caveat"
      }, " — tipos digitais inspirados em fontes clássicas. Foi desenhado, ", {
        em: "escrito e codificado pelo autor"
      }, ", no Rio de Janeiro, Brasil, no ano da graça de dois mil e vinte e seis."],
      meta: "Impressão privada · Edição I · MMXXVI",
      finis: "Finis · fim do catálogo"
    },
    errata: [
      { label: "Errata", lines: ["Onde se lê ‘pixel perfect’, leia-se ", { strike: "pixel perfect" }, " pixel-honesto."] },
      { label: "Errata", lines: ["A métrica correta não é ", { strike: "entrega" }, " — é impacto real."] },
      { label: "Errata", lines: ["Não existe ", { strike: "pronto" }, " — existe ", { em: "lançado" }, " e depois iterado."] }
    ],
    cursorLabels: {
      seePlate: "abrir a ficha",
      readLetter: "ler a carta",
      takeLeaf:  "pegue uma cópia"
    }
  },
  en: {
    runningHead: "Lucas Schoenherr · A Catalogue of Works",
    stamp: "Volume I · MMXXVI",
    title: ["Lucas", "Schoenherr"],
    sub: ["A catalogue of works in ", {
      it: "product design"
    }, ", with notes on method, systems, and generative interfaces."],
    smallcaps: "Privately set & published",
    meta: ["Rio de Janeiro, Brazil", "Thirteen years of unbroken practice", "Volume I · Set in 2026"],
    invite: "Turn the page",
    epigraph: ["The best design is ", {
      em: "unobtrusive"
    }, ". Effective systems foster ", {
      em: "creativity"
    }, ". Rigor and empathy can coexist. Artificial intelligence, rather than replacing human work, ", {
      em: "extends its reach"
    }, "."],
    epigraphAttr: ["— from the preface", "L. S."],
    toc: {
      label: "Contents",
      num: "iii",
      rows: [{
        num: "I.",
        title: ["Author's preface"],
        page: "iv",
        href: "#preface"
      }, {
        num: "II.",
        title: ["Catalogue of works"],
        page: "viii",
        href: "#works"
      }, {
        num: "III.",
        title: ["Crafts of the trade"],
        page: "xii",
        href: "#specialties"
      }, {
        num: "IV.",
        title: ["Technical apparatus"],
        page: "xvi",
        href: "#apparatus"
      }, {
        num: "V.",
        title: ["Correspondence"],
        page: "xx",
        href: "#contact"
      }]
    },
    preface: {
      label: "Chapter I",
      title: ["Preface"],
      page: "iv",
      glossLeft: ["¹ Rio de Janeiro", "State of Rio de Janeiro", "lat. -22.90"],
      glossRight: ["² The term \"catalogue raisonné\"", "denotes, in editorial tradition,", "the critical compilation of an", "author's works — typically", "published posthumously. Here,", "we take the present tense's", "liberty."],
      portrait: "L. Schoenherr",
      portraitCap: ["The author, photographed in studio."],
      body: [[{img: {src: "images/home/I.webp", alt: "I", className: "drop-cap"}}, "am Lucas Schoenherr, senior product designer, based in Brazil¹. This publication gathers, in a single volume, thirteen years of design practice — with notes on method, systems, interfaces for language models, and on the ", {
        it: "unfinished questions"
      }, " that continue to animate the work."], ["As a ", {
        it: "catalogue raisonné"
      }, "², the present volume doesn't claim to be exhaustive. It gathers, rather, the most representative pieces — those that best exemplify the ", {
        strong: "backbone"
      }, " of the craft: clarity, system, velocity, and impact."], ["I've worked in recent years on initiatives for Vale, Samarco, and varied product teams, at enterprise scale. Today, my attention is directed at the frontier between ", {
        strong: "design and generative artificial intelligence"
      }, " — where, for the first time in history, we draw interfaces for machines that ", {
        it: "answer like people"
      }, "."]],
      footnotes: [["¹", " Currently in Rio de Janeiro, RJ. Available for correspondence in any time zone, with a mild preference for ", {
        it: "morning, coffee."
      }], ["²", " ", {
        it: "Catalogue raisonné"
      }, " (fr.): a critical compilation of an author's works, ordered, annotated, and — conventionally — posthumous. This publication, evidently, takes the liberty of the present tense."]]
    },
    works: {
      label: "Chapter II",
      title: ["Catalogue of works"],
      page: "viii",
      intro: "Three representative works, mounted as canvases in reverse chronological order. Study each canvas closely with the loupe, turn it to see the sketch on its verso — or open the full entry.",
      flip: {
        toVerso:     "See the verso",
        toRecto:     "Return to the recto",
        ariaVerso:   "Turn the plate to reveal the verso wireframe",
        ariaRecto:   "Turn the plate back to the final art",
        versoLabel:  "Wireframe",
        versoCaption:"Earlier state · compositional sketch",
        turnVerso:   "Verso",
        turnRecto:   "Recto"
      },
      plates: [{
        roman: "Quadro I",
        num: "001",
        title: ["Lighthouse", {
          reg: ""
        }],
        sub: "Vale · Mobile · Industrial · 2023",
        meta: [{
          dt: "Commission",
          dd: "Vale — Northern Logistics Corridor"
        }, {
          dt: "Role",
          dd: "Lead Product Designer · Mobile"
        }, {
          dt: "Period",
          dd: "2023 (~6 months)"
        }, {
          dt: "Materials",
          dd: "Figma, Miro, mobile DS"
        }, {
          dt: "Dimensions",
          dd: "iOS · Android · 40+ DS comp."
        }],
        desc: [["An application designed to replace Vale's legacy intranet on the northern logistics corridor. Production data became accessible to managers anywhere, not just in the control room."], ["I worked as the sole designer. I led the discovery phase, created the ", {
          strong: "design system with more than forty components"
        }, ", and delivered a prototype approved by every area involved. The modular architecture was designed to scale to other logistics corridors."]],
        stats: [{
          val: "+40",
          lab: "Design system\ncomponents"
        }, {
          val: "~200",
          lab: "Managers\nimpacted"
        }, {
          val: "02",
          lab: "Platforms\niOS · Android"
        }],
        link: "read the full entry",
        href: "projects/lighthouse.html",
        imgClass: "plate-img-3",
        quadro: {
          front: "images/lighthouse/paint-front.webp",
          back:  "images/lighthouse/paint-back.webp",
          side:  "images/home/paint-side.webp"
        }
      }, {
        roman: "Quadro II",
        num: "002",
        title: ["PMO", {
          reg: " Dashboards"
        }],
        sub: "Samarco · Strategic PMO · 2025",
        meta: [{
          dt: "Commission",
          dd: "Samarco — Strategic PMO"
        }, {
          dt: "Role",
          dd: "Senior Product Designer · End-to-end"
        }, {
          dt: "Period",
          dd: "2025 (~4 months)"
        }, {
          dt: "Materials",
          dd: "Figma, data-viz DS, RAG system"
        }, {
          dt: "Dimensions",
          dd: "Mandala · 6 modules · 60+ comp."
        }],
        desc: [["Design of Samarco's Strategic PMO executive command center. The ", {
          strong: "Strategic Mandala"
        }, " sits at the center: a hexagonal visualization that brings the six strategic axes together into a single, verifiable panel."], ["The challenge was to replace more than twenty manually reconciled spreadsheets with an interface capable of surfacing deviations without excess noise. It also required unifying, ", {
          it: "for the first time"
        }, ", the visual language of Finance, Risk, Sustainability, and Operations."]],
        stats: [{
          val: "60+",
          lab: "Data-viz\ncomponents"
        }, {
          val: "06",
          lab: "Integrated\nmodules"
        }, {
          val: "20+",
          lab: "Spreadsheets\nreplaced"
        }],
        link: "read the full entry",
        href: "projects/pmo-dashboards.html",
        imgClass: "plate-img-2",
        quadro: {
          front: "images/samarco/paint-front.webp",
          back:  "images/samarco/paint-back.webp",
          side:  "images/home/paint-side.webp"
        }
      }, {
        roman: "Quadro III",
        num: "003",
        title: ["Sports", {
          reg: " Experience"
        }],
        sub: "DirecTV · Multiplatform · World Cup 2022",
        meta: [{
          dt: "Commission",
          dd: "DirecTV GO — World Cup 2022"
        }, {
          dt: "Role",
          dd: "Senior Product Designer"
        }, {
          dt: "Period",
          dd: "2022 (Qatar World Cup)"
        }, {
          dt: "Materials",
          dd: "Figma, multiplatform DS, FIFA data"
        }, {
          dt: "Dimensions",
          dd: "Mobile · Web · TV · 64 matches"
        }],
        desc: [["A platform that brings together ", {
          strong: "mobile, web, and TV"
        }, " in a single journey. Official FIFA statistics arrive in real time; content adapts to the context of Brazil and Latin America. The goal: to make the 2022 World Cup a continuous experience, not a fragmented one."], ["The work required aligning design, development, and data under a deadline that allowed no extension. The solution was a ", {
          it: "single design system"
        }, ", capable of sustaining the user experience from mobile to TV without losing rigor."]],
        stats: [{
          val: "03",
          lab: "Platforms\nmobile · web · TV"
        }, {
          val: "64",
          lab: "Matches\ncovered live"
        }, {
          val: "02",
          lab: "Regional\nversions"
        }],
        link: "read the full entry",
        href: "projects/sports-experience.html",
        imgClass: "plate-img-2",
        quadro: {
          front: "images/sports/paint-front.webp",
          back:  "images/sports/paint-back.webp",
          side:  "images/home/paint-side.webp"
        }
      }, {
        roman: "Quadro IV",
        num: "004",
        title: ["Gen", {
          reg: "."
        }, "AI"],
        sub: "Accenture · Design System · GenAI · 2023 — 2024",
        meta: [{
          dt: "Commission",
          dd: "Accenture — One Studio"
        }, {
          dt: "Role",
          dd: "Lead Product Designer · UI · System"
        }, {
          dt: "Period",
          dd: "2023 — 2024 (~3 months)"
        }, {
          dt: "Materials",
          dd: "Figma, Variables, LLM patterns"
        }, {
          dt: "Dimensions",
          dd: "9 POCs"
        }],
        desc: [["As the lead designer of Accenture One Studio's program, I developed ", {
          strong: "nine proofs of concept"
        }, " in generative AI across DevOps, legal, marketing, and supply chain, all integrated by a dedicated design system."], ["The premise was to ", {
          it: "design the system before the products"
        }, ". As a result, five POCs advanced to prototype and development, and the UX vocabulary for generative AI served as the foundation for future initiatives at the company."]],
        stats: [{
          val: "09",
          lab: "POCs\ndelivered"
        }, {
          val: "05",
          lab: "Advanced\nto dev"
        }, {
          val: "~3m",
          lab: "End-to-end"
        }],
        link: "read the full entry",
        href: "projects/genai.html",
        imgClass: "plate-img-1",
        format: "wide"
      }]
    },
    method: {
      label: "Chapter III",
      title: ["On method"],
      page: "xii",
      credo: ["I believe the best design is ", {
        ox: "invisible."
      }, " That well-made systems unlock ", {
        reg: "creativity."
      }, " That rigor and warmth ", {
        reg: "can coexist."
      }, " And that AI, far from replacing the craft, ", {
        ox: "expands it."
      }],
      tenets: [{
        num: "i.",
        glyph: "✱",
        title: "Clarity",
        desc: "Every element has purpose. Hierarchy that guides, doesn't distract."
      }, {
        num: "ii.",
        glyph: "◊",
        title: "System",
        desc: "Reusable decisions. Consistency without sacrificing personality."
      }, {
        num: "iii.",
        glyph: "→",
        title: "Velocity",
        desc: "Decide fast in low-fi, polish slowly in hi-fi."
      }, {
        num: "iv.",
        glyph: "✶",
        title: "Impact",
        desc: "Business metrics and human metrics — both matter."
      }],
      diagram: {
        spaces: [
          { label: "Problem space", sub: "finding the right thing" },
          { label: "Solution space", sub: "making the thing right" }
        ],
        flow: { diverge: "diverge", converge: "converge" },
        nodes: [{
          roman: "I",
          name: "Discover",
          note: "Interviews · Data"
        }, {
          roman: "II",
          name: "Define",
          note: "Synthesis · Hypotheses"
        }, {
          roman: "III",
          name: "Design",
          note: "Wireframes · System"
        }, {
          roman: "IV",
          name: "Deliver",
          note: "QA · Metrics"
        }],
        loop: "↻  a double diamond, in continuous iteration — never waterfall."
      }
    },
    minorWorks: {
      label: "Miscellanea",
      title: ["Minor plates"],
      page: "xi",
      hint: "click a plate to enlarge",
      items: [
        { roman: "Plate I", title: "Sírio-Libanês App", tag: "Mobile App · UI/UX", img: "images/other/sirio.webp",
          desc: "Hospital Sírio-Libanês app: offers the patient journey, scheduling and access to medical records in a clear, welcoming mobile experience.",
          label: "Sírio-Libanês", labelSub: "Mobile · UI/UX" },
        { roman: "Plate II", title: "Vale News", tag: "Mobile App · UI/UX", img: "images/other/valenews.webp",
          desc: "Vale's internal-communications app delivers news, announcements and organizational culture information directly to employees.",
          label: "Vale News", labelSub: "Mobile · UI/UX" },
        { roman: "Plate III", title: "Leap to the new branding", tag: "Vale · multiple media", img: "images/other/cracha.webp",
          desc: "Application of Vale's new branding across various graphic, digital and physical media, spanning from badges to signage.",
          label: "New branding", labelSub: "Vale · media" },
        { roman: "Plate IV", title: "Power BI Dashboard", tag: "Vale · data viz", img: "images/other/data.webp",
          desc: "Power BI data-visualization panels for Vale: operational indicators turned into information that supports early decisions.",
          label: "Power BI", labelSub: "Vale · data viz" }
      ],
      close: "Close", prev: "Previous plate", next: "Next plate"
    },
    specialties: {
      label: "Chapter III",
      title: ["Crafts of the trade"],
      page: "xii",
      intro: "Thirteen years of end-to-end practice — from discovery to delivery — uniting product strategy, user-centered design, design systems and AI-native experiences, with cross-functional leadership.",
      ui: { index: "Index of the craft", entries: "four entries", plate: "Plate", of: "of", keywords: "Keywords", terms: "terms", prev: "Previous plate", next: "Next plate", hint: "use the arrows or markers to leaf through" },
      items: [
        { roman: "I", img: "images/services/ai.webp", alt: "Generative AI study",
          title: "Generative AI", cat: "GenAI · AI-native",
          desc: "End-to-end AI-native product design: conversational interfaces, LLM-driven flows and agents — from discovery and prototyping to a validated proof of concept.",
          kw: ["LLM", "Agentic UX", "Prompt Design", "Conversational UI"] },
        { roman: "II", img: "images/services/ux.webp", alt: "Wireframes and journey mapping",
          title: "Experience", cat: "UX · Research",
          desc: "User research, usability testing and information architecture — user-centered, data-driven discovery that lifts satisfaction and retention.",
          kw: ["User Research", "Usability Testing", "Journey Mapping", "Data-driven"] },
        { roman: "III", img: "images/services/ui.webp", alt: "Interface study",
          title: "Interface", cat: "UI · Visual",
          desc: "From wireframe to pixel: interaction design, visual design, motion and accessibility (WCAG) — responsive design that turns complexity into clarity that converts.",
          kw: ["Interaction Design", "Prototyping", "Accessibility", "Responsive"] },
        { roman: "IV", img: "images/services/ds.webp", alt: "Components and tokens",
          title: "Design Systems", cat: "DS · DesignOps",
          desc: "Scalable design systems in Figma — design tokens, component libraries and governance (DesignOps) that accelerate teams and guarantee consistency.",
          kw: ["Design Tokens", "Component Library", "Figma", "DesignOps"] }
      ]
    },
    apparatus: {
      label: "Chapter IV",
      title: ["Technical apparatus"],
      page: "xvi",
      intro: "Current instruments and chronology of practice.",
      tools: {
        label: "Instruments",
        sup: "tab. i",
        groups: [{
          roman: "i",
          label: "Design & Prototyping",
          list: ["Figma", "FigJam", "Framer", "Photoshop", "Illustrator"]
        }, {
          roman: "ii",
          label: "Research & Testing",
          list: ["Maze", "Mural", "Miro", "Flowmapp"]
        }, {
          roman: "iii",
          label: "AI & Development",
          list: ["Claude", "Claude Design", "Cursor", "Google Antigravity", "VS Code", "Azure DevOps"]
        }, {
          roman: "iv",
          label: "Productivity & Collaboration",
          list: ["Notion", "Milanote", "Obsidian", "Jira", "Agile / Scrum"]
        }]
      },
      langs: {
        label: "Spoken languages",
        sup: "tab. ii",
        list: [{
          name: "Portuguese",
          level: "Native"
        }, {
          name: "English",
          level: "Advanced"
        }, {
          name: "Spanish",
          level: "Intermediate"
        }]
      },
      cv: {
        label: "Chronology of practice",
        sup: "tab. iii",
        rows: [{
          period: "2022 — 2024",
          role: "Specialist Product Designer (UI/UX)",
          firm: "Accenture · One Studio",
          current: true,
          bullets: [
            "Design of POCs and LLM-based products, including in-house LLMs at VIVO.",
            "Reusable design systems and component governance.",
            "Executive dashboards and data visualization.",
            "Projects for hospitals and healthcare institutions.",
            "Collaboration on the World Cup broadcast with FIFA.",
            "Dam and mine safety solutions for Vale.",
            "Delivery of prototypes and POCs, nationally and internationally."
          ]
        }, {
          period: "2020 — 2022",
          role: "Senior Product Designer (UI/UX)",
          firm: "Accenture · Vale Digital Lab",
          bullets: [
            "Leadership and management of the Digital Lab design team.",
            "Research system grounded in UX methodologies.",
            "Improvement of the prototype and POC delivery pipeline.",
            "Vale projects: robotic control, on-site safety, quarantine prevention, financial processes and route optimization."
          ]
        }, {
          period: "2019 — 2020",
          role: "Senior Systems Analyst",
          firm: "Infobase TI",
          bullets: [
            "Research and prototyping of IT projects: services, portals, mobile and desktop apps.",
            "Restructured the UX of Vale's service-transition system.",
            "Design of Vale's access portal.",
            "Design system based on Vale's branding."
          ]
        }, {
          period: "2011 — 2019",
          role: "Earlier experience",
          firm: "Multiple companies",
          bullets: [
            "Freelancer — architecture, set and graphic design.",
            "PTT Eletronuclear — IT technician in controlled areas.",
            "Interart — 3D modeler and set designer.",
            "Fidelity — internship in graphic design and IT."
          ]
        }]
      },
      edu: {
        label: "Education",
        sup: "tab. iv",
        rows: [{
          period: "2022",
          kind: "Postgraduate",
          course: "User Experience Design and Beyond (UX/UI)",
          inst: "PUC-RS"
        }, {
          period: "2014",
          kind: "Certificate",
          course: "Cambridge Advanced English — exam and classes",
          inst: "Cambridge Certificate Training Center"
        }, {
          period: "2013",
          kind: "Undergraduate",
          course: "3D for Interiors & Sets · Graphic Design for Digital Marketing",
          inst: "Universidade Veiga de Almeida"
        }, {
          period: "2012",
          kind: "Undergraduate",
          course: "Graphic Design, Illustration & Animation",
          inst: "Universidade Veiga de Almeida"
        }]
      },
      cvSlip: {
        eyebrow: "Ex Libris",
        titleLead: "Curriculum ",
        titleEm: "vitæ",
        contextLabel: "Argument · recto",
        contextBody: [
          "This volume gathers critical proofs of Lucas Schoenherr's work between MMXII and MMXXVI, arranged as plates in a catalogue raisonné. Each plate carries the argument, cast, acts, and errata — a vocabulary borrowed from editorial tradition and adjusted to the craft of product design.",
          "The reader will find, tipped into this page, a feuille volante with the author's curriculum, available for immediate withdrawal. The remaining plates follow in Roman order, from I to III."
        ],
        contextNote: "vide infra",
        gloss: "The author's curriculum, in two leaves — thirteen years of product design, systems, and generative interfaces.",
        motto: "Ars longa, vita brevis",
        meta: ["PDF", "2 pp", "240 KB", "2026"],
        printCta: "Open the leaf",
        cta: "Take a leaf",
        aria: "Loose leaf — Lucas Schoenherr's Curriculum Vitæ",
        editions: { themed: "Themed setting", modern: "Modern setting" },
        peek: "see this edition",
        download: { label: "Download the curriculum", note: "coming soon" },
        switchHint: { prefix: "Switch to the", themed: "themed edition", modern: "modern edition" },
        stamp: { roman: "v.", country: "Brazil", postmark: "MMXXVI" }
      }
    },
    contact: {
      label: "Chapter V",
      title: ["Correspondence"],
      page: "xx",
      titleDisplay: ["Let us", {
        reg: " talk."
      }],
      body: ["I'm available for conversations about commissions, collaborations, and ", {
        em: "good questions."
      }, " All correspondence is answered within a few days."],
      cardName: "L. Schoenherr",
      cardAddr: ["Rio de Janeiro, RJ", "Federative Republic of Brazil", "Time zone GMT-3 · pt · en · es"],
      fields: [{
        lab: "Email",
        val: "lucas.schoenherr@gmail.com",
        href: "mailto:lucas.schoenherr@gmail.com"
      }, {
        lab: "LinkedIn",
        val: "/in/lucas-scho",
        href: "https://www.linkedin.com/in/lucas-scho"
      }],
      stamp: ["MMXXVI", "BR"],
      ui: {
        viaAerea: 'by air mail · en',
        para: 'To',
        ref: 'Re: Commission · No. MMXXVI-V',
        datadaDe: 'Dated',
        dateFmt: 'mdy',
        timezone: 'Time zone GMT−3',
        langsAriaLabel: 'Languages: Portuguese, English, Spanish',
        ariaCard: 'Contact card',
        ariaEmail: 'Copy email address',
        ariaLinkedin: 'Open LinkedIn profile',
        copiar: 'copy',
        copiado: 'copied',
        abrir: 'open',
        wd: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        mo: ['January','February','March','April','May','June','July','August','September','October','November','December']
      }
    },
    colophon: {
      pressCap: "Compositor's mark",
      body: ["This volume was set in ", {
        em: "EB Garamond"
      }, ", ", {
        em: "Instrument Serif"
      }, ", ", {
        em: "JetBrains Mono"
      }, ", and ", {
        em: "Caveat"
      }, " — digital types inspired by classical faces. It was ", {
        em: "designed, written, and coded by the author"
      }, " in Rio de Janeiro, Brazil, in the year of grace two thousand twenty-six."],
      meta: "Privately printed · Edition I · MMXXVI",
      finis: "Finis · end of catalogue"
    },
    errata: [
      { label: "Errata", lines: ["Where it reads 'pixel perfect,' substitute ", { strike: "pixel perfect" }, " pixel-honest."] },
      { label: "Errata", lines: ["The correct success metric is not ", { strike: "delivery" }, " — it is real impact."] },
      { label: "Errata", lines: ["There is no such thing as ", { strike: "done" }, " — only ", { em: "shipped" }, " and iterated."] }
    ],
    cursorLabels: {
      seePlate: "open the entry",
      readLetter: "read the letter",
      takeLeaf:  "take a copy"
    }
  }
};

/* Rich text renderer */
function rich(parts) {
  if (typeof parts === "string") return parts;
  if (!Array.isArray(parts)) return null;
  return parts.map((p, i) => {
    if (typeof p === "string") return p;
    if (p.img) return /*#__PURE__*/React.createElement("img", {
      src: p.img.src,
      alt: p.img.alt || "",
      className: p.img.className || "drop-cap",
      loading: "lazy",
      key: i
    });
    if (p.strong) return /*#__PURE__*/React.createElement("strong", {
      className: "strong",
      key: i
    }, p.strong);
    if (p.it) return /*#__PURE__*/React.createElement("em", {
      className: "it",
      key: i
    }, p.it);
    if (p.em) return /*#__PURE__*/React.createElement("em", {
      className: "em",
      key: i
    }, p.em);
    if (p.reg) return /*#__PURE__*/React.createElement("span", {
      className: "reg",
      key: i
    }, p.reg);
    if (p.ox) return /*#__PURE__*/React.createElement("span", {
      className: "ox",
      key: i
    }, p.ox);
    if (p.strike) return /*#__PURE__*/React.createElement("span", {
      className: "strike",
      key: i
    }, p.strike);
    return null;
  });
}

/* ============================================================
   Reveal — IntersectionObserver
   ============================================================ */
function Reveal({
  children,
  delay = 0,
  className = "",
  as: As = "div",
  id
}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.unobserve(el);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const cls = `reveal ${delay ? `reveal-d${delay}` : ""} ${className}`.trim();
  return /*#__PURE__*/React.createElement(As, {
    ref: ref,
    className: cls,
    id: id
  }, children);
}

/* ============================================================
   Cursor — italic label, follows pointer
   ============================================================ */
function CursorGlyph() {
  const ref = useRef(null);
  const [label, setLabel] = useState("");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = e => {
      // Por padrão, posiciona acima da lupa (raio 100 + gap 36 = 136px).
      // A lupa só é anexada a .plate-image (recto). Em qualquer outro
      // alvo com cursor-label (verso wireframe, cv-slip, etc.), ela
      // não aparece — então o rótulo se aproxima do cursor para ficar
      // logo acima do ponteiro, como tooltip clássico.
      const tgt = e.target.closest("[data-cursor-label]");
      let offsetY = 28; // padrão: verso wireframe, junto ao cursor
      let offsetX = 0;  // padrão: centrado no cursor (o rótulo usa translateX(-50%))
      if (tgt) {
        if (tgt.classList.contains("plate-image")) offsetY = 136; // recto: clearance da lupa
        else if (tgt.classList.contains("plate-quadro-link")) offsetY = 168; // quadro 3D: acima da lupa
        else if (tgt.classList.contains("cv-thumb-card")) { offsetY = 72; offsetX = 58; } // folha: mais acima e à direita do cursor
        else if (tgt.classList.contains("cv-slip")) offsetY = 50;  // folha avulsa (legado)
      }
      el.style.left = e.clientX + offsetX + "px";
      el.style.top  = e.clientY - offsetY + "px";
    };
    const onOver = e => {
      const t = e.target.closest("[data-cursor-label]");
      if (t) {
        const lab = t.dataset.cursorLabel;
        setLabel(lab);
        el.classList.add("show");
      } else {
        el.classList.remove("show");
        setLabel("");
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: "cursor-glyph"
  }, label);
}

/* ============================================================
   Loupe — antique magnifying glass with DOM-clone zoom
   ============================================================ */
function Lens() {
  const ref      = useRef(null);
  const glassRef = useRef(null);
  const canvRef  = useRef(null);

  useEffect(() => {
    const el      = ref.current;
    const glass   = glassRef.current;
    const gcanvas = canvRef.current;
    if (!el || !glass || !gcanvas) return;

    // A lupa é DESKTOP-ONLY: em touch / ≤1024px nem o JS roda. O CSS já
    // esconde .loupe, mas pulamos os listeners por performance.
    if (window.matchMedia("(hover: none), (max-width: 1024px)").matches) return;

    const GLASS  = 200;          // diâmetro CSS do vidro
    const LENS_R = GLASS / 2;     // 100
    const SCALE  = 2.8;           // ampliação
    const dpr    = Math.min(window.devicePixelRatio || 1, 2);
    gcanvas.width  = Math.round(GLASS * dpr);
    gcanvas.height = Math.round(GLASS * dpr);
    const gctx = gcanvas.getContext("2d");
    gctx.imageSmoothingEnabled = true;
    gctx.imageSmoothingQuality = "high";

    let srcCanvas = null;         // canvas WebGL da tela sob o cursor
    let activeStage = null;       // .plate-quadro-stage atualmente sob o cursor
    let overPaint = false;        // cursor está sobre pixels opacos da pintura?
    let lastX = 0, lastY = 0;

    // Desenha a região ampliada dos pixels do canvas WebGL dentro do vidro.
    // (O canvas tem preserveDrawingBuffer, então drawImage funciona.)
    // Também testa o pixel central (sob o cursor): se for transparente, o
    // cursor está na margem vazia da tela — a lupa só deve surgir sobre a
    // pintura em si, então escondemos o vidro e devolvemos o cursor.
    const draw = () => {
      if (!srcCanvas) return;
      const rect = srcCanvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const sxScale = srcCanvas.width  / rect.width;
      const syScale = srcCanvas.height / rect.height;
      const srcW = (GLASS / SCALE) * sxScale;
      const srcH = (GLASS / SCALE) * syScale;
      let sx = (lastX - rect.left) * sxScale - srcW / 2;
      let sy = (lastY - rect.top)  * syScale - srcH / 2;
      sx = Math.max(0, Math.min(srcCanvas.width  - srcW, sx));
      sy = Math.max(0, Math.min(srcCanvas.height - srcH, sy));
      gctx.clearRect(0, 0, gcanvas.width, gcanvas.height);
      try {
        gctx.drawImage(srcCanvas, sx, sy, srcW, srcH, 0, 0, gcanvas.width, gcanvas.height);
      } catch (err) { /* buffer ainda não pintado */ }

      // Hit-test: o pixel central do vidro = ponto sob o cursor.
      let alpha = 255;
      try {
        const cx = gcanvas.width >> 1, cy = gcanvas.height >> 1;
        alpha = gctx.getImageData(cx, cy, 1, 1).data[3];
      } catch (err) { alpha = 255; }
      const nowOver = alpha > 24;
      if (nowOver !== overPaint) {
        overPaint = nowOver;
        el.classList.toggle("show", nowOver);   // pêndulo entra só na pintura
        if (activeStage) activeStage.style.cursor = nowOver ? "none" : "";
      }
    };

    // Ancla o vidro ao cursor sem deixar o círculo sair da viewport.
    const onMove = e => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const px = Math.max(LENS_R, Math.min(vw - LENS_R, e.clientX));
      const py = Math.max(LENS_R, Math.min(vh - LENS_R, e.clientY));
      el.style.left = px + "px";
      el.style.top  = py + "px";
      lastX = e.clientX; lastY = e.clientY;
      draw();
    };

    const onEnter = e => {
      const stage = e.currentTarget;
      const cnv = stage.querySelector("canvas");
      if (!cnv) return;
      srcCanvas = cnv;
      activeStage = stage;
      // A visibilidade é decidida no draw() pelo hit-test de transparência.
      draw();
    };

    const onLeave = e => {
      e.currentTarget.style.cursor = "";
      srcCanvas = null;
      activeStage = null;
      overPaint = false;
      el.classList.remove("show");
    };

    const stages = document.querySelectorAll(".plate-quadro-stage");
    stages.forEach(s => {
      s.addEventListener("mouseenter", onEnter);
      s.addEventListener("mouseleave", onLeave);
    });
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      stages.forEach(s => {
        s.removeEventListener("mouseenter", onEnter);
        s.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  // Vidro circular (canvas de ampliação) + a moldura fotográfica da lupa
  // (Lupa2.png). O pêndulo é puramente CSS, disparado pela classe .show.
  const ce = React.createElement;
  return ce("div", { ref, className: "loupe" },
    ce("div", { ref: glassRef, className: "loupe-glass" },
      ce("canvas", { ref: canvRef, className: "loupe-canvas" })
    ),
    ce("img", { src: "images/home/Lupa2.webp", className: "loupe-frame", alt: "", draggable: "false" })
  );
}

/* ============================================================
   Page counter + ink progress (bottom chrome)
   com split-flap animation quando o número muda
   ============================================================ */
function BottomChrome({ t }) {
  const [page,        setPage       ] = useState("i");
  const [displayPage, setDisplayPage] = useState("i");
  const [flipState,   setFlipState  ] = useState("");   // "" | "flip-out" | "flip-in"
  const progRef  = useRef(null);
  const t1Ref    = useRef(null);
  const t2Ref    = useRef(null);

  // Flip animation: out → swap text → in
  useEffect(() => {
    if (page === displayPage) return;
    clearTimeout(t1Ref.current);
    clearTimeout(t2Ref.current);
    setFlipState("flip-out");
    t1Ref.current = setTimeout(() => {
      setDisplayPage(page);
      setFlipState("flip-in");
    }, 160);
    t2Ref.current = setTimeout(() => setFlipState(""), 320);
    return () => { clearTimeout(t1Ref.current); clearTimeout(t2Ref.current); };
  }, [page]);

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll("[data-page]");
      let current = "i";
      let maxTop = -Infinity;
      const viewY = window.scrollY + window.innerHeight * 0.35;
      sections.forEach(s => {
        const top = s.getBoundingClientRect().top + window.scrollY;
        if (top <= viewY && top > maxTop) {
          maxTop = top;
          current = s.dataset.page;
        }
      });
      setPage(current);
      const total = document.body.scrollHeight - window.innerHeight;
      const p = total > 0 ? window.scrollY / total * 100 : 0;
      if (progRef.current) progRef.current.style.setProperty("--prog", p + "%");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return React.createElement("footer", { className: "chrome-bot", role: "contentinfo" },
    React.createElement("span", null, "Lucas Schoenherr \xB7 MMXXVI"),
    React.createElement("span", { ref: progRef, className: "ink-progress" }),
    React.createElement("span", { className: "page-counter" },
      React.createElement("span", { className: "of" }, "P."),
      React.createElement("span", { className: "num" + (flipState ? " " + flipState : "") }, displayPage),
      React.createElement("span", { className: "of" }, "/ XXII")
    )
  );
}

/* ============================================================
   Top chrome
   ============================================================ */
function TopChrome({ lang, setLang, t, candle, setCandle }) {
  const e = React.createElement;
  return e("header", { className: "chrome-top", role: "banner" },
    e("span", { className: "running-head" },
      e("span", { className: "home-compass-wrapper", "aria-hidden": "true" },
        e("svg", { className: "home-compass", viewBox: "0 0 100 100" },
          e("circle", { className: "compass-ring-outer", cx: "50", cy: "50", r: "45", strokeWidth: "1.5", fill: "none", strokeDasharray: "4 4" }),
          e("circle", { className: "compass-ring-inner", cx: "50", cy: "50", r: "30", fill: "none" }),
          e("line",   { className: "compass-cross", x1: "50", y1: "10", x2: "50", y2: "90", strokeWidth: "1" }),
          e("line",   { className: "compass-cross", x1: "10", y1: "50", x2: "90", y2: "50", strokeWidth: "1" }),
          e("polygon", { className: "compass-north", points: "50,20 54,50 50,55 46,50" }),
          e("polygon", { className: "compass-south", points: "50,80 54,50 50,45 46,50" }),
          e("circle", { className: "compass-pivot", cx: "50", cy: "50", r: "4", strokeWidth: "1.5" })
        )
      ),
      e("a", {
        className: "running-head-home",
        href: "#",
        onClick: ev => { ev.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); },
        title: lang === "pt" ? "Voltar ao Frontispício" : "Back to Frontispiece",
        "aria-label": lang === "pt" ? "Voltar ao início" : "Back to top"
      }, "Lucas Schoenherr"),
      e("span", { className: "sep" }, "\xB7"),
      e("a", {
        className: "running-head-link",
        href: "#works",
        title: lang === "pt" ? "Ir ao catálogo de obras" : "Go to the catalogue of works"
      }, e("em", null, t.runningHead.split("·")[1]?.trim() || ""))
    ),
    e("div", { className: "chrome-actions" },
      // Candlelight toggle — ☽ entra em modo vela, ☼ volta ao dia
      e("button", {
        className: "candle-toggle" + (candle ? " active" : ""),
        onClick: () => setCandle(!candle),
        title:      candle ? (lang === "pt" ? "Modo dia"  : "Day mode")
                           : (lang === "pt" ? "Modo vela" : "Candle mode"),
        "aria-label": candle ? (lang === "pt" ? "Modo dia"  : "Day mode")
                             : (lang === "pt" ? "Modo vela" : "Candle mode"),
        type: "button"
      },
      // Chamberstick (castiçal de quarto) — pires largo + vela + alça em curva.
      // Modo vela ON: chama acesa. Modo dia: vela apagada.
      candle
        ? e('svg', { width: '25', height: '22', viewBox: '0.5 0.5 22.3 19.5', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': 'true', style: { display: 'block' } },
            // Chama
            e('path', { d: 'M9 0.5 C 7.6 2.2, 7 3.7, 9 5.2 C 11 3.7, 10.4 2.2, 9 0.5 Z', fill: 'currentColor', opacity: '0.9' }),
            // Pavio
            e('line', { x1: '9', y1: '5.2', x2: '9', y2: '6.6', stroke: 'currentColor', strokeWidth: '0.8', strokeLinecap: 'round' }),
            // Corpo da vela
            e('rect', { x: '7.2', y: '6.6', width: '3.6', height: '6.4', fill: 'currentColor' }),
            // Coletor de cera (boca do castiçal)
            e('path', { d: 'M5.6 13 H12.4 L11.2 14.6 H6.8 Z', fill: 'currentColor' }),
            // Haste
            e('rect', { x: '7.4', y: '14.6', width: '3.2', height: '1.6', fill: 'currentColor' }),
            // Pires (base larga)
            e('ellipse', { cx: '9', cy: '17.8', rx: '8', ry: '1.7', fill: 'currentColor' }),
            // Aro interno do pires (sugere profundidade)
            e('ellipse', { cx: '9', cy: '16.8', rx: '6.8', ry: '0.7', fill: 'none', stroke: 'var(--paper)', strokeWidth: '0.5', opacity: '0.55' }),
            // Alça — curl à direita, com pequeno polegar
            e('path', { d: 'M16.4 17.4 C 21.4 17.6, 22.8 13.4, 18.6 12.6 C 16.6 12.4, 16.6 14.4, 18.2 14.6', stroke: 'currentColor', strokeWidth: '1.3', strokeLinecap: 'round', strokeLinejoin: 'round' })
          )
        : e('svg', { width: '25', height: '22', viewBox: '0.5 0.5 22.3 19.5', fill: 'none', xmlns: 'http://www.w3.org/2000/svg', 'aria-hidden': 'true', style: { display: 'block' } },
            // Pavio apagado (curvinha)
            e('path', { d: 'M9 4.6 C 9.6 5.3, 10 5.9, 9 6.6', stroke: 'currentColor', strokeWidth: '0.8', strokeLinecap: 'round' }),
            // Corpo da vela
            e('rect', { x: '7.2', y: '6.6', width: '3.6', height: '6.4', fill: 'currentColor' }),
            // Coletor de cera
            e('path', { d: 'M5.6 13 H12.4 L11.2 14.6 H6.8 Z', fill: 'currentColor' }),
            // Haste
            e('rect', { x: '7.4', y: '14.6', width: '3.2', height: '1.6', fill: 'currentColor' }),
            // Pires
            e('ellipse', { cx: '9', cy: '17.8', rx: '8', ry: '1.7', fill: 'currentColor' }),
            e('ellipse', { cx: '9', cy: '16.8', rx: '6.8', ry: '0.7', fill: 'none', stroke: 'var(--paper)', strokeWidth: '0.5', opacity: '0.55' }),
            // Alça
            e('path', { d: 'M16.4 17.4 C 21.4 17.6, 22.8 13.4, 18.6 12.6 C 16.6 12.4, 16.6 14.4, 18.2 14.6', stroke: 'currentColor', strokeWidth: '1.3', strokeLinecap: 'round', strokeLinejoin: 'round' })
          )
      ),
      e("div", { className: "lang-toggle", role: "group", "aria-label": lang === "pt" ? "Seleção de idioma" : "Language selection" },
        e("button", {
          className: lang === "pt" ? "active" : "",
          onClick: () => setLang("pt"),
          "aria-label": lang === "pt" ? "Idioma: Português (ativo)" : "Mudar para Português",
          "aria-pressed": lang === "pt"
        }, "PT"),
        e("span",  { className: "pipe", "aria-hidden": "true" }, "/"),
        e("button", {
          className: lang === "en" ? "active" : "",
          onClick: () => setLang("en"),
          "aria-label": lang === "en" ? "Language: English (active)" : "Switch to English",
          "aria-pressed": lang === "en"
        }, "EN")
      )
    )
  );
}

/* ============================================================
   Frontispiece
   ============================================================ */
function Frontispiece({
  t
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "frontispiece",
    "data-page": "i"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stamp"
  }, t.stamp), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ornament-1"
  }, "\u269C"), /*#__PURE__*/React.createElement("h1", {
    className: "title-author"
  }, /*#__PURE__*/React.createElement("span", {
    className: "name-l"
  }, /*#__PURE__*/React.createElement("span", {
    className: "name-inner",
    style: {
      fontFamily: "\"Instrument Serif\""
    }
  }, t.title[0])), /*#__PURE__*/React.createElement("span", {
    className: "name-l"
  }, /*#__PURE__*/React.createElement("span", {
    className: "name-inner"
  }, t.title[1]))), /*#__PURE__*/React.createElement("div", {
    className: "title-rule"
  }), /*#__PURE__*/React.createElement("p", {
    className: "title-sub"
  }, rich(t.sub), /*#__PURE__*/React.createElement("span", {
    className: "sc"
  }, t.smallcaps)), /*#__PURE__*/React.createElement("div", {
    className: "title-meta"
  }, /*#__PURE__*/React.createElement("div", null, t.meta[0]), /*#__PURE__*/React.createElement("div", null, t.meta[1]), /*#__PURE__*/React.createElement("div", {
    className: "em"
  }, t.meta[2]))), /*#__PURE__*/React.createElement("div", {
    className: "invitation"
  }, /*#__PURE__*/React.createElement("span", null, t.invite), /*#__PURE__*/React.createElement("span", {
    className: "arrow"
  })));
}

/* ============================================================
   Half-title / Epigraph
   ============================================================ */
function HalfTitle({
  t
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "half-title page",
    "data-page": "ii"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "epigraph"
  }, rich(t.epigraph)), /*#__PURE__*/React.createElement("div", {
    className: "attribution"
  }, t.epigraphAttr[0], /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, t.epigraphAttr[1]))));
}

/* ============================================================
   Table of contents
   ============================================================ */
function TOC({
  t,
  activeSectionId
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "toc page spread-narrow",
    "data-page": t.toc.num
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, "\u2014 " + t.toc.label + " \u2014"), /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, t.toc.label), /*#__PURE__*/React.createElement("span", {
    className: "roman"
  }, t.toc.num))), /*#__PURE__*/React.createElement("div", {
    className: "toc-list"
  }, t.toc.rows.map((row, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: i,
    delay: i % 3 + 1
  }, /*#__PURE__*/React.createElement("a", {
    className: "toc-row" + (activeSectionId === row.href ? " active" : ""),
    href: row.href
  }, /*#__PURE__*/React.createElement("span", {
    className: "toc-num"
  }, row.num), /*#__PURE__*/React.createElement("span", {
    className: "toc-title"
  }, rich(row.title)), /*#__PURE__*/React.createElement("span", {
    className: "toc-leader"
  }), /*#__PURE__*/React.createElement("span", {
    className: "toc-page"
  }, row.page))))));
}

/* ============================================================
   Preface — body text with marginalia
   ============================================================ */
function Preface({
  t
}) {
  const p = t.preface;
  const fnRefs = useRef([]);
  const [activeFn, setActiveFn] = useState(-1);
  return /*#__PURE__*/React.createElement("section", {
    className: "preface page",
    "data-page": p.page,
    id: "preface"
  }, /*#__PURE__*/React.createElement("div", {
    className: "spread"
  }, /*#__PURE__*/React.createElement("div", {
    className: "margin-l"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "gloss"
  }, p.glossLeft.map((line, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, line)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "portrait"
  }, /*#__PURE__*/React.createElement("img", {
    src: "images/home/Me.webp",
    alt: p.portrait,
    className: "portrait-img",
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "portrait-cap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, p.portrait), p.portraitCap[0]))), /*#__PURE__*/React.createElement("div", {
    className: "content"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, p.label), /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, rich(p.title)), /*#__PURE__*/React.createElement("span", {
    className: "roman"
  }, p.page))), /*#__PURE__*/React.createElement("div", {
    className: "body",
    "data-page": "v"
  }, p.body.flatMap((para, i) => {
    const items = [React.createElement(Reveal, { as: "p", key: "p" + i, delay: i % 3 + 1 }, rich(para))];
    if (i < p.body.length - 1) {
      items.push(React.createElement("div", { key: "h" + i, className: "hedera", "aria-hidden": "true" }, "❧"));
    }
    return items;
  })), /*#__PURE__*/React.createElement("div", {
    className: "footnotes",
    "data-page": "vi"
  }, p.footnotes.map((fn, i) => /*#__PURE__*/React.createElement(Reveal, {
    className: "fn-item",
    key: i,
    delay: i % 3 + 1
  }, /*#__PURE__*/React.createElement("span", {
    className: "fn-num"
  }, fn[0]), /*#__PURE__*/React.createElement("span", null, rich(fn.slice(1))))))), /*#__PURE__*/React.createElement("div", {
    className: "margin-r"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "gloss"
  }, /*#__PURE__*/React.createElement("span", {
    className: "gloss-num"
  }, "\xB2"), p.glossRight.map((line, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, line)))))));
}

/* ============================================================
   Plate II SVG (chart placeholder)
   ============================================================ */
function Plate2SVG() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 500",
    preserveAspectRatio: "xMidYMid meet"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: "p2grid",
    x: "0",
    y: "0",
    width: "20",
    height: "20",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 20 0 L 0 0 0 20",
    fill: "none",
    stroke: "rgba(241, 236, 224, 0.05)",
    strokeWidth: "0.5"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "400",
    height: "500",
    fill: "url(#p2grid)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "20",
    y: "40",
    fontFamily: "JetBrains Mono",
    fontSize: "9",
    fill: "rgba(241, 236, 224, 0.6)",
    letterSpacing: "1.5"
  }, "CAPEX \xB7 Q4 \xB7 STRATEGIC"), /*#__PURE__*/React.createElement("text", {
    x: "20",
    y: "74",
    fontFamily: "EB Garamond",
    fontStyle: "italic",
    fontSize: "36",
    fill: "rgba(241, 236, 224, 0.95)"
  }, "R$ 1.95B"), /*#__PURE__*/React.createElement("text", {
    x: "20",
    y: "96",
    fontFamily: "EB Garamond",
    fontStyle: "italic",
    fontSize: "13",
    fill: "#c89b5a"
  }, "\u25B2 +7.5%"), /*#__PURE__*/React.createElement("text", {
    x: "80",
    y: "96",
    fontFamily: "JetBrains Mono",
    fontSize: "9",
    fill: "rgba(241, 236, 224, 0.4)",
    letterSpacing: "0.5"
  }, "VS Q3"), /*#__PURE__*/React.createElement("line", {
    x1: "20",
    y1: "120",
    x2: "380",
    y2: "120",
    stroke: "rgba(241, 236, 224, 0.18)",
    strokeWidth: "0.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 400 L60 380 L100 350 L140 360 L180 320 L220 340 L260 280 L300 300 L340 230 L380 260",
    stroke: "rgba(241, 236, 224, 0.9)",
    strokeWidth: "1.5",
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 420 L60 410 L100 420 L140 390 L180 400 L220 370 L260 380 L300 350 L340 370 L380 340",
    stroke: "#c89b5a",
    strokeWidth: "1.5",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "340",
    cy: "230",
    r: "3",
    fill: "rgba(241, 236, 224, 0.95)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "350",
    y: "225",
    fontFamily: "EB Garamond",
    fontStyle: "italic",
    fontSize: "11",
    fill: "rgba(241, 236, 224, 0.85)"
  }, "peak"), /*#__PURE__*/React.createElement("text", {
    x: "20",
    y: "465",
    fontFamily: "JetBrains Mono",
    fontSize: "8",
    fill: "rgba(241, 236, 224, 0.5)",
    letterSpacing: "1"
  }, "JAN"), /*#__PURE__*/React.createElement("text", {
    x: "100",
    y: "465",
    fontFamily: "JetBrains Mono",
    fontSize: "8",
    fill: "rgba(241, 236, 224, 0.5)",
    letterSpacing: "1"
  }, "MAR"), /*#__PURE__*/React.createElement("text", {
    x: "180",
    y: "465",
    fontFamily: "JetBrains Mono",
    fontSize: "8",
    fill: "rgba(241, 236, 224, 0.5)",
    letterSpacing: "1"
  }, "JUN"), /*#__PURE__*/React.createElement("text", {
    x: "260",
    y: "465",
    fontFamily: "JetBrains Mono",
    fontSize: "8",
    fill: "rgba(241, 236, 224, 0.5)",
    letterSpacing: "1"
  }, "SEP"), /*#__PURE__*/React.createElement("text", {
    x: "340",
    y: "465",
    fontFamily: "JetBrains Mono",
    fontSize: "8",
    fill: "rgba(241, 236, 224, 0.5)",
    letterSpacing: "1"
  }, "DEC"), /*#__PURE__*/React.createElement("text", {
    x: "200",
    y: "490",
    textAnchor: "middle",
    fontFamily: "EB Garamond",
    fontStyle: "italic",
    fontSize: "10",
    fill: "rgba(241, 236, 224, 0.4)"
  }, "\u2014 Fig. 1 \u2014"));
}

/* Plate III phone */
function Plate3Phone() {
  return /*#__PURE__*/React.createElement("div", {
    className: "phone"
  }, /*#__PURE__*/React.createElement("div", {
    className: "phone-inner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8,
      fontSize: 7
    }
  }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", null, "\u25CF \u25CF\u25CF\u25CF")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "EB Garamond",
      fontStyle: "italic",
      fontSize: 12,
      color: "#f1ece0",
      marginBottom: 8
    }
  }, "Mina 03 \xB7 ao vivo"), /*#__PURE__*/React.createElement("div", {
    className: "phone-row"
  }, /*#__PURE__*/React.createElement("span", null, "Produ\xE7\xE3o"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "2.847")), /*#__PURE__*/React.createElement("div", {
    className: "phone-row warn"
  }, /*#__PURE__*/React.createElement("span", null, "Vibra\xE7\xE3o"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "+18%")), /*#__PURE__*/React.createElement("div", {
    className: "phone-row"
  }, /*#__PURE__*/React.createElement("span", null, "OEE"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "87.2%")), /*#__PURE__*/React.createElement("div", {
    className: "phone-row"
  }, /*#__PURE__*/React.createElement("span", null, "Turno B"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "\u2197 +2.1"))));
}

/* Variações leves por tela (ângulo de montagem, escala e tom de luz).
   Diferencia as três sem inventar conteúdo — dá ritmo de "coleção". */
const QUADRO_VARIANTS = [
  { tiltX: 0, rollZ: 0, scale: 1, tint: "#f6eede" },
  { tiltX: 0, rollZ: 0, scale: 1, tint: "#fff5ec" },
  { tiltX: 0, rollZ: 0, scale: 1, tint: "#f1eadd" }
];

/* ============================================================
   PlateCard — uma tela (pintura) da seção Works. Cada obra é
   montada como um quadro 3D (WebGL): frente = arte, verso =
   chassi/wireframe. O recto é o link clicável para a ficha; o
   botão de pena gira a tela; a lupa-pêndulo amplia de perto.
   Estado de flip por-tela (cada cartão é independente).
   ============================================================ */
function PlateCard({ p, i, t }) {
  const e = React.createElement;
  const w = t.works;
  const [flipped, setFlipped] = useState(false);
  const flipLabel = flipped ? w.flip.toRecto  : w.flip.toVerso;
  const flipAria  = flipped ? w.flip.ariaRecto : w.flip.ariaVerso;

  // Formato da prancha: "wide" = tela deitada (landscape); senão, retrato.
  // Defina p.format = "wide" no dado da obra para usar a variação larga.
  const isWide = p.format === "wide";

  // Quadro 3D (objeto WebGL) — imagens por prancha (default: tela genérica,
  // landscape quando wide). Para arte específica: p.quadro = { front, back, side }.
  const q = p.quadro || (isWide ? {
    front: "images/home/paint-front-wide.webp",
    back:  "images/home/paint-back-wide.webp",
    side:  "images/home/paint-side-wide.webp"
  } : {
    front: "images/home/paint-front.webp",
    back:  "images/home/paint-back.webp",
    side:  "images/home/paint-side.webp"
  });
  const stageRef = useRef(null);
  const instRef  = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    // O Three.js pode chegar DEPOIS (lazy via IntersectionObserver, ver
    // home.js, quando window.__THREE_LAZY está ligado). Tentamos montar já;
    // se ainda não chegou, esperamos o evento 'three-ready' e montamos então.
    // Enquanto isso, a frente da tela aparece como imagem (fallback de sempre).
    const tryMount = () => {
      if (instRef.current || !window.mountQuadro || !window.THREE) return !!instRef.current;
      // A lupa-pêndulo (Lupa2.png) é desenhada pelo componente <Lens/>,
      // não pela lupa lisa embutida — por isso loupe:false aqui.
      // As variações dão um ângulo/tom distinto a cada tela.
      const v = QUADRO_VARIANTS[i] || {};
      const mountOpts = {
        front: q.front, back: q.back, side: q.side,
        loupe: false,
        tiltX: v.tiltX, rollZ: v.rollZ, scale: v.scale, tint: v.tint
      };
      if (isWide) {
        // geometria landscape: 1815 × 867 × 38 → 18.15 × 8.67 × 0.38
        mountOpts.w = 18.15; mountOpts.h = 8.67; mountOpts.d = 0.38;
        mountOpts.maxPixelRatio = 2;   // textura grande: poupa memória de GPU
      }
      instRef.current = window.mountQuadro(stage, mountOpts);
      if (instRef.current) {
        const fall = stage.querySelector(".plate-quadro-fallimg");
        if (fall) fall.remove();
      }
      return !!instRef.current;
    };
    const onThreeReady = () => { tryMount(); };
    if (!tryMount()) {
      if (window.__THREE_LAZY) {
        window.addEventListener("three-ready", onThreeReady);
      }
      // Fallback: sem WebGL/Three (ou enquanto o lazy não chega),
      // mostra a frente da tela como imagem.
      const img = document.createElement("img");
      img.src = q.front; img.alt = ""; img.className = "plate-quadro-fallimg";
      stage.appendChild(img);
    }
    return () => {
      window.removeEventListener("three-ready", onThreeReady);
      if (instRef.current && instRef.current.destroy) instRef.current.destroy();
      instRef.current = null;
    };
  }, []);

  // Alinha o trilho repetível (lights-repeat) à barra da luminária (lights):
  // a barra ocupa 0.213–0.343 da altura da imagem, então posicionamos o
  // trilho exatamente nessa faixa para que pareça uma peça contínua.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const plate = stage.closest(".plate");
    if (!plate) return;
    const rail    = plate.querySelector(".plate-rail");
    const fixture = plate.querySelector(".plate-rail__fixture");
    const track   = plate.querySelector(".plate-rail__track");
    if (!rail || !fixture || !track) return;
    const BAR_TOP = 0.213, BAR_H = 0.130;
    const place = () => {
      const fr = fixture.getBoundingClientRect();
      const rr = rail.getBoundingClientRect();
      if (!fr.height) return;
      track.style.top    = (fr.top - rr.top + BAR_TOP * fr.height) + "px";
      track.style.height = Math.max(3, BAR_H * fr.height) + "px";
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(fixture);
    ro.observe(rail);
    window.addEventListener("resize", place);
    const t = setTimeout(place, 300);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", place);
      clearTimeout(t);
    };
  }, []);

  const onFlip = () => {
    setFlipped(f => !f);
    if (instRef.current && instRef.current.flip) instRef.current.flip();
  };

  const dataPage = i === 1 ? { "data-page": "ix" } : i === 2 ? { "data-page": "xi" } : {};

  // ============================================================
  // VARIAÇÃO WIDE — tela deitada (landscape). Luminária centrada
  // sobre a tela; botão circular "Verso" no canto sup. direito;
  // ficha editorial em 3 faixas (cabeçalho · corpo · métricas).
  // A lupa-pêndulo <Lens/> se prende ao .plate-quadro-stage como
  // de costume. Reusa .plate-meta/.plate-title/.plate-desc/.plate-stats.
  // ============================================================
  if (isWide) {
    return e("article", { className: "plate plate--wide", ...dataPage },
      e(Reveal, { className: "plate-rail plate-rail--wide", as: "div" },
        e("div", { className: "plate-rail__track", "aria-hidden": "true" }),
        e("div", { className: "plate-rail__fixture", "aria-hidden": "true" })
      ),
      e(Reveal, { className: "plate-wide-body" },
        // ---- tela landscape + botão de virar ----
        e("div", { className: "plate-quadro--wide" },
          e("a", {
            href: p.href,
            className: "plate-quadro-link",
            "data-cursor-label": t.cursorLabels.seePlate,
            "aria-label": t.cursorLabels.seePlate + " — " + p.roman
          },
            e("div", { className: "plate-quadro-stage", ref: stageRef, "aria-hidden": "true" })
          ),
          e("button", {
            type: "button",
            className: "plate-turn" + (flipped ? " is-flipped" : ""),
            onClick: onFlip,
            "aria-pressed": flipped ? "true" : "false",
            "aria-label": flipAria
          },
            e("span", { className: "plate-turn__disc", "aria-hidden": "true" },
              e("svg", {
                viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg",
                fill: "none", stroke: "currentColor", strokeWidth: "1.6",
                strokeLinecap: "round", strokeLinejoin: "round"
              },
                e("path", { d: "M19 12 A7 7 0 1 1 16.5 6.6" }),
                e("polyline", { points: "16.6 3 16.9 6.9 13 7.2" })
              )
            ),
            e("span", { className: "plate-turn__cap" }, flipped ? w.flip.turnRecto : w.flip.turnVerso)
          )
        ),
        // ---- ficha editorial: cabeçalho · corpo · métricas ----
        e("div", { className: "plate-entry" },
          e("div", { className: "plate-entry__head" },
            e("div", { className: "plate-entry__id" },
              e("div", { className: "plate-entry__roman" }, p.roman),
              e("h3", { className: "plate-title" }, rich(p.title)),
              e("div", { className: "plate-sub" }, p.sub)
            ),
            e("a", {
              href: p.href, className: "plate-link"
            }, p.link, " →")
          ),
          e("div", { className: "plate-entry__body" },
            e("div", { className: "plate-meta" },
              e("dl", null, p.meta.map((m, j) => e(React.Fragment, { key: j },
                e("dt", null, m.dt),
                e("dd", null, m.dd)
              )))
            ),
            e("div", { className: "plate-entry__main" },
              e("div", { className: "plate-desc" }, p.desc.map((para, j) =>
                e("p", { key: j }, rich(para))
              )),
              e("div", { className: "plate-stats" }, p.stats.map((s, j) =>
                e("div", { className: "plate-stat", key: j },
                  e("div", { className: "val" }, s.val),
                  e("div", { className: "lab" }, s.lab)
                )
              ))
            )
          )
        )
      )
    );
  }

  return e("article", {
    className: "plate",
    ...dataPage
  },
    // Trilho de teto (lights-repeat) + holofote de galeria (lights) sobre a
    // tela. Decorativo (aria-hidden); o grid espelha .plate-grid para que o
    // holofote caia exatamente sobre a coluna central da prancha.
    e(Reveal, { className: "plate-rail", as: "div" },
      e("div", { className: "plate-rail__track", "aria-hidden": "true" }),
      e("div", { className: "plate-rail__grid", "aria-hidden": "true" },
        e("span", { className: "plate-rail__cell" }),
        e("span", { className: "plate-rail__fixture" }),
        e("span", { className: "plate-rail__cell" })
      )
    ),
    e(Reveal, { className: "plate-grid" },
      // -------- Coluna conteúdo (esquerda): título · descrição · métricas --------
      e("div", { className: "plate-content" },
        // Roman do cabeçalho — só aparece no mobile (reusa o estilo da wide,
        // .plate-entry__roman). No desktop fica oculto e usa-se o roman grande
        // da .plate-meta na coluna direita. Ver CSS .plate-content__roman.
        e("div", { className: "plate-entry__roman plate-content__roman" }, p.roman),
        e("h3",  { className: "plate-title" }, rich(p.title)),
        e("div", { className: "plate-sub"   }, p.sub),
        e("div", { className: "plate-desc"  }, p.desc.map((para, j) =>
          e("p", { key: j }, rich(para))
        )),
        e("div", { className: "plate-stats" }, p.stats.map((s, j) =>
          e("div", { className: "plate-stat", key: j },
            e("div", { className: "val" }, s.val),
            e("div", { className: "lab" }, s.lab)
          )
        ))
      ),

      // -------- Coluna central: quadro 3D (objeto WebGL) --------
      // Clicar leva à ficha; o botão de flip (na meta) gira o objeto.
      e("a", {
        href: p.href,
        className: "plate-quadro-link",
        "data-cursor-label": t.cursorLabels.seePlate,
        "aria-label": t.cursorLabels.seePlate + " — " + p.roman
      },
        e("div", { className: "plate-quadro-stage", ref: stageRef, "aria-hidden": "true" })
      ),

      // -------- Coluna meta (direita): nome do quadro · ficha técnica --------
      e("div", { className: "plate-meta" },
        e("div", { className: "roman" }, p.roman),
        e("dl", null, p.meta.map((m, j) => e(React.Fragment, { key: j },
          e("dt", null, m.dt),
          e("dd", null, m.dd)
        ))),
        // Botão de flip — logo abaixo da lista (depois de "Dimensões")
        e("button", {
          type: "button",
          className: "plate-flip-btn" + (flipped ? " is-flipped" : ""),
          onClick: onFlip,
          "aria-pressed": flipped ? "true" : "false",
          "aria-label": flipAria
        },
          e("span", { className: "plate-flip-glyph", "aria-hidden": "true" },
            e("svg", { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
              e("g", {
                fill: "none", stroke: "currentColor",
                strokeWidth: "1.4", strokeLinecap: "round", strokeLinejoin: "round"
              },
                // pena estilizada
                e("path", { d: "M 6 18 C 8 10, 12 6, 18 4 C 18 10, 14 14, 8 16" }),
                e("path", { d: "M 6 18 L 11 13" }),
                // arco de retorno (seta de virar)
                e("path", { d: "M 14 19 A 5 5 0 1 1 9 14" }),
                e("path", { d: "M 9 14 L 6.5 14.5 M 9 14 L 8.5 11.5" })
              )
            )
          ),
          e("span", { className: "plate-flip-label" }, flipLabel)
        ),
        // Link "ler a ficha completa" — logo abaixo do botão "Verso"
        e("a", {
          href: p.href,
          className: "plate-link"
        }, p.link, " →")
      )
    )
  );
}

/* ============================================================
   Works — plates
   ============================================================ */
function Works({
  t
}) {
  const w = t.works;
  return /*#__PURE__*/React.createElement("section", {
    className: "plates page",
    "data-page": w.page,
    id: "works"
  }, /*#__PURE__*/React.createElement("div", {
    className: "spread-narrow"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, w.label), /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, rich(w.title)), /*#__PURE__*/React.createElement("span", {
    className: "roman"
  }, w.page)))), w.plates.map((p, i) => /*#__PURE__*/React.createElement(PlateCard, { p, i, t, key: i })));
}

/* ============================================================
   MinorWorks — "Pranchas menores" (rolo de filme 35 mm)
   ------------------------------------------------------------
   Fita full-bleed correndo em loop infinito (clones suficientes
   para cobrir a tela; avança exatamente um conjunto). Clique numa
   prancha amplia no lightbox, com navegação por setas/teclado.
   Toda a mecânica vive no useEffect (DOM puro sobre os refs).
   Perfurações = SVG inline repetido (background) — sem assets.
   ============================================================ */
function MinorWorks({ t }) {
  const e = React.createElement;
  const m = t.minorWorks;
  const reelRef  = useRef(null);
  const trackRef = useRef(null);
  const lbRef    = useRef(null);

  useEffect(() => {
    const reel = reelRef.current, track = trackRef.current, lb = lbRef.current;
    if (!reel || !track || !lb) return;
    const viewport = reel.querySelector('.reel-viewport');
    const SPEED = 42; // px/s
    const originals = Array.prototype.slice.call(track.querySelectorAll('.reel-frame'));

    function buildLoop() {
      track.querySelectorAll('[data-clone]').forEach(n => n.remove());
      const setW = originals.reduce((s, f) => s + f.getBoundingClientRect().width, 0);
      if (!setW) return;
      const target = viewport.clientWidth * 2 + setW;   // folga p/ telas largas
      let total = setW;
      while (total < target) {
        originals.forEach(f => {
          const c = f.cloneNode(true);
          c.setAttribute('data-clone', '1');
          c.setAttribute('aria-hidden', 'true');
          track.appendChild(c);
        });
        total += setW;
      }
      track.style.setProperty('--reel-shift', setW + 'px');  // avança 1 conjunto → emenda invisível
      reel.style.setProperty('--reel-speed', (setW / SPEED) + 's');
    }
    let raf;
    function relayout() { cancelAnimationFrame(raf); raf = requestAnimationFrame(buildLoop); }
    window.addEventListener('resize', relayout);
    track.querySelectorAll('img').forEach(img => { if (!img.complete) img.addEventListener('load', relayout, { once: true }); });
    buildLoop();

    /* Lightbox — navegação por índice */
    const items   = m.items;
    const lbImg   = lb.querySelector('.lb-img');
    const lbRoman = lb.querySelector('.lb-roman');
    const lbTitle = lb.querySelector('.lb-title');
    const lbTag   = lb.querySelector('.lb-tag');
    const lbDesc  = lb.querySelector('.lb-desc');
    let cur = 0;
    function renderLB() {
      const w = items[cur];
      lbImg.src = w.img; lbImg.alt = w.title;
      lbRoman.textContent = w.roman; lbTitle.textContent = w.title;
      lbTag.textContent = w.tag; lbDesc.textContent = w.desc;
    }
    function openAt(i) {
      cur = (i % items.length + items.length) % items.length;
      renderLB(); lb.classList.add('open'); reel.classList.add('is-paused');
      document.body.style.overflow = 'hidden';
    }
    function nav(s) { openAt(cur + s); }
    function closeLB() { lb.classList.remove('open'); reel.classList.remove('is-paused'); document.body.style.overflow = ''; }

    function onTrackClick(ev) {
      const frame = ev.target.closest('.reel-frame');
      if (frame) openAt(parseInt(frame.getAttribute('data-idx'), 10) || 0);
    }
    function onKey(ev) {
      if (!lb.classList.contains('open')) return;
      if (ev.key === 'Escape') closeLB();
      else if (ev.key === 'ArrowLeft') nav(-1);
      else if (ev.key === 'ArrowRight') nav(1);
    }
    function onLbClick(ev) { if (ev.target === lb) closeLB(); }
    const prevBtn = lb.querySelector('.lb-prev'), nextBtn = lb.querySelector('.lb-next'), closeBtn = lb.querySelector('.lb-close');
    const onPrev = () => nav(-1), onNext = () => nav(1);
    track.addEventListener('click', onTrackClick);
    prevBtn.addEventListener('click', onPrev);
    nextBtn.addEventListener('click', onNext);
    closeBtn.addEventListener('click', closeLB);
    lb.addEventListener('click', onLbClick);
    document.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('resize', relayout);
      cancelAnimationFrame(raf);
      track.removeEventListener('click', onTrackClick);
      prevBtn.removeEventListener('click', onPrev);
      nextBtn.removeEventListener('click', onNext);
      closeBtn.removeEventListener('click', closeLB);
      lb.removeEventListener('click', onLbClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [m]);

  const numeral = r => r.replace(/^(Prancha|Plate)\s+/, '');

  return e("section", { className: "minor-works page", "data-page": m.page, id: "minor-works" },
    e("div", { className: "ot-reel", ref: reelRef, role: "group", "aria-label": m.title[0] },
      e("div", { className: "reel-perf top", "aria-hidden": "true" }),
      e("div", { className: "reel-viewport" },
        e("div", { className: "reel-track", ref: trackRef },
          m.items.map((w, i) => e("figure", { className: "reel-frame", key: i, "data-idx": i },
            e("div", { className: "f-shot" },
              e("img", { src: w.img, alt: w.title, loading: "lazy" }),
              e("span", { className: "f-num" }, numeral(w.roman)),
              e("figcaption", { className: "f-label" }, w.label, e("small", null, w.labelSub))))))),
      e("div", { className: "reel-perf bottom", "aria-hidden": "true" })),
    e("div", { className: "reel-lightbox", ref: lbRef, role: "dialog", "aria-modal": "true", "aria-label": m.title[0] },
      e("button", { className: "lb-nav lb-prev", type: "button", "aria-label": m.prev }, "‹"),
      e("button", { className: "lb-nav lb-next", type: "button", "aria-label": m.next }, "›"),
      e("div", { className: "lb-sheet" },
        e("div", { className: "lb-stage" }, e("img", { className: "lb-img", src: "data:,", alt: "" })),
        e("div", { className: "lb-info" },
          e("button", { className: "lb-close", type: "button", "aria-label": m.close }, "×"),
          e("span", { className: "lb-roman" }),
          e("span", { className: "lb-title" }),
          e("span", { className: "lb-tag" }),
          e("p",    { className: "lb-desc" })))));
}

/* ============================================================
   ProcessDiamond — "Duplo Diamante" gravado (FIG. 1 — METHOD)
   ------------------------------------------------------------
   Dois losangos: Problema (Descobrir⇢Definir) e Solução
   (Desenhar⇢Entregar). Cada metade esquerda = divergência (hachura
   aberta), cada metade direita = convergência (hachura cruzada).
   SVG puramente geométrico; todo o texto vive em HTML (i18n + nitidez
   em qualquer escala). Lobos centrados nos quartos do viewBox p/
   alinhar com a legenda das 4 fases abaixo.
   ============================================================ */
var PP_SVG = '<svg class="pp-svg" viewBox="0 0 800 320" role="img" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">' +
  '<defs>' +
    '<pattern id="ppHatchA" patternUnits="userSpaceOnUse" width="9" height="9" patternTransform="rotate(45)">' +
      '<line class="pp-hatch" x1="0" y1="0" x2="0" y2="9"/>' +
    '</pattern>' +
    '<pattern id="ppHatchB" patternUnits="userSpaceOnUse" width="6.5" height="6.5" patternTransform="rotate(45)">' +
      '<line class="pp-hatch pp-hatch--dense" x1="0" y1="0" x2="0" y2="6.5"/>' +
      '<line class="pp-hatch pp-hatch--dense" x1="0" y1="0" x2="6.5" y2="0"/>' +
    '</pattern>' +
    '<g id="ppFleur">' +
      '<path class="pp-fleur" d="M0,-9 C2,-3 3,-2 9,0 C3,2 2,3 0,9 C-2,3 -3,2 -9,0 C-3,-2 -2,-3 0,-9 Z"/>' +
      '<circle class="pp-fleur-dot" cx="0" cy="0" r="1.4"/>' +
    '</g>' +
  '</defs>' +
  /* hachura — divergência (aberta) / convergência (cruzada) */
  '<g class="pp-fills">' +
    '<path d="M16,160 L208,28 L208,292 Z" fill="url(#ppHatchA)"/>' +
    '<path d="M208,28 L400,160 L208,292 Z" fill="url(#ppHatchB)"/>' +
    '<path d="M400,160 L592,28 L592,292 Z" fill="url(#ppHatchA)"/>' +
    '<path d="M592,28 L784,160 L592,292 Z" fill="url(#ppHatchB)"/>' +
  '</g>' +
  /* eixo central pontilhado */
  '<line class="pp-axis" x1="8" y1="160" x2="792" y2="160"/>' +
  /* divisas internas divergir|convergir */
  '<line class="pp-guide" x1="208" y1="34" x2="208" y2="286"/>' +
  '<line class="pp-guide" x1="592" y1="34" x2="592" y2="286"/>' +
  /* contornos dos losangos — gravura em linha dupla */
  '<g class="pp-dia">' +
    '<path d="M16,160 L208,28 L400,160 L208,292 Z"/>' +
    '<path d="M400,160 L592,28 L784,160 L592,292 Z"/>' +
  '</g>' +
  '<g class="pp-dia pp-dia--inner" transform="translate(400,160) scale(0.955) translate(-400,-160)">' +
    '<path d="M16,160 L208,28 L400,160 L208,292 Z"/>' +
    '<path d="M400,160 L592,28 L784,160 L592,292 Z"/>' +
  '</g>' +
  /* setas de fluxo (esq. → dir.) sobre o eixo */
  '<g class="pp-flow">' +
    '<path d="M300,154 L312,160 L300,166"/>' +
    '<path d="M488,154 L500,160 L488,166"/>' +
    '<path d="M676,154 L688,160 L676,166"/>' +
    '<path d="M772,154 L784,160 L772,166"/>' +
  '</g>' +
  /* fleurons nos três nós do eixo */
  '<use href="#ppFleur" x="16" y="160"/>' +
  '<use href="#ppFleur" x="400" y="160"/>' +
  '<use href="#ppFleur" x="784" y="160"/>' +
'</svg>';

function ProcessDiamond({ d }) {
  var sp = d.spaces || [];
  var flow = d.flow || { diverge: "", converge: "" };
  return /*#__PURE__*/React.createElement("div", { className: "pp", "data-page": "xiv" },
    /*#__PURE__*/React.createElement("div", { className: "pp-spaces" },
      sp.map((s, i) => /*#__PURE__*/React.createElement("div", { className: "pp-space", key: i },
        /*#__PURE__*/React.createElement("span", { className: "pp-space-label" }, s.label),
        /*#__PURE__*/React.createElement("span", { className: "pp-space-sub" }, s.sub)))),
    /*#__PURE__*/React.createElement("div", { className: "pp-stage", dangerouslySetInnerHTML: { __html: PP_SVG } }),
    /*#__PURE__*/React.createElement("div", { className: "pp-keys" },
      d.nodes.map((n, i) => /*#__PURE__*/React.createElement("div", { className: "pp-key", key: i },
        /*#__PURE__*/React.createElement("span", { className: "pp-key-roman" }, n.roman),
        /*#__PURE__*/React.createElement("span", { className: "pp-key-flow" }, (i % 2 === 0) ? flow.diverge : flow.converge),
        /*#__PURE__*/React.createElement("h5", null, n.name),
        /*#__PURE__*/React.createElement("p", null, n.note)))),
    /*#__PURE__*/React.createElement("p", { className: "pp-loop" }, d.loop));
}

/* ============================================================
   Method
   ============================================================ */
function Method({
  t
}) {
  const m = t.method;
  return /*#__PURE__*/React.createElement("section", {
    className: "method page",
    "data-page": m.page,
    id: "method"
  }, /*#__PURE__*/React.createElement("div", {
    className: "spread-narrow"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, m.label), /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, rich(m.title)), /*#__PURE__*/React.createElement("span", {
    className: "roman"
  }, m.page))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("p", {
    className: "method-credo"
  }, rich(m.credo)))), /*#__PURE__*/React.createElement("div", {
    className: "method-body"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "tenets",
    "data-page": "xiii"
  }, m.tenets.map((tn, i) => /*#__PURE__*/React.createElement("div", {
    className: "tenet",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "glyph"
  }, tn.glyph), /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, tn.num), /*#__PURE__*/React.createElement("h4", null, tn.title), /*#__PURE__*/React.createElement("p", null, tn.desc))))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(ProcessDiamond, { d: m.diagram }))));
}

/* ============================================================
   RosetteCorner — roseta gravada para os 4 cantos do Ex Libris
   ------------------------------------------------------------
   Oito pétalas radiais + miolo, em oxblood. Posicionada via CSS
   conforme a classe (tl/tr/bl/br).
   ============================================================ */
function RosetteCorner({ pos }) {
  const e = React.createElement;
  return e("span", { className: "cv-slip-rosette " + pos, "aria-hidden": "true" },
    e("svg", { viewBox: "0 0 18 18", xmlns: "http://www.w3.org/2000/svg" },
      e("g", { fill: "currentColor" },
        e("circle",  { cx: 9, cy: 9, r: 1.6 }),
        e("ellipse", { cx: 9,   cy: 3,   rx: 1.2, ry: 3 }),
        e("ellipse", { cx: 9,   cy: 15,  rx: 1.2, ry: 3 }),
        e("ellipse", { cx: 3,   cy: 9,   rx: 3,   ry: 1.2 }),
        e("ellipse", { cx: 15,  cy: 9,   rx: 3,   ry: 1.2 }),
        e("ellipse", { cx: 4.6, cy: 4.6, rx: 1.2, ry: 3, transform: "rotate(-45 4.6 4.6)" }),
        e("ellipse", { cx: 13.4, cy: 4.6, rx: 1.2, ry: 3, transform: "rotate(45 13.4 4.6)" }),
        e("ellipse", { cx: 4.6, cy: 13.4, rx: 1.2, ry: 3, transform: "rotate(45 4.6 13.4)" }),
        e("ellipse", { cx: 13.4, cy: 13.4, rx: 1.2, ry: 3, transform: "rotate(-45 13.4 13.4)" })
      )
    )
  );
}

/* ============================================================
   StampBadge — selo postal antigo no canto da folha avulsa
   ------------------------------------------------------------
   Gera um SVG com borda picotada (perfurações típicas de selo
   postal), com algarismo romano (denominação), nome do país e
   ano (postmark) — tudo em sépia + cancelamento manual sobre
   a face. País varia conforme idioma: PT → "Brasil", EN → "U.S.A.".
   ============================================================ */
function StampBadge({ roman, country, postmark }) {
  const e = React.createElement;
  const W = 60, H = 70;
  const R = 2.4;            // raio das perfurações
  const pTop  = 7;          // perfurações topo/base
  const pSide = 8;          // perfurações lados

  // Constrói o path com semicírculos côncavos ao longo de cada borda
  const stepX = (W - 2 * R) / pTop;
  const stepY = (H - 2 * R) / pSide;
  const fix = n => n.toFixed(2);
  let d = `M ${R} 0`;
  // Topo (esq → dir)
  for (let i = 0; i < pTop; i++) {
    const cx = R + i * stepX + stepX / 2;
    d += ` L ${fix(cx - R)} 0 A ${R} ${R} 0 0 1 ${fix(cx + R)} 0`;
  }
  d += ` L ${W - R} 0`;
  // Direita (topo → base)
  for (let i = 0; i < pSide; i++) {
    const cy = R + i * stepY + stepY / 2;
    d += ` L ${W} ${fix(cy - R)} A ${R} ${R} 0 0 1 ${W} ${fix(cy + R)}`;
  }
  d += ` L ${W} ${H - R}`;
  // Base (dir → esq)
  for (let i = pTop - 1; i >= 0; i--) {
    const cx = R + i * stepX + stepX / 2;
    d += ` L ${fix(cx + R)} ${H} A ${R} ${R} 0 0 1 ${fix(cx - R)} ${H}`;
  }
  d += ` L ${R} ${H}`;
  // Esquerda (base → topo)
  for (let i = pSide - 1; i >= 0; i--) {
    const cy = R + i * stepY + stepY / 2;
    d += ` L 0 ${fix(cy + R)} A ${R} ${R} 0 0 1 0 ${fix(cy - R)}`;
  }
  d += ' Z';

  // ID único para os defs (evita colisão se múltiplos selos coexistirem
  // — útil em testes/storybook; aqui só existe um, mas é boa prática).
  const idPaper = `stampPaper-${country.replace(/[^a-z]/gi, '')}`;
  const idInk   = `stampInk-${country.replace(/[^a-z]/gi, '')}`;

  return e('span', { className: 'cv-slip-stamp', 'aria-hidden': 'true' },
    e('svg', {
      viewBox: `0 0 ${W} ${H}`,
      xmlns: 'http://www.w3.org/2000/svg',
      className: 'cv-slip-stamp-svg',
      preserveAspectRatio: 'xMidYMid meet'
    },
      e('defs', null,
        // Papel do selo: gradiente sépia desbotado, com áreas mais claras
        e('linearGradient', { id: idPaper, x1: '0', y1: '0', x2: '1', y2: '1' },
          e('stop', { offset: '0%',  stopColor: '#ecd9aa' }),
          e('stop', { offset: '55%', stopColor: '#d6bb84' }),
          e('stop', { offset: '100%', stopColor: '#b8995f' })
        ),
        // Tinta do carimbo (cancelamento)
        e('linearGradient', { id: idInk, x1: '0', y1: '0', x2: '1', y2: '0' },
          e('stop', { offset: '0%',  stopColor: '#3a2410', stopOpacity: '0.05' }),
          e('stop', { offset: '50%', stopColor: '#3a2410', stopOpacity: '0.32' }),
          e('stop', { offset: '100%', stopColor: '#3a2410', stopOpacity: '0.05' })
        )
      ),

      // Corpo do selo — papel com borda perfurada
      e('path', { d: d, fill: `url(#${idPaper})` }),

      // Manchas/foxing — pequenas áreas sépias mais escuras
      e('ellipse', { cx: 12,    cy: 14, rx: 4, ry: 2.8, fill: '#7a5a30', opacity: 0.08 }),
      e('ellipse', { cx: W-9,   cy: 52, rx: 3.5, ry: 2.4, fill: '#5a3a18', opacity: 0.1 }),
      e('ellipse', { cx: 18,    cy: H-9, rx: 2.4, ry: 1.8, fill: '#7a5a30', opacity: 0.09 }),

      // Borda interna decorativa
      e('rect', {
        x: 3.5, y: 4.5,
        width:  W - 7, height: H - 9,
        fill: 'none',
        stroke: '#6b4220',
        strokeWidth: 0.6,
        opacity: 0.55
      }),
      e('rect', {
        x: 5, y: 6,
        width:  W - 10, height: H - 12,
        fill: 'none',
        stroke: '#6b4220',
        strokeWidth: 0.25,
        opacity: 0.45
      }),

      // Denominação — algarismo romano em itálico, no topo
      e('text', {
        x: W / 2, y: 21,
        textAnchor: 'middle',
        fontFamily: 'EB Garamond, Georgia, serif',
        fontStyle: 'italic',
        fontWeight: 500,
        fontSize: 15,
        fill: '#4a2e10'
      }, roman),

      // Ornamento divisor (filete duplo)
      e('line', {
        x1: 16, y1: 30, x2: W - 16, y2: 30,
        stroke: '#5a3a18', strokeWidth: 0.4, opacity: 0.55
      }),
      e('text', {
        x: W / 2, y: 38,
        textAnchor: 'middle',
        fontFamily: 'EB Garamond, Georgia, serif',
        fontSize: 5,
        fill: '#5a3a18',
        opacity: 0.7
      }, '✦'),
      e('line', {
        x1: 16, y1: 42, x2: W - 16, y2: 42,
        stroke: '#5a3a18', strokeWidth: 0.4, opacity: 0.55
      }),

      // País — caixa alta espaçada
      e('text', {
        x: W / 2, y: 52,
        textAnchor: 'middle',
        fontFamily: 'JetBrains Mono, ui-monospace, monospace',
        fontSize: 5.4,
        fontWeight: 600,
        letterSpacing: '0.18em',
        fill: '#3a2410'
      }, country.toUpperCase()),

      // Postmark — ano em romanos, miúdo
      e('text', {
        x: W / 2, y: 62,
        textAnchor: 'middle',
        fontFamily: 'JetBrains Mono, ui-monospace, monospace',
        fontSize: 3.6,
        letterSpacing: '0.22em',
        fill: '#5a3a18',
        opacity: 0.7
      }, postmark),

      // Cancelamento postal — duas curvas paralelas atravessando o selo,
      // como riscos de carimbo. Ligeiramente diagonais para parecer manual.
      e('path', {
        d: `M -3 22 Q ${W/2} 30 ${W + 3} 24`,
        fill: 'none',
        stroke: '#2a1808',
        strokeWidth: 0.7,
        opacity: 0.22,
        strokeLinecap: 'round'
      }),
      e('path', {
        d: `M -3 27 Q ${W/2} 35 ${W + 3} 29`,
        fill: 'none',
        stroke: '#2a1808',
        strokeWidth: 0.7,
        opacity: 0.22,
        strokeLinecap: 'round'
      }),
      // Carimbo redondo parcial no canto inferior direito (postmark circular)
      e('circle', {
        cx: W - 10, cy: H - 12,
        r: 7,
        fill: 'none',
        stroke: '#2a1808',
        strokeWidth: 0.55,
        opacity: 0.28,
        strokeDasharray: '0.8 0.6'
      }),
      e('circle', {
        cx: W - 10, cy: H - 12,
        r: 5,
        fill: 'none',
        stroke: '#2a1808',
        strokeWidth: 0.4,
        opacity: 0.22
      })
    )
  );
}

/* ============================================================
   CV — arquivos por idioma × edição
   ------------------------------------------------------------
   Estrutura em CV/<LANG>/<Estilo>/ (nomes reais, com espaços):
     · Thumbail.{jpg,webp}                          → face do cartão (só PT; EN reusa PT)
     · Lucas Schoenherr - <Estilo> - <LANG> - Web.pdf   → versão web (abre no clique)
     · Lucas Schoenherr - <Estilo>- <LANG> - Print.pdf  → versão impressão (botão "baixar")
       (atenção: o "Print" não tem espaço antes do traço de <Estilo>)
   CV_EN_READY: os 4 PDFs EN já subiram → true. Os thumbnails EN ainda
   não existem, então o mapa de thumbs aponta EN para os arquivos PT.
   ============================================================ */
const CV_EN_READY = true;
const CV_THUMBS = {
  pt: { themed: "CV/PT/Themed/Thumbail.webp", modern: "CV/PT/Modern/Thumbail.webp" },
  // EN ainda sem thumbnail próprio → reusa a face PT
  en: { themed: "CV/PT/Themed/Thumbail.webp", modern: "CV/PT/Modern/Thumbail.webp" }
};
const CV_WEB = {
  pt: { themed: "CV/PT/Themed/Lucas Schoenherr - Themed - PTBR - Web.pdf", modern: "CV/PT/Modern/Lucas Schoenherr - Modern - PTBR - Web.pdf" },
  en: { themed: "CV/EN/Themed/Lucas Schoenherr - Themed - EN - Web.pdf", modern: "CV/EN/Modern/Lucas Schoenherr - Modern - EN - Web.pdf" }
};
/* Versão de download (impressão). PDFs finais já subiram → READY = true:
   o botão deixa de ser placeholder e baixa a edição selecionada. */
const CV_DOWNLOAD_READY = true;
const CV_DOWNLOAD = {
  pt: { themed: "CV/PT/Themed/Lucas Schoenherr - Themed - PTBR - Print.pdf", modern: "CV/PT/Modern/Lucas Schoenherr - Modern- PTBR - Print.pdf" },
  en: { themed: "CV/EN/Themed/Lucas Schoenherr - Themed - EN - Print.pdf", modern: "CV/EN/Modern/Lucas Schoenherr - Modern- EN - Print.pdf" }
};
function cvAsset(map, lang, variant) {
  const useLang = (lang === "en" && !CV_EN_READY) ? "pt" : lang;
  return (map[useLang] || map.pt)[variant];
}

/* ============================================================
   ToolsIndex — Instrumentos como índice tipográfico.
   Lista alfabética em duas colunas; ao passar o mouse, uma
   "ficha" (polaroid) abre à direita com o ícone desenhado à
   mão do programa. Substitui o antigo .tool-cats.
   Ícones em images/tools/<slug>.webp.
   ============================================================ */
const TOOL_ICONS = {
  "Agile / Scrum": "agile-scrum", "Azure DevOps": "azure-devops", "Claude": "claude",
  "Claude Design": "claude-design", "Cursor": "cursor", "Figma": "figma", "FigJam": "figjam",
  "Flowmapp": "flowmapp", "Framer": "framer", "Google Antigravity": "google-antigravity",
  "Illustrator": "illustrator", "Jira": "jira", "Maze": "maze", "Milanote": "milanote",
  "Miro": "miro", "Mural": "mural", "Notion": "notion", "Obsidian": "obsidian",
  "Photoshop": "photoshop", "VS Code": "vscode"
};
const TOOL_ORDER = ["Agile / Scrum", "Azure DevOps", "Claude", "Claude Design", "Cursor", "Figma", "FigJam", "Flowmapp", "Framer", "Google Antigravity", "Illustrator", "Jira", "Maze", "Milanote", "Miro", "Mural", "Notion", "Obsidian", "Photoshop", "VS Code"];

function ToolsIndex({ tools }) {
  const e = React.createElement;
  const [hovered, setHovered] = useState(null);
  const [rot, setRot] = useState(7);   // inclinação final aleatória da ficha
  const popRef = useRef(null);
  const anchorRef = useRef(null);
  const touchedAt = useRef(0);   // timestamp do último toque (suprime mouse simulado)

  // tilt aleatório: magnitude 4–9°, sinal aleatório (evita o sempre-igual)
  const randomTilt = () => (4 + Math.random() * 5) * (Math.random() < 0.5 ? -1 : 1);

  // abre a ficha (polaroid) ancorada na linha alvo
  const showFor = (target, it) => {
    const r = target.getBoundingClientRect();
    anchorRef.current = { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
    setRot(randomTilt());
    setHovered(it);
  };

  // roman e rótulo de cada ferramenta a partir dos grupos (bilíngue, vem do data)
  const romanOf = {}, labelOf = {};
  tools.groups.forEach(g => { labelOf[g.roman] = g.label; g.list.forEach(n => { romanOf[n] = g.roman; }); });

  const items = TOOL_ORDER.filter(n => romanOf[n]).map(n => ({
    name: n, roman: romanOf[n], cat: labelOf[romanOf[n]],
    icon: "images/tools/" + (TOOL_ICONS[n] || "") + ".webp"
  }));
  const half = Math.ceil(items.length / 2);
  const col1 = items.slice(0, half), col2 = items.slice(half);

  React.useLayoutEffect(() => {
    const el = popRef.current, a = anchorRef.current;
    if (!el || !a) return;
    const w = el.offsetWidth, h = el.offsetHeight, gap = 16, M = 8;
    let left = a.right + gap;                       // ficha abre à direita do romano
    // sem espaço à direita (ex.: mobile, lista full-width) → ancora no canto
    // direito do viewport em vez de virar p/ a esquerda e cobrir a lista
    if (left + w > window.innerWidth - M) left = window.innerWidth - M - w;
    if (left < M) left = M;
    let top = (a.top + a.bottom) / 2 - h / 2;       // centrada na altura da linha
    if (top < M) top = M;
    if (top + h > window.innerHeight - M) top = window.innerHeight - M - h;
    el.style.left = left + "px";
    el.style.top = top + "px";
  }, [hovered]);

  const renderRow = (it) => e("div", {
    key: it.name, className: "tools-index__row",
    // Desktop: hover abre/fecha. Ignora o mouse SIMULADO que o toque dispara.
    onMouseEnter: (ev) => {
      if (Date.now() - touchedAt.current < 700) return;
      showFor(ev.currentTarget, it);
    },
    // Touch: press-and-hold — a ficha aparece enquanto o dedo está na linha
    // e some quando o usuário solta (touchend) ou rola (touchmove).
    onTouchStart: (ev) => { touchedAt.current = Date.now(); showFor(ev.currentTarget, it); },
    onTouchMove:  () => { setHovered(null); },
    onTouchEnd:   () => { touchedAt.current = Date.now(); setHovered(null); },
    onTouchCancel:() => { setHovered(null); }
  },
    e("span", { className: "tools-index__name" }, it.name),
    e("span", { className: "tools-index__leader", "aria-hidden": "true" }),
    e("span", { className: "tools-index__cat" }, it.roman)
  );

  const popup = !hovered ? null : ReactDOM.createPortal(
    e("div", {
      ref: popRef,
      style: { position: "fixed", left: -999, top: 0, zIndex: 60, pointerEvents: "none" }
    },
      e("div", { key: hovered.name, style: { animation: "idxdrop 320ms var(--ease-out) both", transformOrigin: "50% 50%", "--idx-rot": rot + "deg" } },
        e("div", { style: { background: "var(--paper-card)", border: "1px solid rgba(26,22,18,0.42)", boxShadow: "0 0 0 1px rgba(26,22,18,0.10), 0 12px 26px rgba(26,22,18,0.26)", padding: "8px 8px 9px", width: 118 } },
          e("div", { style: { height: 102, display: "flex", alignItems: "center", justifyContent: "center", background: "#efe7d2", border: "1px solid rgba(26,22,18,0.26)", boxShadow: "inset 0 0 0 3px rgba(247,242,227,0.6)", overflow: "hidden" } },
            e("img", { src: hovered.icon, alt: hovered.name, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })
          ),
          e("div", { style: { fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.04em", color: "var(--ink)", marginTop: 8, textAlign: "center" } }, hovered.name),
          e("div", { style: { fontFamily: "var(--mono)", fontSize: 8, letterSpacing: "0.05em", color: "var(--ink-faint)", marginTop: 2, textAlign: "center" } }, tools.sup + " \u00b7 " + hovered.cat)
        )
      )
    ),
    document.body);

  return e("div", { className: "tools-index" },
    e("div", { className: "tools-index__cols", onMouseLeave: () => setHovered(null) },
      e("div", null, col1.map(renderRow)),
      e("div", null, col2.map(renderRow))
    ),
    e("div", { className: "tools-index__legend" },
      tools.groups.map((g, i) => (i ? "  \u00b7  " : "") + g.roman + ". " + g.label).join("")
    ),
    popup
  );
}

/* ============================================================
   Specialties — "Artes do ofício" (Repertório)
   ------------------------------------------------------------
   Prancha rotativa: uma disciplina por vez numa prancha
   emoldurada, com algarismo romano em marca d'água, verbete
   carregado de palavras-chave de Senior Product Designer
   (ATS / triagem IA), setas + marcadores + virada automática.
   Fotos em images/services/{ai,ux,ui,ds}.webp. Só tokens do DS.
   Fica ACIMA do Aparato (ferramentas). Agora é Capítulo III —
   entra no TOC e no scroll-spy como capítulo próprio.
   ============================================================ */
function Specialties({ t }) {
  const e = React.createElement;
  const s = t.specialties;
  const u = s.ui || {};
  const items = s.items;
  const total = items.length;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const secRef = useRef(null);
  const inViewRef = useRef(false);
  const reduced = typeof window !== "undefined" && window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Gentle auto-turn — only while in view and the reader isn't interacting.
  useEffect(() => {
    if (reduced) return;
    const el = secRef.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { inViewRef.current = en.isIntersecting; });
    }, { threshold: 0.4 });
    io.observe(el);
    const id = setInterval(() => {
      if (inViewRef.current && !paused) setActive(a => (a + 1) % total);
    }, 4600);
    return () => { io.disconnect(); clearInterval(id); };
  }, [paused, reduced, total]);

  const go = n => setActive(((n % total) + total) % total);
  const onKey = ev => {
    if (ev.key === "ArrowRight" || ev.key === "ArrowDown") { ev.preventDefault(); go(active + 1); }
    else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") { ev.preventDefault(); go(active - 1); }
  };

  const cur = items[active];

  return e("section", { className: "specialties page", "data-page": s.page, id: "specialties", ref: secRef },
    e("div", { className: "spec-wrap" },
      e(Reveal, null,
        e("div", { className: "heading" },
          e("span", { className: "num" }, s.label),
          e("span", { className: "title" }, rich(s.title)),
          e("span", { className: "roman" }, s.page))),
      e(Reveal, { as: "p", delay: 1, className: "rep-lede" }, s.intro),

      e(Reveal, { delay: 2 },
        e("div", { className: "rep-frame" },
        e("button", { type: "button", className: "rep-arrow rep-arrow--prev",
          "aria-label": u.prev, onClick: () => go(active - 1) },
          e("svg", { className: "rep-arrow-i", viewBox: "0 0 24 24", "aria-hidden": "true" },
            e("path", { d: "M15 5 L8 12 L15 19" }))),
        e("button", { type: "button", className: "rep-arrow rep-arrow--next",
          "aria-label": u.next, onClick: () => go(active + 1) },
          e("svg", { className: "rep-arrow-i", viewBox: "0 0 24 24", "aria-hidden": "true" },
            e("path", { d: "M9 5 L16 12 L9 19" }))),
        e("div", { className: "rep-stage",
            role: "group", "aria-roledescription": "carousel", "aria-label": rich(s.title),
            tabIndex: 0, onKeyDown: onKey,
            onMouseEnter: () => setPaused(true),
            onMouseLeave: () => setPaused(false),
            onFocus: () => setPaused(true), onBlur: () => setPaused(false) },

          e("span", { className: "rep-ghost", "aria-hidden": "true", key: "g" + active }, cur.roman),

          /* ── Plate image (left) ── */
          e("div", { className: "rep-shot" },
            items.map((it, i) => e("img", {
              key: i, src: it.img, alt: it.alt, loading: "lazy",
              className: "rep-shot-img" + (i === active ? " is-active" : ""),
              "aria-hidden": i === active ? null : "true" }))),

          /* ── Entry (right) ── */
          e("div", { className: "rep-body" },
            e("p", { className: "rep-kick" },
              u.plate + " " + cur.roman + " · " + cur.cat),
            e("h3", { className: "rep-title", key: "t" + active }, cur.title),
            e("div", { className: "rep-rule", "aria-hidden": "true" }),
            e("p", { className: "rep-desc", key: "d" + active }, cur.desc),
            e("div", { className: "rep-kw", key: "k" + active },
              cur.kw.map((k, j) => e("span", {
                className: "rep-kw-tag", style: { "--d": (j * 70) + "ms" } }, k))),

            e("div", { className: "rep-ctrl" },
              e("div", { className: "rep-dots", role: "tablist" },
                items.map((it, i) => e("button", {
                  key: i, type: "button", role: "tab",
                  className: "rep-dot" + (i === active ? " is-active" : ""),
                  "aria-label": u.plate + " " + it.roman + " — " + it.title,
                  "aria-selected": i === active ? "true" : "false",
                  onClick: () => go(i) }))),
              e("span", { className: "rep-count", "aria-hidden": "true" },
                "0" + (active + 1) + " / 0" + total))))))));
}

/* ============================================================
   Apparatus
   ============================================================ */
function Apparatus({
  t, lang
}) {
  const a = t.apparatus;
  const [cvVariant, setCvVariant] = useState("modern");
  return /*#__PURE__*/React.createElement("section", {
    className: "apparatus page spread-narrow",
    "data-page": a.page,
    id: "apparatus"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, a.label), /*#__PURE__*/React.createElement("span", {
    className: "title"
  }, rich(a.title)), /*#__PURE__*/React.createElement("span", {
    className: "roman"
  }, a.page))), /*#__PURE__*/React.createElement(Reveal, {
    as: "p",
    delay: 1,
    className: "plate-desc",
    style: {
      maxWidth: 640
    }
  }, a.intro), /*#__PURE__*/React.createElement("div", {
    className: "apparatus-grid",
    "data-page": "xvii"
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement("h4", null, a.tools.label, /*#__PURE__*/React.createElement("span", {
    className: "sup"
  }, a.tools.sup)), /*#__PURE__*/React.createElement(ToolsIndex, {
    tools: a.tools
  }))),
  /* ── Curriculum: SIBLING de apparatus-grid (não filha), para ocupar
     a largura inteira do spread-narrow em vez de uma coluna de 1fr/1fr. ── */
  React.createElement(Reveal, {
    className: "curriculum",
    "data-page": "xviii"
  },
    React.createElement("h4", null, a.cv.label,
      React.createElement("span", { className: "sup" }, a.cv.sup)
    ),

    /* ── Visual timeline track ── */
    React.createElement("div", { className: "cv-timeline", "aria-hidden": "true" },
      React.createElement("div", { className: "cv-track" },
        [...CV_TIMELINE].sort((a, b) => a.start - b.start).map((seg, i) => {
          const left  = ((seg.start - CV_FIRST) / CV_SPAN * 100).toFixed(2) + "%";
          const width = ((seg.end   - seg.start) / CV_SPAN * 100).toFixed(2) + "%";
          return React.createElement("div", {
            key: seg.start,
            className: "cv-seg" + (seg.current ? " current" : ""),
            style: { left, width }
          });
        })
      ),
      React.createElement("div", { className: "cv-ruler" },
        [CV_FIRST, 2015, 2019, 2022, CV_LAST].map((yr, i) => {
          const left  = ((yr - CV_FIRST) / CV_SPAN * 100).toFixed(2) + "%";
          const label = yr === CV_LAST
            ? a.cv.rows[0].period
            : ["2011","2015","2019","2022"][i];
          return React.createElement("span", {
            key: yr, className: "cv-yr", style: { left }
          }, label);
        })
      )
    ),

    /* ── Text rows: nota de uma linha OU bullets detalhados ── */
    React.createElement("div", null,
      a.cv.rows.map((row, i) => React.createElement("div", {
        className: "cv-row", key: i
      },
        React.createElement("div", { className: "period" }, row.period),
        React.createElement("div", { className: "role" },
          row.role,
          React.createElement("span", { className: `firm${row.current ? " current" : ""}` }, row.firm)
        ),
        React.createElement("div", { className: "note" },
          row.bullets
            ? React.createElement("ul", { className: "cv-bullets" },
                row.bullets.map((b, j) => React.createElement("li", { key: j }, b)))
            : row.note
        )
      ))
    ),

    /* ── Educação: tabela iv, mesmo grid das faixas de prática ── */
    a.edu && React.createElement("h4", { className: "cv-edu-head" }, a.edu.label,
      React.createElement("span", { className: "sup" }, a.edu.sup)
    ),
    a.edu && React.createElement("div", { className: "cv-edu" },
      a.edu.rows.map((row, i) => React.createElement("div", {
        className: "cv-row cv-row--edu", key: i
      },
        React.createElement("div", { className: "period" }, row.period),
        React.createElement("div", { className: "role" },
          row.course,
          React.createElement("span", { className: "firm" }, row.inst)
        ),
        React.createElement("div", { className: "note" }, row.kind)
      ))
    )
  ),

  /* ── Tipped-in slip: folha avulsa com o CV, encartada após
     a cronologia para que o leitor a encontre logo depois de
     ver a jornada profissional. Mantém o léxico editorial
     ("feuille volante", "encartado pelo editor"). ── */
  React.createElement(Reveal, {
    className: "cv-slip-band",
    "data-page": "xix",
    delay: 2
  },
    React.createElement("div", { className: "ti-stage" },
      React.createElement("span", { className: "cv-slip-page-note" }, a.cvSlip.contextNote),
      React.createElement("div", { className: "cv-slip-copy" },
        a.cvSlip.contextBody.map((paragraph, i) => React.createElement("p", { key: i }, paragraph))
      ),
      /* ── Controles do CV (à esquerda, sob o argumento): alternador de
         edição + botão de download. O toggle escolhe qual folha fica à
         frente na pilha à direita; o download (placeholder até
         CV_DOWNLOAD_READY) baixa a edição selecionada. ── */
      React.createElement("div", { className: "cv-controls" },
        React.createElement("div", { className: "cv-download-row" },
          React.createElement(
            CV_DOWNLOAD_READY ? "a" : "button",
            Object.assign(
              { className: "cv-download-btn" + (CV_DOWNLOAD_READY ? "" : " is-pending") },
              CV_DOWNLOAD_READY
                ? { href: cvAsset(CV_DOWNLOAD, lang, cvVariant), download: "", target: "_blank", rel: "noopener" }
                : { type: "button", "aria-disabled": "true", disabled: true }
            ),
            React.createElement("span", { className: "cv-download-ico", "aria-hidden": "true" }, "↓"),
            React.createElement("span", { className: "cv-download-label" }, a.cvSlip.download.label),
            !CV_DOWNLOAD_READY && React.createElement("span", { className: "cv-download-note" }, a.cvSlip.download.note)
          )
        )
      ),
      /* ── Figura: pilha de folhas (a edição selecionada à frente, com
         selo; a outra espia atrás). O clique na da frente abre a versão
         web; o alternador vive nos controles à esquerda. ── */
      React.createElement("div", { className: "cv-slip-figure" },
        /* ── Marginalia manuscrita à DIREITA da pilha: a voz do desenhista
           apontando que a folha de trás é clicável e revela a OUTRA edição. ── */
        React.createElement("div", { className: "cv-stack" },
          ["themed", "modern"].map(v => {
            const isFront = v === cvVariant;
            return React.createElement("a", {
              key: v,
              className: "cv-thumb-card ex-libris " + (isFront ? "is-front" : "is-back"),
              href: cvAsset(CV_WEB, lang, v),
              "aria-label": isFront
                ? a.cvSlip.aria + " — " + a.cvSlip.editions[v]
                : a.cvSlip.peek + ": " + a.cvSlip.editions[v],
              target: "_blank",
              rel: "noopener",
              /* Clicar na carta de trás não navega: traz a edição à frente
                 (com animação). A da frente abre a versão web normalmente. */
              onClick: (e) => {
                if (!isFront) { e.preventDefault(); setCvVariant(v); }
              }
            },
              React.createElement("img", {
                className: "cv-thumb-img",
                src: cvAsset(CV_THUMBS, lang, v),
                alt: a.cvSlip.aria + " — " + a.cvSlip.editions[v],
                loading: "lazy",
                onError: (ev) => {
                  if (!ev.target.dataset.fb) {
                    ev.target.dataset.fb = "1";
                    ev.target.src = CV_THUMBS.pt[v];
                  }
                }
              }),
              a.cvSlip.stamp && React.createElement(StampBadge, {
                roman:    a.cvSlip.stamp.roman,
                country:  a.cvSlip.stamp.country,
                postmark: a.cvSlip.stamp.postmark
              })
            );
          })
          /* ── Seta manuscrita à direita da pilha, apontando p/ a folha ── */
        ),
        React.createElement("div", { className: "cv-switch-note", "aria-hidden": "true" },
          React.createElement("img", {
            className: "cv-arrow",
            src: "images/other/Arrow.webp",
            alt: "",
            "aria-hidden": "true",
            loading: "lazy"
          }),
          React.createElement("span", null,
            a.cvSlip.switchHint.prefix,
            " ",
            React.createElement("em", null, a.cvSlip.switchHint[cvVariant === "modern" ? "themed" : "modern"])
          )
        )
        )
      )
    )
  );
}

/* ============================================================
   Correspondence — Carta de contato
   ============================================================ */
function Correspondence({ t }) {
  const cartaRef  = React.useRef(null);
  const sealRef   = React.useRef(null);
  const cancelRef = React.useRef(null);

  React.useEffect(() => {
    const ui = t.contact.ui;
    const WD = ui.wd;
    const MO = ui.mo;

    function toRoman(n) {
      const MAP = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
      let s = '';
      for (const [v, r] of MAP) { while (n >= v) { s += r; n -= v; } }
      return s;
    }

    // Preenche a dateline dinamicamente
    const now = new Date();
    const set = (sel, val) => {
      const el = cartaRef.current && cartaRef.current.querySelector(sel);
      if (el) el.textContent = val;
    };
    const dateStr = ui.dateFmt === 'mdy'
      ? `${WD[now.getDay()]}, ${MO[now.getMonth()]} ${now.getDate()} · ${toRoman(now.getFullYear())}`
      : `${WD[now.getDay()]}, ${now.getDate()} de ${MO[now.getMonth()]} · ${toRoman(now.getFullYear())}`;
    set('[data-dl="date"]', dateStr);

    // Carta card: animate-in via IntersectionObserver
    const card = cartaRef.current;
    let cardIO = null;
    if (card) {
      if ('IntersectionObserver' in window) {
        cardIO = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) { card.classList.add('carta-in'); cardIO.disconnect(); }
        }, { threshold: 0.1 });
        cardIO.observe(card);
      } else {
        card.classList.add('carta-in');
      }
    }

    // Seal: stampa quando entra na viewport
    const seal   = sealRef.current;
    const cancel = cancelRef.current;
    let sealIO = null;
    if (seal && 'IntersectionObserver' in window) {
      sealIO = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          seal.classList.add('stamped');
          if (cancel) cancel.classList.add('shown');
          sealIO.disconnect();
        }
      }, { threshold: 0.35 });
      sealIO.observe(seal);
    }

    // Botão copiar email
    const btn = card && card.querySelector('.js-copy-email');
    let resetT = null;
    async function handleCopy() {
      const email = 'lucas.schoenherr@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
      } catch (_) {
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (_) {}
        document.body.removeChild(ta);
      }
      btn.classList.remove('copied');
      void btn.offsetWidth; // force reflow para replay da animação
      btn.classList.add('copied');
      clearTimeout(resetT);
      resetT = setTimeout(() => btn.classList.remove('copied'), 1100);
    }
    if (btn) btn.addEventListener('click', handleCopy);

    return () => {
      if (cardIO) cardIO.disconnect();
      if (sealIO) sealIO.disconnect();
      if (btn)    btn.removeEventListener('click', handleCopy);
      clearTimeout(resetT);
    };
  }, [t]);

  const e = React.createElement;
  const c = t.contact;

  // Bracket SVG — mesmo em 4 cantos, rotacionado via CSS
  function Bracket({ cls }) {
    return e('svg', { className: `bracket ${cls}`, viewBox: '0 0 22 22', fill: 'none', 'aria-hidden': 'true' },
      e('path', { d: 'M1 21 L1 1 L21 1', stroke: '#4a4136', strokeWidth: '1.2' }),
      e('circle', { cx: '1', cy: '1', r: '2.4', fill: '#7a2620' })
    );
  }

  return e('section', {
    className: 'correspondence page',
    'data-page': c.page,
    id: 'contact'
  },
    e('article', { className: 'carta', ref: cartaRef, 'aria-label': c.ui.ariaCard },

      // Marca postal "via aérea"
      e('div', { className: 'postal', 'aria-hidden': 'true' }, e('span', null, c.ui.viaAerea)),

      // Quatro cantos
      e(Bracket, { cls: 'tl' }), e(Bracket, { cls: 'tr' }),
      e(Bracket, { cls: 'bl' }), e(Bracket, { cls: 'br' }),

      // Cabeçalho
      e('header', { className: 'head' },
        e('span', null, c.ui.para),
        e('span', null, c.ui.ref)
      ),

      // Dateline — preenchida pelo useEffect
      e('div', { className: 'dateline' },
        e('span', { className: 'pin', 'aria-hidden': 'true' }, '✦'),
        ' ', c.ui.datadaDe, ' ',
        e('span', { 'data-dl': 'date' })
      ),

      // Identidade
      e('h2', { className: 'name' }, c.cardName),
      e('address', { className: 'addr', style: { fontStyle: 'normal' } },
        c.cardAddr[0], e('br', null),
        c.cardAddr[1], e('br', null),
        c.ui.timezone, ' ',
        e('span', { className: 'langs', 'aria-label': c.ui.langsAriaLabel },
          e('span', null, 'pt'), e('span', null, '·'), e('span', null, 'en'), e('span', null, '·'), e('span', null, 'es')
        )
      ),

      // Campos de contato
      e('div', { className: 'fields', 'data-page': 'xxi' },

        e('div', { className: 'field' },
          e('span', { className: 'f-lab' }, c.fields[0].lab),
          e('button', {
            className: 'f-copy js-copy-email',
            type: 'button',
            'aria-label': c.ui.ariaEmail
          },
            e('span', { className: 'f-val' }, c.fields[0].val),
            e('span', { className: 'copy-hint', 'aria-hidden': 'true' }, c.ui.copiar),
            e('span', { className: 'copied-stamp', 'aria-hidden': 'true' }, c.ui.copiado)
          ),
          e('span', { 'aria-hidden': 'true' })
        ),

        e('div', { className: 'field' },
          e('span', { className: 'f-lab' }, c.fields[1].lab),
          e('a', {
            className: 'f-copy',
            href: c.fields[1].href,
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': c.ui.ariaLinkedin
          },
            e('span', { className: 'f-val' }, c.fields[1].val),
            e('span', { className: 'copy-hint', 'aria-hidden': 'true' }, c.ui.abrir)
          ),
          e('span', { 'aria-hidden': 'true' })
        )
      ),

      // Carimbo de cancelamento postal (SVG animado via CSS)
      e('svg', { className: 'cancel', ref: cancelRef, viewBox: '0 0 140 50', 'aria-hidden': 'true' },
        e('path', { d: 'M4 26 Q70 -4 136 26', stroke: '#7a2620', strokeWidth: '1', fill: 'none', strokeDasharray: '2 4' }),
        e('path', { d: 'M4 30 Q70  0 136 30', stroke: '#7a2620', strokeWidth: '.6', fill: 'none', strokeDasharray: '2 4' }),
        e('text', { x: '70', y: '46', textAnchor: 'middle', fontFamily: 'JetBrains Mono, monospace', fontSize: '7', fill: '#7a2620', letterSpacing: '2' },
          'RIO DE JANEIRO · RJ'
        )
      ),

      // Lacre / Seal (carimbo desce, impacta e sobe; selo SVG fica como marca)
      e('div', { className: 'seal-wrap', ref: sealRef },
        // Ferramenta de carimbo — PNG do cabo de madeira que vai descer e subir
        e('img', {
          className: 'stamp-tool',
          src: 'images/home/stamp.webp',
          alt: '',
          'aria-hidden': 'true',
          draggable: 'false',
          loading: 'lazy'
        }),
        e('div', { className: 'ink-bleed', 'aria-hidden': 'true' }),
        e('span', { className: 'speck s1', 'aria-hidden': 'true' }),
        e('span', { className: 'speck s2', 'aria-hidden': 'true' }),
        e('span', { className: 'speck s3', 'aria-hidden': 'true' }),
        e('span', { className: 'speck s4', 'aria-hidden': 'true' }),
        e('span', { className: 'speck s5', 'aria-hidden': 'true' }),
        e('svg', { className: 'seal', viewBox: '0 0 80 80', role: 'img', 'aria-label': 'Selo L.S.' },
          /* Cores usam currentColor para que o selo respeite a paleta
             (oxblood no modo claro, rosa-plum no modo escuro). */
          e('circle', { cx: '40', cy: '40', r: '39', fill: 'currentColor', fillOpacity: '.06' }),
          e('circle', { cx: '40', cy: '40', r: '37', fill: 'none', stroke: 'currentColor', strokeWidth: '1.6' }),
          e('circle', { cx: '40', cy: '40', r: '32', fill: 'none', stroke: 'currentColor', strokeWidth: '.7' }),
          e('circle', { cx: '40', cy: '40', r: '27', fill: 'none', stroke: 'currentColor', strokeWidth: '.5', strokeDasharray: '1.8 3.8' }),
          e('circle', { cx: '40', cy: '40', r: '22', fill: 'currentColor', fillOpacity: '.05' }),
          e('circle', { cx: '40', cy: '4',  r: '2',   fill: 'currentColor' }),
          e('circle', { cx: '76', cy: '40', r: '2',   fill: 'currentColor' }),
          e('circle', { cx: '40', cy: '76', r: '2',   fill: 'currentColor' }),
          e('circle', { cx: '4',  cy: '40', r: '2',   fill: 'currentColor' }),

          /* L.S. monogram — centralizado via text-anchor + dominant-baseline.
             letterSpacing reduzido a 1.2 para evitar deslocamento visual
             (o "S." final empurraria o centro óptico para a direita). */
          e('text', {
            x: '40', y: '40',
            textAnchor: 'middle',
            dominantBaseline: 'central',
            fontFamily: 'EB Garamond, Georgia, serif',
            fontStyle: 'italic', fontSize: '17',
            fontWeight: '500',
            fill: 'currentColor', letterSpacing: '1.2'
          }, 'L.S.')
        )   /* close svg.seal */
      )     /* close div.seal-wrap */
    )       /* close article.carta */
  );        /* close section.correspondence + end Correspondence return */
}           /* close Correspondence function */

/* ============================================================
   Colophon
   ============================================================ */
function Colophon({ t }) {
  const e  = React.createElement;
  const co = t.colophon;

  return e('section', { className: 'colophon page', 'data-page': 'xxii' },
    e('div', { className: 'colo-press' },
      e('span', { className: 'colo-press__mark', 'aria-hidden': true }, e('span', null, 'LS')),
      e('span', { className: 'colo-press__cap'  }, co.pressCap)
    ),
    e('div', { className: 'colo-rule', 'aria-hidden': true }, e('span', null, '❦')),
    e('p',  { className: 'colophon-body'     }, rich(co.body)),
    e('p',  { className: 'colophon-meta'     }, co.meta),
    e('p',  { className: 'colo-finis'        }, co.finis)
  );
}

/* ============================================================
   Errata — easter egg
   Aparece após 12 segundos ou quando o leitor passou 75% da página.
   Já some ao fim da animação — fica visível por ~6s.
   ============================================================ */
function Errata({ t }) {
  const [show, setShow] = useState(false);
  const [gone, setGone] = useState(false);
  // Escolhe uma errata aleatória ao montar — não muda durante a sessão
  const idxRef = useRef(Math.floor(Math.random() * t.errata.length));

  useEffect(() => {
    if (gone) return;

    const reveal = () => {
      setShow(true);
      setTimeout(() => { setShow(false); setGone(true); }, 6000);
    };

    const timer = setTimeout(reveal, 12000);

    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (pct > 0.75) { clearTimeout(timer); reveal(); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, [gone]);

  if (gone && !show) return null;

  const entry = t.errata[idxRef.current];
  return React.createElement("div", { className: "errata" + (show ? " show" : "") },
    React.createElement("span", { className: "sup" }, entry.label),
    rich(entry.lines)
  );
}

/* ============================================================
   App — root
   ============================================================ */
function App() {
  const [lang,            setLang          ] = useState('pt');
  const [candle,          setCandle        ] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('');

  const t = CONTENT[lang];

  // Aplica/remove classe candle no body + html (html não herda vars do body)
  useEffect(() => {
    document.body.classList.toggle('candle', candle);
    document.documentElement.style.background = candle ? '#1c1418' : '';
  }, [candle]);

  // Mantém o atributo lang do <html> em sincronia com o idioma escolhido (a11y)
  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  // Bússola: gira conforme o scroll
  useEffect(() => {
    const compass = document.querySelector('.home-compass');
    if (!compass) return;
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) return;
    let ticking = false;
    const update = () => {
      const scrollH = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollH > 0 ? window.scrollY / scrollH : 0;
      compass.style.transform = `rotate(${ratio * 360 * 1.5}deg)`;
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: destaca capítulo ativo no TOC
  useEffect(() => {
    const sectionIds = ['preface', 'works', 'specialties', 'apparatus', 'contact'];
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSectionId('#' + entry.target.id);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -55% 0px' });
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const e = React.createElement;
  return e(React.Fragment, null,
    e(TopChrome, { lang, setLang, t, candle, setCandle }),

    // Wrapper de conteúdo do livro — chrome fixo fica de fora
    e("main", { className: "book-content" },
      e(Frontispiece,   { t }),
      e(HalfTitle,      { t }),
      e(TOC,            { t, activeSectionId }),
      e(Preface,        { t }),
      e(Works,          { t }),
      e(MinorWorks,     { t }),
      e(Specialties,    { t }),
      e(Apparatus,      { t, lang }),
      e(Correspondence, { t }),
      e(Colophon,       { t })
    ),

    e(Errata,       { t }),
    e(Lens,         null),
    e(BottomChrome, { t }),
    e(CursorGlyph,  null)
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(App, null)
);
/* fim — quadro lazy-Three suportado (ver home.js / index.html) */
