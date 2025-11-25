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

## Backend local (SQLite + Flask)

Para testar autenticação/cadastro de forma realista criei um backend simples usando Flask e SQLite. Ele fica em `backend/` e armazena um arquivo `users.db` com usuários de teste.

Passos para rodar (Windows PowerShell):

1. Crie/ative um virtualenv (recomendado):
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```
2. Instale as dependências:
```powershell
pip install -r backend/requirements.txt
```
3. Inicialize o banco (gera `backend/users.db` e insere usuários de teste):
```powershell
python backend\init_db.py
```
4. Rode o servidor:
```powershell
python backend\app.py
# O servidor roda em http://127.0.0.1:5000
```

Endpoints úteis (para desenvolvimento / teste):
- GET /api/users — lista usuários (teste)
- POST /api/login { email, password } → autentica (usuários seed: joao@example.com / 1234, maria@example.com / abc123, carlos@example.com / visitor)
- POST /api/register { role, name, email, password, matricula?, matricula_funcional? } → cadastra novo usuário

Observação: o frontend (`script.js`) foi ajustado para tentar usar esses endpoints (http://127.0.0.1:5000) e **cair de volta** para o comportamento demo caso o backend esteja offline. Assim você pode testar ambos os modos facilmente.

### Armazenamento local (sem backend)

Se quiser testar sem rodar nenhum servidor, o frontend agora oferece um armazenamento local simples (localStorage) para persistir usuários de teste no navegador. Isso permite cadastrar, entrar e manter dados apenas no seu navegador — útil para desenvolvimento e protótipos.

- Chave usada: `nhande_users_v1` (localStorage). Você pode inspecionar / editar via DevTools → Application → Local Storage → selecione o site.
- O sistema inicializa com três usuários seed (João, Maria, Carlos) para facilitar testes. Após registrar novos usuários via modal eles também são salvos localmente.
- Fluxo: quando você tenta fazer login, o frontend verifica primeiro os usuários armazenados localmente — isso funciona sem backend. Se nenhum usuário local for encontrado, o frontend tenta o backend (http://127.0.0.1:5000) se estiver ativo.

Limpar dados locais (ex.: para reset):
1) Abra DevTools no navegador → Application → Local Storage → selecione o domínio local.
2) Localize a chave `nhande_users_v1` e delete-a. Ou rode no Console:
```javascript
localStorage.removeItem('nhande_users_v1');
```

Essa abordagem evita depender de um servidor local enquanto você modela telas e fluxos de autenticação.

## Novas telas de painel (Professor / Aluno)

Implementei duas telas de painel para testes e iteração rápida:

- `professor.html` — Painel do Professor com sidebar lateral e botões de ação (Visão Geral, Turmas, Materiais, Atividades, Avaliações, Participantes, Mensagens, Configurações). Ideal para prototipar a experiência docente.
- `aluno.html` — Painel do Aluno com sidebar e opções próprias (Visão Geral, Meus Cursos, Atividades, Minhas Notas, Recursos, Mensagens, Ajuda). Projetada com foco em acessibilidade e legibilidade.

Como o redirecionamento funciona:
- Quando o login é bem-sucedido (seja usando `localStorage` ou o backend), o frontend redireciona automaticamente para `professor.html` quando o usuário tem `role: "professor"`, ou para `aluno.html` quando `role: "aluno"`.
- Visitantes por enquanto permanecem na página inicial.

Teste rápido:
- Faça login com um usuário de teste (ex.: joao@example.com / 1234) e você será levado para `aluno.html`.
- Use maria@example.com / abc123 para testar o redirecionamento para `professor.html`.


### Verificações / Debug (se o backend estiver inacessível)

Se ao tentar logar você vê "backend inacessível", siga estes passos rápidos no Windows PowerShell para diagnosticar:

1) Verifique se o servidor está sendo executado e em qual porta:
```powershell
# Procure por Python escutando na porta 5000
netstat -aon | findstr ":5000"
# Se encontrar, observe o PID e confirme no tasklist
tasklist /FI "PID eq <PID>"
```

2) Teste a rota de saúde /health diretamente (retorno rápido):
```powershell
Invoke-RestMethod -Uri http://127.0.0.1:5000/health
```
Deverá retornar { "status": "ok", "db_path": ".../backend/users.db" } quando o servidor estiver rodando.

3) Se o serviço não estiver rodando:
- Ative seu virtualenv (se usar) e rode `python backend\app.py`.
- Se aparecer erro de módulo não encontrado, rode `pip install -r backend/requirements.txt`.

4) Se o servidor parece rodar mas o frontend continua mostrando "offline":
- Garanta que a página esteja sendo servida via HTTP (ex.: `python -m http.server 8000`) — alguns navegadores bloqueiam requests de file://.
- Verifique mensagens no DevTools → Console / Network para ver detalhes do erro (timeout, CORS, status code).

5) Teste o endpoint de usuários para confirmar:
```powershell
Invoke-RestMethod -Uri http://127.0.0.1:5000/api/users
```

Se quiser eu faço uma sessão de debug guiada com você (me diga onde está captando o erro — mensagens no terminal, output do servidor, ou console do navegador) e eu te guio passo-a-passo.

