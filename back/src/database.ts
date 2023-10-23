import mongoose from "mongoose";

export const database = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.DATABASE_CONNECTION!)
      console.log('Banco de dados conectado 🟢')
    } catch (error) {
      console.log('Erro ao conectar o banco de dados 🔴');
    }
  }
}