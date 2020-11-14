import express from 'express';
import { getMenuItems } from './controllers/MenuItemsControllers/getMenuItems';
import { getMenuItem } from './controllers/MenuItemsControllers/getMenuItem';

const router = express.Router();
router.get('/', getMenuItems); // get all menu items
router.get('/:menuItemId', getMenuItem); // get particular menu item

export default router;