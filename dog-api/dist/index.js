"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}; //esgfdfs
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const db_1 = __importDefault(require("./db"));
const dogRoutes_1 = __importDefault(require("./routes/dogRoutes"));
const swagger_1 = __importDefault(require("./config/swagger"));
const path_1 = __importDefault(require("path"));
// Carregar variáveis de ambiente
dotenv_1.default.config();
// Inicializar app Express
const app = (0, express_1.default)();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Servir arquivos de imagem enviados (project-root/uploads)
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Conectar ao MongoDB
(0, db_1.default)().catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
});
// Documentação Swagger
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// Rotas principais
app.use("/api/dogs", dogRoutes_1.default);
// Rota padrão
app.get("/", (req, res) => {
    res.send("🐕 API de Cachorros - Use /api-docs para acessar a documentação");
});
// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📘 Documentação Swagger: http://localhost:${PORT}/api-docs`);
});
