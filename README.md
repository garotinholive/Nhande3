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


Observação: o botão de alto contraste fica sempre visível e clicável — mesmo quando modais ou sobreposições (`backdrop`) estão abertos. Isso garante que o usuário possa alternar o contraste a qualquer momento (o botão foi posicionado acima das camadas do modal via z-index).

Para alterar o comportamento ou as cores, edite `styles.css` (procure `.high-contrast`) e `script.js` para o comportamento do botão.

## Tela de Login (modal)

Adicionei uma tela de login modal igual ao design enviado. Ela aparece quando você clica em "Entrar" na barra superior (ou quando acessar o link `#entrar`).

- Arquivo: `Index.html` (marcação do modal com id `modal-entrar`).
- Estilos: `styles.css` (novas regras sob "Login modal styles").
- Comportamento: `script.js` (abre/fecha modal, foco, Escape fecha, formulário de demo).

Como testar:
- Clique no botão "Entrar" no topo → o modal aparece.
- Dentro do modal: preencha email/senha e pressione "Entrar"; o formulário é apenas demo (previne submit e mostra alerta). Integre com backend se necessário.
- Feche clicando fora (backdrop), no botão "Voltar ao Início" ou pressionando Esc.

### Modal de cadastro

Adicionei um modal de cadastro (`modal-cadastrar`) com três perfis:

- **Aluno** — campos: nome, e-mail, matrícula (obrigatório para cadastro)
- **Professor** — campos: nome, e-mail, matrícula funcional (obrigatório)
- **Visitante** — campos: nome, e-mail

O fluxo:
- Abra o modal clicando em "Cadastre-se" (no modal de login) ou navegando para `#cadastrar`.
- Selecione o tipo de conta clicando na caixinha correspondente — o formulário atualiza dinamicamente os campos visíveis.
- O formulário é um demo — realiza validação básica no cliente e mostra um alerta quando o cadastro é submetido (integre com backend para persistir dados).

Use os mesmos passos de teste do login: clique em "Cadastre-se", preencha os campos relevantes e pressione "Cadastrar".

