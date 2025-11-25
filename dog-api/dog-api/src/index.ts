import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import dogRoutes from "./routes/dogs";
import { setupSwagger } from "./config/swagger";

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite requisições de qualquer origem (útil para APIdog)
app.use(express.json());

/**
 * @swagger
 * /:
 *   get:
 *     summary: Informações da API
 *     description: Retorna informações sobre a API e endpoints disponíveis
 *     tags: [Info]
 *     responses:
 *       200:
 *         description: Informações da API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "🐕 Dog API - Endpoints disponíveis:"
 *                 endpoints:
 *                   type: array
 *                   items:
 *                     type: string
 *                 examples:
 *                   type: object
 *                   properties:
 *                     random:
 *                       type: string
 *                     breed:
 *                       type: string
 *                     save_favorite:
 *                       type: string
 *                     list_favorites:
 *                       type: string
 */
// Rota principal
app.get("/", (req, res) => {
  res.json({ 
    message: "🐕 Dog API - Endpoints disponíveis:", 
    endpoints: [
      "GET /dogs/random - Busca um cachorro aleatório",
      "GET /dogs/breed/:breed - Busca cachorros de uma raça específica", 
      "POST /dogs/favorite - Salva um cachorro como favorito",
      "GET /dogs/favorites - Lista todos os cachorros favoritos"
    ],
    examples: {
      random: "GET http://localhost:3000/dogs/random",
      breed: "GET http://localhost:3000/dogs/breed/husky",
      save_favorite: "POST http://localhost:3000/dogs/favorite",
      list_favorites: "GET http://localhost:3000/dogs/favorites"
    },
    swagger_docs: "http://localhost:3000/api-docs"
  });
});

// Configuração do Swagger
setupSwagger(app);

// Rotas da API de cachorros
app.use("/dogs", dogRoutes);

// Middleware de tratamento de erros
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// Middleware para rotas não encontradas
app.use("*", (req, res) => {
  res.status(404).json({ error: "Endpoint não encontrado" });
});

app.listen(PORT, () => {
  console.log(`🐕 Servidor Dog API rodando em http://localhost:${PORT}`);
  console.log(`📚 Documentação dos endpoints disponível em http://localhost:${PORT}`);
  console.log(`🔧 Swagger UI disponível em http://localhost:${PORT}/api-docs`);
  console.log(`📋 Swagger JSON disponível em http://localhost:${PORT}/api-docs.json`);
});
