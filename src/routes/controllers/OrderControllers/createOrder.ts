import { Request, Response } from 'express';
import OrdersModel, { Orders } from '../../../models/Orders';
import CustomersModel, { Customers } from '../../../models/Customers';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Orders = new OrdersModel({
        menuItem: req.body.menuItemID,
        customer: req.body.customerID,
    });

    // save order to order collection
    await order.save();

    // add menu item to the list of menu items the customer has ordered
    await CustomersModel.findByIdAndUpdate(req.body.customerID, {$push: {"ordersMade": req.body.menuItemID}}, {new : true});

    res.json({ msg: 'Order submitted!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};