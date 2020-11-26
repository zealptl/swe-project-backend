import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './helpers/connectDB';
import mongoose from 'mongoose';
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

// import routers below
import healthRouter from './routes/health';
import customerRouter from './routes/customer';
import employeeRouter from './routes/employee';
import managerRouter from './routes/manager';
import discussionRouter from './routes/discussion';
import menuItemsRouter from './routes/menuItems';
import reviewRouter from './routes/review';
import authRouter from './routes/auth';

// init app
dotenv.config();
const app: Application = express();
const jsonParser = bodyParser.json();
app.use(bodyParser.json());

// connect to DB
connectDB(process.env.DB_URI);

// @ts-ignore
const conn = mongoose.createConnection(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// init gfs
let gfs: any;
conn.once('open', () => {
  // init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// create storage engine
const storage = new GridFsStorage({
  url: process.env.DB_URI,
  file: (req: any, file: any) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err: any, buf: any) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

// @route POST api/upload
// @desc Uploads file to DB
app.post('/api/upload', upload.single('file'), (req: any, res: any) => {
  res.json({ file: req.file });
});

// @route GET /files
// @desc Display all files in JSON
app.get('/api/files', (req, res) => {
  gfs.files.find().toArray((err: any, files: any) => {
    // check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        msg: 'No files exist',
      });
    }

    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc Display signle file in JSON
app.get('/api/files/:filename', (req, res) => {
  gfs.files.findOne(
    { filename: req.params.filename },
    (err: any, file: any) => {
      if (!file) {
        return res.status(404).json({ msg: 'No file found' });
      }

      res.json({ file });
    }
  );
});

// @route GET /image/:filename
// @desc Display image
app.get('/api/image/:filename', (req, res) => {
  gfs.files.findOne(
    { filename: req.params.filename },
    (err: any, file: any) => {
      if (!file) {
        return res.status(404).json({ msg: 'No file found' });
      }

      // check if image
      if (file.contentType === 'image/jpeg' || file.contentype === 'img/png') {
        // Read output to browser
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
      } else {
        res.status(404).json({ msg: 'Not an image' });
      }
    }
  );
});

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
app.use('/api/reviews', jsonParser, reviewRouter);
app.use('/api/auth', jsonParser, authRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
