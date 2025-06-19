# Task Manager API

## Descrição do Desafio

Este projeto é uma API de gerenciamento de tarefas construída com NestJS, seguindo princípios de Arquitetura Limpa para separar as preocupações de domínio, aplicação e infraestrutura. A API permite criar, listar, completar e deletar tarefas, com um sistema de dependências entre elas.

Uma tarefa só pode ser concluída se todas as suas dependências diretas já estiverem concluídas. Da mesma forma, uma tarefa não pode ser excluída se outras tarefas dependerem dela.

## Stack Tecnológica

- **Framework:** [NestJS](https://nestjs.com/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
- **Containerização:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **Runtime e Bundler:** [Bun](https://bun.sh/)

## Pré-requisitos

Antes de começar, certifique-se de que você tem os seguintes softwares instalados em sua máquina:

- [Bun](https://bun.sh/docs/installation) (v1.0 ou superior)
- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)

## Rodando o Projeto Localmente

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd task-manager
    ```

2.  **Crie o arquivo de ambiente:**
    Copie o arquivo `.env.example` para um novo arquivo chamado `.env`.
    ```bash
    cp .env.example .env
    ```
    O arquivo `.env` já vem pré-configurado para se conectar ao container Docker do PostgreSQL.

3.  **Instale as dependências:**
    Use o Bun para instalar os pacotes necessários.
    ```bash
    bun install
    ```

4.  **Suba os containers com Docker Compose:**
    Este comando irá construir a imagem da aplicação, iniciar o container do NestJS e um container com o banco de dados PostgreSQL.
    ```bash
    docker-compose up --build
    ```

5.  **Rode as migrações do banco de dados:**
    Com os containers em execução, abra um novo terminal e rode o comando para aplicar o schema no banco de dados.
    ```bash
    bun run db:migrate
    ```

A API estará disponível em `http://localhost:3000`.

## Endpoints da API

Aqui estão os endpoints disponíveis na API, com exemplos de como usá-los com `cURL`.

---

### 1. Criar uma nova tarefa

Cria uma nova tarefa. O campo `dependencies` é opcional e espera um array de UUIDs de tarefas já existentes.

- **URL:** `/tasks`
- **Método:** `POST`
- **Headers:** `Content-Type: application/json`

**Exemplo de Request (sem dependências):**

```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{
  "name": "Configurar o banco de dados"
}'
```

**Exemplo de Request (com dependências):**

```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{
  "name": "Desenvolver a camada de serviço",
  "dependencies": ["a1b2c3d4-e5f6-7890-1234-567890abcdef"]
}'
```

**Response (201 Created):**
O corpo da resposta estará vazio.

---

### 2. Listar todas as tarefas

Retorna uma lista de todas as tarefas cadastradas.

- **URL:** `/tasks`
- **Método:** `GET`

**Exemplo de Request:**

```bash
curl http://localhost:3000/tasks
```

**Exemplo de Response (200 OK):**

```json
[
  {
    "id": "c4e1f2a3-b5d6-c7e8-f9a0-b1c2d3e4f5a6",
    "name": "Configurar o banco de dados",
    "status": "concluida",
    "dependencies": [],
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T10:05:00.000Z"
  },
  {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "name": "Desenvolver a camada de serviço",
    "status": "pendente",
    "dependencies": ["c4e1f2a3-b5d6-c7e8-f9a0-b1c2d3e4f5a6"],
    "createdAt": "2023-10-27T11:00:00.000Z",
    "updatedAt": "2023-10-27T11:00:00.000Z"
  }
]
```

---

### 3. Marcar uma tarefa como concluída

Altera o status de uma tarefa para `concluida`.

- **URL:** `/tasks/:id/complete`
- **Método:** `PATCH`

**Condição:** A API retornará um erro `422 Unprocessable Entity` se qualquer uma das dependências da tarefa não estiver com o status `concluida`.

**Exemplo de Request:**

```bash
curl -X PATCH http://localhost:3000/tasks/a1b2c3d4-e5f6-7890-1234-567890abcdef/complete
```

**Response (204 No Content):**
O corpo da resposta estará vazio em caso de sucesso.

---

### 4. Excluir uma tarefa

Remove uma tarefa do sistema.

- **URL:** `/tasks/:id`
- **Método:** `DELETE`

**Condição:** A API retornará um erro `409 Conflict` se a tarefa a ser excluída for uma dependência para qualquer outra tarefa.

**Exemplo de Request:**

```bash
curl -X DELETE http://localhost:3000/tasks/a1b2c3d4-e5f6-7890-1234-567890abcdef
```

**Response (204 No Content):**
O corpo da resposta estará vazio em caso de sucesso.
