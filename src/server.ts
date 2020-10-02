import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './helpers/connectDB';

// import routers below
import healthRouter from './routes/health';

// init app
dotenv.config();
const app: Application = express();

// connect to DB
connectDB(process.env.DB_URI);

app.get('/', (req: Request, res: Response) => {
  res.json({ msg: 'Welcome to the SWE project backend' });
});

// define router paths
app.use('/api/health', healthRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
