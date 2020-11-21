import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './helpers/connectDB';
import mongoose from 'mongoose';
import crypto from 'crypto';
var bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

// import routers below
import healthRouter from './routes/health';
import customerRouter from './routes/customer';
import employeeRouter from './routes/employee';
import managerRouter from './routes/manager';
import discussionRouter from './routes/discussion';
import menuItemRouter from './routes/menuItems';
import reviewRouter from './routes/review';
import authRouter from './routes/auth';
import menuItemsRouter from './routes/menuItems';

// init app
dotenv.config();
const app: Application = express();
var jsonParser = bodyParser.json();

// connect to DB
connectDB(process.env.DB_URI);

app.get('/', (req: Request, res: Response) => {
  res.json({ msg: 'Welcome to the SWE project backend' });
});

// Storing images in DB
// @ts-ignore
const conn = mongoose.createConnection(process.env.DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

export let gfs: any;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

export const storage = new GridFsStorage({
  url: process.env.DB_URI,
  file: (req: any, file: any) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});
export const upload = multer({ storage });

// define router paths
app.use('/api/health', healthRouter);
app.use('/api/customers', jsonParser, customerRouter);
app.use('/api/employees', jsonParser, employeeRouter);
app.use('/api/manager', jsonParser, managerRouter);
app.use('/api/discussions', jsonParser, discussionRouter);
app.use('/api/menuItems', jsonParser, menuItemRouter);
app.use('/api/reviews', jsonParser, reviewRouter);
app.use('/api/auth', jsonParser, authRouter);
app.use('/api/menu-items', jsonParser, menuItemsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
