import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import passport from './configs/passport';
import authRouter from './routers/auth.router';
import clovaRouter from './routers/clova.router';
import userRouter from './routers/user.router';
import ideaRouter from './routers/idea.router';
import scriptRouter from './routers/script.router';
import { dataSource } from './configs/typeorm';
import { exceptionHandler } from './middlewares/exception';

dotenv.config();

declare global {
  namespace Express {
    interface User {
      id: string;
      nickname: string;
      email: string;
    }

    interface Request {
      user?: User;
    }
  }
}

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: 'https://hannip-form.vercel.app',
    credentials: true,
  }),
);
app.use(passport.initialize());

dataSource.initialize();

app.use('/auth', authRouter);
app.use('/clova', clovaRouter);
app.use('/users', userRouter);
app.use('/ideas', ideaRouter);
app.use('/scripts', scriptRouter);

app.use(exceptionHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
