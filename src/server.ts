import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './helpers/connectDB';
const bodyParser = require('body-parser');
var cors = require('cors')

// import routers below
import healthRouter from './routes/health';
import customerRouter from './routes/customer';
import employeeRouter from './routes/employee';
import managerRouter from './routes/manager';
import discussionRouter from './routes/discussion';
import menuItemsRouter from './routes/menuItems';
import orderRouter from './routes/order';
import reviewRouter from './routes/review';
import authRouter from './routes/auth';

// init app
dotenv.config();
const app: Application = express();
var jsonParser = bodyParser.json();
app.use(bodyParser.json());
app.use(cors())

// connect to DB
connectDB(process.env.DB_URI);

app.get('/', (req: Request, res: Response) => {
  res.json({ msg: 'Welcome to the SWE project backend' });
});

// define router paths
app.use('/api/health', healthRouter);
app.use('/api/customers', jsonParser, customerRouter);
app.use('/api/employees', jsonParser, employeeRouter);
app.use('/api/manager', jsonParser, managerRouter);
app.use('/api/discussions', jsonParser, discussionRouter);
app.use('/api/menuItems', jsonParser, menuItemsRouter);
app.use('/api/orders', jsonParser, orderRouter);
app.use('/api/reviews', jsonParser, reviewRouter);
app.use('/api/auth', jsonParser, authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
