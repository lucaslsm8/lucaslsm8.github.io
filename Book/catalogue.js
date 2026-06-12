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
  { start: 2023, end: 2026, current: true },
  { start: 2019, end: 2023 },
  { start: 2015, end: 2019 },
  { start: 2012, end: 2015 }
];
const CV_FIRST = 2012;
const CV_LAST  = 2026;
const CV_SPAN  = CV_LAST - CV_FIRST; // 14 anos

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
    meta: ["Rio de Janeiro, Brasil", "Treze anos de prática contínua", "Volume I · Composto em MMXXVI"],
    invite: "Vire a página",
    epigraph: ["O melhor design é ", {
      em: "invisível"
    }, ". Os melhores sistemas liberam ", {
      em: "criatividade"
    }, ". O rigor e o calor podem coexistir. E a IA, longe de substituir o ofício, ", {
      em: "o expande"
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
        title: ["Aparato técnico"],
        page: "xii",
        href: "#apparatus"
      }, {
        num: "IV.",
        title: ["Correspondência"],
        page: "xvi",
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
        versoCaption:"Estado anterior · esboço de composição"
      },
      plates: [{
        roman: "Plate I",
        num: "001",
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
          dd: "MMXXIII — MMXXIV (~3 meses)"
        }, {
          dt: "Materiais",
          dd: "Figma, Variables, padrões para LLMs"
        }, {
          dt: "Dimensões",
          dd: "9 POCs · 5 avançaram para dev"
        }],
        desc: [["Como único designer do programa na Accenture One Studio, concebi ", {
          strong: "nove provas de conceito"
        }, " de IA generativa em domínios distintos — DevOps, jurídico, marketing, supply chain —, todas unificadas por um design system dedicado."], ["A premissa: ", {
          it: "desenhar o sistema antes dos produtos"
        }, ". O resultado: cinco POCs avançaram para protótipo e desenvolvimento, e o vocabulário de UX para IA generativa ficou como base para iniciativas subsequentes na empresa."]],
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
        imgClass: "plate-img-1"
      }, {
        roman: "Plate II",
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
          dd: "MMXXV (~4 meses)"
        }, {
          dt: "Materiais",
          dd: "Figma, DS de data-viz, sistema RAG"
        }, {
          dt: "Dimensões",
          dd: "Mandala · 6 módulos · +60 comp."
        }],
        desc: [["Concepção da cabine de comando executiva do PMO Estratégico da Samarco — com a ", {
          strong: "Mandala Estratégica"
        }, " como coração: visualização hexagonal que conecta os 6 eixos da estratégia em uma única fonte da verdade."], ["O desafio: substituir mais de vinte planilhas reconciliadas manualmente por uma interface onde o anormal grita sem sobrecarregar — e unificar, ", {
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
        imgClass: "plate-img-2"
      }, {
        roman: "Plate III",
        num: "003",
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
          dd: "MMXXIII (~6 meses)"
        }, {
          dt: "Materiais",
          dd: "Figma, Miro, DS mobile próprio"
        }, {
          dt: "Dimensões",
          dd: "iOS · Android · +40 comp. DS"
        }],
        desc: [["MVP mobile-first que substituiu a intranet legada do corredor logístico norte da Vale — colocando dados críticos de produção na palma da mão dos gestores, não apenas na sala de controle."], ["Como único designer: discovery, ", {
          strong: "design system com 40+ componentes"
        }, " e protótipo aprovado por unanimidade pelo steering de Operações, TI e gerência — com arquitetura modular preparada para escalar a outros corredores."]],
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
        imgClass: "plate-img-3"
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
          desc: "Aplicativo para o Hospital Sírio-Libanês — jornada do paciente, agendamento e prontuário em uma experiência mobile clara e acolhedora.",
          label: "Sírio-Libanês", labelSub: "Mobile · UI/UX" },
        { roman: "Prancha II", title: "Vale News", tag: "Mobile App · UI/UX", img: "images/other/valenews.webp",
          desc: "App de comunicação interna da Vale — notícias, comunicados e cultura organizacional na palma da mão dos colaboradores.",
          label: "Vale News", labelSub: "Mobile · UI/UX" },
        { roman: "Prancha III", title: "Leap to the new branding", tag: "Vale · múltiplas mídias", img: "images/other/cracha.webp",
          desc: "Aplicação do novo branding da Vale em múltiplas mídias gráficas, digitais e físicas — do crachá à sinalização.",
          label: "New branding", labelSub: "Vale · mídias" },
        { roman: "Prancha IV", title: "Power BI Dashboard", tag: "Vale · data viz", img: "images/other/data.webp",
          desc: "Painéis de visualização de dados no Power BI para a Vale — indicadores operacionais traduzidos em leitura rápida e acionável.",
          label: "Power BI", labelSub: "Vale · data viz" },
        { roman: "Prancha V", title: "Múltiplos sistemas de IA", tag: "Accenture · UI/UX", img: "images/other/ai.webp",
          desc: "Interfaces para diversos sistemas de Inteligência Artificial na Accenture — de exploradores de dados a assistentes generativos.",
          label: "Sistemas de IA", labelSub: "Accenture · UI/UX" }
      ],
      close: "Fechar", prev: "Prancha anterior", next: "Próxima prancha"
    },
    apparatus: {
      label: "Capítulo III",
      title: ["Aparato técnico"],
      page: "xii",
      intro: "Instrumentos correntes, idiomas falados, e cronologia de prática.",
      tools: {
        label: "Instrumentos",
        sup: "tab. i",
        list: [{
          name: "Figma",
          meta: "Diário"
        }, {
          name: "Framer",
          meta: "Frequente"
        }, {
          name: "Cursor",
          meta: "Diário"
        }, {
          name: "Claude",
          meta: "Diário"
        }, {
          name: "Photoshop",
          meta: "Pontual"
        }, {
          name: "After Effects",
          meta: "Motion"
        }, {
          name: "Linear",
          meta: "Gestão"
        }, {
          name: "Notion",
          meta: "Escrita"
        }, {
          name: "Lottie",
          meta: "Microinteração"
        }, {
          name: "Principle",
          meta: "Prototipagem"
        }, {
          name: "Webflow",
          meta: "Publicação"
        }, {
          name: "Miro",
          meta: "Workshops"
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
          period: "MMXXIII — Hoje",
          role: "Senior Product Designer",
          firm: "GenAI · Systems · UI",
          current: true,
          note: "Liderando design de POCs e produtos baseados em LLMs; design systems reutilizáveis; dashboards executivos."
        }, {
          period: "MMXIX — MMXXIII",
          role: "Senior Product Designer",
          firm: "Vale · Samarco · Enterprise",
          note: "Aplicativos mobile de monitoramento, cabines de comando e modernização de sistemas legados."
        }, {
          period: "MMXV — MMXIX",
          role: "Product / UX Designer",
          firm: "Agências · Consultorias",
          note: "Discovery, pesquisa, journeys e wireframes para clientes diversos. Fundamentos do ofício."
        }, {
          period: "MMXII — MMXV",
          role: "Designer de Interfaces",
          firm: "Início de carreira",
          note: "Primeiros passos em UI, branding e digital. Formação técnica intensiva."
        }]
      },
      cvSlip: {
        eyebrow: "Ex Libris",
        titleLead: "Curriculum ",
        titleEm: "vitæ",
        contextLabel: "Argumento · recto",
        contextBody: [
          "Este volume reúne provas críticas do trabalho de Lucas Schoenherr entre MMXII e MMXXVI, organizadas como pranchas de um catálogo de razão. Cada prancha traz o argumento, o elenco, os atos e as erratas — vocabulário emprestado da tradição editorial e ajustado ao ofício do design de produto.",
          "O leitor encontrará, à direita desta página, uma feuille volante com o currículo do autor, disponível para retirada imediata. As demais pranchas seguem em ordem romana, de I a III."
        ],
        contextNote: "vide infra",
        gloss: "Currículo do autor, em duas folhas — treze anos de product design, sistemas e interfaces generativas.",
        motto: "Ars longa, vita brevis",
        meta: ["PDF", "2 pp", "240 KB", "MMXXVI"],
        printCta: "Abrir a folha",
        cta: "Pegue uma folha",
        aria: "Folha avulsa — Curriculum Vitæ de Lucas Schoenherr",
        editions: { themed: "Composição temática", modern: "Composição moderna" },
        peek: "ver esta edição",
        download: { label: "Baixar o currículo", note: "em breve" },
        stamp: { roman: "v.", country: "Brasil", postmark: "MMXXVI" }
      }
    },
    contact: {
      label: "Capítulo IV",
      title: ["Correspondência"],
      page: "xvi",
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
      }, {
        lab: "Status",
        val: "Disponível para projetos · 2026"
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
      ornament: "✦",
      body: ["Este volume foi composto em ", {
        em: "EB Garamond"
      }, " e ", {
        em: "JetBrains Mono"
      }, " — tipos digitais inspirados em fontes clássicas. Foi desenhado, ", {
        em: "escrito e codificado pelo autor"
      }, ", no Rio de Janeiro, Brasil, no ano da graça de dois mil e vinte e seis."],
      meta: "Impressão privada · Edição I · MMXXVI"
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
    meta: ["Rio de Janeiro, Brazil", "Thirteen years of unbroken practice", "Volume I · Set in MMXXVI"],
    invite: "Turn the page",
    epigraph: ["The best design is ", {
      em: "invisible"
    }, ". Well-made systems unlock ", {
      em: "creativity"
    }, ". Rigor and warmth can coexist. And AI, far from replacing the craft, ", {
      em: "expands it"
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
        title: ["Technical apparatus"],
        page: "xii",
        href: "#apparatus"
      }, {
        num: "IV.",
        title: ["Correspondence"],
        page: "xvi",
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
        versoCaption:"Earlier state · compositional sketch"
      },
      plates: [{
        roman: "Plate I",
        num: "001",
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
          dd: "MMXXIII — MMXXIV (~3 months)"
        }, {
          dt: "Materials",
          dd: "Figma, Variables, LLM patterns"
        }, {
          dt: "Dimensions",
          dd: "9 POCs · 5 advanced to dev"
        }],
        desc: [["As the sole designer of Accenture One Studio's program, I conceived ", {
          strong: "nine proofs of concept"
        }, " in generative AI across distinct domains — DevOps, legal, marketing, supply chain — all unified by a dedicated design system."], ["The premise: ", {
          it: "design the system before the products"
        }, ". The result: five POCs advanced to prototype and development, and the UX vocabulary for generative AI consolidated in the DS became the foundation for the company's subsequent initiatives."]],
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
        imgClass: "plate-img-1"
      }, {
        roman: "Plate II",
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
          dd: "MMXXV (~4 months)"
        }, {
          dt: "Materials",
          dd: "Figma, data-viz DS, RAG system"
        }, {
          dt: "Dimensions",
          dd: "Mandala · 6 modules · 60+ comp."
        }],
        desc: [["Design of Samarco's Strategic PMO command center — with the ", {
          strong: "Strategic Mandala"
        }, " at its heart: a hexagonal visualization connecting the company's 6 strategic axes into a single source of truth."], ["The challenge: replace twenty-plus manually reconciled spreadsheets with an interface where the abnormal shouts without overwhelming — and unify, ", {
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
        imgClass: "plate-img-2"
      }, {
        roman: "Plate III",
        num: "003",
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
          dd: "MMXXIII (~6 months)"
        }, {
          dt: "Materials",
          dd: "Figma, Miro, custom mobile DS"
        }, {
          dt: "Dimensions",
          dd: "iOS · Android · 40+ DS comp."
        }],
        desc: [["Mobile-first MVP replacing Vale's legacy intranet on the northern logistics corridor — putting critical production data in managers' hands, not just the control room."], ["As sole designer: discovery, ", {
          strong: "design system with 40+ components"
        }, " and a prototype approved unanimously by the Operations, IT and management steering — with modular architecture ready to scale to other corridors."]],
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
        imgClass: "plate-img-3"
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
          desc: "App for Hospital Sírio-Libanês — patient journey, scheduling and records in a clear, welcoming mobile experience.",
          label: "Sírio-Libanês", labelSub: "Mobile · UI/UX" },
        { roman: "Plate II", title: "Vale News", tag: "Mobile App · UI/UX", img: "images/other/valenews.webp",
          desc: "Vale's internal-communications app — news, announcements and culture in employees' hands.",
          label: "Vale News", labelSub: "Mobile · UI/UX" },
        { roman: "Plate III", title: "Leap to the new branding", tag: "Vale · multiple media", img: "images/other/cracha.webp",
          desc: "Rollout of Vale's new branding across graphic, digital and physical media — from badge to signage.",
          label: "New branding", labelSub: "Vale · media" },
        { roman: "Plate IV", title: "Power BI Dashboard", tag: "Vale · data viz", img: "images/other/data.webp",
          desc: "Power BI data-visualization panels for Vale — operational indicators turned into fast, actionable reading.",
          label: "Power BI", labelSub: "Vale · data viz" },
        { roman: "Plate V", title: "Multiple AI systems", tag: "Accenture · UI/UX", img: "images/other/ai.webp",
          desc: "Interfaces for several Artificial Intelligence systems at Accenture — from data explorers to generative assistants.",
          label: "AI systems", labelSub: "Accenture · UI/UX" }
      ],
      close: "Close", prev: "Previous plate", next: "Next plate"
    },
    apparatus: {
      label: "Chapter III",
      title: ["Technical apparatus"],
      page: "xii",
      intro: "Current instruments, spoken languages, and chronology of practice.",
      tools: {
        label: "Instruments",
        sup: "tab. i",
        list: [{
          name: "Figma",
          meta: "Daily"
        }, {
          name: "Framer",
          meta: "Frequent"
        }, {
          name: "Cursor",
          meta: "Daily"
        }, {
          name: "Claude",
          meta: "Daily"
        }, {
          name: "Photoshop",
          meta: "Occasional"
        }, {
          name: "After Effects",
          meta: "Motion"
        }, {
          name: "Linear",
          meta: "Management"
        }, {
          name: "Notion",
          meta: "Writing"
        }, {
          name: "Lottie",
          meta: "Micro-interaction"
        }, {
          name: "Principle",
          meta: "Prototyping"
        }, {
          name: "Webflow",
          meta: "Publishing"
        }, {
          name: "Miro",
          meta: "Workshops"
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
          period: "MMXXIII — Today",
          role: "Senior Product Designer",
          firm: "GenAI · Systems · UI",
          current: true,
          note: "Leading design of POCs and LLM-based products; reusable design systems; executive dashboards."
        }, {
          period: "MMXIX — MMXXIII",
          role: "Senior Product Designer",
          firm: "Vale · Samarco · Enterprise",
          note: "Mobile monitoring apps, command centers, and modernization of legacy systems."
        }, {
          period: "MMXV — MMXIX",
          role: "Product / UX Designer",
          firm: "Agencies · Consulting",
          note: "Discovery, research, journeys, and wireframes for varied clients. Foundations of the craft."
        }, {
          period: "MMXII — MMXV",
          role: "Interface Designer",
          firm: "Early career",
          note: "First steps in UI, branding, and digital. Intensive technical training."
        }]
      },
      cvSlip: {
        eyebrow: "Ex Libris",
        titleLead: "Curriculum ",
        titleEm: "vitæ",
        contextLabel: "Argument · recto",
        contextBody: [
          "This volume gathers critical proofs of Lucas Schoenherr's work between MMXII and MMXXVI, arranged as plates in a catalogue raisonné. Each plate carries the argument, cast, acts, and errata — a vocabulary borrowed from editorial tradition and adjusted to the craft of product design.",
          "The reader will find, to the right of this page, a feuille volante with the author's curriculum, available for immediate withdrawal. The remaining plates follow in Roman order, from I to III."
        ],
        contextNote: "vide infra",
        gloss: "The author's curriculum, in two leaves — thirteen years of product design, systems, and generative interfaces.",
        motto: "Ars longa, vita brevis",
        meta: ["PDF", "2 pp", "240 KB", "MMXXVI"],
        printCta: "Open the leaf",
        cta: "Take a leaf",
        aria: "Loose leaf — Lucas Schoenherr's Curriculum Vitæ",
        editions: { themed: "Themed setting", modern: "Modern setting" },
        peek: "see this edition",
        download: { label: "Download the curriculum", note: "coming soon" },
        stamp: { roman: "v.", country: "Brazil", postmark: "MMXXVI" }
      }
    },
    contact: {
      label: "Chapter IV",
      title: ["Correspondence"],
      page: "xvi",
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
      }, {
        lab: "Status",
        val: "Available for projects · 2026"
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
      ornament: "✦",
      body: ["This volume was set in ", {
        em: "EB Garamond"
      }, " and ", {
        em: "JetBrains Mono"
      }, " — digital types inspired by classical faces. It was ", {
        em: "designed, written, and coded by the author"
      }, " in Rio de Janeiro, Brazil, in the year of grace two thousand twenty-six."],
      meta: "Privately printed · Edition I · MMXXVI"
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

  return React.createElement("div", { className: "chrome-bot" },
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
  return e("div", { className: "chrome-top" },
    e("span", { className: "running-head" },
      "Lucas Schoenherr",
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
      e("div", { className: "lang-toggle" },
        e("button", { className: lang === "pt" ? "active" : "", onClick: () => setLang("pt") }, "PT"),
        e("span",  { className: "pipe" }, "/"),
        e("button", { className: lang === "en" ? "active" : "", onClick: () => setLang("en") }, "EN")
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

  // Quadro 3D (objeto WebGL) — imagens por prancha (default: tela genérica).
  // Para arte específica de cada projeto, defina p.quadro = { front, back, side }.
  const q = p.quadro || {
    front: "images/home/paint-front.webp",
    back:  "images/home/paint-back.webp",
    side:  "images/home/paint-side.webp"
  };
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
      instRef.current = window.mountQuadro(stage, {
        front: q.front, back: q.back, side: q.side,
        loupe: false,
        tiltX: v.tiltX, rollZ: v.rollZ, scale: v.scale, tint: v.tint
      });
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

  return e("article", {
    className: "plate",
    ...(i === 1 ? { "data-page": "ix" } : i === 2 ? { "data-page": "xi" } : {})
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
      // -------- Coluna meta (esquerda) --------
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
        )
      ),

      // -------- Coluna central: quadro 3D (objeto WebGL) --------
      // Clicar leva à ficha; o botão de flip (na meta) gira o objeto.
      e("a", {
        href: p.href,
        className: "plate-quadro-link",
        "data-cursor-label": t.cursorLabels.seePlate,
        "aria-label": t.cursorLabels.seePlate + " \u2014 " + p.roman
      },
        e("div", { className: "plate-quadro-stage", ref: stageRef, "aria-hidden": "true" })
      ),

      // -------- Coluna conteúdo (direita) --------
      e("div", { className: "plate-content" },
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
        )),
        e("a", {
          href: p.href,
          className: "plate-link",
          "data-cursor-label": t.cursorLabels.seePlate
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
    e("div", { className: "spread-narrow", style: { maxWidth: "1280px" } },
      e(Reveal, null,
        e("div", { className: "heading" },
          e("span", { className: "num" }, m.label),
          e("span", { className: "title" }, rich(m.title)),
          e("span", { className: "roman" }, m.page)))),
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
        e("div", { className: "lb-stage" }, e("img", { className: "lb-img", src: "", alt: "" })),
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
   Estrutura em CV/<LANG>/<Estilo>/:
     · Thumbail.jpg                 → pré-visualização (face do cartão)
     · CV-<LANG>-<Estilo>-Web.pdf   → versão web (abre no clique)
     · (download paginado entra depois)
   CV_EN_READY: vire `true` quando os arquivos CV/EN/ subirem; até lá
   o idioma EN cai nos arquivos PT (evita imagem/link quebrados).
   ============================================================ */
const CV_EN_READY = false;
const CV_THUMBS = {
  pt: { themed: "CV/PT/Themed/Thumbail.webp", modern: "CV/PT/Modern/Thumbail.jpg" },
  en: { themed: "CV/EN/Themed/Thumbail.webp", modern: "CV/EN/Modern/Thumbail.jpg" }
};
const CV_WEB = {
  pt: { themed: "CV/PT/Themed/CV-PT-Themed-Web.pdf", modern: "CV/PT/Modern/CV-PT-Modern-Web.pdf" },
  en: { themed: "CV/EN/Themed/CV-EN-Themed-Web.pdf", modern: "CV/EN/Modern/CV-EN-Modern-Web.pdf" }
};
/* Versão de download (paginada). Quando os PDFs finais subirem, vire
   CV_DOWNLOAD_READY = true — o botão deixa de ser placeholder e baixa o
   arquivo da edição selecionada. Caminhos esperados abaixo. */
const CV_DOWNLOAD_READY = false;
const CV_DOWNLOAD = {
  pt: { themed: "CV/PT/Themed/CV-PT-Themed.pdf", modern: "CV/PT/Modern/CV-PT-Modern.pdf" },
  en: { themed: "CV/EN/Themed/CV-EN-Themed.pdf", modern: "CV/EN/Modern/CV-EN-Modern.pdf" }
};
function cvAsset(map, lang, variant) {
  const useLang = (lang === "en" && !CV_EN_READY) ? "pt" : lang;
  return (map[useLang] || map.pt)[variant];
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
  }, a.tools.sup)), /*#__PURE__*/React.createElement("div", {
    className: "tool-grid"
  }, a.tools.list.map((tool, i) => /*#__PURE__*/React.createElement("div", {
    className: "tool-line",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, tool.name), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, tool.meta))))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 1
  }, /*#__PURE__*/React.createElement("h4", null, a.langs.label, /*#__PURE__*/React.createElement("span", {
    className: "sup"
  }, a.langs.sup)), /*#__PURE__*/React.createElement("div", null, a.langs.list.map((l, i) => /*#__PURE__*/React.createElement("div", {
    className: "lang-line",
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, l.name), /*#__PURE__*/React.createElement("span", {
    className: "level"
  }, l.level)))))),
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
        [CV_FIRST, 2015, 2019, 2023, CV_LAST].map((yr, i) => {
          const left  = ((yr - CV_FIRST) / CV_SPAN * 100).toFixed(2) + "%";
          const label = yr === CV_LAST
            ? (a.cv.rows[0].period.split("—")[1]?.trim() || String(yr))
            : ["MMXII","MMXV","MMXIX","MMXXIII"][i];
          return React.createElement("span", {
            key: yr, className: "cv-yr", style: { left }
          }, label);
        })
      )
    ),

    /* ── Text rows (unchanged) ── */
    React.createElement("div", null,
      a.cv.rows.map((row, i) => React.createElement("div", {
        className: "cv-row", key: i
      },
        React.createElement("div", { className: "period" }, row.period),
        React.createElement("div", { className: "role" },
          row.role,
          React.createElement("span", { className: `firm${row.current ? " current" : ""}` }, row.firm)
        ),
        React.createElement("div", { className: "note" }, row.note)
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
              "data-cursor-label": isFront ? t.cursorLabels.takeLeaf : a.cvSlip.peek,
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
        ),

        e('div', { className: 'field' },
          e('span', { className: 'f-lab' }, c.fields[2].lab),
          e('span', { className: 'status-val' },
            e('span', { className: 'pulse', 'aria-hidden': 'true' }),
            e('span', { className: 'f-val' }, c.fields[2].val)
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
        e('svg', { className: 'seal', viewBox: '0 0 80 80', 'aria-label': 'Selo L.S.' },
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
    e('p',  { className: 'colophon-ornament' }, co.ornament),
    e('p',  { className: 'colophon-body'     }, rich(co.body)),
    e('p',  { className: 'colophon-meta'     }, co.meta)
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

  // Scroll-spy: destaca capítulo ativo no TOC
  useEffect(() => {
    const sectionIds = ['preface', 'works', 'apparatus', 'contact'];
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
    e("div", { className: "book-content" },
      e(Frontispiece,   { t }),
      e(HalfTitle,      { t }),
      e(TOC,            { t, activeSectionId }),
      e(Preface,        { t }),
      e(Works,          { t }),
      e(MinorWorks,     { t }),
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
