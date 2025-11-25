// Botão "Começar Agora"
document.getElementById('btn-start').addEventListener('click', function () {
  document.getElementById('start').scrollIntoView({ behavior: 'smooth' });
});

// Botão "Saiba Mais"
document.getElementById('btn-more').addEventListener('click', function () {
  document.getElementById('start').scrollIntoView({ behavior: 'smooth' });
});

// Rolagem suave dos links da navbar
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', function(e){
    e.preventDefault();
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
});

// ---------- Comportamento do modal de login ----------
(function(){
  const modal = document.getElementById('modal-entrar');
  const openButtons = document.querySelectorAll('a[href="#entrar"], .btn-login');
  const closeElements = modal ? modal.querySelectorAll('[data-close]') : [];
  const firstInput = modal ? modal.querySelector('#login-email') : null;
  let lastFocused = null;

  function openModal(){
    if(!modal) return;
    lastFocused = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    firstInput && firstInput.focus();
  }

  function closeModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if(lastFocused) lastFocused.focus();
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', function(e){
      e.preventDefault();
      openModal();
    });
  });

  closeElements.forEach(el => el.addEventListener('click', closeModal));

  // Fechar com a tecla Escape
  window.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false'){
      closeModal();
    }
  });

  // Proteção simples caso o formulário seja submetido — previne navegação
  const form = modal ? modal.querySelector('#login-form') : null;
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      // Comportamento demo mínimo: fechar o modal e simular login
      closeModal();
      // Opcional: mostrar mensagem de sucesso ou integrar autenticação aqui
      alert('Login (demo): formulário enviado — integre autenticação no backend.');
    });
  }
})();

// ---------- Comportamento do modal de cadastro (Aluno/Professor/Visitante) ----------
(function(){
  const modal = document.getElementById('modal-cadastrar');
  if(!modal) return;

  const openTriggers = document.querySelectorAll('a[href="#cadastrar"]');
  const closeEls = modal.querySelectorAll('[data-close]');
  const choices = modal.querySelectorAll('.register-choices .choice');
  const form = modal.querySelector('#register-form');

  function openModal(){
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // definir seleção padrão para 'aluno' caso nenhuma esteja selecionada
    const selected = modal.querySelector('.register-choices .choice[aria-checked="true"]') || choices[0];
    selectRole(selected ? selected.dataset.role : 'aluno');
    // focar no primeiro campo visível
    setTimeout(()=>{
      const firstVisible = modal.querySelector('.form-field:not([style*="display:none"]) input');
      if(firstVisible) firstVisible.focus();
    }, 50);
  }

  function closeModal(){
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openTriggers.forEach(t => t.addEventListener('click', function(e){
    e.preventDefault();
    // se o modal de login estiver aberto, fechá-lo
    const loginModal = document.getElementById('modal-entrar');
    if(loginModal && loginModal.getAttribute('aria-hidden') === 'false'){
      loginModal.setAttribute('aria-hidden','true');
    }
    openModal();
  }));

  closeEls.forEach(el => el.addEventListener('click', closeModal));

  // tratar cliques nas opções (Aluno/Professor/Visitante)
  function selectRole(role){
    choices.forEach(btn => {
      const is = (btn.dataset.role === role);
      btn.setAttribute('aria-checked', is ? 'true' : 'false');
      btn.classList.toggle('selected', is);
    });

    // mostrar/esconder campos com base no atributo data-for-role
    modal.querySelectorAll('.form-field').forEach(field => {
      const roles = (field.getAttribute('data-for-role') || '').split(/\s+/).filter(Boolean);
      if(roles.length === 0 || roles.includes('all')){
        field.style.display = '';
      } else if(roles.includes(role)){
        field.style.display = '';
      } else {
        field.style.display = 'none';
      }
    });
  }

  choices.forEach(btn => {
    btn.addEventListener('click', function(){ selectRole(this.dataset.role); });
    btn.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectRole(this.dataset.role); } });
  });

  // ESC para fechar
  window.addEventListener('keydown', function(e){ if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal(); });

  // Validação mínima do envio do formulário
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const role = modal.querySelector('.register-choices .choice[aria-checked="true"]').dataset.role;
    const name = form.querySelector('#reg-nome').value.trim();
    const email = form.querySelector('#reg-email').value.trim();
    const matricula = form.querySelector('#reg-matricula');
    const matriculaFunc = form.querySelector('#reg-matricula-func');

    if(!name || !email){
      alert('Por favor preencha nome e e-mail.');
      return;
    }

    if(role === 'aluno' && (!matricula || !matricula.value.trim())){
      alert('Por favor informe a matrícula do aluno.');
      return;
    }

    if(role === 'professor' && (!matriculaFunc || !matriculaFunc.value.trim())){
      alert('Por favor informe a matrícula funcional do professor.');
      return;
    }

    // Comportamento demo: fechar e mostrar uma mensagem
    closeModal();
    alert('Cadastro (demo): ' + role + ' registrado (integre com backend).');
    form.reset();
    // resetar escolhas para o padrão (aluno)
    selectRole('aluno');
  });
})();

/* Alternador de acessibilidade / alto contraste */
;(function (){
  const toggle = document.getElementById('accessibility-toggle');
  const body = document.body;

  if(!toggle) return;

  function setState(on){
    if(on){
      body.classList.add('high-contrast');
      toggle.setAttribute('aria-pressed', 'true');
      toggle.setAttribute('title', 'Desativar alto contraste');
      toggle.querySelector('.a11y-label').textContent = 'Contraste: ON';
      localStorage.setItem('nhande_highContrast', '1');
    } else {
      body.classList.remove('high-contrast');
      toggle.setAttribute('aria-pressed', 'false');
      toggle.setAttribute('title', 'Ativar alto contraste');
      toggle.querySelector('.a11y-label').textContent = 'Alto contraste';
      localStorage.setItem('nhande_highContrast', '0');
    }
  }

  // Inicializar a partir da preferência salva
  const stored = localStorage.getItem('nhande_highContrast');
  setState(stored === '1');

  toggle.addEventListener('click', function(){
    const isOn = body.classList.contains('high-contrast');
    setState(!isOn);
  });

  // Atalho de teclado: Alt+Shift+C
  window.addEventListener('keydown', function(e){
    if((e.altKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c'){
      e.preventDefault();
      toggle.click();
      toggle.focus();
    }
  });

  // Respeitar preferência de 'reduced-motion' para transições, se desejado
})();
