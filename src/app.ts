import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';

import passport from './configs/passport';
import authRouter from './routers/auth.router';
import { dataSource } from './configs/typeorm';
import { exceptionHandler } from './middlewares/exception';

dotenv.config();

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

app.use(exceptionHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
