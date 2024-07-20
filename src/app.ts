import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';

import authRouter from './routers/auth';
import { dataSource } from './configs/typeorm';

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
dataSource.initialize();

app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
