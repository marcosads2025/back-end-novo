import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Reconstruir __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carregar .env (opção 1: padrão, sem path)
dotenv.config();

// Opção 2: se você realmente precisa apontar para um .env acima de dist,
// descomente a linha abaixo e comente a dotenv.config() acima.
// dotenv.config({ path: path.resolve(__dirname, "../.env") });

const MONGO_URI = process.env.MONGO_URI || "";

export default async function connectDB(): Promise<void> {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI não definida nas variáveis de ambiente (.env ou Render).");
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado ao MongoDB");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    throw err;
  }
}
