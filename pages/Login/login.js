import { getUser } from './storage.js';
import { showMessage } from './utils.js';

document.querySelector('.btn-login').addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!email || !senha) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
    }

    const savedUser = getUser(email);
    if (!savedUser) {
        showMessage('Usuário não encontrado!', 'error');
        return;
    }

    const match = await bcrypt.compare(senha, savedUser.senhaCriptografada);
    if (match) {
        showMessage('Login realizado com sucesso!', 'success');
        window.location.href = '../Dashboard/dashboard.html';
    } else {
        showMessage('Senha incorreta!', 'error');
    }
});

document.querySelector('.btn-create-account').addEventListener('click', () => {
    window.location.href = '../Register/register.html';
});
