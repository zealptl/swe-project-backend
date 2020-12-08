import { Request, Response } from 'express';
import OrdersModel, { Orders } from '../../../models/Orders';

export const getOrders = async (req: Request, res: Response) => {
  let orders: Orders[] | null;

  if (req.body.type == 'customer')
    // show orders that customer ordered
    orders = await OrdersModel.find({ customer: req.body.customerID });
  else if (req.body.type == 'chef')
    // show all orders that are pending
    orders = await OrdersModel.find({ status: 'Pending' });
  else if (req.body.type == 'delivery')
    // show all orders that are cooked
    orders = await OrdersModel.find({ status: 'Cooked', deliveryNeeded: true });
  // show all orders
  else orders = await OrdersModel.find({});

  if (!orders) res.status(404).json({ msg: 'No orders at the moment' });

  res.json(orders);
};
