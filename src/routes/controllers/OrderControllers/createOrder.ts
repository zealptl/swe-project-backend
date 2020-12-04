import { Request, Response } from 'express';
import OrdersModel, { Orders } from '../../../models/Orders';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Orders = new OrdersModel({
        menuItem: req.body.menuItemID,
        customer: req.body.customerID,
    });

    await order.save();

    res.json({ msg: 'Order submitted!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};