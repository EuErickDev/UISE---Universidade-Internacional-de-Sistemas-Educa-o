const header = document.querySelector(".site-header");

if (header) {
  let headerActions = header.querySelector(".header-actions");

  if (!headerActions) {
    headerActions = document.createElement("div");
    headerActions.className = "header-actions";
    header.append(headerActions);
  }

  if (!headerActions.querySelector(".theme-toggle")) {
    const toggle = document.createElement("button");
    toggle.className = "theme-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Alternar tema");
    toggle.innerHTML = "<span></span>";
    headerActions.prepend(toggle);
  }

  if (!headerActions.querySelector('a[href="login.html"]')) {
    const portalLink = document.createElement("a");
    portalLink.className = "button button-outline button-small";
    portalLink.href = "login.html";
    portalLink.textContent = "Portal do Aluno";
    headerActions.append(portalLink);
  }

  if (!headerActions.querySelector('a[href="inscricao.html"]')) {
    const registerLink = document.createElement("a");
    registerLink.className = "button button-dark button-small";
    registerLink.href = "inscricao.html";
    registerLink.textContent = "Inscreva-se";
    headerActions.append(registerLink);
  }
}

const themeToggles = [...document.querySelectorAll(".theme-toggle")];
const searchInput = document.querySelector(".search-box input");
const closeSearchButton = document.querySelector(".close-search");
const searchRow = document.querySelector(".search-row");
const globalSearchForm = document.querySelector(".site-search-form");
const globalSearchInput = document.querySelector(".site-search-input");
const globalSearchResults = document.querySelector("#global-search-results");
const globalSearchSummary = document.querySelector(".search-summary");

const globalSearchIndex = [
  ["Cursos e Graduações", "cursos.html", "cursos profissionalizantes graduação pós-graduação técnico engenharia sistemas redes segurança tecnologia filtros preço modalidade área"],
  ["Graduação Superior", "graduacao.html", "bacharelado tecnólogo licenciatura engenharia software computação análise sistemas IA vestibular bolsas matrícula faculdade universidade"],
  ["Pós-Graduação Executiva", "pos.html", "pós graduação mba especialização arquitetura sistemas cibersegurança auditoria gestão riscos executivos carreira"],
  ["Cursos Técnicos Oficiais", "tecnicos.html", "técnico desenvolvimento sistemas informática redes telecomunicações MEC estágio diploma currículo habilitação"],
  ["Técnico em Desenvolvimento de Sistemas", "curso-ds.html", "técnico programação desenvolvimento fullstack software código sistemas"],
  ["Técnico em Redes de Computadores", "curso-redes.html", "técnico redes servidores internet suporte segurança firewall conectividade"],
  ["Técnico em Informática", "curso-Informatica.html", "informática computadores manutenção windows linux suporte office tecnologia"],
  ["Técnico em Jogos Digitais", "curso-jogos.html", "jogos digitais programação design desenvolvimento games"],
  ["Técnico em Eletrotécnica", "curso-eletro.html", "eletrotécnica elétrica automação circuitos energia"],
  ["Eventos Acadêmicos", "eventos.html", "eventos congresso semana tecnologia workshop palestras simpósio agenda inscrição"],
  ["Notícias e Pesquisa", "noticias.html", "notícias pesquisa inovação laboratório ciência comunidade acadêmica matérias"],
  ["Polos Oficiais", "polos.html", "polos campi campus unidade sede belo horizonte são paulo rio de janeiro endereço presencial prova"],
  ["Estrutura e Tecnologia", "estrutura.html", "estrutura laboratórios biblioteca GPU big data acessibilidade tecnologia salas aula"],
  ["Sobre a UiSE", "sobre.html", "universidade missão visão valores MEC excelência institucional história"],
  ["Processo Seletivo", "processo-seletivo.html", "processo seletivo inscrição vestibular ENEM bolsas documentos matrícula edital ingresso"],
  ["Inscrição", "inscricao.html", "inscrição pré-inscrição curso candidato formulário cadastro dados pessoais"],
  ["Conta do Aluno e Portal Acadêmico", "login.html", "conta login ambiente virtual aluno AVA senha portal acadêmico acesso entrar matrícula e-mail credenciais"],
  ["Contato e Atendimento", "contato.html", "contato atendimento secretaria suporte mensagem polos telefone e-mail ajuda"],
  ["Dúvidas Frequentes", "faq.html", "FAQ perguntas frequentes dúvidas mensalidade pagamento diploma MEC modalidade transferência financiamento conta"],
  ["Acessibilidade", "acessibilidade.html", "acessibilidade inclusão teclado leitores tela contraste suporte barreiras"],
  ["Privacidade e Proteção de Dados", "privacidade.html", "privacidade LGPD dados pessoais cookies segurança termos direitos proteção"],
  ["Busca do Portal", "busca.html", "pesquisa procurar encontrar informações busca global páginas"],
];

function normalizeSearchText(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function syncThemeControls() {
  const isDark = document.body.classList.contains("dark-theme");
  themeToggles.forEach((toggle) => {
    toggle.setAttribute("aria-pressed", String(isDark));
    toggle.setAttribute("title", isDark ? "Ativar tema claro" : "Ativar tema escuro");
  });
}

function renderGlobalSearch(term) {
  if (!globalSearchResults) {
    return;
  }

  const normalizedTerm = normalizeSearchText(term.trim());
  const results = normalizedTerm
    ? globalSearchIndex.filter(([title, , keywords]) => {
        const searchableText = normalizeSearchText(`${title} ${keywords}`);
        return searchableText.includes(normalizedTerm) || searchableText.split(" ").some((word) => word.startsWith(normalizedTerm));
      })
    : globalSearchIndex;

  if (globalSearchSummary) {
    globalSearchSummary.textContent = normalizedTerm
      ? `${results.length} resultado${results.length === 1 ? "" : "s"} encontrado${results.length === 1 ? "" : "s"} para “${term.trim()}”.`
      : "Explore todas as áreas do portal.";
  }

  globalSearchResults.innerHTML = results.length
    ? results.map(([title, href, keywords]) => `<article class="global-search-result"><p class="eyebrow">UiSE</p><h2><a href="${href}">${title}</a></h2><p>${keywords.split(" ").slice(0, 12).join(" · ")}</p><a class="card-link" href="${href}">Abrir página <span aria-hidden="true">→</span></a></article>`).join("")
    : '<p class="empty-programs">Nenhum conteúdo encontrado. Tente outro termo, como “curso”, “MEC”, “polo” ou “evento”.</p>';
}

const categoryMenuItems = [
  ["Graduação", "graduacao.html"],
  ["Cursos Técnicos", "tecnicos.html"],
  ["Cursos Profissionalizantes", "cursos.html"],
  ["Pós-Graduação", "pos.html"],
];

document.querySelectorAll(".site-nav > a").forEach((link) => {
  if (!link.textContent.includes("Cursos") || link.closest(".dropdown")) {
    return;
  }

  const dropdown = document.createElement("div");
  dropdown.className = "dropdown category-dropdown";
  link.replaceWith(dropdown);
  dropdown.append(link);

  const menu = document.createElement("ul");
  menu.className = "dropdown-menu";
  menu.setAttribute("aria-label", "Categorias de cursos");
  categoryMenuItems.forEach(([label, href]) => {
    const item = document.createElement("li");
    item.innerHTML = `<a href="${href}">${label}</a>`;
    menu.append(item);
  });
  dropdown.append(menu);
});

document.querySelectorAll(".category-dropdown").forEach((dropdown) => {
  const trigger = dropdown.querySelector(":scope > a");

  if (!trigger) {
    return;
  }

  trigger.setAttribute("aria-haspopup", "true");
  trigger.setAttribute("aria-expanded", "false");
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    const isOpen = dropdown.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(isOpen));
  });

  dropdown.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    dropdown.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    trigger.focus();
  });
});

const navigationMenus = {
  Institucional: [
    ["Sobre a UiSE", "sobre.html"],
    ["Estrutura & Tecnologia", "estrutura.html"],
    ["Polos Oficiais", "polos.html"],
    ["Acessibilidade", "acessibilidade.html"],
    ["FAQ", "faq.html"],
    ["Privacidade", "privacidade.html"],
    ["Contato", "contato.html"],
  ],
  Eventos: [
    ["Eventos Acadêmicos", "eventos.html"],
    ["Notícias e Pesquisa", "noticias.html"],
    ["Processo Seletivo", "processo-seletivo.html"],
  ],
};

Object.entries(navigationMenus).forEach(([menuLabel, items]) => {
  const trigger = [...document.querySelectorAll(".site-nav > a, .site-nav .dropdown > a")].find((link) =>
    link.textContent.trim().startsWith(menuLabel),
  );
  const existingDropdown = trigger?.parentElement?.classList.contains("dropdown")
    ? trigger.parentElement
    : null;

  if (!trigger && !existingDropdown) {
    return;
  }

  const dropdown = existingDropdown || document.createElement("div");
  dropdown.classList.add("dropdown");
  if (!existingDropdown) {
    trigger.replaceWith(dropdown);
    dropdown.append(trigger);
  }

  let menu = dropdown.querySelector(":scope > .dropdown-menu");
  if (!menu) {
    menu = document.createElement("ul");
    menu.className = "dropdown-menu";
    dropdown.append(menu);
  }
  menu.setAttribute("aria-label", menuLabel);
  menu.innerHTML = items.map(([label, href]) => `<li><a href="${href}">${label}</a></li>`).join("");
});

document.querySelectorAll(".site-nav .dropdown").forEach((dropdown) => {
  const trigger = dropdown.querySelector(":scope > a");
  if (!trigger || trigger.dataset.dropdownReady) {
    return;
  }

  trigger.dataset.dropdownReady = "true";
  trigger.setAttribute("aria-haspopup", "true");
  trigger.setAttribute("aria-expanded", "false");
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    const isOpen = dropdown.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(isOpen));
  });
  dropdown.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }
    dropdown.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    trigger.focus();
  });
});

document.addEventListener("click", (event) => {
  document.querySelectorAll(".site-nav .dropdown.is-open").forEach((dropdown) => {
    if (dropdown.contains(event.target)) {
      return;
    }

    dropdown.classList.remove("is-open");
    dropdown.querySelector(":scope > a")?.setAttribute("aria-expanded", "false");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  document.querySelectorAll(".site-nav .dropdown.is-open").forEach((dropdown) => {
    dropdown.classList.remove("is-open");
    dropdown.querySelector(":scope > a")?.setAttribute("aria-expanded", "false");
  });
});

const relevantImages = {
  "Engenharia de software": "assets/images/bacharelengdesoftware.png",
  "Análise de sistemas e IA": "assets/images/tecnologoemads.png",
  "Engenharia de computação": "assets/images/bacharelengdacomputação.png",
  "Laboratório de desenvolvimento de sistemas": "assets/images/tecemads.png",
  "Laboratório de redes": "assets/images/tecnicoemredes.png",
  "Laboratório de informática": "assets/images/tecnicoemtelecomunicações.png",
  "Arquitetura de sistemas digitais": "assets/images/mba.png",
  "Cibersegurança corporativa": "assets/images/especializaçãoemciberofensivaedefesa.png",
  "Auditoria e gestão de riscos": "assets/images/mbaemauditoria.png",
  "Laboratório de inteligência aplicada": "assets/images/Featured-Image.png",
  "Pesquisa em tecnologia": "assets/images/Article-Image3.png",
  "Congresso de engenharia": "assets/images/imagem.png",
  "Laboratório de tecnologia": "assets/images/Event-Card-Image.png",
  "Biblioteca e espaço de pesquisa": "assets/images/Article-Image6.png",
  "Sala colaborativa": "assets/images/Article-Image5.png",
};

Object.entries(relevantImages).forEach(([altText, imagePath]) => {
  document.querySelectorAll(`img[alt="${altText}"]`).forEach((image) => {
    image.src = imagePath;
    image.closest("picture")?.querySelector("source")?.setAttribute("srcset", imagePath);
  });
});

document.querySelectorAll(".catalog-card").forEach((card) => {
  const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
  const image = card.querySelector("img");
  const technicalImage = title.includes("desenvolvimento")
    ? "assets/images/tecemads.png"
    : title.includes("redes")
      ? "assets/images/tecnicoemredes.png"
      : title.includes("telecom")
        ? "assets/images/tecnicoemtelecomunicações.png"
        : null;

  if (image && technicalImage) {
    image.src = technicalImage;
  }

});

const catalogHero = document.querySelector(".catalog-hero");
const currentPage = window.location.pathname.split("/").pop();

if (currentPage === "noticias.html") {
  const newsGrid = document.querySelector(".news-grid");
  if (newsGrid && !newsGrid.dataset.enhanced) {
    newsGrid.dataset.enhanced = "true";
    newsGrid.insertAdjacentHTML("beforeend", `
      <article><img src="assets/images/Article-Image.png" alt="Pesquisa integrada em dados"><span class="course-tag">Pesquisa · 06 Jan 2026</span><h3>Parceria de inovação integrada alinha pesquisas com gigantes globais de dados</h3><p>Laboratórios de sistemas complexos aproximam estudantes e empresas de tecnologia.</p><a class="card-link" href="estrutura.html">Ler mais →</a></article>
      <article><img src="assets/images/Article-Image4.png" alt="Estudantes comemorando projeto"><span class="course-tag">Institucional · 10 Dez 2025</span><h3>Alunos do Polo BH conquistam prêmio nacional de arquitetura de redes</h3><p>Projeto integrador recebe reconhecimento por sua aplicação prática.</p><a class="card-link" href="polos.html">Ler mais →</a></article>
      <article><img src="assets/images/Article-Image6.png" alt="Ambiente tecnológico da UISE"><span class="course-tag">Institucional · 01 Dez 2025</span><h3>UISE abre vagas de estágio oficial em telecomunicações</h3><p>Oportunidades conectam estudantes aos laboratórios e polos oficiais.</p><a class="card-link" href="inscricao.html">Ler mais →</a></article>`);
  }
}

if (currentPage === "eventos.html") {
  const existingPage = document.querySelector("main.simple-page");
  if (existingPage) {
    [...existingPage.children].forEach((child) => {
      child.hidden = true;
      child.style.display = "none";
    });
  }
  appendCatalogSection(`
    <p class="eyebrow">Destaque da temporada</p><h2>I Congresso Internacional de Engenharia de Sistemas Corporativos</h2>
    <div class="split-info event-feature"><div><img class="catalog-news-image" src="assets/images/imagem.png" alt="Congresso internacional da UISE"><span class="course-tag">Inscrições abertas · Evento híbrido</span><p>Reunimos reitores, doutores e executivos para discutir dados soberanos, infraestrutura híbrida e inteligência sintética aplicada.</p><a class="button button-brand" href="inscricao.html">Garantir vaga no congresso</a></div></div>
    <h2 class="event-agenda-title">Próximas agendas ativas (3)</h2><div class="catalog-grid event-agenda-grid">
      <article class="catalog-card"><img src="assets/images/Event-Card-Image.png" alt="Workshop de redes"><span class="course-tag">Workshop presencial</span><h3>Hands-on: Orquestração e Kubernetes em Produção</h3><p>28 Mai · Polo Principal · Híbrido</p><a class="mini-button" href="inscricao.html">Inscrever-se</a></article>
      <article class="catalog-card"><img src="assets/images/Event-Card-Image3.png" alt="Painel de carreira"><span class="course-tag">Painel de carreira</span><h3>Tecnologia e Empregabilidade no Setor Financeiro</h3><p>05 Mai · Transmissão online</p><a class="mini-button" href="inscricao.html">Inscrever-se</a></article>
      <article class="catalog-card"><img src="assets/images/Visual.png" alt="Maratona científica"><span class="course-tag">Maratona científica</span><h3>UISE Hackathon: Modelagem de Sistemas Urbanos</h3><p>19 Mai · Aberto à comunidade</p><a class="mini-button" href="inscricao.html">Inscrever-se</a></article>
    </div>`, "catalog-section events-designer-section");
}

if (currentPage === "acessibilidade.html" && !document.querySelector(".accessibility-visual")) {
  appendCatalogSection(`
    <div class="feature-showcase accessibility-visual"><article><img src="assets/images/Rectangle.png" alt="Centro de suporte à acessibilidade da UISE"><div><p class="eyebrow">Suporte inclusivo</p><h2>Dificuldades de acesso? Entre em contato imediato</h2><p>Encontre apoio para navegação, recursos digitais e atendimento presencial nos polos oficiais.</p><a class="button button-brand" href="contato.html">Abrir chamado de acessibilidade</a></div></article></div>`, "catalog-section catalog-soft");
}

function appendCatalogSection(markup, className = "catalog-section") {
  const section = document.createElement("section");
  section.className = className;
  section.innerHTML = `<div class="page-shell">${markup}</div>`;
  document.querySelector("main")?.append(section);
}

if (currentPage === "graduacao.html") {
  document.querySelectorAll("main > .catalog-section").forEach((section) => {
    if (section.querySelector("h2")?.textContent.includes("Como iniciar sua jornada")) {
      section.remove();
    }
  });
  appendCatalogSection(`
    <div class="split-info">
      <div>
        <p class="eyebrow">Formas de ingresso</p>
        <h2>Como iniciar sua jornada na UISE</h2>
        <p>Escolha o canal de entrada que melhor se adapta à sua história escolar. Nossa equipe acompanha cada etapa da inscrição.</p>
        <div class="steps-list">
          <p><b>1</b> Nota do ENEM (2020 a 2025) · Dispensa vestibular tradicional</p>
          <p><b>2</b> Vestibular Online Agendado · Redação e lógica aplicada</p>
          <p><b>3</b> Transferência Externa / Segunda Graduação · Análise rápida</p>
        </div>
      </div>
      <aside class="info-panel"><strong>Concurso de Bolsas 2026</strong><span>Descontos de até 100% sobre a mensalidade para candidatos do processo seletivo.</span><a class="mini-button" href="processo-seletivo.html">Consultar edital</a></aside>
    </div>`, "catalog-section catalog-soft");
  appendCatalogSection(`
    <p class="eyebrow">Cronograma de ingresso</p>
    <h2>Próximos prazos e etapas do processo</h2>
    <div class="steps-grid">
      <div><small>ETAPA 1</small><strong>Inscrição para o Vestibular Digital</strong><span>Prazo · 15 Mar 2026</span></div>
      <div><small>ETAPA 2</small><strong>Divulgação das Bolsas e Resultados</strong><span>Prazo · 30 Abr 2026</span></div>
      <div><small>ETAPA 3</small><strong>Matrícula e Início das Aulas</strong><span>Prazo · 15 Jun 2026</span></div>
    </div>`, "catalog-section");
}

if (currentPage === "tecnicos.html") {
  appendCatalogSection(`
    <p class="eyebrow">Grade e organização</p>
    <h2>Estrutura curricular objetiva e ágil</h2>
    <div class="info-grid four">
      <div><strong>Módulo Fundamental</strong><span>Fundamentos de tecnologia e engenharia.</span></div>
      <div><strong>Módulo Profissional</strong><span>Desenvolvimento de competências práticas.</span></div>
      <div><strong>Módulo Integrador</strong><span>Projetos aplicados para o mercado.</span></div>
      <div><strong>Certificação</strong><span>Diploma técnico reconhecido nacionalmente.</span></div>
    </div>`, "catalog-section catalog-soft");
  appendCatalogSection(`
    <div class="split-info">
      <div><p class="eyebrow">Prática profissional aplicada</p><h2>Estágios supervisionados e parcerias com a indústria</h2><p>Aprenda em projetos reais, com orientação acadêmica e conexão com empresas de tecnologia, redes e infraestrutura.</p><div class="info-grid"><div><strong>+85%</strong><span>de empregabilidade técnica</span></div><div><strong>CFT / CREA</strong><span>orientação para registro profissional</span></div></div></div>
      <aside class="info-panel"><strong>Documentos e vestibular simplificado</strong><span>Consulte os documentos necessários e escolha a melhor forma de ingresso.</span><a class="mini-button" href="processo-seletivo.html">Iniciar matrícula</a></aside>
    </div>`, "catalog-section");
  appendCatalogSection(`
    <p class="eyebrow">Números que falam</p><h2>Uma instituição que entrega resultados reais</h2>
    <div class="info-grid"><div><strong>96%</strong><span>de empregabilidade imediata</span></div><div><strong>12 Mil+</strong><span>líderes formados</span></div><div><strong>MEC 5</strong><span>classificação máxima institucional</span></div></div>`, "catalog-section catalog-soft");
  appendCatalogSection(`
    <p class="eyebrow">Presença física oficial</p><h2>Nossos polos de aprendizado prático</h2>
    <div class="campus-list">
      <article><img src="assets/images/belohorizonte.png" alt="Polo UISE em Belo Horizonte"><div><strong>Polo principal</strong><h3>Belo Horizonte/MG</h3><p>Reitoria e laboratórios centrais para projetos integradores e pesquisa aplicada.</p></div></article>
      <article><img src="assets/images/saopaulo.png" alt="Polo UISE em São Paulo"><div><strong>Polo São Paulo</strong><h3>São Paulo/SP</h3><p>Centro tecnológico conectado ao ecossistema de inovação e startups.</p></div></article>
      <article><img src="assets/images/riodejaneiro.png" alt="Polo UISE no Rio de Janeiro"><div><strong>Polo Rio de Janeiro</strong><h3>Rio de Janeiro/RJ</h3><p>Unidade estratégica de inovação, comunicação e novas mídias.</p></div></article>
    </div>`, "catalog-section");
  appendCatalogSection(`
    <p class="eyebrow">Presença física oficial</p><h2>Nossos polos de aprendizado prático</h2>
    <div class="catalog-grid"><article class="catalog-card"><img src="assets/images/belohorizonte.png" alt="Polo UISE em Belo Horizonte"><span class="course-tag">Polo principal</span><h3>Belo Horizonte/MG</h3><p>Reitoria e laboratórios centrais da UISE.</p></article><article class="catalog-card"><img src="assets/images/saopaulo.png" alt="Polo UISE em São Paulo"><span class="course-tag">Polo São Paulo</span><h3>São Paulo/SP</h3><p>Hub de inovação e pesquisa aplicada.</p></article><article class="catalog-card"><img src="assets/images/riodejaneiro.png" alt="Polo UISE no Rio de Janeiro"><span class="course-tag">Polo Rio de Janeiro</span><h3>Rio de Janeiro/RJ</h3><p>Unidade estratégica de inovação digital.</p></article></div>`, "catalog-section");
  appendCatalogSection(`
    <p class="eyebrow">Acontece na UISE</p><h2>Notícias e próximos eventos acadêmicos</h2>
    <div class="split-info"><div><img class="catalog-news-image" src="assets/images/News-Image.png" alt="Evento acadêmico da UISE"><strong>UiSE expande laboratórios de Inteligência Aplicada</strong><p>Novas estruturas para pesquisa, projetos e desenvolvimento tecnológico.</p></div><aside class="info-panel"><strong>I Congresso de Engenharia de Sistemas Corporativos</strong><span>Participe dos próximos encontros acadêmicos da UISE.</span><a class="mini-button" href="eventos.html">Ver eventos</a></aside></div>`, "catalog-section catalog-soft");
  document.querySelectorAll("main > .catalog-section").forEach((section) => {
    if (section.querySelector(".campus-list")) {
      section.remove();
    }
  });
}

if (currentPage === "pos.html") {
  const industrySection = [...document.querySelectorAll("main > section")].find((section) =>
    section.querySelector("h2")?.textContent.includes("Especialização para decisões"),
  );
  if (!industrySection) appendCatalogSection(`
    <div class="split-info"><div><p class="eyebrow">Conexão com a indústria</p><h2>Especialização para decisões de alto impacto</h2><p>Aprenda com doutores e executivos ativos em arquitetura, cibersegurança, dados e governança tecnológica.</p></div><a class="button button-brand" href="contato.html">Falar com consultor</a></div>`, "catalog-section catalog-soft");
}

if (currentPage === "cursos.html") {
  const title = document.querySelector(".programs-section h2");
  const count = document.querySelector(".programs-section > .eyebrow");
  if (title) title.textContent = "Seis programas destacados para você explorar";
  if (count) count.textContent = "Programas ativos encontrados (9)";
}

const pageImages = {
  "graduacao.html": [
    "assets/images/bacharelengdesoftware.png",
    "Estudante em laboratório de Engenharia de Software",
  ],
  "pos.html": [
    "assets/images/mba.png",
    "Arquitetura de sistemas digitais da UISE",
  ],
  "estrutura.html": [
    "assets/images/Structure-Visual.png",
    "Laboratório de inovação e manufatura inteligente da UISE",
  ],
  "polos.html": [
    "assets/images/Abstract-Map-Graphic.png",
    "Mapa dos polos tecnológicos da UISE",
  ],
};
const pageImage = pageImages[window.location.pathname.split("/").pop() || window.location.pathname];

if (catalogHero && pageImage && !catalogHero.querySelector(".catalog-hero-image")) {
  const heroContent = document.createElement("div");
  heroContent.className = "catalog-hero-content";
  [...catalogHero.children].forEach((child) => heroContent.append(child));

  const heroImage = document.createElement("img");
  heroImage.className = "catalog-hero-image";
  heroImage.src = pageImage[0];
  heroImage.alt = pageImage[1];
  catalogHero.classList.add("catalog-hero-media");
  catalogHero.append(heroContent);
  catalogHero.append(heroImage);
}

const courseImages = {
  "curso-ds.html": ["assets/images/tecemads.png", "Laboratório de desenvolvimento de sistemas"],
  "curso-redes.html": ["assets/images/tecnicoemredes.png", "Laboratório de redes de computadores"],
  "curso-Informatica.html": ["assets/images/tecnicoemtelecomunicações.png", "Laboratório de informática"],
  "curso-jogos.html": ["assets/images/Course-Image2.png", "Laboratório de jogos digitais"],
  "curso-eletro.html": ["assets/images/tecnicoemtelecomunicações.png", "Laboratório de eletrotécnica"],
};
const courseImage = courseImages[currentPage];
const courseHero = document.querySelector(".hero-curso");

if (courseHero && courseImage && !courseHero.querySelector(".course-hero-image")) {
  const shell = courseHero.querySelector(".page-shell");
  const image = document.createElement("img");
  image.className = "course-hero-image";
  image.src = courseImage[0];
  image.alt = courseImage[1];
  shell?.append(image);
}

const simplePage = document.querySelector(".simple-page");
const simplePageImages = {};
const simplePageImage = simplePageImages[currentPage];

if (currentPage === "graduacao.html") {
  const graduationTitle = document.querySelector(".catalog-hero h1");
  if (graduationTitle) {
    graduationTitle.innerHTML =
      "Bacharelados,<br>Tecnólogos e<br><span>Licenciaturas Nota<br>Máxima no MEC</span>";
  }
}

if (simplePage && simplePageImage && !simplePage.querySelector(".simple-page-image")) {
  const image = document.createElement("img");
  image.className = "simple-page-image";
  image.src = simplePageImage[0];
  image.alt = simplePageImage[1];
  simplePage.prepend(image);
}

if (["eventos.html", "contato.html", "inscricao.html"].includes(currentPage)) {
  const header = document.querySelector(".site-header");
  let actions = header?.querySelector(".header-actions");

  if (header && !actions) {
    actions = document.createElement("div");
    actions.className = "header-actions";
    header.append(actions);
  }

  if (actions && !actions.querySelector('a[href="login.html"]')) {
    const portalLink = document.createElement("a");
    portalLink.className = "button button-outline button-small";
    portalLink.href = "login.html";
    portalLink.textContent = "Portal do Aluno";
    actions.prepend(portalLink);
  }

  if (actions && !actions.querySelector('a[href="inscricao.html"]')) {
    const registerLink = document.createElement("a");
    registerLink.className = "button button-dark button-small";
    registerLink.href = "inscricao.html";
    registerLink.textContent = "Inscreva-se";
    actions.append(registerLink);
  }
}

if (localStorage.getItem("uise-theme") === "dark") {
  document.body.classList.add("dark-theme");
}
syncThemeControls();

function showImageFallback(image) {
  image.hidden = true;
  const fallback = image.nextElementSibling;

  if (fallback) {
    fallback.hidden = false;
  }
}

document.querySelectorAll("img[data-fallback]").forEach((image) => {
  image.addEventListener("error", () => showImageFallback(image));
});

themeToggles.forEach((themeToggle) => themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem(
    "uise-theme",
    document.body.classList.contains("dark-theme") ? "dark" : "light",
  );
  syncThemeControls();
}));

closeSearchButton?.addEventListener("click", () => {
  if (searchInput) {
    searchInput.value = "";
    searchInput.focus();
  }
});

searchInput?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }

  event.preventDefault();
  const term = searchInput.value.trim();

  if (!term) {
    searchInput.focus();
    return;
  }

  window.location.href = `busca.html?busca=${encodeURIComponent(term)}`;
});

globalSearchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const term = globalSearchInput?.value.trim() || "";
  const url = term ? `busca.html?busca=${encodeURIComponent(term)}` : "busca.html";
  window.history.replaceState({}, "", url);
  renderGlobalSearch(term);
});

if (globalSearchForm) {
  const term = new URLSearchParams(window.location.search).get("busca") || "";
  if (globalSearchInput) {
    globalSearchInput.value = term;
  }
  renderGlobalSearch(term);
}

searchRow?.setAttribute("aria-label", "Pesquisar cursos no portal");

const coursesFilters = document.querySelector(".courses-filters");
const programCards = [...document.querySelectorAll(".program-card")];
const emptyProgramsMessage = document.querySelector(".empty-programs");
const homeCourseFilter = document.querySelector(".filter-form");

homeCourseFilter?.addEventListener("submit", (event) => {
  event.preventDefault();
  const params = new URLSearchParams();
  const formData = new FormData(homeCourseFilter);
  const search = String(formData.get("busca") || "").trim();
  const level = String(formData.get("nivel") || "").trim();
  const area = String(formData.get("area") || "").trim();
  const mode = String(formData.get("modalidade") || "").trim();

  if (search) params.set("busca", search);
  if (level) params.set("nivel", level);
  if (area) params.set("area", area);
  if (mode) params.set("modalidade", mode);

  window.location.href = `cursos.html${params.toString() ? `?${params}` : ""}`;
});

function filterPrograms() {
  if (!coursesFilters || !programCards.length) {
    return;
  }

  const search = String(
    coursesFilters.querySelector('[name="busca"]')?.value || "",
  ).toLowerCase().trim();
  const level = coursesFilters.querySelector('[name="nivel"]')?.value || "";
  const area = coursesFilters.querySelector('[name="area"]')?.value || "";
  const mode = coursesFilters.querySelector('[name="modalidade"]')?.value || "";
  let visibleCards = 0;

  programCards.forEach((card) => {
    const matchesSearch = card.textContent.toLowerCase().includes(search);
    const matchesLevel = !level || card.dataset.level === level;
    const matchesArea = !area || card.dataset.area === area;
    const matchesMode = !mode || card.dataset.mode === mode;
    const visible = matchesSearch && matchesLevel && matchesArea && matchesMode;

    card.hidden = !visible;
    card.style.display = visible ? "" : "none";
    visibleCards += visible ? 1 : 0;
  });

  if (emptyProgramsMessage) {
    emptyProgramsMessage.hidden = visibleCards > 0;
  }
}

coursesFilters?.addEventListener("input", filterPrograms);
coursesFilters?.addEventListener("change", filterPrograms);
coursesFilters?.addEventListener("submit", (event) => {
  event.preventDefault();
  filterPrograms();
});

if (coursesFilters) {
  const searchFromUrl = new URLSearchParams(window.location.search).get("busca");
  const filterParams = new URLSearchParams(window.location.search);
  const catalogSearch = coursesFilters.querySelector('[name="busca"]');

  if (searchFromUrl && catalogSearch) {
    catalogSearch.value = searchFromUrl;
  }

  ["nivel", "area", "modalidade"].forEach((name) => {
    const value = filterParams.get(name);
    const field = coursesFilters.querySelector(`[name="${name}"]`);
    if (value && field) field.value = value;
  });

  filterPrograms();
}

document.querySelectorAll("form").forEach((form) => {
  if (form === coursesFilters) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let feedback = form.querySelector(".form-feedback");

    if (!feedback) {
      feedback = document.createElement("p");
      feedback.className = "form-feedback";
      feedback.setAttribute("role", "status");
      feedback.setAttribute("aria-live", "polite");
      form.append(feedback);
    }

    feedback.textContent =
      form.dataset.feedback || "Consulta enviada com sucesso!";
    form.reset();
  });
});
