import mongoose from "mongoose";
import dotenv from "dotenv";

// Carrega variáveis locais quando rodando em dev.
// Na Render, use o painel de variáveis de ambiente.
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

export default async function connectDB(): Promise<void> {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI não definida nas variáveis de ambiente.");
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado ao MongoDB");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    throw err;
  }
}
