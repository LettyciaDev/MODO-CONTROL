# MODO-CONTROL
-----

# Projeto de Controle de Pedidos

Este é um sistema de gerenciamento de pedidos, desenvolvido para manipular, controlar e analisar dados de vendas. O projeto é composto por um back-end em Java com Spring Boot e um front-end em JavaScript puro, que se comunicam para exibir e manipular os pedidos em uma interface web.

## 🚀 Funcionalidades

O sistema oferece as seguintes funcionalidades principais:

  * **Listagem de Pedidos**: Exibe todos os pedidos em uma lista.
  * **Busca Genérica**: Permite buscar pedidos por um termo genérico, que é pesquisado nos campos `cliente`, `serviço` e `observações`.
  * **Gestão de Pedidos**: Funcionalidades CRUD (Criar, Ler, Atualizar, Deletar) para gerenciar os pedidos individualmente.
  * **Faturamento Mensal**: Exibe um gráfico que mostra o faturamento total por mês, com dados agregados diretamente no back-end para otimizar o desempenho.
  * **Lista de Dívidas**: Filtra e exibe apenas os pedidos que ainda não foram pagos.

## 💻 Tecnologias Utilizadas

### Back-end

  * **Java**: Linguagem de programação principal.
  * **Spring Boot**: Framework para o desenvolvimento rápido do servidor.
  * **Spring Data JPA**: Para a persistência de dados e a comunicação com o banco de dados.
  * **JpaSpecificationExecutor**: Usado para criar queries de busca dinâmicas e genéricas, garantindo flexibilidade e performance.

### Front-end

  * **HTML5**: Estrutura da página.
  * **CSS3**: Estilização da interface.
  * **JavaScript (ES6+)**: Lógica da aplicação, responsável por interagir com a API e manipular o DOM.
  * **Fetch API**: Para realizar as requisições HTTP ao back-end.

---

# 🛠️ Como Executar o Projeto

Siga os passos abaixo para rodar o **Back-end (Spring Boot)** e o **Front-end (HTML/JS/CSS)**.

---

## 🔹 1. Configuração do Back-end

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/LettyciaDev/MODO-CONTROL.git
   cd Modo-Control/backend-service
   ```

2. **Configure o Banco de Dados**:

   * Abra o arquivo:

     ```
     backend-service/src/main/resources/application.properties
     ```
   * Atualize as credenciais e a URL do banco (ex.: PostgreSQL, MySQL ou H2).

3. **Execute a aplicação**:

   * Com **IDE** (IntelliJ, Eclipse, VS Code com plugin Spring Boot): rode a classe
     `BackendServiceApplication.java`.
   * Ou via terminal (na pasta `backend-service`):

     ```bash
     ./mvnw spring-boot:run
     ```
   * O servidor subirá na porta `8080`.

---

## 🔹 2. Configuração do Front-end

1. **Entre na pasta do front-end**:

   ```bash
   cd ../frontend-service
   ```

2. **Abra o front-end no navegador**:

   * Abra o arquivo `index.html` diretamente (clique 2x ou abra com navegador).
   * Ele fará as requisições para `http://localhost:8080` (onde o back-end roda).

---

## 📂 Estrutura do Projeto

```
Modo-Control/
│
├── backend-service/
│   ├── src/main/java/com/example/modocontrol/backend_service/
│   │   ├── model/          # DTOs, entidades, specifications
│   │   ├── repository/     # Interfaces do JPA
│   │   ├── service/        # Regras de negócio
│   │   └── BackendServiceApplication.java  # Classe principal Spring Boot
│   │
│   └── src/main/resources/
│       ├── static/
│       ├── templates/
│       └── application.properties
│
├── frontend-service/
│   ├── index.html
│   ├── login.html
│   ├── insight.html
│   ├── script.js
│   ├── style.css
│   └── img/
│
├── pom.xml
└── README.md
```

---

