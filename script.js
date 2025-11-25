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

/* Accessibility / High contrast toggle */
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

  // Initialize from saved preference
  const stored = localStorage.getItem('nhande_highContrast');
  setState(stored === '1');

  toggle.addEventListener('click', function(){
    const isOn = body.classList.contains('high-contrast');
    setState(!isOn);
  });

  // Keyboard shortcut: Alt+Shift+C
  window.addEventListener('keydown', function(e){
    if((e.altKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c'){
      e.preventDefault();
      toggle.click();
      toggle.focus();
    }
  });

  // Respect reduced-motion preference for transitions if desired
})();
