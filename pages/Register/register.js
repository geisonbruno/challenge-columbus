// Cadastrar o usuário
document.querySelector('.btn-register').addEventListener('click', async (e) => {
    e.preventDefault();
  
    // Pegar valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmSenha = document.getElementById('confirmed-password').value;
  
    // Verificar campos obrigatórios
    if (!nome || !email || !senha || !confirmSenha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    // Validar o formato do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um email válido.');
      return;
    }
  
    // Verificar se as senhas coincidem
    if (senha !== confirmSenha) {
      alert('As senhas não coincidem!');
      return;
    }
  
    // Criptografar a senha (requer a biblioteca bcrypt.js)
    const hashedPassword = await bcrypt.hash(senha, 10);
  
    // Salvar usuário no LocalStorage
    const user = {
      nome: nome,
      email: email,
      senhaCriptografada: hashedPassword,
    };
  
    localStorage.setItem(email, JSON.stringify(user));
  
    alert('Usuário cadastrado com sucesso!');
    window.location.href = '../Login/login.html';
  });
  