// Salva os dados do usuário no LocalStorage
export function saveUser(email, hashedPassword) {
    const user = {
        email: email,
        senhaCriptografada: hashedPassword,
    };
    localStorage.setItem(email, JSON.stringify(user));
}

// Recupera os dados de um usuário do LocalStorage
export function getUser(email) {
    const user = localStorage.getItem(email);
    return user ? JSON.parse(user) : null; // Retorna null se o usuário não existir
}
