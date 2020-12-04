import { Request, Response } from 'express';
import OrdersModel, { Orders } from '../../../models/Orders';

export const cookOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.orderId;

    // change order status to cooked and assign chefID as chef who cooked the order
    const order = await OrdersModel.findByIdAndUpdate(id, { status: "Cooked", chef: req.body.chefID });

    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};