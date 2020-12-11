import { Request, Response } from 'express';
import CustomersModel, { Customers } from '../../../models/Customers';

export const addBalance = async (req: Request, res: Response) => {
  try {
    const id = req.params.customerId;
    const customer: Customers | null = await CustomersModel.findById(id).select(
      '-password'
    );

    if (customer) {
      let amountToAdd: number = req.body.amount;
      let currentBalance = customer.balance;
      currentBalance += amountToAdd;

      const updatedCustomer = await CustomersModel.findByIdAndUpdate(
        id,
        { balance: currentBalance },
        { new: true }
      );

      res.json(updatedCustomer);
    } else res.status(404).json({ msg: 'Customer not found' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
