import { Request, Response } from 'express';
import CustomersModel, { Customers } from '../../models/Customers';
const bcryptjs = require('bcryptjs');

export const createCustomerMiddleware = async (req: Request, res: Response) => {
  try {
    let customer: Customers | null = await CustomersModel.findOne({
      email: req.body.email,
    });

    if (customer) res.status(400).json({ msg: 'User already exists' });

    customer = new CustomersModel({
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
    });

    const salt = await bcryptjs.genSalt(10);

    customer.password = await bcryptjs.hash(customer.password, salt);

    await customer.save();

    res.json({ msg: 'Account waiting for approval' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
