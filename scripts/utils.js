// Exibe mensagens para o usuário
export function showMessage(message, type = 'info') {
    alert(`[${type.toUpperCase()}]: ${message}`);
}

// Valida se um campo obrigatório está preenchido
export function validateFields(fields) {
    for (const field of fields) {
        if (!field.value) {
            showMessage(`Por favor, preencha o campo: ${field.name}`, 'error');
            return false;
        }
    }
    return true;
}
