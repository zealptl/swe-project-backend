import express, { Request, Response } from 'express';
import { getMenuItems } from './controllers/MenuItemsControllers/getMenuItems';
import { getMenuItem } from './controllers/MenuItemsControllers/getMenuItem';
import { createMenuItem } from './controllers/MenuItemsControllers/createMenuItem';
import { getMenuItemImage } from './controllers/MenuItemsControllers/getMenuItemImage';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
dotenv.config();

// @ts-ignore
const conn = mongoose.createConnection(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// display image controller (wrote it here because I could't figure out how to bring/use gfs variable in a file)
const displayMenuItemImage = (req: Request, res: Response) => {
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
};

const router = express.Router();
router.post('/', upload.single('image'), createMenuItem);
router.get('/', getMenuItems); // get all menu items
router.get('/:menuItemId', getMenuItem); // get particular menu item
router.get('/images/:filename', displayMenuItemImage);
export default router;
