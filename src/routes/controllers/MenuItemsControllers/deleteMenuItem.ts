import { Request, Response } from 'express';
import MenuItemsModel, { MenuItems } from '../../../models/MenuItems';

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    if (
      req.currentUser.role === 'manager' ||
      req.currentUser.id === req.query.chefId
    ) {
      const menuItem: MenuItems | null = await MenuItemsModel.findOneAndDelete({
        _id: req.params.menuItemId,
      });

      if (!menuItem) {
        return res.status(400).json({ msg: 'Menu Item not found' });
      }

      res.json({ msg: 'Menu Item Deletion Successfull' });
    } else {
      res.status(401).json({ msg: 'Not authorized' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
