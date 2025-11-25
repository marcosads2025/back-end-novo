import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

export async function connectDB() {
  try {
    if (!mongoURI) {
      throw new Error("❌ String de conexão MONGO_URI não encontrada no .env");
    }

    await mongoose.connect(mongoURI);
    console.log("✅ Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error.message);
  }
}
