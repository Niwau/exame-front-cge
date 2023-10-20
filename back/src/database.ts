import mongoose from "mongoose";
import { DATABASE_CONNECTION } from "./constants";

export const database = {
  connect: async () => {
    try {
      await mongoose.connect(DATABASE_CONNECTION)
      console.log('Banco de dados conectado 🟢')
    } catch (error) {
      console.log('Erro ao conectar o banco de dados 🔴');
    }
  }
}