import { Request, Response } from 'express';
import OrdersModel, { Orders } from '../../../models/Orders';
import CustomersModel, { Customers } from '../../../models/Customers';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Orders = new OrdersModel({
      menuItem: req.body.menuItemID,
      customer: req.body.customerID,
      deliveryNeeded: req.body.deliveryNeeded,
      price: req.body.price,
    });

    const customer: Customers | null = await CustomersModel.findById(
      req.body.customerID
    );

    if (!customer) return res.status(404).json({ msg: 'Customer not found' });

    // deny request if insufficient balance
    if (req.body.price > customer.balance)
      return res.status(400).json({ msg: 'Insufficient balance' });

    // set new amount spent
    const newAmountSpent = customer.amountSpent + req.body.price;

    // set new balance
    const newBalance = customer.balance - req.body.price;

    // set isVIP to true if customer has made 50 or more orders or spent 500 or more
    const vipStatus =
      customer.ordersMade.length >= 49 || newAmountSpent >= 500 ? true : false; // >=49 because the current order hasnt been put into customer obj

    // save order to order collection
    await order.save();

    // add menu item to the list of menu items the customer has ordered
    await CustomersModel.findByIdAndUpdate(
      req.body.customerID,
      {
        $push: { ordersMade: req.body.menuItemID },
        amountSpent: newAmountSpent,
        balance: newBalance,
        isVIP: vipStatus,
      },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
