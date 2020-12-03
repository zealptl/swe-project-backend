import { Request, Response } from 'express';
import CustomersModel, { Customers } from '../../../models/Customers';
const bcryptjs = require('bcryptjs');

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const id = req.params.customerId;
    let updatedPassword: string = req.body.password;

    const salt = await bcryptjs.genSalt(10);
    updatedPassword = await bcryptjs.hash(updatedPassword, salt);

    const customer = await CustomersModel.findByIdAndUpdate(id, { password: updatedPassword });

    res.json(customer);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};