import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';

import passport from './configs/passport';
import authRouter from './routers/auth.router';
import clovaRouter from './routers/clova.router';
import userRouter from './routers/user.router';
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
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
dataSource.initialize();

app.use('/auth', authRouter);
app.use('/clova', clovaRouter);
app.use('/users', userRouter);

app.use(exceptionHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
