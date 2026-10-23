(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isSmallDevice = window.innerWidth < 760 || (navigator.hardwareConcurrency || 4) <= 4;

  const translations = {
    pt: {
      introHint: "Pressione Enter ou toque para entrar", introText: "Quer descobrir o que existe além?",
      navHome: "Início", navAbout: "Quem sou eu", navCerts: "Certificações", navSkills: "Habilidades", navProjects: "Projetos", navContact: "Contato",
      heroTag: "Engenharia de Software · 2º semestre", scrollHint: "Role para explorar ↓",
      aboutEyebrow: "Além do primeiro olhar", summaryTitle: "Breve resumo",
      summaryText: "Sou estudante de Engenharia de Software na FIAP e técnico em Administração pela Etec Zona Leste. Busco minha primeira oportunidade em Tecnologia. Desenvolvo projetos acadêmicos e pessoais com React, JavaScript, HTML, CSS e APIs. Também estudo Python, FastAPI e bancos de dados. Tenho perfil analítico, organização, facilidade de aprendizado e interesse em criar soluções úteis.",
      careerEyebrow: "Minha trajetória", careerTitle: "Career Path", careerIntro: "Formação e experiências acadêmicas em desenvolvimento.",
      stageOneDate: "2025 — 2029", stageOneTitle: "Engenharia de Software · FIAP", stageOneText: "Bacharelado em andamento, com previsão de conclusão em dezembro de 2029.",
      stageTwoDate: "Concluído em 2025", stageTwoTitle: "Técnico em Administração · Etec", stageTwoText: "Curso concluído em junho de 2025, com conhecimentos de organização de processos, rotinas de escritório e fluxos de trabalho.",
      stageThreeDate: "Concluído em dezembro de 2025", stageThreeTitle: "Ensino Médio · E. E. Reverendo Irineu Monteiro de Pinho", stageThreeText: "Ensino Médio concluído em dezembro de 2025, etapa anterior à formação superior.",
      certEyebrow: "Certificações acadêmicas", certPlaceholder: "CERTIFICAÇÃO · NÃO INFORMADA NO CURRÍCULO", certOne: "Nenhuma certificação informada", certTwo: "Nenhuma certificação informada", certThree: "Nenhuma certificação informada",
      certOneText: "Adicione o certificado quando disponível", certTwoText: "Adicione o certificado quando disponível", certThreeText: "Adicione o certificado quando disponível", download: "Certificado a adicionar ↗",
      skillsEyebrow: "Ferramentas e conhecimentos", skillsIntro: "Aprimorando minhas competências com projetos acadêmicos, práticos e de estudo em desenvolvimento contínuo.", levelPlaceholder: "Informação do currículo", skillFour: "Conhecimento a adicionar",
      projectsEyebrow: "Explorações em destaque", projectsTitle: "Projetos em destaque", projectsIntro: "Projetos destacados no meu perfil do GitHub, com informações consultadas diretamente nos repositórios.", githubReposTitle: "Repositórios públicos do GitHub",
      projectPlaceholder: "PROJETO DO CURRÍCULO", projectOne: "Aplicação Web de Visualização de Filmes", projectTwo: "Projeto de Melhoria de Experiência do Usuário", projectThree: "Simulação de E-commerce de Supermercado",
      projectOneText: "Aplicação inspirada no TV Time, com interface em React e consumo da API TMDB para exibir informações sobre filmes.", projectTwoText: "Projeto acadêmico com FIAP e Jovi / Grupo VIVO, envolvendo pesquisa, brainstorming, backlog, MVP e prototipação UX/UI.", projectThreeText: "Aplicação em Python com identificadores de usuários, histórico de consumo, banco de dados SQL e registro de alterações.", repoLink: "Ver GitHub ↗",
      contactEyebrow: "Vamos conversar", contactIntro: "Aberto a conexões, aprendizado e oportunidades futuras.", addLink: "Acessar perfil ↗", addEmail: "Enviar e-mail ↗", phone: "Telefone", addPhone: "Ligar ↗", resume: "Baixar currículo ↓", resumeNote: "Currículo em PDF disponível para download.", footerText: "Feito com curiosidade e propósito.",
      typeLines: ["Código, curiosidade e novas possibilidades.", "Aprendendo hoje para construir o amanhã.", "Toda boa ideia começa com uma pergunta."]
    },
    en: {
      introHint: "Press Enter or tap to enter", introText: "Curious about what lies beyond?",
      navHome: "Home", navAbout: "About me", navCerts: "Certifications", navSkills: "Skills", navProjects: "Projects", navContact: "Contact",
      heroTag: "Software Engineering · 2nd semester", scrollHint: "Scroll to explore ↓",
      aboutEyebrow: "Beyond the first impression", summaryTitle: "Brief summary",
      summaryText: "I am a Software Engineering student at FIAP and a Business Administration technician from Etec Zona Leste. I am seeking my first opportunity in technology. I build academic and personal projects using React, JavaScript, HTML, CSS, and APIs. I also have knowledge of Python, FastAPI, and databases. I bring analytical thinking, organization, and a strong willingness to learn.",
      careerEyebrow: "My journey", careerTitle: "Career Path", careerIntro: "An academic journey in progress, one step at a time.",
      stageOneDate: "2025 — 2029", stageOneTitle: "Software Engineering · FIAP", stageOneText: "Bachelor’s degree in progress, expected to be completed in December 2029.",
      stageTwoDate: "Completed in 2025", stageTwoTitle: "Business Administration Technician · Etec", stageTwoText: "Completed in June 2025, covering process organization, office routines, and workflows.",
      stageThreeDate: "Completed in December 2025", stageThreeTitle: "High School · E. E. Reverendo Irineu Monteiro de Pinho", stageThreeText: "High school completed in December 2025, before starting higher education.",
      certEyebrow: "Academic certifications", certPlaceholder: "CERTIFICATION · NOT LISTED ON RÉSUMÉ", certOne: "No certification listed", certTwo: "No certification listed", certThree: "No certification listed",
      certOneText: "Add the certificate when available", certTwoText: "Add the certificate when available", certThreeText: "Add the certificate when available", download: "Certificate to be added ↗",
      skillsEyebrow: "Tools and knowledge", skillsIntro: "Strengthening my skills through academic, practical, and study projects in continuous development.", levelPlaceholder: "Résumé information", skillFour: "Skill to be added",
      projectsEyebrow: "Featured work", projectsTitle: "Featured projects", projectsIntro: "Projects featured on my GitHub profile, with information loaded directly from each repository.", githubReposTitle: "Public GitHub repositories",
      projectPlaceholder: "RÉSUMÉ PROJECT", projectOne: "Movie Browsing Web App", projectTwo: "User Experience Improvement Project", projectThree: "Supermarket E-commerce Simulation",
      projectOneText: "A TV Time-inspired app built with React and the TMDB API to display movie information.", projectTwoText: "An academic project with FIAP and Jovi / Grupo VIVO, including research, brainstorming, backlog, MVP, and UX/UI prototyping.", projectThreeText: "A Python app with user identifiers, consumption history, an SQL database, and change logging.", repoLink: "View GitHub ↗",
      contactEyebrow: "Let's connect", contactIntro: "Open to connections, learning, and future opportunities.", addLink: "Open profile ↗", addEmail: "Send email ↗", phone: "Phone", addPhone: "Call ↗", resume: "Download résumé ↓", resumeNote: "Résumé PDF available for download.", footerText: "Made with curiosity and purpose.",
      typeLines: ["Code, curiosity, and new possibilities.", "Learning today to build tomorrow.", "Every great idea starts with a question."]
    },
    es: {
      introHint: "Pulsa Enter o toca para entrar", introText: "¿Quieres descubrir qué hay más allá?",
      navHome: "Inicio", navAbout: "Quién soy", navCerts: "Certificaciones", navSkills: "Habilidades", navProjects: "Proyectos", navContact: "Contacto",
      heroTag: "Ingeniería de Software · 2.º semestre", scrollHint: "Desliza para explorar ↓",
      aboutEyebrow: "Más allá de la primera impresión", summaryTitle: "Breve resumen",
      summaryText: "Soy estudiante de Ingeniería de Software en FIAP y técnico en Administración por Etec Zona Leste. Busco mi primera oportunidad en tecnología. Desarrollo proyectos académicos y personales con React, JavaScript, HTML, CSS y APIs. También tengo conocimientos de Python, FastAPI y bases de datos. Destaco por mi pensamiento analítico, organización y disposición para aprender.",
      careerEyebrow: "Mi trayectoria", careerTitle: "Trayectoria académica", careerIntro: "Un recorrido académico en construcción, paso a paso.",
      stageOneDate: "2025 — 2029", stageOneTitle: "Ingeniería de Software · FIAP", stageOneText: "Licenciatura en curso, con previsión de finalización en diciembre de 2029.",
      stageTwoDate: "Finalizado en 2025", stageTwoTitle: "Técnico en Administración · Etec", stageTwoText: "Curso finalizado en junio de 2025, con conocimientos de organización de procesos, rutinas de oficina y flujos de trabajo.",
      stageThreeDate: "Finalizado en diciembre de 2025", stageThreeTitle: "Educación secundaria · E. E. Reverendo Irineu Monteiro de Pinho", stageThreeText: "Educación secundaria finalizada en diciembre de 2025, antes de comenzar la formación superior.",
      certEyebrow: "Certificaciones académicas", certPlaceholder: "CERTIFICACIÓN · NO INDICADA EN EL CURRÍCULUM", certOne: "No se indican certificaciones", certTwo: "No se indican certificaciones", certThree: "No se indican certificaciones",
      certOneText: "Añade el certificado cuando esté disponible", certTwoText: "Añade el certificado cuando esté disponible", certThreeText: "Añade el certificado cuando esté disponible", download: "Certificado por añadir ↗",
      skillsEyebrow: "Herramientas y conocimientos", skillsIntro: "Fortaleciendo mis habilidades con proyectos académicos, prácticos y de estudio en desarrollo continuo.", levelPlaceholder: "Información del currículum", skillFour: "Conocimiento por añadir",
      projectsEyebrow: "Proyectos destacados", projectsTitle: "Proyectos destacados", projectsIntro: "Proyectos destacados en mi perfil de GitHub, con información consultada directamente en cada repositorio.", githubReposTitle: "Repositorios públicos de GitHub",
      projectPlaceholder: "PROYECTO DEL CURRÍCULUM", projectOne: "Aplicación web de películas", projectTwo: "Proyecto de mejora de experiencia de usuario", projectThree: "Simulación de comercio electrónico de supermercado",
      projectOneText: "Aplicación inspirada en TV Time, creada con React y la API TMDB para mostrar información de películas.", projectTwoText: "Proyecto académico con FIAP y Jovi / Grupo VIVO, con investigación, brainstorming, backlog, MVP y prototipado UX/UI.", projectThreeText: "Aplicación en Python con identificadores de usuarios, historial de consumo, base de datos SQL y registro de cambios.", repoLink: "Ver GitHub ↗",
      contactEyebrow: "Hablemos", contactIntro: "Abierto a conexiones, aprendizaje y futuras oportunidades.", addLink: "Abrir perfil ↗", addEmail: "Enviar correo ↗", phone: "Teléfono", addPhone: "Llamar ↗", resume: "Descargar currículum ↓", resumeNote: "Currículum en PDF disponible para descargar.", footerText: "Hecho con curiosidad y propósito.",
      typeLines: ["Código, curiosidad y nuevas posibilidades.", "Aprendiendo hoy para construir el mañana.", "Toda gran idea empieza con una pregunta."]
    }
  };

  let currentLanguage = "pt";
  let typewriterTimer = null;
  let typewriterToken = 0;

  function runTypewriter() {
    if (typewriterTimer) window.clearTimeout(typewriterTimer);
    const token = ++typewriterToken;
    const target = $("#typewriter");
    const lines = translations[currentLanguage].typeLines;
    if (reducedMotion) {
      target.textContent = lines[0];
      return;
    }
    let lineIndex = 0, charIndex = 0, deleting = false;
    function tick() {
      if (token !== typewriterToken) return;
      const line = lines[lineIndex];
      target.textContent = line.slice(0, charIndex);
      if (!deleting && charIndex < line.length) {
        charIndex++;
        typewriterTimer = window.setTimeout(tick, 58);
      } else if (!deleting) {
        deleting = true;
        typewriterTimer = window.setTimeout(tick, 1500);
      } else if (charIndex > 0) {
        charIndex--;
        typewriterTimer = window.setTimeout(tick, 28);
      } else {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
        typewriterTimer = window.setTimeout(tick, 300);
      }
    }
    tick();
  }

  function setLanguage(language) {
    if (!translations[language]) return;
    currentLanguage = language;
    document.documentElement.lang = language === "pt" ? "pt-BR" : language === "en" ? "en-US" : "es";
    $$("[data-i]").forEach(element => {
      const key = element.dataset.i;
      const translated = translations[language][key];
      if (typeof translated === "string") element.textContent = translated;
    });
    $("#intro-text").textContent = translations[language].introText;
    $$(".language-switch button").forEach(button => {
      const active = button.dataset.lang === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    runTypewriter();
  }

  $$(".language-switch button").forEach(button => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });

  const menu = $("#menu");
  const menuToggle = $("#menu-toggle");
  menuToggle.addEventListener("click", () => {
    const opened = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(opened));
    menuToggle.setAttribute("aria-label", opened ? "Fechar menu" : "Abrir menu");
  });
  $$("#menu a").forEach(link => link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  const writeToClipboard = async (value) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const helper = document.createElement("textarea");
    helper.value = value;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.top = "-9999px";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    document.body.removeChild(helper);
  };

  document.querySelectorAll(".copy-cert-key").forEach(button => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copyKey || "";
      if (!value) return;

      const previous = button.textContent;
      try {
        await writeToClipboard(value);
        button.textContent = "Copiado";
        button.classList.add("copied");
      } catch (error) {
        button.textContent = "Erro";
        button.classList.add("copied");
      }

      window.setTimeout(() => {
        button.textContent = previous;
        button.classList.remove("copied");
      }, 1400);
    });
  });

  const revealElements = $$(".rv");
  let revealObserver = null;

  function setupRevealObserver() {
    if (!("IntersectionObserver" in window) || reducedMotion) {
      revealElements.forEach(element => element.classList.add("in"));
      return;
    }

    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const delay = Number.parseInt(entry.target.style.getPropertyValue("--reveal-delay"), 10) || 0;
        entry.target.style.transitionDelay = `${delay}ms`;
        requestAnimationFrame(() => {
          entry.target.classList.add("in");
        });
        revealObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    });

    revealElements.forEach((element, index) => {
      const isHeroPhoto = element.classList.contains("hero-photo-wrap");
      const isSocialLink = element.classList.contains("social-link");
      const isContactEntry = element.closest(".contact-list");
      const delay = isHeroPhoto ? 120 : isSocialLink ? 260 + (index * 120) : isContactEntry ? 0 : 180 + (index * 100);
      element.style.setProperty("--reveal-delay", `${delay}ms`);
      revealObserver.observe(element);
    });
  }

  setupRevealObserver();

  $("#year").textContent = new Date().getFullYear();

  // Keep placeholder links inert until real destinations are supplied.
  $$(".placeholder-link").forEach(link => {
    link.addEventListener("click", event => {
      if (link.getAttribute("href") === "#" || link.getAttribute("href") === "mailto:" || link.getAttribute("href") === "tel:") {
        event.preventDefault();
      }
    });
  });

  // Intro black hole animation.
  const intro = $("#intro");
  const holeCanvas = $("#hole");
  const holeContext = holeCanvas.getContext("2d", { alpha: false });
  let holeWidth = 0, holeHeight = 0, holeDpr = 1;
  let introStarted = false, introFinished = false, animationFrame = 0, introStartTime = 0;
  const introDuration = 2200;
  const blackHoleParticles = [];
  const particleCount = isSmallDevice ? 65 : 135;

  function resizeHole() {
    holeDpr = Math.min(window.devicePixelRatio || 1, isSmallDevice ? 1.25 : 1.7);
    holeWidth = window.innerWidth;
    holeHeight = window.innerHeight;
    holeCanvas.width = Math.round(holeWidth * holeDpr);
    holeCanvas.height = Math.round(holeHeight * holeDpr);
    holeContext.setTransform(holeDpr, 0, 0, holeDpr, 0, 0);
  }

  function seedBlackHoleParticles() {
    blackHoleParticles.length = 0;
    const maxRadius = Math.max(holeWidth, holeHeight) * 0.7;
    for (let index = 0; index < particleCount; index++) {
      blackHoleParticles.push({
        angle: Math.random() * Math.PI * 2,
        radius: 30 + Math.random() * maxRadius,
        speed: 0.0015 + Math.random() * 0.004,
        size: 0.5 + Math.random() * 1.3,
        alpha: 0.35 + Math.random() * 0.65
      });
    }
  }

  function drawBlackHole(time) {
    if (introFinished) return;
    const cx = holeWidth / 2, cy = holeHeight / 2;
    const unit = Math.min(holeWidth, holeHeight);
    const progress = introStarted ? Math.min((time - introStartTime) / introDuration, 1) : 0;
    let scale = 1;
    if (introStarted) scale = progress < 0.45 ? 1 - (progress / 0.45) * 0.82 : 0.18 + ((progress - 0.45) / 0.55) * 7.5;

    holeContext.fillStyle = "rgba(7, 2, 15, 0.24)";
    holeContext.fillRect(0, 0, holeWidth, holeHeight);

    blackHoleParticles.forEach(particle => {
      particle.angle += particle.speed * (introStarted ? 5 : 1);
      particle.radius -= introStarted ? 1.1 : 0.18;
      if (particle.radius < unit * 0.12) particle.radius = Math.max(holeWidth, holeHeight) * 0.65;
      const burst = introStarted && progress > 0.45 ? 1 + ((progress - 0.45) / 0.55) * 1.5 : 1;
      const x = cx + Math.cos(particle.angle) * particle.radius * burst;
      const y = cy + Math.sin(particle.angle) * particle.radius * 0.48 * burst;
      holeContext.globalAlpha = particle.alpha;
      holeContext.fillStyle = particle.size > 1.3 ? "#e0d5ed" : "#ad83e5";
      holeContext.fillRect(x, y, particle.size, particle.size);
    });
    holeContext.globalAlpha = 1;

    const radius = Math.max(2, unit * 0.15 * scale);
    const glow = holeContext.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 2.3);
    glow.addColorStop(0, "rgba(173,131,229,0.85)");
    glow.addColorStop(0.38, "rgba(108,63,167,0.45)");
    glow.addColorStop(1, "rgba(26,11,46,0)");
    holeContext.fillStyle = glow;
    holeContext.beginPath();
    holeContext.arc(cx, cy, radius * 2.3, 0, Math.PI * 2);
    holeContext.fill();
    holeContext.fillStyle = "#000";
    holeContext.beginPath();
    holeContext.arc(cx, cy, radius, 0, Math.PI * 2);
    holeContext.fill();

    if (introStarted && progress > 0.58) {
      holeContext.fillStyle = `rgba(26,11,46,${Math.min((progress - 0.58) / 0.42, 1)})`;
      holeContext.fillRect(0, 0, holeWidth, holeHeight);
    }
    if (introStarted && progress >= 1) {
      finishIntro();
      return;
    }
    if (introStarted && time - introStartTime >= introDuration) {
      finishIntro();
      return;
    }
    animationFrame = window.requestAnimationFrame(drawBlackHole);
  }

  function startIntro() {
    if (introStarted || introFinished) return;
    introStarted = true;
    introStartTime = performance.now();
    intro.classList.add("go");
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(drawBlackHole);
    window.setTimeout(() => {
      if (!introFinished) {
        finishIntro();
      }
    }, introDuration + 300);
  }

  function finishIntro() {
    if (introFinished) return;
    introFinished = true;
    if (animationFrame) cancelAnimationFrame(animationFrame);
    intro.style.opacity = "0";
    intro.style.visibility = "hidden";
    window.setTimeout(() => {
      intro.remove();
      document.body.classList.remove("lock");
      holeCanvas.width = 0;
      startParticleNetwork();
    }, 760);
  }

  intro.addEventListener("pointerdown", () => {
    if (!introStarted && !introFinished) {
      startIntro();
    }
  });
  intro.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!introStarted && !introFinished) {
        startIntro();
      }
    }
  });
  window.addEventListener("keydown", event => {
    if (!introStarted && !introFinished && (event.key === "Enter" || event.key === " ")) {
      startIntro();
    }
  });

  const hasSeenPortfolioSession = sessionStorage.getItem("portfolioIntroSeen") === "true";

  if (!hasSeenPortfolioSession) {
    sessionStorage.setItem("portfolioIntroSeen", "true");
    resizeHole();
    seedBlackHoleParticles();
    window.addEventListener("resize", () => {
      resizeHole();
      seedBlackHoleParticles();
    });

    window.setTimeout(() => {
      startIntro();
    }, 220);
  } else {
    document.body.classList.remove("lock");
    if (intro) {
      intro.remove();
    }
    startParticleNetwork();
  }
  runTypewriter();

  // Background particle network: independent of document scrolling.
  function startParticleNetwork() {
    const canvas = $("#fx");
    const context = canvas.getContext("2d", { alpha: true });
    let width = 0, height = 0, dpr = 1, frame = 0;
    const count = isSmallDevice ? 24 : 52;
    const linkDistance = isSmallDevice ? 88 : 125;
    const particles = [];

    function resizeNetwork() {
      dpr = Math.min(window.devicePixelRatio || 1, isSmallDevice ? 1.25 : 1.6);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seedNetwork() {
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32
        });
      }
    }

    function drawNetwork() {
      if (document.hidden) {
        frame = requestAnimationFrame(drawNetwork);
        return;
      }
      context.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const first = particles[i];
        first.x += first.vx;
        first.y += first.vy;
        if (first.x < 0 || first.x > width) first.vx *= -1;
        if (first.y < 0 || first.y > height) first.vy *= -1;
        context.fillStyle = "#e0d5ed";
        context.fillRect(first.x, first.y, 1.7, 1.7);
        for (let j = i + 1; j < particles.length; j++) {
          const second = particles[j];
          const dx = first.x - second.x, dy = first.y - second.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared < linkDistance * linkDistance) {
            context.strokeStyle = `rgba(173,131,229,${(1 - Math.sqrt(distanceSquared) / linkDistance) * 0.34})`;
            context.lineWidth = 0.7;
            context.beginPath();
            context.moveTo(first.x, first.y);
            context.lineTo(second.x, second.y);
            context.stroke();
          }
        }
      }
      frame = requestAnimationFrame(drawNetwork);
    }

    resizeNetwork();
    seedNetwork();
    window.addEventListener("resize", () => {
      resizeNetwork();
      seedNetwork();
    });
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && !frame) frame = requestAnimationFrame(drawNetwork);
    });
    frame = requestAnimationFrame(drawNetwork);
  }

  // Atualize esta lista quando alterar os repositórios fixados no perfil.
  // A API REST pública do GitHub não informa quais repositórios estão fixados.
  const FEATURED_REPOSITORIES = [
    "checkpoint-5-calculo-teste",
    "Cp4-Edge-Computing",
    "projeto-loja-virtual-",
    "Python-API-CP4",
    "Sprint3-FrontEnd",
    "Checkpoint-4-WebDev"
  ];

  async function loadGitHubRepositories() {
    const grid = $("#github-repositories");
    const status = $("#github-status");
    const profileUrl = "https://github.com/kaicklima284737";

    try {
      const results = await Promise.all(FEATURED_REPOSITORIES.map(async (name) => {
        const response = await fetch(`https://api.github.com/repos/kaicklima284737/${encodeURIComponent(name)}`, {
          headers: { Accept: "application/vnd.github+json" }
        });
        if (!response.ok) return null;
        return response.json();
      }));
      const repositories = results.filter(Boolean);
      grid.replaceChildren();

      if (!repositories.length) {
        status.textContent = "Não foi possível carregar os projetos destacados. Consulte o perfil no GitHub.";
        return;
      }

      status.textContent = "Projetos destacados do perfil. Descrições, linguagens e links são consultados no GitHub ao abrir a página.";
      repositories.forEach((repository, index) => {
        const card = document.createElement("article");
        card.className = `content-card project-card github-repo-card rv ${index % 2 ? "art-two" : ""}`;
        const art = document.createElement("div");
        art.className = `project-art ${index % 2 ? "art-two" : index % 3 === 2 ? "art-three" : ""}`;
        const artLabel = document.createElement("span");
        artLabel.textContent = `DESTAQUE / ${String(index + 1).padStart(2, "0")}`;
        art.append(artLabel);

        const body = document.createElement("div");
        body.className = "project-body";
        const language = document.createElement("p");
        language.className = "date-label";
        language.textContent = repository.language || "Linguagem não informada";
        const title = document.createElement("h3");
        title.textContent = repository.name;
        const description = document.createElement("p");
        description.textContent = repository.description || "Repositório público sem descrição cadastrada.";
        const details = document.createElement("p");
        details.className = "repo-meta";
        details.textContent = `${repository.stargazers_count} estrela(s) · atualizado em ${new Date(repository.updated_at).toLocaleDateString("pt-BR")}`;
        const link = document.createElement("a");
        link.className = "text-link";
        link.href = repository.html_url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Ver projeto no GitHub ↗";

        body.append(language, title, description, details, link);
        card.append(art, body);
        grid.append(card);
        if (revealObserver) {
          card.style.setProperty("--reveal-delay", `${(index + 1) * 110}ms`);
          revealObserver.observe(card);
          return;
        }
        if ("IntersectionObserver" in window && !reducedMotion) {
          requestAnimationFrame(() => card.classList.add("in"));
        } else {
          card.classList.add("in");
        }
      });
    } catch (error) {
      status.textContent = "Não foi possível conectar ao GitHub. Acesse o perfil para ver os projetos destacados.";
    }
  }

  loadGitHubRepositories();
  setLanguage("pt");
})();
