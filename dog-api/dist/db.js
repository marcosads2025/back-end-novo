"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}; ///liliu
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Carrega .env explicitamente da raiz do pacote (dog-api/.env)
dotenv_1.default.config({ path: path_1.default.join(__dirname, '..', '.env') });
const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/dog-api';
// Log controlado do URI (ofusca credenciais) para depuração
(() => {
    try {
        const uri = MONGODB_URI;
        const masked = uri.replace(/:\/\/([^:@]+):([^@]+)@/, '://$1:****@');
        console.log(`[DB] Usando MONGO URI: ${masked}`);
    }
    catch (_a) {
        // ignore
    }
})();
const MAX_RETRIES = 10;
const INITIAL_DELAY_MS = 2000;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const connectDB = async () => {
    let attempt = 0;
    while (attempt < MAX_RETRIES) {
        try {
            await mongoose_1.default.connect(MONGODB_URI);
            console.log('MongoDB conectado com sucesso');
            return;
        }
        catch (error) {
            attempt += 1;
            const delay = INITIAL_DELAY_MS * Math.min(8, attempt); // backoff simples
            console.warn(`Falha ao conectar no MongoDB (tentativa ${attempt}/${MAX_RETRIES}). Nova tentativa em ${delay}ms. Motivo: ${(error === null || error === void 0 ? void 0 : error.message) || error}`);
            await wait(delay);
        }
    }
    console.error('Não foi possível conectar ao MongoDB após múltiplas tentativas. Verifique a variável MONGO_URI.');
};
exports.default = connectDB;
