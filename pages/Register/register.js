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
  
    // Validar formato do email
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
  
    try {
      // Criptografar a senha (requer bcrypt.js)
      const hashedPassword = await bcrypt.hash(senha, 10);
  
      // Criar objeto do usuário
      const user = {
        nome: nome,
        email: email,
        senhaCriptografada: hashedPassword, // Salvar a senha criptografada
      };
  
      // Salvar usuário no LocalStorage
      localStorage.setItem(email, JSON.stringify(user));
  
      alert('Usuário cadastrado com sucesso!');
      window.location.href = '../Login/login.html'; // Redirecionar para login
    } catch (error) {
      alert('Erro ao cadastrar usuário. Tente novamente.');
      console.error(error);
    }
  });
  