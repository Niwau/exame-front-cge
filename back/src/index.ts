import express from 'express';
import 'dotenv/config';
import { database } from './database';
import { userRouter } from './routes/userRoute';
import { categoryRouter } from './routes/categoryRoute';
import { productRouter } from './routes/productRoute';
import { loginRoute } from './routes/loginRoute';
import { validateAuth } from './middlewares/validateAuth';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(validateAuth)
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/login', loginRoute);

const main = async () => {
  await database.connect();
};
main();

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} 🟢`);
});
