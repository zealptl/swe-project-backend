import { Request, Response } from 'express';
import CustomersModel, { Customers } from '../../../models/Customers';
import { determineTopDishes } from '../../../helpers/determineTopDishes';

// analyze current customer's previous orders to find top 3 "for-you" orders
export const getForYou = async (req: Request, res: Response) => {
  let menuItemsIdsArr: string[] = [];

  const customer: Customers | null = await CustomersModel.findById(
    req.params.customerID
  ).select('-password');

  if (customer != null) {
    let customerDishesOrdered = customer.ordersMade;
    menuItemsIdsArr = determineTopDishes(customerDishesOrdered, 3);
  }

  if (!menuItemsIdsArr) res.status(404).json({ msg: 'Menu items not found' });

  res.json(menuItemsIdsArr);
};
