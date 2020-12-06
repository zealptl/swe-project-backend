import { Request, Response } from 'express';
import MenuItemsModel, { MenuItems } from '../../../models/MenuItems';

export const getMenuItems = async (req: Request, res: Response) => {
  const menuItems: MenuItems[] | null = await MenuItemsModel.find({});

  if (!menuItems) res.status(404).json({ msg: 'Menu items not found' });

  res.json(menuItems);
};