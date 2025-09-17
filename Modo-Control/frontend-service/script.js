// VARIAVEIS - ADICIONAR PEDIDO
const addButton = document.querySelector('.add');
const addBox = document.querySelector('.add-box');
const close = document.querySelector('.close');
const forms = document.querySelector('form');
const txtDate = document.querySelector('#date');
const txtClient = document.querySelector("#client");
const txtService = document.querySelector('#service');
const txtQuantity = document.querySelector('#quantity');
const txtValue = document.querySelector('#value');
const selectPaid = document.querySelector('#paid');
const txtObs = document.querySelector('#obs');
const checkWarning = document.querySelector('.warning');


// FUNÇÃO PARA ABRIR A TELA DE CRIAR PEDIDO
addButton.addEventListener('click', function() {
    addBox.style.display = "block";
});

// FUNÇÃO PARA FECHAR A TELA DE CRIAR PEDIDO
close.addEventListener('click', function() {
     addBox.style.display = "none";
     checkWarning.style.display = 'none';
});

// MÉTODO PARA ENVIAR UMA REQUISIÇÃO PARA O BACK-END
function addOrder() {
    // CRIA OBJETO E CONVERTE OS VALORES DE ENTRADA
    const orderData = {
      client: txtClient.value,
      service: txtService.value,
      quantity: Number(txtQuantity.value),
      value: parseFloat(txtValue.value),
      isPaid: selectPaid.value === 'true', 
      obs: txtObs.value
}

    // VALIDA O PREENCHIMENTO OBRIGATÓRIO
    if(!checkInfo(orderData)) {
        return;
    }

    const dateValue = txtDate.value;
    orderData.date = dateValue ? convertToISO(dateValue) : new Date().toISOString();

   fetch("http://localhost:8080/order/addOrder",
        {
            headers: {
                'Accept': 'application.json',
                'Content-Type': 'application/json'
            },
            method:"POST",
            body: JSON.stringify(orderData)
        })
        .then(function (res) {
            console.log(res) 
            addBox.style.display = 'none';
            alert("Pedido adicionado com sucesso!"); 
        })
        .catch(function (res) { 
            alert("Ocorreu um erro ao adicionar o pedido. Tente novamente.");
            console.log(res)
        }) 

};

// CHAMANDO A FUNÇÃO ADDORDER AO CLICAR NO BOTÃO
forms.addEventListener('submit', function(event) {
    event.preventDefault();

    addOrder();
    clear();
});

// METÓDO PARA LIMPAR OS PREENCHIMENTOS
function clear(){
    txtClient.value = "";
    txtService.value = "";
    txtQuantity.value = "";
    txtValue.value = "";
    selectPaid.value = "";
    txtObs.value = "";
}


// MÉTODO PARA VERIFICAR PREENCHIMENTO DE INFORMAÇÕES ESSENCIAIS
function checkInfo(data){
    // Verifica se os campos obrigatórios estão vazios
    if(!data.client || !data.service  || !data.quantity || !data.value) {
        checkWarning.style.display = 'block';
        return false; // Retorna falso, indicando que a validação falhou
    }

    checkWarning.style.display = 'none'; // Esconde o aviso se a validação passar
    return true; // Retorna verdadeiro, indicando que a validação foi bem-sucedida
}

// MÉTODO PARA FORMATAR DATA PARA ISO
function convertToISO(dateString){
    if(!dateString){
        return null;
    }

    // DIVIDE A STRING NOS SEPARADORES "/"
    const parts = dateString.split('/');

    // A ORDEM CORRETA PARA O JAVASCRIPT DATE É (ANO, MÊS-1, DIA)
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    // CRIA UM OBJETO DATE E FORMATA PARA ISO
    const date = new Date(year, month, day);

    // RETORNA A DATA NO FORMATO ISO 8601
    return date.toISOString();
}

// FUNÇÃO DE ACIONAR EVENTOS
function attachEventListeners() {
    const updateBtns = document.querySelectorAll('.update-btn');
    const removeBtns = document.querySelectorAll('.remove-btn');
    const seeMoreBtns = document.querySelectorAll('.see-more-btn');

    // Listener para o botão de 'Ver Mais'
    seeMoreBtns.forEach(button => {
        button.addEventListener('click', function(event) {
            const orderData = JSON.parse(event.target.getAttribute('data-order'));
            showSeeMore(orderData); // Supondo que você tem uma função que recebe os dados e exibe o modal
        });
    });

    // Listener para o botão de 'Atualizar'
    updateBtns.forEach(button => {
        button.addEventListener('click', function(event) {
            const orderData = JSON.parse(event.currentTarget.getAttribute('data-order'));
            showUpdateBox(orderData);
        });
    });

    // Listener para o botão de 'Remover'
    removeBtns.forEach(button => {
        button.addEventListener('click', function(event) {
            const orderId = event.currentTarget.getAttribute('data-order-id');
            // Chama a função para remover o pedido, que você precisa criar
            deleteOrder(orderId);
        });
    });
}

function closeBox(buttonSelector, containerSelector) {
    // 1. O container deve ser selecionado *dentro* da função
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error(`Container not found for selector: ${containerSelector}`);
        return;
    }

    // 2. Anexa o listener de evento para o botão de fechar
    const closeBtn = container.querySelector(buttonSelector);
    if (!closeBtn) {
        console.error(`Close button not found for selector: ${buttonSelector}`);
        return;
    }

    closeBtn.addEventListener('click', () => {
        container.style.display = 'none';
        // A linha abaixo limpa os campos, o que é útil, mas pode não ser o comportamento desejado.
        // Se você precisar manter os dados para reutilização, remova esta linha.
        // container.innerHTML = '';
    });
}

// Função para renderizar os pedidos na tela
function renderOrders(orders, containerSelector) {
    const container = document.querySelector(containerSelector);
    let htmlContent = '';

    if (orders.length === 0) {
        // Mensagem padrão caso a lista esteja vazia
        htmlContent = `<p>Nenhum pedido encontrado.</p>`;
    } else {
        orders.forEach(order => {
            // A data que vem do backend já está no formato ISO,
            // então você pode formatá-la aqui para uma exibição mais amigável
            const formattedDate = new Date(order.date).toLocaleDateString('pt-BR');

            htmlContent += ` 
                <div class="order-content">
                    <div class="manipulating-order">
                        <button class="update-btn" data-order='${JSON.stringify(order)}'><img src="img/edit.png" alt="editar"></button>
                        <button class="remove-btn" data-order-id="${order.id}"><img src="img/trash.png" alt="remover"></button>
                    </div>
                    <div class="order" data-id="${order.id}">
                        <p>CLIENTE: ${order.client}</p>
                        <p>DATA: ${formattedDate}</p>
                        <p>SERVIÇO: ${order.service}</p>
                        <button class="see-more-btn" data-order='${JSON.stringify(order)}'>Ver mais</button>
                    </div>
                </div>
            `;
        });
    }

    container.innerHTML = htmlContent;
    // Anexa os listeners de evento APÓS a renderização
    attachEventListeners();
}

// FUNÇÃO "VEJA MAIS"
function showSeeMore(orderData){
    const seeMoreContainer = document.querySelector('.see-more-container');

    // Preenche o modal com os dados do pedido
    seeMoreContainer.innerHTML = `
        <div class="see-more-order">
            <span class="close-btn">X</span>
            <p>ID: ${orderData.id}</p>
            <p>CLIENTE: ${orderData.client}</p>
            <p>DATA: ${orderData.date}</p>
            <p>SERVIÇO: ${orderData.service}</p>
            <p>QUANTIDADE: ${orderData.quantity}</p>
            <p>VALOR: ${orderData.value}</p>
            <p>PAGO: ${orderData.isPaid ? 'Sim' : 'Não'}</p>
            <p>OBS: ${orderData.obs}</p>
            <p>VALOR TOTAL: ${orderData.totalValue}</p>
        </div>
    `;

    // Torna o modal visível
    seeMoreContainer.style.display = 'block';

    // Anexa o listener de fechar.
    // O closeBox precisa ser chamado aqui, depois que o botão `.close-btn` foi adicionado ao HTML.
    closeBox('.close-btn', '.see-more-container');
}

const searchInput = document.querySelector('.search-input');

// Adiciona um "listener" para o evento 'input'
if (searchInput) {
  searchInput.addEventListener('input', getFindOrdersByFilter);
}

// MÉTODO PARA MOSTRAR PESQUISA DO FILTRO
async function getFindOrdersByFilter(){
    // 1. Pega o valor do campo de busca.
    const searchInput = document.querySelector('.search-input'); 
    const searchTerm = searchInput.value.trim();

    // 2. Se o termo estiver vazio, não faz a requisição.
    if (searchTerm === '') {
        console.warn('O campo de busca está vazio.');
        return;
    }
    
    // 3. Constrói a URL com o parâmetro de busca.
    const url = `http://localhost:8080/order/search?q=${encodeURIComponent(searchTerm)}`;

    try {
        // 4. Faz a requisição GET
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        // 5. Converte a resposta para JSON e renderiza os resultados
        const orders = await response.json();
        renderOrders(orders, '.showing-orders');
        
    } catch (error) {
        console.error('Ocorreu um erro na busca:', error);
    }
}

// EXIBIR TODOS OS PEDIDOS
async function getOrders() {
    try {
        const response = await fetch('http://localhost:8080/order/all', {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const orders = await response.json();

        renderOrders(orders, '.showing-orders');

    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

// FUNÇÃO PARA ATUALIZAR
function showUpdateBox(orderData) {
    const updateBox = document.querySelector('.update-box');
    const txtClient = updateBox.querySelector('#client');
    const txtService = updateBox.querySelector('#service');
    const txtQuantity = updateBox.querySelector('#quantity');
    const txtValue = updateBox.querySelector('#value');
    const selectPaid = updateBox.querySelector('#paid');
    const txtObs = updateBox.querySelector('#obs');
    const txtDate = updateBox.querySelector('#date');

    updateBox.style.display = 'block';

    // Preenche os campos do formulário com os dados recebidos
    txtClient.value = orderData.client;
    txtService.value = orderData.service;
    txtQuantity.value = orderData.quantity;
    txtValue.value = orderData.value;
    selectPaid.value = orderData.isPaid ? 'true' : 'false';
    txtObs.value = orderData.obs;
    txtDate.value = orderData.date;

    // Salva o ID do pedido no próprio container para ser usado na atualização
    updateBox.setAttribute('data-order-id', orderData.id);

    closeBox('.close-btn', '.update-box');
}

const updateBox = document.querySelector('.update-box');

if (updateBox) { // Boa prática: Verifica se o elemento existe antes de adicionar o listener
    updateBox.addEventListener('submit', async (event) => {
        event.preventDefault();

        const orderId = updateBox.getAttribute('data-order-id');

        const txtClient = updateBox.querySelector('#client');
        const txtService = updateBox.querySelector('#service');
        const txtQuantity = updateBox.querySelector('#quantity');
        const txtValue = updateBox.querySelector('#value');
        const selectPaid = updateBox.querySelector('#paid');
        const txtObs = updateBox.querySelector('#obs');
        const txtDate = updateBox.querySelector('#date');
        
        // Converte a data para o formato correto, se necessário
        const dateValue = txtDate.value;
        const formattedDate  = dateValue ? dateValue : new Date().toISOString(); 

        const orderToUpdateData = {
            client: txtClient.value,
            service: txtService.value,
            quantity: Number(txtQuantity.value),
            value: parseFloat(txtValue.value),
            isPaid: selectPaid.value === 'true',
            obs: txtObs.value,
            date: formattedDate // Inclui a data no objeto
        };

        console.log(JSON.stringify(orderToUpdateData))
        try {
            const response = await fetch(`http://localhost:8080/order/update/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderToUpdateData)
            });

            if (!response.ok) {
                throw new Error(`Erro na atualização: ${response.status}`);
            }

            console.log('Pedido atualizado com sucesso!');
            updateBox.style.display = 'none';
            getOrders();

        } catch (error) {
            console.error('Falha ao atualizar o pedido:', error);
            alert('Não foi possível atualizar o pedido.');
        }
    });
}

// FUNÇÃO PARA DELETAR O PEDIDO
async function deleteOrder(orderId) {
    // Adiciona uma confirmação para evitar exclusões acidentais
    if (!confirm('Tem certeza que deseja remover este pedido?')) {
        return; // Sai da função se o usuário cancelar
    }

    try {
        const response = await fetch(`http://localhost:8080/order/delete/${orderId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Erro na remoção: ${response.status}`);
        }

        console.log('Pedido removido com sucesso!');
        
        // Recarrega a lista para remover o item da interface
        getOrders(); 

    } catch (error) {
        console.error('Falha ao remover o pedido:', error);
        alert('Não foi possível remover o pedido. Tente novamente.');
    }
}

// EXIBIR REDIMENTO MENSAL
async function getYield(){

    try{
        const response = await fetch('http://localhost:8080/order/monthly-billing', {
            method: 'GET'
        });

        if(!response.ok){
            // Template literal para a mensagem de erro correta
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const yields = await response.json();
        
        
        const selectMonth = document.querySelector('#select-month');
        const currentYieldElement = document.querySelector('.current-yield');

        // Adiciona um listener para a mudança de valor no select
        selectMonth.addEventListener('change', () => {
            const selectedMonth = parseInt(selectMonth.value);
            let totalValue = 0;

            // Acessa o valor do rendimento usando a chave do mês
            // Se o mês existir, pega o valor. Senão, o valor continua 0.
            if (yields[selectedMonth]) {
                totalValue = yields[selectedMonth];
            }

            // Formata o HTML com o valor do rendimento
            const htmlContent = `
                <h3>Rendimento Mensal</h3>
                <p>R$ ${totalValue.toFixed(2)}</p>
            `;

            // Insere o HTML no elemento
            currentYieldElement.innerHTML = htmlContent;
        });
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

async function getGraphic() {
    try {
        const response = await fetch('http://localhost:8080/order/monthly-billing', {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const yields = await response.json();
        console.log("Dados recebidos:", yields);

        // Cria um objeto com todos os meses e valores iniciais de 0
        const allMonths = {
            '1': 0, '2': 0, '3': 0, '4': 0,
            '5': 0, '6': 0, '7': 0, '8': 0,
            '9': 0, '10': 0, '11': 0, '12': 0
        };

        // Combina os dados recebidos com o objeto de todos os meses,
        // sobrescrevendo os valores quando existirem.
        const combinedData = { ...allMonths, ...yields };

        // Prepara os rótulos (meses) e os valores a partir do objeto combinado
        const labels = Object.keys(combinedData).map(m => getMonthName(m));
        const values = Object.values(combinedData);

        // Desenha o gráfico
        const ctx = document.getElementById('graphic').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Faturamento (R$)',
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

// Função auxiliar: converte número do mês para nome em PT-BR
function getMonthName(monthNumber) {
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril",
        "Maio", "Junho", "Julho", "Agosto",
        "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return meses[monthNumber - 1] || monthNumber;
}
// EXIBIR TODOS PAGAMENTOS PENDENTES
async function getDebts(){

    try{
        const response = await fetch('http://localhost:8080/order/debts', {
            method: 'GET'
        });

        if(!response.ok){
            // Template literal para a mensagem de erro correta
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const orders = await response.json();
        
        renderOrders(orders, '.debts'); 

    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

// EXIBIR TODOS OS MÉTODOS AO CARREGAR A PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    getOrders();
    getYield();
    getDebts();
    getGraphic();
});

