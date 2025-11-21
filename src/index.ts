import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';
import dogRoutes from './routes/dogRoutes.js'; 
import './config/db.js'; // Conecta ao banco ao iniciar

// Configuração de caminhos para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// --- MIDDLEWARES ---
app.use(cors({ origin: '*' })); 
app.use(express.json()); // ESSENCIAL PARA O POST FUNCIONAR
app.use(express.urlencoded({ extended: true }));

// --- SWAGGER CONFIG ---
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Cães',
      version: '1.0.0',
      description: 'API Dog Documentation',
    },
    servers: [
      {
        url: process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`,
      },
    ],
  },
  apis: [path.join(__dirname, './routes/*.js')], // Caminho absoluto para evitar erro no Render
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- ROTAS ---
app.use('/api/dogs', dogRoutes);

// Rota Raiz
app.get('/', (req, res) => {
  res.json({ status: 'API Online 🐶', docs: '/api-docs' });
});

// --- START ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
