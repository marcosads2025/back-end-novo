<<<<<<< HEAD
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Carrega .env explicitamente da raiz do pacote (dog-api/.env)
dotenv.config({ path: path.join(__dirname, '..', '.env') });
=======
import mongoose from "mongoose";
import dotenv from "dotenv";

// Carrega variáveis locais quando rodando em dev.
// Na Render, use o painel de variáveis de ambiente.
dotenv.config();
>>>>>>> a36e4c952b0d6396d9615345715500cf70460595

const MONGO_URI = process.env.MONGO_URI || "";

<<<<<<< HEAD
// Log controlado do URI (ofusca credenciais) para depuração
(() => {
  try {
    const uri = MONGODB_URI;
    const masked = uri.replace(/:\/\/([^:@]+):([^@]+)@/, '://$1:****@');
    console.log(`[DB] Usando MONGO URI: ${masked}`);
  } catch {
    // ignore
  }
})();

const MAX_RETRIES = 10;
const INITIAL_DELAY_MS = 2000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const connectDB = async (): Promise<void> => {
  let attempt = 0;
  while (attempt < MAX_RETRIES) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('MongoDB conectado com sucesso');
      return;
    } catch (error: any) {
      attempt += 1;
      const delay = INITIAL_DELAY_MS * Math.min(8, attempt); // backoff simples
      console.warn(`Falha ao conectar no MongoDB (tentativa ${attempt}/${MAX_RETRIES}). Nova tentativa em ${delay}ms. Motivo: ${error?.message || error}`);
      await wait(delay);
    }
  }
  console.error('Não foi possível conectar ao MongoDB após múltiplas tentativas. Verifique a variável MONGO_URI.');
};
=======
export default async function connectDB(): Promise<void> {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI não definida nas variáveis de ambiente.");
  }
>>>>>>> a36e4c952b0d6396d9615345715500cf70460595

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado ao MongoDB");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    throw err;
  }
}
