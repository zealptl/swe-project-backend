import { Request, Response } from 'express';
import MenuItemsModel, { MenuItems } from '../../../models/MenuItems';

export const getMenuItem = async (req: Request, res: Response) => {
    const menuItems: MenuItems[] | null = await MenuItemsModel.findById(req.params.menuItemId);
  
    if (!menuItems) res.status(404).json({ msg: 'Menu items not found' });
  
    res.json(menuItems);
  };
  