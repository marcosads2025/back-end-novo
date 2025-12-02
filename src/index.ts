// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';
import dogRoutes from './routes/dogRoutes.js'; // ⚠️ garantir extensão .js se estiver compilado
import './config/db.js';

// Configuração para __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do ambiente
dotenv.config();
const PORT = process.env.PORT || 3000; // ✅ Render define automaticamente a porta

// Inicializar app
const app = express();

// Middleware
app.use(cors({
  origin: '*', // ou defina seu domínio do frontend: https://og-api-frontend.onrender.com
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Cães',
      version: '1.0.0',
      description: 'API para gerenciamento de informações sobre cães',
      contact: {
        name: 'Suporte API',
        email: 'suporte@dogapi.com',
      },
    },
    servers: [
      {
        url: process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`, // ✅ Corrigido para Render
        description: 'Servidor de Produção ou Desenvolvimento',
      },
    ],
  },
  apis: ['./routes/*.js'], // ✅ caminho ajustado
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas da API
app.use('/api/dogs', dogRoutes);

// Servir arquivos estáticos do frontend em produção
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '../../dog-api-frontend/build')));
  
  // Rota para todas as outras requisições retornarem o index.html do frontend
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../dog-api-frontend/build', 'index.html'));
  });
} else {
  // Rota padrão para desenvolvimento
  app.get('/', (req, res) => {
    res.send('🐶 Bem-vindo à API de Cães! Acesse /api-docs para ver a documentação.');
  });
}

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📘 Swagger disponível em: ${process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`}/api-docs`);
});
