# App E-commerce Sale
<div align="center">

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" height="50" />
&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" height="50" />
&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original-wordmark.svg" height="50" />
&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original-wordmark.svg" height="50" />
&nbsp;&nbsp;&nbsp;
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original-wordmark.svg" height="50" />

</div>
          
Sistema ERP focado em roupas desenvolvido como projeto fullstack, composto por um backend em Spring Boot e um frontend em TypeScript utilizando Vite.

O objetivo do projeto é simular um sistema de gerenciamento de vendas de produtos, permitindo cadastro de produtos, registro de vendas e visualização de métricas através de um dashboard.

<img width="1366" height="768" alt="Captura de tela 2026-03-08 140341" src="https://github.com/user-attachments/assets/8078891a-cf4d-4139-9b14-7c234aa6513d" />

---
## ⚙️ Backend
O backend foi desenvolvido utilizando **Spring Boot**, seguindo boas práticas de desenvolvimento de APIs REST.

### Tecnologias utilizadas

- **Spring Boot**
- **Spring Security**
- **JWT (JSON Web Token)** para autenticação
- **Spring Data JPA**
- **Swagger / OpenAPI** para documentação da API
- **Banco de dados relacional PostgreSQL**

### Funcionalidades

- Autenticação segura com **JWT**
- Proteção de rotas com **Spring Security**
- Cadastro e gerenciamento de produtos
- Registro de vendas
- Consulta de métricas de vendas
- Cadastro e gerenciamento de clientes e funcionários
- Documentação automática da API com **Swagger**

## Como executar o Backend
O backend da aplicação foi desenvolvido utilizando **Spring Boot**. Para executar o servidor localmente, siga os passos abaixo.

### 1️⃣ Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- **Java JDK 17 ou superior**
- **Maven**
- Uma **IDE** de sua preferência (IntelliJ, VSCode, Eclipse ou STS)
- **PostgreSQL**

Você pode verificar as versões instaladas com:
``java -version``
``mvn -version``

### 2️⃣ Clonar o repositório
git clone ``https://github.com/tiago-sb/app-ecommerce-sale.git``

### 3️⃣ Instalar dependências
Entre na pasta do projeto: ``cd app-ecommerce-sale/backend``. Caso utilize Maven, execute: ``mvn clean install``. Após isto, configure o arquivo de propriedades da aplicação.
```properties
spring.application.name=sale

spring.datasource.url=SEU_DATABASE_URL
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

api.security.token.secret=${JWT_SECRET:123456}

app.cors.allowed-origins=http://localhost:5173
```

### 4️⃣ Executar a aplicação
Coloque o banco de dados PostgreSQL em execução, pois a aplicação utiliza esse banco para armazenar as informações do sistema. Execute o seguinte comando: ``mvn spring-boot:run``. Ou execute a classe principal da aplicação pela sua IDE.

### 5️⃣ Acessar a aplicação
Após iniciar o servidor, a API estará disponível em: ``http://localhost:8080``

### 📄 Documentação da API
A documentação interativa da API está disponível através do Swagger: ``http://localhost:8080/swagger-ui/index.html``. No Swagger é possível visualizar todos os endpoints da aplicação e realizar testes diretamente pelo navegador.

⚠️ Importante: a maioria das rotas da API está protegida por autenticação JWT, portanto é necessário possuir um token de acesso para realizar as requisições. Para obter o token:
1. Realize o cadastro de um usuário utilizando a rota /cadastrar.
2. Após o cadastro, o sistema retornará um token JWT.
3. No Swagger, utilize esse token para autorizar as requisições.
4. Depois de autenticado, será possível testar normalmente os endpoints protegidos da API diretamente pela interface do Swagger.

## 💻 Frontend

O frontend foi desenvolvido utilizando **TypeScript** com **Vite**, focando em uma interface moderna e organizada.

### Tecnologias utilizadas

- **TypeScript**
- **Vite**
- **React**
- **Hooks personalizados**
- **Context API**
- Consumo de API REST

## ▶️ Como executar o Frontend
O frontend da aplicação foi desenvolvido utilizando React com TypeScript e Vite, proporcionando um ambiente de desenvolvimento rápido e moderno.

### 1️⃣ Pré-requisitos
Certifique-se de ter instalado em sua máquina: 
1. Node.js (versão 18 ou superior)
2. npm ou yarn
Você pode verificar as versões instaladas com: ``node -v`` ``npm -v``

### 2️⃣ Instalar as dependências
Execute o comando abaixo para instalar todas as dependências do projeto: ``npm install``

### 3️⃣ Configurar variáveis de ambiente
Crie um arquivo .env na raiz da pasta frontend e defina a URL da API backend: ``VITE_API_URL=http://localhost:8080``

### 4️⃣ Executar a aplicação
Após instalar as dependências, execute: ``npm run dev``

### 5️⃣ Acessar a aplicação
Depois de iniciado, o frontend estará disponível em: ``http://localhost:5173``

⚠️ Certifique-se de que o backend esteja em execução, pois o frontend depende da API para realizar as operações de cadastro, autenticação e gerenciamento de vendas.
