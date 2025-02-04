import { getUser } from './storage.js'; 
import { showMessage } from './utils.js'; 

document.querySelector('.btn-login').addEventListener('click', async (e) => {
    e.preventDefault();

    // Pegar valores dos campos
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    // Verificar campos obrigatórios
    if (!email || !senha) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
    }

    // Buscar usuário no LocalStorage
    const savedUser = getUser(email);

    if (!savedUser) {
        showMessage('Usuário não encontrado!', 'error');
        return;
    }

    try {
        const match = await bcrypt.compare(senha, savedUser.senhaCriptografada);

        if (match) {
            showMessage('Login realizado com sucesso!', 'success');
            window.location.href = '../Dashboard/dashboard.html';
        } else {
            showMessage('Senha incorreta!', 'error');
        }
    } catch (error) {
        console.error('Erro durante a verificação de senha:', error);
        showMessage('Ocorreu um erro. Tente novamente mais tarde.', 'error');
    }
});

document.querySelector('.btn-create-account').addEventListener('click', () => {
    window.location.href = '../Register/register.html';
});
