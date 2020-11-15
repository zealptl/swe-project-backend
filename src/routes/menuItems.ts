import express from 'express';
import { getMenuItems } from './controllers/MenuItemsControllers/getMenuItems';
import { getMenuItem } from './controllers/MenuItemsControllers/getMenuItem';
import { createMenuItem } from './controllers/MenuItemsControllers/createMenuItem';
import { storage } from '../server';
const multer = require('multer');

const upload = multer({ storage });

const router = express.Router();
router.post('/', upload.single('image'), createMenuItem);
router.get('/', getMenuItems); // get all menu items
router.get('/:menuItemId', getMenuItem); // get particular menu item

export default router;
