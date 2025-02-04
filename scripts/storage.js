// Salva os dados do usuário no LocalStorage
export function saveUser(user) {
    const { email } = user; // Extrai o email do objeto do usuário
    localStorage.setItem(email, JSON.stringify(user)); // Armazena o usuário inteiro no localStorage
}

// Recupera os dados de um usuário do LocalStorage
export function getUser(email) {
    const user = localStorage.getItem(email);
    return user ? JSON.parse(user) : null; // Retorna null se o usuário não existir
}
