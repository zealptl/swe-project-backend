import { Request, Response } from 'express';
import OrdersModel, { Orders } from '../../../models/Orders';

export const getOrders = async (req: Request, res: Response) => {
  const type = req.query.type;

  const query: any = {};
  if (req.query.customerID) query.customer = req.query.customerID;

  let orders: Orders[] | null;

  if (type == 'customer') {
    // show orders that customer ordered
    orders = await OrdersModel.find(query);
    console.log(orders);
  }
  else if (type == 'chef')
    // show all orders that are pending
    orders = await OrdersModel.find({ status: 'Pending' });
  else if (type == 'delivery')
    // show all orders that are cooked
    orders = await OrdersModel.find({ status: 'Cooked', deliveryNeeded: true });
  // show all orders
  else orders = await OrdersModel.find({});

  if (!orders) res.status(404).json({ msg: 'No orders at the moment' });

  res.json(orders);
};
