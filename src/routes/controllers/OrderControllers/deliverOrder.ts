import { Request, Response } from 'express';
import OrdersModel, { Orders } from '../../../models/Orders';

export const deliverOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.orderId;

    // change order status to delivered and assign deliveryPersonID as delivery person who delivered the order
    const order = await OrdersModel.findByIdAndUpdate(id, { status: "Delivered", deliveryPerson: req.body.deliveryPersonID });

    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};