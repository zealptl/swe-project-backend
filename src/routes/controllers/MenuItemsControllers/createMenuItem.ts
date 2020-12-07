import { Request, Response } from 'express';
import MenuItemsModel, { MenuItems } from '../../../models/MenuItems';

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    let menuItem: MenuItems | null = await MenuItemsModel.findOne({
      title: req.body.title,
    });

    const ingredients = req.body.ingredients.split(', ');
    const dietaryRestrictions = req.body.dietaryRestrictions.split(', ');

    if (menuItem) {
      return res.status(400).json({ msg: 'Menu Item already exists' });
    }

    menuItem = new MenuItemsModel({
      title: req.body.title,
      chefName: req.body.chefName,
      description: req.body.description,
      ingredients,
      dietaryRestrictions,
      type: req.body.type,
      price: req.body.price,
      image: req.file.filename,
    });

    await menuItem.save();

    res.json(menuItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
