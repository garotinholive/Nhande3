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
