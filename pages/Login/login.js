import { getUser } from "../../scripts/storage.js";
import { showMessage } from "../../scripts/utils.js";

// Função para gerar o hash da senha
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

document.querySelector(".btn-login").addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  if (!email || !senha) {
    showMessage("Por favor, preencha todos os campos.", "error");
    return;
  }

  const savedUser = getUser(email);
  if (!savedUser) {
    showMessage("Usuário não encontrado!", "error");
    return;
  }

  try {
    const hashedPassword = await hashPassword(senha);

    if (hashedPassword === savedUser.senhaCriptografada) {
      localStorage.setItem(
        "loggedUser",
        JSON.stringify({
          name: savedUser.nome,
          email: email,
        })
      );

      window.location.href = "../Dashboard/dashboard.html";
    } else {
      showMessage("Senha incorreta!", "error");
    }
  } catch (error) {
    console.error("Erro durante a verificação de senha:", error);
    showMessage("Erro ao fazer login. Tente novamente.", "error");
  }
});

document.querySelector(".btn-create-account").addEventListener("click", () => {
  window.location.href = "../Register/register.html";
});
