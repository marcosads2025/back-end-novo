# 🐕 Dog API

API para buscar imagens de cachorros e gerenciar favoritos.

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL
- npm ou yarn

## 🚀 Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto com:
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=dog_api
PORT=3000
```

4. Configure o banco de dados PostgreSQL:
```bash
# Crie o banco de dados
createdb dog_api

# Execute o script SQL para criar a tabela
psql -d dog_api -f src/db/create_tables.sql
```

## 🏃‍♂️ Executando o projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

O servidor estará rodando em: `http://localhost:3000`

## 📚 Endpoints da API

### 🏠 Rota Principal
- **GET /** - Documentação dos endpoints disponíveis

### 🐕 Endpoints de Cachorros

#### 1. Cachorro Aleatório
- **GET /dogs/random**
- **Descrição**: Busca uma imagem aleatória de cachorro
- **Exemplo**: `GET http://localhost:3000/dogs/random`

#### 2. Cachorros por Raça
- **GET /dogs/breed/:breed**
- **Descrição**: Busca imagens de cachorros de uma raça específica
- **Parâmetros**: `breed` (string) - nome da raça
- **Exemplo**: `GET http://localhost:3000/dogs/breed/husky`

#### 3. Salvar Favorito
- **POST /dogs/favorite**
- **Descrição**: Salva um cachorro como favorito no banco de dados
- **Body**:
```json
{
  "name": "Buddy",
  "breed": "Golden Retriever", 
  "image_url": "https://images.dog.ceo/breeds/retriever-golden/n02099601_1004.jpg"
}
```

#### 4. Listar Favoritos
- **GET /dogs/favorites**
- **Descrição**: Lista todos os cachorros favoritos salvos
- **Exemplo**: `GET http://localhost:3000/dogs/favorites`

## 🧪 Testando com APIdog

1. Abra o APIdog
2. Configure a URL base: `http://localhost:3000`
3. Teste os endpoints:

### GET /dogs/random
- Método: GET
- URL: `http://localhost:3000/dogs/random`
- Headers: `Content-Type: application/json`

### GET /dogs/breed/husky
- Método: GET
- URL: `http://localhost:3000/dogs/breed/husky`
- Headers: `Content-Type: application/json`

### POST /dogs/favorite
- Método: POST
- URL: `http://localhost:3000/dogs/favorite`
- Headers: `Content-Type: application/json`
- Body (JSON):
```json
{
  "name": "Max",
  "breed": "Husky",
  "image_url": "https://images.dog.ceo/breeds/husky/n02110185_10047.jpg"
}
```

### GET /dogs/favorites
- Método: GET
- URL: `http://localhost:3000/dogs/favorites`
- Headers: `Content-Type: application/json`

## 📊 Estrutura do Banco de Dados

```sql
CREATE TABLE public.favorite_dogs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  breed VARCHAR(100),
  image_url TEXT,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Linguagem tipada
- **PostgreSQL** - Banco de dados
- **Axios** - Cliente HTTP
- **CORS** - Middleware para requisições cross-origin
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📝 Respostas da API

Todas as respostas seguem o padrão:
```json
{
  "success": boolean,
  "data": object | array,
  "message": string (opcional),
  "error": string (em caso de erro)
}
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento com hot reload
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Executa a versão compilada
