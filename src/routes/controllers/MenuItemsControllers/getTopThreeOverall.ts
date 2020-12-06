import { Request, Response } from 'express';
import OrdersModel, { Orders } from '../../../models/Orders';
import { determineTopDishes } from '../../../helpers/determineTopDishes';

// analyze all previous orders to find top 3 most popular
export const getTopThreeOverall = async (req: Request, res: Response) => {
  let menuItemsIdsArr: string[] = [];

  const orders: Orders[] | null = await OrdersModel.find({});

  if (orders != null) {
    let allDishesOrdered: string[] = [];

    orders.forEach(order => {
      allDishesOrdered.push(order.menuItem);
    })

    menuItemsIdsArr = determineTopDishes(allDishesOrdered, 3);
  }

  if (!menuItemsIdsArr) res.status(404).json({ msg: 'Menu items not found' });

  res.json(menuItemsIdsArr);
};