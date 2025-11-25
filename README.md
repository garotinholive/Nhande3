# Projeto Nhandé — instruções rápidas

Como colocar/alterar a imagem de background do *hero* (início)

1. Substitua o arquivo `imagens/background.jpeg` pelo arquivo que quiser manter como background (mesmo nome ou atualize o CSS).
2. Ou edite `styles.css` no seletor `.hero::before` e altere `background-image: url("imagens/background.jpeg");` para o caminho/nome desejado.

Exemplo (opcional) — uso de imagem responsiva por resolução:

```css
@media (max-width: 480px) {
  .hero::before { background-image: url("imagens/background-mobile.jpeg"); }
}
```

Como visualizar localmente:

- Na maioria dos casos basta abrir `Index.html` no navegador (duplo clique) ou rodar um servidor HTTP simples para evitar problemas de caminhos (recomendado):

# Windows PowerShell (na pasta do projeto)

```powershell
# Servidor rápido com Python 3
python -m http.server 8000; # abre http://localhost:8000
```

Pronto — o background do início usa `imagens/background.jpeg` e já está configurado no CSS.

Observação: Atualizei a navegação da tela inicial removendo as abas/links "Professores & Alunos", "Mídias Educativas" e "Valores Culturais" conforme solicitado — agora a barra de navegação contém apenas "Início", "Missão" e "Entrar".

## Botão de acessibilidade / contraste alto

Adicionei um botão flutuante no canto inferior direito para ativar/desativar o modo de alto contraste — muito útil para acessibilidade.

- Nome do botão no DOM: `#accessibility-toggle`.
- Atalho de teclado: Alt+Shift+C (também funciona com Meta+Shift+C em sistemas que usam Meta/Command).
- Preferência salva em `localStorage` na chave `nhande_highContrast`.

Para alterar o comportamento ou as cores, edite `styles.css` (procure `.high-contrast`) e `script.js` para o comportamento do botão.
