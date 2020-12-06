import { Request, Response } from 'express';
import OrdersModel, { Orders } from '../../../models/Orders';
import EmployeesModel, { Employees } from '../../../models/Employees';

export const cookOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.orderId;

    // change order status to cooked and assign chefID as chef who cooked the order
    const order = await OrdersModel.findByIdAndUpdate(id, { status: "Cooked", chef: req.body.chefID });

    // add order to the list of orders the chef worked on, and modify updated_at date
    const currentDate = new Date();
    await EmployeesModel.findByIdAndUpdate(req.body.chefID, { updated_at: currentDate, $push: {"orders": id} }, {new : true});

    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};