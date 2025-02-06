let statusChartInstance = null;
let clientBarChartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  const homeContent = document.getElementById("home-content");
  const reportsContent = document.getElementById("reports-content");
  const searchBarContainer = document.getElementById("search-bar-container");
  const homeTab = document.getElementById("home-tab");
  const reportsTab = document.getElementById("reports-tab");
  const editModal = document.getElementById("edit-delivery-modal");
  const editCloseButton = document.getElementById("edit-close-button");

  editCloseButton.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === editModal) {
      editModal.style.display = "none";
    }
  });

  // Garante que a barra de pesquisa está visível apenas na Home
  searchBarContainer.style.display = "block"; // Mostra a barra ao carregar a Home

  reportsTab.addEventListener("click", () => {
    homeContent.classList.add("hidden");
    reportsContent.classList.remove("hidden");
    searchBarContainer.style.display = "none";

    displayReports();
  });

  homeTab.addEventListener("click", () => {
    homeContent.classList.remove("hidden");
    reportsContent.classList.add("hidden");
    searchBarContainer.style.display = "block";
  });
});

const kpis = [
  { title: "Entregas Realizadas" },
  { title: "Atrasos" },
  { title: "Em Trânsito" },
];

const reportsTab = document.getElementById("reports-tab");
const homeContent = document.getElementById("home-content");
const reportsContent = document.getElementById("reports-content");

reportsTab.addEventListener("click", () => {
  homeContent.classList.add("hidden");
  reportsContent.classList.remove("hidden");

  // Atualizar os valores dos KPIs existentes
  const kpiRows = document.querySelectorAll(".kpi-row");
  if (kpiRows.length > 0) {
    kpiRows[0].querySelector(".kpi-value").textContent = kpis[0].value;
    kpiRows[1].querySelector(".kpi-value").textContent = kpis[1].value;
    kpiRows[2].querySelector(".kpi-value").textContent = kpis[2].value;
  }

  // Criar ou atualizar os gráficos
  renderChart(); // Gráfico de Pizza
  renderClientBarChart(); // Gráfico de Barras
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
  {
    id: "005",
    cliente: "Empresa F",
    status: "Em trânsito",
    destino: "Uruguai",
  },
  {
    id: "006",
    cliente: "Empresa E",
    status: "Em trânsito",
    destino: "Uruguai",
  },
  {
    id: "007",
    cliente: "Empresa F",
    status: "Em trânsito",
    destino: "Uruguai",
  },
  {
    id: "008",
    cliente: "Empresa G",
    status: "Em trânsito",
    destino: "Uruguai",
  },
  {
    id: "009",
    cliente: "Empresa H",
    status: "Em trânsito",
    destino: "Uruguai",
  },
  {
    id: "010",
    cliente: "Empresa I",
    status: "Em trânsito",
    destino: "Uruguai",
  },
  {
    id: "011",
    cliente: "Empresa J",
    status: "Em trânsito",
    destino: "Uruguai",
  },
  {
    id: "012",
    cliente: "Empresa K",
    status: "Em trânsito",
    destino: "Uruguai",
  },
  {
    id: "013",
    cliente: "Empresa L",
    status: "Em trânsito",
    destino: "Uruguai",
  },
  {
    id: "014",
    cliente: "Empresa M",
    status: "Em trânsito",
    destino: "Uruguai",
  },
  {
    id: "015",
    cliente: "Empresa N",
    status: "Em trânsito",
    destino: "Uruguai",
  },
  {
    id: "016",
    cliente: "Empresa O",
    status: "Em trânsito",
    destino: "Uruguai",
  },
  {
    id: "017",
    cliente: "Empresa P",
    status: "Em trânsito",
    destino: "Uruguai",
  },
  {
    id: "018",
    cliente: "Empresa Q",
    status: "Em trânsito",
    destino: "Uruguai",
  },
  {
    id: "019",
    cliente: "Empresa R",
    status: "Em trânsito",
    destino: "Uruguai",
  },
  {
    id: "020",
    cliente: "Empresa S",
    status: "Em trânsito",
    destino: "Uruguai",
  },
];

// Função para exibir os cards na Home
function displayHome(deliveriesToShow = deliveries) {
  const homeContent = document.getElementById("home-content");
  homeContent.innerHTML = deliveriesToShow
    .map(
      (delivery) => `
        <div class="result-card" data-id="${delivery.id}" data-status="${delivery.status}">
          <p><strong>ID:</strong> ${delivery.id}</p>
          <p><strong>Cliente:</strong> ${delivery.cliente}</p>
          <p><strong>Status:</strong> ${delivery.status}</p>
          <p><strong>Destino:</strong> ${delivery.destino}</p>
          <div class="card-actions">
            <button class="edit-button" data-id="${delivery.id}">
              <i class="fas fa-edit"></i> 
            </button>
            <button class="delete-button" data-id="${delivery.id}">
              <i class="fas fa-trash"></i> 
            </button>
          </div>
        </div>
      `
    )
    .join("");

  // Adiciona eventos aos botões de editar e excluir
  addCardActionEvents();
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
          .join("")}
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
  document.querySelector(".sidebar-menu").addEventListener("click", (e) => {
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

  updateKPIs();

  // Limpa o formulário
  addDeliveryForm.reset();

  renderChart();
});

function sortDeliveriesByStatus() {
  const sortedDeliveries = [...deliveries].sort((a, b) => {
    const statusOrder = ["Atrasada", "Em trânsito", "Entregue"];
    return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
  });
  displayHome(sortedDeliveries);
}

// Evento de clique para ordenar por Status
document
  .getElementById("sort-by-status")
  .addEventListener("click", sortDeliveriesByStatus);

function renderChart() {
  const totalEntregue = deliveries.filter(
    (d) => d.status === "Entregue"
  ).length;
  const totalAtrasada = deliveries.filter(
    (d) => d.status === "Atrasada"
  ).length;
  const totalTransito = deliveries.filter(
    (d) => d.status === "Em trânsito"
  ).length;

  const ctx = document.getElementById("statusChart").getContext("2d");

  // Destroi o gráfico anterior se existir
  if (statusChartInstance) {
    statusChartInstance.destroy();
  }

  // Criar novo gráfico
  statusChartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Entregue", "Atrasada", "Em trânsito"], // Rótulos
      datasets: [
        {
          label: "Status das Entregas",
          data: [totalEntregue, totalAtrasada, totalTransito], // Dados
          backgroundColor: ["#4caf50", "#f44336", "#ff9800"], // Cores
          borderColor: ["#ffffff"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" },
        tooltip: {
          callbacks: {
            label: function (context) {
              const total = totalEntregue + totalAtrasada + totalTransito;
              const value = context.raw;
              const percent = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${value} (${percent}%)`;
            },
          },
        },
      },
    },
  });
}

function renderClientBarChart() {
  const ctx = document.getElementById("clientBarChart").getContext("2d");

  // Destroi o gráfico anterior se existir
  if (clientBarChartInstance) {
    clientBarChartInstance.destroy();
  }

  // Obter os dados
  const clientData = getDeliveriesByClient();
  const labels = Object.keys(clientData);
  const data = Object.values(clientData);

  // Criar o gráfico de barras
  clientBarChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Número de Entregas por Cliente",
          data: data,
          backgroundColor: "#4caf50",
          borderColor: "#388e3c",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Quantidade de Entregas" },
        },
        x: {
          title: { display: true, text: "Clientes" },
        },
      },
      plugins: { legend: { position: "top" } },
    },
  });
}

function getDeliveriesByClient() {
  const clientCounts = {};

  deliveries.forEach((delivery) => {
    if (!clientCounts[delivery.cliente]) {
      clientCounts[delivery.cliente] = 0;
    }
    clientCounts[delivery.cliente]++;
  });

  return clientCounts;
}

// Função para calcular os KPIs
function calculateKPIs() {
  const totalEntregue = deliveries.filter(
    (d) => d.status === "Entregue"
  ).length;
  const totalAtrasada = deliveries.filter(
    (d) => d.status === "Atrasada"
  ).length;
  const totalTransito = deliveries.filter(
    (d) => d.status === "Em trânsito"
  ).length;

  // Atualize os valores dos KPIs
  const kpis = [
    { title: "Entregas Realizadas", value: totalEntregue },
    { title: "Atrasos", value: totalAtrasada },
    { title: "Em Trânsito", value: totalTransito },
  ];

  return kpis;
}

// Função para exibir os KPIs
function updateKPIs() {
  const kpis = calculateKPIs();

  const kpiRows = document.querySelectorAll(".kpi-row");
  kpis.forEach((kpi, index) => {
    if (kpiRows[index]) {
      kpiRows[index].querySelector(".kpi-value").textContent = kpi.value;
    }
  });
}

// Modifique a função displayReports para chamar updateKPIs
function displayReports() {
  updateKPIs();

  renderChart();
  renderClientBarChart();
}

function addCardActionEvents() {
  const editButtons = document.querySelectorAll(".edit-button");
  const deleteButtons = document.querySelectorAll(".delete-button");

  // Evento para editar
  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.closest("button").dataset.id;
      openEditModal(id);
    });
  });

  // Evento para excluir
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.closest("button").dataset.id;
      deleteCard(id);
    });
  });
}

// Abrir o modal de edição com os dados do card
function openEditModal(id) {
  const delivery = deliveries.find((d) => d.id === id);
  document.getElementById("edit-delivery-id").value = delivery.id;
  document.getElementById("edit-delivery-client").value = delivery.cliente;
  document.getElementById("edit-delivery-status").value = delivery.status;
  document.getElementById("edit-delivery-destination").value = delivery.destino;
  document.getElementById("edit-delivery-modal").style.display = "flex";
}

// Salvar alterações no card
document
  .getElementById("edit-delivery-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const id = document.getElementById("edit-delivery-id").value;
    const cliente = document.getElementById("edit-delivery-client").value;
    const status = document.getElementById("edit-delivery-status").value;
    const destino = document.getElementById("edit-delivery-destination").value;

    const delivery = deliveries.find((d) => d.id === id);
    if (delivery) {
      delivery.cliente = cliente;
      delivery.status = status;
      delivery.destino = destino;
    }

    // Atualizar os cards e fechar o modal
    displayHome();
    document.getElementById("edit-delivery-modal").style.display = "none";
  });

// Excluir card
function deleteCard(id) {
  const index = deliveries.findIndex((d) => d.id === id);
  if (index > -1) {
    deliveries.splice(index, 1);
    displayHome();
  }
}

const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.querySelector(".sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

document.getElementById("mobile-home").addEventListener("click", () => {
  document.getElementById("home-tab").click();
});

document.getElementById("mobile-reports").addEventListener("click", () => {
  document.getElementById("reports-tab").click();
});

document.getElementById("mobile-logout").addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  window.location.href = "../../pages/Login/login.html";
});
