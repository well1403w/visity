 // Rola até a seção com animação suave
    function scrollToSection(id) {
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    }

    // Animações ao rolar
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.hero h2, .hero p, .hero button, .beneficios h2, .card, .depoimentos h2, .depoimento, .contato h2, form')
      .forEach(el => observer.observe(el));

    // Formulário simples
    function enviarFormulario(e) {
      e.preventDefault();
      alert("Mensagem enviada com sucesso!");
    }

    /* Contadores animados (inicia quando a seção .prob aparece) */
    (function(){
      const probSection = document.querySelector('.prob');
      const counts = probSection ? probSection.querySelectorAll('.count') : [];
      let started = false;

      function animateCount(el, target, duration = 1400) {
        const start = 0;
        const startTime = performance.now();
        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const value = Math.floor(progress * target);
          el.textContent = value.toLocaleString();
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target.toLocaleString();
        }
        requestAnimationFrame(step);
      }

      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !started) {
            started = true;
            counts.forEach(el => {
              const target = parseInt(el.getAttribute('data-target')) || 0;
              animateCount(el, target);
            });
            obs.disconnect();
          }
        });
      }, {threshold: 0.3});

      if (probSection) obs.observe(probSection);
    })()