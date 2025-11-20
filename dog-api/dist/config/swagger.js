"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const serverUrl = process.env.SWAGGER_SERVER_URL || `http://localhost:${PORT}`;
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Cachorros',
            version: '1.0.0',
            description: 'API para gerenciamento de informações sobre cachorros',
        },
        servers: [
            {
                url: serverUrl,
                description: 'Servidor',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
