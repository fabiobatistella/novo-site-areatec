// SchemaOrg — Centralized JSON-LD structured data for all pages

const SITE_URL = "https://www.areatec.com.br";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Areatec",
  "alternateName": "Areatec Tecnologia",
  "url": SITE_URL,
  "logo": `${SITE_URL}/favicon.svg`,
  "description": "Empresa brasileira com mais de 30 anos de experiencia em tecnologia para fiscalizacao de transito, estacionamento rotativo digital e cidades inteligentes. Presente em mais de 200 cidades.",
  "foundingDate": "1996",
  "foundingLocation": "Araras, SP, Brasil",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "minValue": 100,
    "maxValue": 500
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Tiradentes, 700",
    "addressLocality": "Araras",
    "addressRegion": "SP",
    "postalCode": "13600-000",
    "addressCountry": "BR"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "email": "contato@areatec.com.br",
      "contactType": "sales",
      "availableLanguage": ["Portuguese", "English", "Spanish"]
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/areatec"
  ],
  "knowsAbout": [
    "Traffic Enforcement Technology",
    "Smart Parking Systems",
    "OCR License Plate Recognition",
    "Smart Cities",
    "Computer Vision",
    "Edge AI",
    "Zona Azul Digital",
    "Fiscalizacao de Transito"
  ],
  "areaServed": {
    "@type": "Country",
    "name": "Brazil"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Areatec",
  "url": SITE_URL,
  "description": "Plataforma brasileira de fiscalizacao inteligente, estacionamento digital e videomonitoramento para cidades inteligentes.",
  "inLanguage": ["pt-BR", "en", "es"],
  "publisher": {
    "@type": "Organization",
    "name": "Areatec"
  }
};

export const olhoVivoPatrolSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Olho Vivo Patrol",
  "description": "Sistema integrado de fiscalizacao inteligente com IA embarcada para captura automatica de placas, deteccao de defeitos viarios e prova juridica de infracoes. Precisao OCR de 99,9%.",
  "brand": {
    "@type": "Brand",
    "name": "Areatec"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Areatec"
  },
  "category": "Traffic Enforcement Technology",
  "url": `${SITE_URL}/olhovivo-patrol`,
  "image": `${SITE_URL}/assets/hb20_areatec_rack_final.webp`,
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "BRL",
    "price": "0",
    "priceValidUntil": "2027-12-31",
    "seller": {
      "@type": "Organization",
      "name": "Areatec"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "ratingCount": "200"
  }
};

export const olhoVivoParkingSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Olho Vivo Parking",
  "description": "Plataforma completa de gestao de estacionamento rotativo (Zona Azul) com captura automatica de placas, controle de permanencia, emissao de autos e integracao com parquimetros, totens e app Digipare.",
  "brand": {
    "@type": "Brand",
    "name": "Areatec"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Areatec"
  },
  "category": "Smart Parking Systems",
  "url": `${SITE_URL}/olhovivo-parking`,
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "BRL",
    "price": "0",
    "priceValidUntil": "2027-12-31",
    "seller": {
      "@type": "Organization",
      "name": "Areatec"
    }
  }
};

export const digipareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Digipare",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Android, iOS",
  "description": "Aplicativo oficial para ativacao, pagamento e gestao de vagas de estacionamento rotativo (Zona Azul) pelo celular. Sem fila no parquimetro, com aviso antes do tempo acabar.",
  "url": `${SITE_URL}/#solucoes`,
  "author": {
    "@type": "Organization",
    "name": "Areatec"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  }
};

export const cortexAISchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "CORTEX AI",
  "description": "Motor de inteligencia artificial proprietario da Areatec que processa, correlaciona e transforma dados brutos em decisoes operacionais em tempo real. Utiliza arquitetura Focal Loss para deteccao de objetos com processamento de borda (Edge AI) em menos de 100ms.",
  "brand": {
    "@type": "Brand",
    "name": "Areatec"
  },
  "category": "Artificial Intelligence Software",
  "url": `${SITE_URL}/#cortex`
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "O que e o Olho Vivo Patrol da Areatec?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O Olho Vivo Patrol e um sistema integrado de fiscalizacao inteligente com IA embarcada. O veiculo HB20 equipado le placas automaticamente com 99,9% de acerto, identifica buracos nas vias, problemas na sinalizacao e no mobiliario urbano, tudo em tempo real com geolocalizacao autenticada e cadeia de custodia digital."
      }
    },
    {
      "@type": "Question",
      "name": "Como funciona o estacionamento rotativo Olho Vivo Parking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O Olho Vivo Parking e uma plataforma completa de gestao de Zona Azul. Inclui captura automatica de placas, controle de permanencia, emissao de autos com prova material, e integracao com sensores, cameras, parquimetros e o app Digipare. A operacao vai do inicio ao fim em uma unica plataforma."
      }
    },
    {
      "@type": "Question",
      "name": "O que e o app Digipare?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O Digipare e o aplicativo oficial que permite ao motorista ativar, pagar e gerenciar a vaga de estacionamento rotativo direto pelo celular. Sem fila no parquimetro, com aviso antes do tempo acabar. Disponivel para Android e iOS."
      }
    },
    {
      "@type": "Question",
      "name": "Em quantas cidades a Areatec esta presente?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Areatec esta presente em mais de 200 cidades brasileiras, com mais de 30 anos de experiencia em tecnologia para fiscalizacao de transito e estacionamento rotativo digital."
      }
    },
    {
      "@type": "Question",
      "name": "O que e o CORTEX AI da Areatec?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "O CORTEX e o motor de inteligencia artificial proprietario da Areatec. Ele processa, correlaciona e transforma dados brutos em decisoes operacionais em tempo real. Utiliza arquitetura Focal Loss para deteccao de objetos com processamento de borda (Edge AI) em menos de 100ms de latencia."
      }
    },
    {
      "@type": "Question",
      "name": "A Areatec esta em conformidade com a LGPD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. A Areatec opera com arquitetura privacy-by-design, incluindo anonimizacao facial com rostos sinteticos gerados por IA, criptografia ponta a ponta e controle de acesso granular. Todas as solucoes estao em conformidade com a Lei Geral de Protecao de Dados (LGPD)."
      }
    }
  ]
};
