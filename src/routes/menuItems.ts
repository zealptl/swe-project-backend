import express from 'express';
import { getMenuItems } from './controllers/MenuItemsControllers/getMenuItems';
import { getMenuItem } from './controllers/MenuItemsControllers/getMenuItem';
import { deleteMenuItem } from './controllers/MenuItemsControllers/deleteMenuItem';
import { isUserAllowedMiddleware } from './middlewares/isUserAllowed';
import { isUserSignedInMiddleware } from './middlewares/isUserSignedIn';

const router = express.Router();
router.get('/', getMenuItems); // get all menu items
router.get('/:menuItemId', getMenuItem); // get particular menu item
router.delete(
  '/:menuItem',
  isUserSignedInMiddleware,
  isUserAllowedMiddleware(['manager', 'chef']),
  deleteMenuItem
);
export default router;
