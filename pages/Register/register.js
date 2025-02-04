import { saveUser, getUser } from '../../scripts/storage.js';
import { showMessage } from '../../scripts/utils.js';

document.querySelector('.btn-register').addEventListener('click', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmSenha = document.getElementById('confirmed-password').value;

    if (!nome || !email || !senha || !confirmSenha) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Por favor, insira um email válido.', 'error');
        return;
    }

    if (senha !== confirmSenha) {
        showMessage('As senhas não coincidem!', 'error');
        return;
    }

    const existingUser = getUser(email);
    if (existingUser) {
        showMessage('Este email já está cadastrado. Por favor, use outro.', 'error');
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);

        const user = {
            nome,
            email,
            senhaCriptografada: hashedPassword,
        };

        saveUser(user);

        showMessage('Usuário cadastrado com sucesso!', 'success');
        window.location.href = '../Login/login.html';
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        showMessage('Erro ao cadastrar usuário. Tente novamente.', 'error');
    }
});

document.querySelector('.btn-have-account').addEventListener('click', () => {
    window.location.href = '../Login/login.html'; 
});
