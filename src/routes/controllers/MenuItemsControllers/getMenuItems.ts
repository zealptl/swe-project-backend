import { Request, Response } from 'express';
import MenuItemsModel, { MenuItems } from '../../../models/MenuItems';

export const getMenuItems = async (req: Request, res: Response) => {
  const query: any = {};

  if (req.query.chefName) query.chefName = req.query.chefName;
  if (req.query.type) query.type = req.query.type;
  if (req.query.chefID) query.chefID = req.query.chefID;

  const menuItems: MenuItems[] | null = await MenuItemsModel.find(query);

  if (menuItems.length === 0)
    res.status(404).json({ msg: 'Menu items not found' });

  res.json(menuItems);
};
