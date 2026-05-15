// Areatec i18n translations — PT / EN / ES
// Flat key-value structure for simplicity and performance
// Keys follow pattern: section.element.property

import type { Language } from "@/contexts/LanguageContext";

const pt: Record<string, string> = {
  // Navbar
  "nav.solucoes": "Soluções",
  "nav.tecnologias": "Tecnologias",
  "nav.setores": "Setores",
  "nav.blog": "Blog",
  "nav.sobre": "Sobre",
  "nav.contato": "Fale Conosco",
  "nav.idioma": "Idioma",

  // Hero
  "hero.headline1": "TECNOLOGIA QUE FUNCIONA.",
  "hero.headline2": "EM CADA RUA, CADA CIDADE.",
  "hero.subtitle": "Fiscalização inteligente, estacionamento digital e videomonitoramento. Mais de 200 cidades confiam na Areatec há 30 anos.",
  "hero.cta.primary": "Conheça Nossas Soluções",
  "hero.cta.secondary": "Fale com um Especialista",
  "hero.stat.cidades": "CIDADES ATENDIDAS",
  "hero.stat.placas": "PLACAS PROCESSADAS/MÊS",
  "hero.stat.anos": "ANOS DE EXPERIÊNCIA",
  "hero.stat.precisao": "PRECISÃO OCR",
  "hero.caption1.title": "Olho Vivo Patrol",
  "hero.caption1.subtitle": "Fiscalização inteligente com IA embarcada",
  "hero.caption2.title": "Proof LAT",
  "hero.caption2.subtitle": "Antena GNSS com sinais anti-spoofing",

  // Sistema Integrado
  "sistema.label": "Veículo OCR",
  "sistema.badge": "Do Dado à Decisão em Tempo Real",
  "sistema.title": "Três frentes operacionais em um único veículo",
  "sistema.subtitle": "O Veículo OCR da Areatec opera simultaneamente em fiscalização de trânsito, zeladoria urbana e segurança pública, capturando e processando dados com IA embarcada.",
  "sistema.frente1.title": "Fiscalização de Trânsito",
  "sistema.frente1.desc": "Leitura automática de placas com 99,9% de precisão para autuação de infrações de estacionamento, rodízio e veículos com restrições.",
  "sistema.frente2.title": "Zeladoria Urbana",
  "sistema.frente2.desc": "Detecção de buracos, inventário de sinalização e monitoramento de ativos públicos com visão computacional em tempo real.",
  "sistema.frente3.title": "Segurança Pública",
  "sistema.frente3.desc": "Busca facial inteligente com conformidade LGPD e identificação de veículos com restrições judiciais ou furto/roubo.",
  "sistema.cta": "Conheça o Veículo OCR",

  // Soluções
  "solucoes.label": "Soluções",
  "solucoes.title": "Conheça Nossas Soluções",
  "solucoes.subtitle": "Sete produtos para resolver problemas reais de mobilidade urbana. Da fiscalização de trânsito à micromobilidade, um ecossistema completo para cidades.",
  "solucoes.saiba_mais": "Saiba mais",
  "solucoes.cta": "Fale com um Especialista",
  "solucoes.parceria": "Parceria",
  "solucoes.precisao_ocr": "Precisão OCR",
  "solucoes.cidades": "Cidades",

  "solucoes.1.title": "Olho Vivo Patrol",
  "solucoes.1.tagline": "Fiscalização inteligente com IA embarcada",
  "solucoes.1.description": "Nosso veículo lê placas automaticamente com 99,9% de acerto. Além de fiscalizar, identifica buracos nas vias, problemas na sinalização vertical e horizontal e no mobiliário urbano. Tudo em tempo real, com geolocalização autenticada e cadeia de custódia digital.",
  "solucoes.2.title": "Olho Vivo Parking",
  "solucoes.2.tagline": "Gestão completa de estacionamento rotativo",
  "solucoes.2.description": "Operação de Zona Azul do início ao fim: captura automática de placas, controle de permanência e emissão de autos com prova material. Sensores, câmeras e parquímetros conectados em uma única plataforma.",
  "solucoes.3.title": "Digipare",
  "solucoes.3.tagline": "Estacionamento digital pelo celular",
  "solucoes.3.description": "O motorista ativa, paga e gerencia a vaga de estacionamento rotativo direto pelo celular. Sem fila no parquímetro, com aviso antes do tempo acabar.",
  "solucoes.4.title": "Talonário Eletrônico",
  "solucoes.4.tagline": "Multas de trânsito 100% digitais",
  "solucoes.4.description": "Substitui o talonário de papel por emissão eletrônica de autos de infração. Padroniza o processo, reduz erros e integra direto com os sistemas dos órgãos de trânsito.",
  "solucoes.5.title": "Sensores de Estacionamento",
  "solucoes.5.tagline": "Monitoramento contínuo de vagas",
  "solucoes.5.description": "Sensores no pavimento que detectam veículos e registram imagens automaticamente. A central recebe dados de ocupação em tempo real, sem necessidade de ronda presencial.",
  "solucoes.6.title": "Proof LAT",
  "solucoes.6.tagline": "Comprovação jurídica de posição geográfica",
  "solucoes.6.description": "Antena GNSS que recebe sinais autenticados do satélite Galileo (OSNMA). Comprova onde o veículo estava no momento da coleta, com validade jurídica. Proteção contra fraudes de localização.",
  "solucoes.7.title": "Bikeep",
  "solucoes.7.tagline": "Estações de micromobilidade com IoT",
  "solucoes.7.description": "Estações de estacionamento seguro para bicicletas e patinetes, com gestão por app e painel em nuvem. Presente em mais de 30 países. A Areatec é a representante oficial no Brasil.",

  // Diferenciais
  "diferenciais.label": "Diferenciais",
  "diferenciais.badge": "Infraestrutura de Ponta",
  "diferenciais.title": "Tecnologia proprietária de ponta a ponta",
  "diferenciais.subtitle": "Cada componente do ecossistema Areatec foi projetado para operar em condições reais, com processamento de borda, conectividade resiliente e conformidade regulatória.",
  "diferenciais.1.title": "Edge AI",
  "diferenciais.1.desc": "Processamento de IA diretamente no dispositivo, sem depender de nuvem. Latência inferior a 100ms para decisões em tempo real.",
  "diferenciais.2.title": "LGPD Compliant",
  "diferenciais.2.desc": "Arquitetura privacy-by-design com anonimização, criptografia e controle de acesso granular em conformidade com a LGPD.",
  "diferenciais.3.title": "SyncRealTime",
  "diferenciais.3.desc": "Protocolo proprietário de sincronização que garante transmissão de dados mesmo em áreas com conectividade limitada.",
  "diferenciais.4.title": "Ecossistema Integrado",
  "diferenciais.4.desc": "Todos os produtos operam em uma plataforma unificada com APIs abertas, facilitando integração com sistemas municipais.",
  "diferenciais.5.title": "GeoTrust",
  "diferenciais.5.desc": "Geolocalização autenticada via satélite Galileo (OSNMA) com validade jurídica para comprovação de posição.",
  "diferenciais.6.title": "AreaChain",
  "diferenciais.6.desc": "Blockchain privada que garante a integridade e rastreabilidade de todas as provas digitais coletadas em campo.",

  // CORTEX
  "cortex.label": "CORTEX AI",
  "cortex.badge": "Inteligência Artificial",
  "cortex.title": "CORTEX: O cérebro por trás do ecossistema",
  "cortex.subtitle": "Motor de inteligência artificial proprietário que processa, correlaciona e transforma dados brutos em decisões operacionais em tempo real.",

  // Olho Vivo
  "olhovivo.label": "Olho Vivo",
  "olhovivo.title": "Olho Vivo: Visão computacional para cidades",

  // Hardware
  "hardware.label": "Hardware",
  "hardware.title": "Engenharia de hardware proprietária",

  // Setores
  "setores.label": "Setores",
  "setores.badge": "Verticais de Atuação",
  "setores.title": "Tecnologia aplicada a diversos setores",
  "setores.subtitle": "Nossas soluções atendem desde a fiscalização de trânsito até o agronegócio, adaptando-se às necessidades específicas de cada setor.",

  // Cobertura
  "cobertura.label": "Cobertura",
  "cobertura.title": "Presença nacional",
  "cobertura.subtitle": "A Areatec opera em mais de 200 cidades brasileiras, cobrindo todas as regiões do país.",

  // Expansão Global
  "expansao.label": "Expansão Global",
  "expansao.badge": "Internacionalização",
  "expansao.title": "Expansão para a América Latina e Europa",

  // Blog
  "blog.label": "Blog",
  "blog.badge": "Conhecimento que Transforma",
  "blog.title": "Últimas novidades",
  "blog.ver_todos": "Ver todos os artigos",
  "blog.ler_artigo": "Ler artigo",
  "blog.leitura": "de leitura",

  // CTA
  "cta.label": "Solicitar Demonstração",
  "cta.title": "Pronto para transformar sua cidade?",
  "cta.subtitle": "Entre em contato com nossa equipe e descubra como as soluções Areatec podem modernizar a gestão urbana do seu município.",
  "cta.primary": "Solicitar Demonstração",
  "cta.secondary": "Falar com Especialista",

  // Footer
  "footer.desc": "Líder em tecnologia para fiscalização de trânsito, estacionamento rotativo e cidades inteligentes.",
  "footer.solucoes": "Soluções",
  "footer.tecnologias": "Tecnologias",
  "footer.empresa": "Empresa",
  "footer.sobre": "Sobre Nós",
  "footer.blog": "Blog",
  "footer.contato": "Contato",
  "footer.privacidade": "Política de Privacidade",
  "footer.termos": "Termos de Uso",
  "footer.copyright": "© 2026 Areatec. Todos os direitos reservados.",

  // 404
  "notfound.title": "Página não encontrada",
  "notfound.desc": "A página que você procura não existe ou foi movida.",
  "notfound.cta": "Voltar ao início",
};

const en: Record<string, string> = {
  // Navbar
  "nav.solucoes": "Solutions",
  "nav.tecnologias": "Technologies",
  "nav.setores": "Industries",
  "nav.blog": "Blog",
  "nav.sobre": "About",
  "nav.contato": "Contact Us",
  "nav.idioma": "Language",

  // Hero
  "hero.headline1": "TECHNOLOGY THAT WORKS.",
  "hero.headline2": "IN EVERY STREET, EVERY CITY.",
  "hero.subtitle": "Smart enforcement, digital parking and video monitoring. Over 200 cities have trusted Areatec for 30 years.",
  "hero.cta.primary": "Explore Our Solutions",
  "hero.cta.secondary": "Talk to a Specialist",
  "hero.stat.cidades": "CITIES SERVED",
  "hero.stat.placas": "PLATES PROCESSED/MONTH",
  "hero.stat.anos": "YEARS OF EXPERIENCE",
  "hero.stat.precisao": "OCR ACCURACY",
  "hero.caption1.title": "Olho Vivo Patrol",
  "hero.caption1.subtitle": "Smart enforcement with embedded AI",
  "hero.caption2.title": "Proof LAT",
  "hero.caption2.subtitle": "GNSS antenna with anti-spoofing signals",

  // Sistema Integrado
  "sistema.label": "OCR Vehicle",
  "sistema.badge": "From Data to Decision in Real Time",
  "sistema.title": "Three operational fronts in a single vehicle",
  "sistema.subtitle": "The Areatec OCR Vehicle operates simultaneously in traffic enforcement, urban stewardship and public safety, capturing and processing data with embedded AI.",
  "sistema.frente1.title": "Traffic Enforcement",
  "sistema.frente1.desc": "Automatic plate reading with 99.9% accuracy for parking violations, vehicle rotation and restricted vehicle detection.",
  "sistema.frente2.title": "Urban Stewardship",
  "sistema.frente2.desc": "Pothole detection, signage inventory and public asset monitoring with real-time computer vision.",
  "sistema.frente3.title": "Public Safety",
  "sistema.frente3.desc": "Smart facial search with LGPD compliance and identification of vehicles with judicial restrictions or theft records.",
  "sistema.cta": "Learn about the OCR Vehicle",

  // Soluções
  "solucoes.label": "Solutions",
  "solucoes.title": "Explore Our Solutions",
  "solucoes.subtitle": "Seven products built to solve real urban mobility problems. From traffic enforcement to micromobility, a complete ecosystem for cities.",
  "solucoes.saiba_mais": "Learn more",
  "solucoes.cta": "Talk to a Specialist",
  "solucoes.parceria": "Partnership",
  "solucoes.precisao_ocr": "OCR Accuracy",
  "solucoes.cidades": "Cities",

  "solucoes.1.title": "Olho Vivo Patrol",
  "solucoes.1.tagline": "Smart enforcement with embedded AI",
  "solucoes.1.description": "Our vehicle reads plates automatically with 99.9% accuracy. Beyond enforcement, it spots potholes, checks vertical and horizontal signage, and inventories urban furniture. All in real time, with authenticated geolocation and digital chain of custody.",
  "solucoes.2.title": "Olho Vivo Parking",
  "solucoes.2.tagline": "Complete rotational parking management",
  "solucoes.2.description": "Blue Zone operation end to end: automatic plate capture, stay-time control and violation notices with material evidence. Sensors, cameras and parking meters connected on a single platform.",
  "solucoes.3.title": "Digipare",
  "solucoes.3.tagline": "Digital parking from your phone",
  "solucoes.3.description": "Drivers activate, pay and manage rotational parking spots straight from their phone. No queuing at the meter, with alerts before time runs out.",
  "solucoes.4.title": "Electronic Ticket Book",
  "solucoes.4.tagline": "100% digital traffic violations",
  "solucoes.4.description": "Replaces paper ticket books with electronic violation issuance. Standardizes the process, cuts errors and plugs directly into traffic authority systems.",
  "solucoes.5.title": "Parking Sensors",
  "solucoes.5.tagline": "Continuous vacancy monitoring",
  "solucoes.5.description": "Pavement sensors that detect vehicles and capture images automatically. The control center gets real-time occupancy data, no on-site patrols needed.",
  "solucoes.6.title": "Proof LAT",
  "solucoes.6.tagline": "Legal proof of geographic position",
  "solucoes.6.description": "GNSS antenna receiving authenticated Galileo satellite signals (OSNMA). Proves where the vehicle was at the time of data collection, with legal validity. Protection against location fraud.",
  "solucoes.7.title": "Bikeep",
  "solucoes.7.tagline": "IoT micromobility stations",
  "solucoes.7.description": "Secure parking stations for bikes and scooters, with app management and cloud dashboard. Present in 30+ countries. Areatec is the official representative in Brazil.",

  // Diferenciais
  "diferenciais.label": "Differentiators",
  "diferenciais.badge": "Cutting-Edge Infrastructure",
  "diferenciais.title": "Proprietary end-to-end technology",
  "diferenciais.subtitle": "Every component of the Areatec ecosystem was designed to operate under real-world conditions, with edge processing, resilient connectivity and regulatory compliance.",
  "diferenciais.1.title": "Edge AI",
  "diferenciais.1.desc": "AI processing directly on the device, without cloud dependency. Latency under 100ms for real-time decisions.",
  "diferenciais.2.title": "LGPD Compliant",
  "diferenciais.2.desc": "Privacy-by-design architecture with anonymization, encryption and granular access control in compliance with LGPD.",
  "diferenciais.3.title": "SyncRealTime",
  "diferenciais.3.desc": "Proprietary synchronization protocol that ensures data transmission even in areas with limited connectivity.",
  "diferenciais.4.title": "Integrated Ecosystem",
  "diferenciais.4.desc": "All products operate on a unified platform with open APIs, facilitating integration with municipal systems.",
  "diferenciais.5.title": "GeoTrust",
  "diferenciais.5.desc": "Authenticated geolocation via Galileo satellite (OSNMA) with legal validity for position verification.",
  "diferenciais.6.title": "AreaChain",
  "diferenciais.6.desc": "Private blockchain that ensures the integrity and traceability of all digital evidence collected in the field.",

  // CORTEX
  "cortex.label": "CORTEX AI",
  "cortex.badge": "Artificial Intelligence",
  "cortex.title": "CORTEX: The brain behind the ecosystem",
  "cortex.subtitle": "Proprietary artificial intelligence engine that processes, correlates and transforms raw data into real-time operational decisions.",

  // Olho Vivo
  "olhovivo.label": "Olho Vivo",
  "olhovivo.title": "Olho Vivo: Computer vision for cities",

  // Hardware
  "hardware.label": "Hardware",
  "hardware.title": "Proprietary hardware engineering",

  // Setores
  "setores.label": "Industries",
  "setores.badge": "Verticals",
  "setores.title": "Technology applied to diverse industries",
  "setores.subtitle": "Our solutions serve from traffic enforcement to agribusiness, adapting to the specific needs of each sector.",

  // Cobertura
  "cobertura.label": "Coverage",
  "cobertura.title": "National presence",
  "cobertura.subtitle": "Areatec operates in over 200 Brazilian cities, covering all regions of the country.",

  // Expansão Global
  "expansao.label": "Global Expansion",
  "expansao.badge": "Internationalization",
  "expansao.title": "Expansion to Latin America and Europe",

  // Blog
  "blog.label": "Blog",
  "blog.badge": "Knowledge that Transforms",
  "blog.title": "Latest news",
  "blog.ver_todos": "View all articles",
  "blog.ler_artigo": "Read article",
  "blog.leitura": "read",

  // CTA
  "cta.label": "Request a Demo",
  "cta.title": "Ready to transform your city?",
  "cta.subtitle": "Contact our team and discover how Areatec solutions can modernize your municipality's urban management.",
  "cta.primary": "Request a Demo",
  "cta.secondary": "Talk to a Specialist",

  // Footer
  "footer.desc": "Leader in technology for traffic enforcement, rotational parking and smart cities.",
  "footer.solucoes": "Solutions",
  "footer.tecnologias": "Technologies",
  "footer.empresa": "Company",
  "footer.sobre": "About Us",
  "footer.blog": "Blog",
  "footer.contato": "Contact",
  "footer.privacidade": "Privacy Policy",
  "footer.termos": "Terms of Use",
  "footer.copyright": "© 2026 Areatec. All rights reserved.",

  // 404
  "notfound.title": "Page not found",
  "notfound.desc": "The page you are looking for does not exist or has been moved.",
  "notfound.cta": "Back to home",
};

const es: Record<string, string> = {
  // Navbar
  "nav.solucoes": "Soluciones",
  "nav.tecnologias": "Tecnologías",
  "nav.setores": "Sectores",
  "nav.blog": "Blog",
  "nav.sobre": "Acerca de",
  "nav.contato": "Contáctenos",
  "nav.idioma": "Idioma",

  // Hero
  "hero.headline1": "TECNOLOGÍA QUE FUNCIONA.",
  "hero.headline2": "EN CADA CALLE, CADA CIUDAD.",
  "hero.subtitle": "Fiscalización inteligente, estacionamiento digital y videomonitoreo. Más de 200 ciudades confían en Areatec desde hace 30 años.",
  "hero.cta.primary": "Conozca Nuestras Soluciones",
  "hero.cta.secondary": "Hable con un Especialista",
  "hero.stat.cidades": "CIUDADES ATENDIDAS",
  "hero.stat.placas": "PLACAS PROCESADAS/MES",
  "hero.stat.anos": "AÑOS DE EXPERIENCIA",
  "hero.stat.precisao": "PRECISIÓN OCR",
  "hero.caption1.title": "Olho Vivo Patrol",
  "hero.caption1.subtitle": "Fiscalización inteligente con IA integrada",
  "hero.caption2.title": "Proof LAT",
  "hero.caption2.subtitle": "Antena GNSS con señales anti-spoofing",

  // Sistema Integrado
  "sistema.label": "Vehículo OCR",
  "sistema.badge": "Del Dato a la Decisión en Tiempo Real",
  "sistema.title": "Tres frentes operativos en un solo vehículo",
  "sistema.subtitle": "El Vehículo OCR de Areatec opera simultáneamente en fiscalización de tránsito, gestión urbana y seguridad pública, capturando y procesando datos con IA integrada.",
  "sistema.frente1.title": "Fiscalización de Tránsito",
  "sistema.frente1.desc": "Lectura automática de placas con 99,9% de precisión para infracciones de estacionamiento, rotación vehicular y vehículos con restricciones.",
  "sistema.frente2.title": "Gestión Urbana",
  "sistema.frente2.desc": "Detección de baches, inventario de señalización y monitoreo de activos públicos con visión computacional en tiempo real.",
  "sistema.frente3.title": "Seguridad Pública",
  "sistema.frente3.desc": "Búsqueda facial inteligente con cumplimiento LGPD e identificación de vehículos con restricciones judiciales o registros de robo.",
  "sistema.cta": "Conozca el Vehículo OCR",

  // Soluções
  "solucoes.label": "Soluciones",
  "solucoes.title": "Conozca Nuestras Soluciones",
  "solucoes.subtitle": "Siete productos para resolver problemas reales de movilidad urbana. Desde la fiscalización de tránsito hasta la micromovilidad, un ecosistema completo para ciudades.",
  "solucoes.saiba_mais": "Más información",
  "solucoes.cta": "Hable con un Especialista",
  "solucoes.parceria": "Alianza",
  "solucoes.precisao_ocr": "Precisión OCR",
  "solucoes.cidades": "Ciudades",

  "solucoes.1.title": "Olho Vivo Patrol",
  "solucoes.1.tagline": "Fiscalización inteligente con IA integrada",
  "solucoes.1.description": "Nuestro vehículo lee placas automáticamente con 99,9% de acierto. Además de fiscalizar, identifica baches en las vías, problemas en la señalización vertical y horizontal y en el mobiliario urbano. Todo en tiempo real, con geolocalización autenticada y cadena de custodia digital.",
  "solucoes.2.title": "Olho Vivo Parking",
  "solucoes.2.tagline": "Gestión completa de estacionamiento rotativo",
  "solucoes.2.description": "Operación de Zona Azul de principio a fin: captura automática de placas, control de permanencia y emisión de actas con prueba material. Sensores, cámaras y parquímetros conectados en una sola plataforma.",
  "solucoes.3.title": "Digipare",
  "solucoes.3.tagline": "Estacionamiento digital desde el celular",
  "solucoes.3.description": "El conductor activa, paga y gestiona la plaza de estacionamiento rotativo directo desde el celular. Sin filas en el parquímetro, con aviso antes de que se acabe el tiempo.",
  "solucoes.4.title": "Talonario Electrónico",
  "solucoes.4.tagline": "Multas de tránsito 100% digitales",
  "solucoes.4.description": "Sustituye el talonario de papel por emisión electrónica de actas de infracción. Estandariza el proceso, reduce errores e integra directo con los sistemas de los órganos de tránsito.",
  "solucoes.5.title": "Sensores de Estacionamiento",
  "solucoes.5.tagline": "Monitoreo continuo de plazas",
  "solucoes.5.description": "Sensores en el pavimento que detectan vehículos y registran imágenes automáticamente. La central recibe datos de ocupación en tiempo real, sin necesidad de rondas presenciales.",
  "solucoes.6.title": "Proof LAT",
  "solucoes.6.tagline": "Comprobación jurídica de posición geográfica",
  "solucoes.6.description": "Antena GNSS que recibe señales autenticadas del satélite Galileo (OSNMA). Comprueba dónde estaba el vehículo en el momento de la recolección, con validez jurídica. Protección contra fraudes de ubicación.",
  "solucoes.7.title": "Bikeep",
  "solucoes.7.tagline": "Estaciones de micromovilidad con IoT",
  "solucoes.7.description": "Estaciones de estacionamiento seguro para bicicletas y patinetes, con gestión por app y panel en la nube. Presente en más de 30 países. Areatec es la representante oficial en Brasil.",

  // Diferenciais
  "diferenciais.label": "Diferenciadores",
  "diferenciais.badge": "Infraestructura de Punta",
  "diferenciais.title": "Tecnología propietaria de extremo a extremo",
  "diferenciais.subtitle": "Cada componente del ecosistema Areatec fue diseñado para operar en condiciones reales, con procesamiento de borde, conectividad resiliente y cumplimiento regulatorio.",
  "diferenciais.1.title": "Edge AI",
  "diferenciais.1.desc": "Procesamiento de IA directamente en el dispositivo, sin depender de la nube. Latencia inferior a 100ms para decisiones en tiempo real.",
  "diferenciais.2.title": "LGPD Compliant",
  "diferenciais.2.desc": "Arquitectura privacy-by-design con anonimización, cifrado y control de acceso granular en cumplimiento con la LGPD.",
  "diferenciais.3.title": "SyncRealTime",
  "diferenciais.3.desc": "Protocolo propietario de sincronización que garantiza la transmisión de datos incluso en áreas con conectividad limitada.",
  "diferenciais.4.title": "Ecosistema Integrado",
  "diferenciais.4.desc": "Todos los productos operan en una plataforma unificada con APIs abiertas, facilitando la integración con sistemas municipales.",
  "diferenciais.5.title": "GeoTrust",
  "diferenciais.5.desc": "Geolocalización autenticada vía satélite Galileo (OSNMA) con validez jurídica para comprobación de posición.",
  "diferenciais.6.title": "AreaChain",
  "diferenciais.6.desc": "Blockchain privada que garantiza la integridad y trazabilidad de todas las pruebas digitales recolectadas en campo.",

  // CORTEX
  "cortex.label": "CORTEX AI",
  "cortex.badge": "Inteligencia Artificial",
  "cortex.title": "CORTEX: El cerebro detrás del ecosistema",
  "cortex.subtitle": "Motor de inteligencia artificial propietario que procesa, correlaciona y transforma datos brutos en decisiones operacionales en tiempo real.",

  // Olho Vivo
  "olhovivo.label": "Olho Vivo",
  "olhovivo.title": "Olho Vivo: Visión computacional para ciudades",

  // Hardware
  "hardware.label": "Hardware",
  "hardware.title": "Ingeniería de hardware propietaria",

  // Setores
  "setores.label": "Sectores",
  "setores.badge": "Verticales",
  "setores.title": "Tecnología aplicada a diversos sectores",
  "setores.subtitle": "Nuestras soluciones atienden desde la fiscalización de tránsito hasta el agronegocio, adaptándose a las necesidades específicas de cada sector.",

  // Cobertura
  "cobertura.label": "Cobertura",
  "cobertura.title": "Presencia nacional",
  "cobertura.subtitle": "Areatec opera en más de 200 ciudades brasileñas, cubriendo todas las regiones del país.",

  // Expansão Global
  "expansao.label": "Expansión Global",
  "expansao.badge": "Internacionalización",
  "expansao.title": "Expansión hacia América Latina y Europa",

  // Blog
  "blog.label": "Blog",
  "blog.badge": "Conocimiento que Transforma",
  "blog.title": "Últimas novedades",
  "blog.ver_todos": "Ver todos los artículos",
  "blog.ler_artigo": "Leer artículo",
  "blog.leitura": "de lectura",

  // CTA
  "cta.label": "Solicitar Demostración",
  "cta.title": "¿Listo para transformar su ciudad?",
  "cta.subtitle": "Contacte a nuestro equipo y descubra cómo las soluciones Areatec pueden modernizar la gestión urbana de su municipio.",
  "cta.primary": "Solicitar Demostración",
  "cta.secondary": "Hablar con un Especialista",

  // Footer
  "footer.desc": "Líder en tecnología para fiscalización de tránsito, estacionamiento rotativo y ciudades inteligentes.",
  "footer.solucoes": "Soluciones",
  "footer.tecnologias": "Tecnologías",
  "footer.empresa": "Empresa",
  "footer.sobre": "Acerca de Nosotros",
  "footer.blog": "Blog",
  "footer.contato": "Contacto",
  "footer.privacidade": "Política de Privacidad",
  "footer.termos": "Términos de Uso",
  "footer.copyright": "© 2026 Areatec. Todos los derechos reservados.",

  // 404
  "notfound.title": "Página no encontrada",
  "notfound.desc": "La página que busca no existe o fue movida.",
  "notfound.cta": "Volver al inicio",
};

const translations: Record<Language, Record<string, string>> = { pt, en, es };

export function getTranslation(lang: Language, key: string): string {
  return translations[lang]?.[key] ?? translations.pt[key] ?? key;
}

export default translations;
