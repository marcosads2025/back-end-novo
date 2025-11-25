import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Carrega .env explicitamente da raiz do pacote (dog-api/.env)
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/dog-api';

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

export default connectDB;