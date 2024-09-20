const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const modalButton = document.getElementById("modal-button");
const btnCopiar = document.getElementById('btn-copiar');

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.querySelector("#nome").value;
  const telefone = document.querySelector("#telefone").value;

  if (nome === "" || telefone === "") {
    alert("Preencha os campos de nome e telefone para gerar o teste grátis.");
    return;
  }

  const userAgent = document.querySelector("#user-agent").value;

  const dados = {
    nome: nome,
    telefone: telefone,
    user_agent: userAgent
  };

  fetch("https://kingtvstreaming.qpanel.top/api/chatbot/Kr6LJbNLv9/VpKDaJWRAa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  })
  .then(resposta => resposta.json())
  .then(dados => {

    const usuario = dados.username;
    const senha = dados.password;
    const plano = dados.package;
    const link = dados.payUrl;

    // Exiba as informações no modal
    modalContent.querySelector("#usuario").textContent = usuario;
    modalContent.querySelector("#senha").textContent = senha;
    modalContent.querySelector("#plano").textContent = plano;
    modalContent.querySelector("#link").textContent = link;
    modal.style.display = "block";
  })
  .catch(erro => {
    alert("Erro ao gerar teste grátis. Tente novamente mais tarde.");
  });
});


btnCopiar.addEventListener('click', () => {
  const texto = modalContent.querySelector('h1').textContent + '\n' +
                modalContent.querySelector('h2').textContent + '\n\n' +
                '✅ Usuário: ' + modalContent.querySelector('#usuario').textContent + '\n' +
                '✅ Senha: ' + modalContent.querySelector('#senha').textContent + '\n' +
                '📦 Plano: ' + modalContent.querySelector('#plano').textContent + '\n' +
                '💳 Assinar/Renovar Plano: ' + modalContent.querySelector('#link').textContent;

  navigator.clipboard.writeText(texto);
  alert('Dados de login copiados para a área de transferência.');
});