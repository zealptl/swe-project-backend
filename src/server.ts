import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './helpers/connectDB';

dotenv.config();
const app: Application = express();

console.log(process.env.DB_URI);

connectDB(process.env.DB_URI);

app.get('/', (req: Request, res: Response) => {
  res.json({ msg: 'Welcome to the SWE project backend' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
