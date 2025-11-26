import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import connectDB from "./db.js";
import dogRoutes from "./routes/dogRoutes.js";
import swaggerSpec from "./config/swagger.js";
import path from "path";
import { fileURLToPath } from "url";

// Corrigir __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar app Express
const app = express();
const PORT = process.env.PORT || "3000"; // Render exige string

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos de imagem enviados
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Conectar ao MongoDB
connectDB().catch((err) => {
  console.error("Erro ao conectar ao MongoDB:", err);
});

// Documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas principais
app.use("/api/dogs", dogRoutes);

// Rota padrão
app.get("/", (req: Request, res: Response) => {
  res.send("🐕 API de Cachorros - Use /api-docs para acessar a documentação");
});

// Inicialização do servidor
app.listen(parseInt(PORT), () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📘 Documentação Swagger: http://localhost:${PORT}/api-docs`);
});
