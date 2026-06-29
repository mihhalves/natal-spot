document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. MENU RESPONSIVO E CABEÇALHO SCROLL
     ========================================================================== */
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Adiciona fundo escuro ao rolar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Toggle do menu mobile
  function toggleMobileMenu() {
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
    mobileToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden'); // impede scroll de fundo se aberto
    mobileNav.setAttribute('aria-hidden', String(!mobileNav.classList.contains('active')));
  }

  mobileToggle.addEventListener('click', toggleMobileMenu);

  // Fecha menu ao clicar em qualquer link mobile
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });


  /* ==========================================================================
     2. CARROSSEL DE AMBIENTES (GALERIA)
     ========================================================================== */
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextBtn = document.querySelector('.carousel-btn-right');
  const prevBtn = document.querySelector('.carousel-btn-left');
  const navIndicators = document.querySelector('.carousel-nav');
  const indicators = Array.from(navIndicators.children);
  const currentNumDisplay = document.querySelector('.carousel-counter .current-num');
  const totalNumDisplay = document.querySelector('.carousel-counter .total-num');

  let currentSlideIndex = 0;

  const updateSlide = (index) => {
    // Garante limites circulares do carrossel
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    currentSlideIndex = index;

    // Atualiza classes ativas nos slides
    slides.forEach((slide, idx) => {
      if (idx === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Atualiza classes ativas nos indicadores (dots)
    indicators.forEach((indicator, idx) => {
      if (idx === currentSlideIndex) {
        indicator.classList.add('current-slide');
      } else {
        indicator.classList.remove('current-slide');
      }
    });

    // Atualiza o contador numérico
    currentNumDisplay.textContent = currentSlideIndex + 1;
    if (totalNumDisplay) {
      totalNumDisplay.textContent = slides.length;
    }
  };

  // Clique no botão avançar
  nextBtn.addEventListener('click', () => {
    updateSlide(currentSlideIndex + 1);
  });

  // Clique no botão voltar
  prevBtn.addEventListener('click', () => {
    updateSlide(currentSlideIndex - 1);
  });

  // Clique direto nos dots indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      updateSlide(index);
    });
  });

  // Autoplay da galeria a cada 6 segundos
  let autoPlayTimer = setInterval(() => {
    updateSlide(currentSlideIndex + 1);
  }, 6000);

  // Reinicia o timer de autoplay caso haja interação do usuário
  const resetAutoplay = () => {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => {
      updateSlide(currentSlideIndex + 1);
    }, 6000);
  };

  [nextBtn, prevBtn, navIndicators].forEach(element => {
    element.addEventListener('click', resetAutoplay);
  });


  /* ==========================================================================
     3. SIMULADOR FINANCEIRO INTERATIVO
     ========================================================================== */
  const unitsSlider = document.getElementById('units-slider');
  const unitsDisplay = document.getElementById('units-display');
  
  // Elementos de Valor
  const valMensal = document.getElementById('val-mensal');
  const valAnual = document.getElementById('val-anual');
  const valInvest = document.getElementById('val-invest');
  const valEntrega = document.getElementById('val-entrega');
  const valPatrimonio = document.getElementById('val-patrimonio');

  // Valores Base para 1 SPOT
  const BASE_VAL_MENSAL = 4958;
  const BASE_VAL_ANUAL = 59500;
  const BASE_VAL_INVEST = 252000;
  const BASE_VAL_ENTREGA = 481440;
  const BASE_VAL_PATRIMONIO = 659940;

  // Função auxiliar de formatação de número (ex: 239000 -> "239.000")
  function formatBRL(value) {
    return value.toLocaleString('pt-BR');
  }

  // Atualiza os valores do simulador com base no valor do slider
  function updateSimulation() {
    const units = unitsSlider ? parseInt(unitsSlider.value, 10) || 1 : 1;
    
    // Atualiza display de quantidade
    if (unitsDisplay) {
      unitsDisplay.textContent = units === 1 ? "1 SPOT" : `${units} SPOTs`;
    }

    // Atualiza os valores multiplicados
    if (valMensal) valMensal.textContent = formatBRL(BASE_VAL_MENSAL * units);
    if (valAnual) valAnual.textContent = formatBRL(BASE_VAL_ANUAL * units);
    if (valInvest) valInvest.textContent = formatBRL(BASE_VAL_INVEST * units);
    if (valEntrega) valEntrega.textContent = formatBRL(BASE_VAL_ENTREGA * units);
    if (valPatrimonio) valPatrimonio.textContent = formatBRL(BASE_VAL_PATRIMONIO * units);
  }

  if (unitsSlider) {
    unitsSlider.addEventListener('input', updateSimulation);
  }

  updateSimulation();


  /* ==========================================================================
     4. FORMULÁRIO DE CAPTAÇÃO E VALIDAÇÕES
     ========================================================================== */
  const leadForm = document.getElementById('lead-form');
  const formSuccess = document.getElementById('form-success');
  const formName = document.getElementById('form-name');
  const formEmail = document.getElementById('form-email');
  const formPhone = document.getElementById('form-phone');
  const btnReset = document.getElementById('btn-reset-form');

  // Formatação automática do telefone brasileiro (XX) XXXXX-XXXX
  formPhone.addEventListener('input', (e) => {
    let input = e.target.value;
    // Remove qualquer caractere que não seja número
    input = input.replace(/\D/g, '');
    
    // Aplica a máscara dependendo da quantidade de caracteres
    if (input.length > 0) {
      if (input.length <= 2) {
        input = `(${input}`;
      } else if (input.length <= 6) {
        input = `(${input.slice(0, 2)}) ${input.slice(2)}`;
      } else if (input.length <= 10) {
        input = `(${input.slice(0, 2)}) ${input.slice(2, 6)}-${input.slice(6)}`;
      } else {
        input = `(${input.slice(0, 2)}) ${input.slice(2, 7)}-${input.slice(7, 11)}`;
      }
    }
    e.target.value = input;
  });

  // Função auxiliar para validar e-mail
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Função auxiliar para validar telefone brasileiro mínimo
  function validatePhone(phone) {
    const digitsOnly = phone.replace(/\D/g, '');
    // Verifica se possui DDD + 9 dígitos (ex: 11999999999) ou 8 dígitos fixo
    return digitsOnly.length >= 10 && digitsOnly.length <= 11;
  }

  // Lida com o submit do formulário
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    // 1. Valida nome
    const nameVal = formName.value.trim();
    if (nameVal.length < 3) {
      formName.parentElement.classList.add('invalid');
      isFormValid = false;
    } else {
      formName.parentElement.classList.remove('invalid');
    }

    // 2. Valida email
    const emailVal = formEmail.value.trim();
    if (!validateEmail(emailVal)) {
      formEmail.parentElement.classList.add('invalid');
      isFormValid = false;
    } else {
      formEmail.parentElement.classList.remove('invalid');
    }

    // 3. Valida telefone
    const phoneVal = formPhone.value.trim();
    if (!validatePhone(phoneVal)) {
      formPhone.parentElement.classList.add('invalid');
      isFormValid = false;
    } else {
      formPhone.parentElement.classList.remove('invalid');
    }

    // 4. Valida radio corretor
    const isBrokerRadio = document.querySelector('input[name="is_broker"]:checked');
    const radioGroupContainer = document.querySelector('input[name="is_broker"]').closest('.form-group');
    if (!isBrokerRadio) {
      radioGroupContainer.classList.add('invalid');
      isFormValid = false;
    } else {
      radioGroupContainer.classList.remove('invalid');
    }

    // Se o formulário for totalmente válido, prepara mensagem e abre WhatsApp
    if (isFormValid) {
      // Monta valores para a mensagem
      const brokerVal = isBrokerRadio ? isBrokerRadio.value : '';
      const waMessage = `Oi vim pelo site Natal Spot\nNome: ${nameVal}\nEmail: ${emailVal}\nTelefone: ${phoneVal}\nCorretor: ${brokerVal}`;

      // Abre o WhatsApp Web/APP com a mensagem pré-preenchida para número específico
      // Número destino: +55 11 93927-0990 (formato internacional sem símbolos)
      window.open('https://wa.me/5511939270990?text=' + encodeURIComponent(waMessage), '_blank');

      // Exibe estado de sucesso localmente
      leadForm.classList.add('hidden');
      document.querySelector('.form-header').classList.add('hidden');
      formSuccess.classList.remove('hidden');
    }
  });

  // Permite enviar nova resposta e limpa o formulário
  btnReset.addEventListener('click', () => {
    leadForm.reset();
    
    // Remove mensagens de erro eventuais
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('invalid');
    });

    formSuccess.classList.add('hidden');
    leadForm.classList.remove('hidden');
    document.querySelector('.form-header').classList.remove('hidden');
  });


  /* ==========================================================================
     5. ROLAGEM SUAVE COM EFEITO EXTRA DE FOCO
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Caso o link seja direcionado ao Formulário, pisca o formulário para chamar atenção
        if (targetId === '#bloco-hero') {
          const formCard = document.getElementById('lead-form-container');
          formCard.style.transition = 'box-shadow 0.5s ease-in-out';
          formCard.style.boxShadow = '0 0 30px rgba(229, 82, 85, 0.4)';
          
          setTimeout(() => {
            formCard.style.boxShadow = 'var(--shadow-lg)';
          }, 1500);
        }
      }
    });
  });

});
