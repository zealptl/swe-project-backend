import { Request, Response } from 'express';
import OrdersModel, { Orders } from '../../../models/Orders';
import EmployeesModel, { Employees } from '../../../models/Employees';

export const deliverOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.orderId;

    // change order status to delivered and assign deliveryPersonID as delivery person who delivered the order
    const order = await OrdersModel.findByIdAndUpdate(id, { status: "Delivered", deliveryPerson: req.body.deliveryPersonID });

    // add order to the list of orders the delivery person has delivered, and modify updated_at date
    const currentDate = new Date();
    await EmployeesModel.findByIdAndUpdate(req.body.deliveryPersonID, { updated_at: currentDate, $push: {"orders": id} }, {new : true});

    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};