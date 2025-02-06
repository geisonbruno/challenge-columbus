// Dados fictícios para KPIs
const kpis = [
    { title: "Entregas Realizadas", value: "150" },
    { title: "Atrasos", value: "0 (0%)" },
    { title: "Em Trânsito", value: "30" },
  ];
  
  const reportsTab = document.getElementById("reports-tab");
  const homeContent = document.getElementById("home-content");
  const reportsContent = document.getElementById("reports-content");
  
  // Evento para mostrar os relatórios ao clicar no botão "Relatórios"
  reportsTab.addEventListener("click", () => {
    // Esconder a seção da Home
    homeContent.classList.add("hidden");
  
    // Mostrar a seção de Relatórios
    reportsContent.classList.remove("hidden");
  
    // Limpar qualquer conteúdo anterior
    reportsContent.innerHTML = "";
  
    // Gerar os KPIs dinamicamente, separados por linha
    kpis.forEach((kpi) => {
      const kpiElement = document.createElement("div");
      kpiElement.classList.add("kpi-row");
      kpiElement.innerHTML = `
        <span class="kpi-title">${kpi.title}:</span>
        <span class="kpi-value">${kpi.value}</span>
      `;
      reportsContent.appendChild(kpiElement);
    });
  });
  

  const homeTab = document.getElementById("home-tab");

// Evento para voltar para a Home
homeTab.addEventListener("click", () => {

  homeContent.classList.remove("hidden");
  reportsContent.classList.add("hidden");
});
  
  // Dados fictícios para entregas
  const deliveries = [
    { id: "001", cliente: "Empresa A", status: "Entregue", destino: "São Paulo" },
    { id: "002", cliente: "Empresa B", status: "Atrasada", destino: "Nova York" },
    { id: "003", cliente: "Empresa C", status: "Entregue", destino: "Londres" },
    { id: "004", cliente: "Empresa D", status: "Entregue", destino: "Paraguai" },
    { id: "005", cliente: "Empresa F", status: "Em trânsito", destino: "Uruguai" },
    { id: "006", cliente: "Empresa E", status: "Em trânsito", destino: "Uruguai" },
    { id: "007", cliente: "Empresa F", status: "Em trânsito", destino: "Uruguai" },
    { id: "008", cliente: "Empresa G", status: "Em trânsito", destino: "Uruguai" },
    { id: "009", cliente: "Empresa H", status: "Em trânsito", destino: "Uruguai" },
    { id: "010", cliente: "Empresa C", status: "Em trânsito", destino: "Uruguai" },
    { id: "011", cliente: "Empresa C", status: "Em trânsito", destino: "Uruguai" },
    { id: "012", cliente: "Empresa C", status: "Em trânsito", destino: "Uruguai" },
    { id: "013", cliente: "Empresa C", status: "Em trânsito", destino: "Uruguai" },
    { id: "014", cliente: "Empresa C", status: "Em trânsito", destino: "Uruguai" },
    { id: "015", cliente: "Empresa C", status: "Em trânsito", destino: "Uruguai" },
    { id: "016", cliente: "Empresa C", status: "Em trânsito", destino: "Uruguai" },
    { id: "017", cliente: "Empresa C", status: "Em trânsito", destino: "Uruguai" },
    { id: "018", cliente: "Empresa C", status: "Em trânsito", destino: "Uruguai" },
    { id: "019", cliente: "Empresa C", status: "Em trânsito", destino: "Uruguai" },
    { id: "020", cliente: "Empresa C", status: "Em trânsito", destino: "Uruguai" },
  ];
  
  // Função para exibir os cards na Home
  function displayHome(deliveriesToShow = deliveries) {
    const homeContent = document.getElementById("home-content");
    homeContent.innerHTML = deliveriesToShow
      .map(
        (delivery) => `
          <div class="result-card" data-status="${delivery.status}">
            <p><strong>ID:</strong> ${delivery.id}</p>
            <p><strong>Cliente:</strong> ${delivery.cliente}</p>
            <p><strong>Status:</strong> ${delivery.status}</p>
            <p><strong>Destino:</strong> ${delivery.destino}</p>
          </div>`
      )
      .join('');
  }
  
  
  // Função para exibir os KPIs nos Relatórios
  function displayReports() {
    const reportsContent = document.getElementById("reports-content");
    reportsContent.innerHTML = `
      <div class="kpi-container">
        ${kpis
          .map(
            (kpi) => `
            <div class="kpi-card">
              <h3>${kpi.title}</h3>
              <p>${kpi.value}</p>
            </div>
          `
          )
          .join('')}
      </div>
    `;
  }
  
  // Alternar entre Home e Relatórios
  function switchTab(tab) {
    const homeContent = document.getElementById("home-content");
    const reportsContent = document.getElementById("reports-content");
  
    if (tab === "home") {
      homeContent.classList.remove("hidden");
      reportsContent.classList.add("hidden");
      displayHome();
    } else if (tab === "reports") {
      homeContent.classList.add("hidden");
      reportsContent.classList.remove("hidden");
      displayReports();
    }
  }
  
  // Inicializa a página com a aba Home e funcionalidade de pesquisa
  document.addEventListener("DOMContentLoaded", () => {
    displayHome();
  
    // Adiciona evento de clique nas abas
    document.querySelector('.sidebar-menu').addEventListener('click', (e) => {
      if (e.target.textContent.includes("Home")) {
        switchTab("home");
      } else if (e.target.textContent.includes("Relatórios")) {
        switchTab("reports");
      }
    });
  
    // Funcionalidade de pesquisa
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", (event) => {
      const query = event.target.value.toLowerCase();
      const filteredDeliveries = deliveries.filter(
        (delivery) =>
          delivery.id.toLowerCase().includes(query) ||
          delivery.cliente.toLowerCase().includes(query) ||
          delivery.status.toLowerCase().includes(query) ||
          delivery.destino.toLowerCase().includes(query)
      );
      displayHome(filteredDeliveries); 
    });
  });
  
  // Abrir e Fechar o Modal
const addButton = document.getElementById("search-button");
const modal = document.getElementById("add-delivery-modal");
const closeButton = document.querySelector(".close-button");

addButton.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Adicionar Nova Entrega
const addDeliveryForm = document.getElementById("add-delivery-form");

addDeliveryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  const id = document.getElementById("delivery-id").value;
  const cliente = document.getElementById("delivery-client").value;
  const status = document.getElementById("delivery-status").value;
  const destino = document.getElementById("delivery-destination").value;
  
  const newDelivery = { id, cliente, status, destino };
  deliveries.push(newDelivery); 
  displayHome(); 
  modal.style.display = "none"; 
  
  // Limpa o formulário
  addDeliveryForm.reset();
});

function sortDeliveriesByStatus() {
    const sortedDeliveries = [...deliveries].sort((a, b) => {
      const statusOrder = ["Atrasada", "Em trânsito", "Entregue"]; 
      return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    });
    displayHome(sortedDeliveries); 
  }
  
  // Evento de clique para ordenar por Status
  document.getElementById("sort-by-status").addEventListener("click", sortDeliveriesByStatus);
  
  