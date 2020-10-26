import { Request, Response } from 'express';
import CustomersModel, { Customers } from '../../../models/Customers';

export const getCustomer = async (req: Request, res: Response) => {
  const customer: Customers | null = await CustomersModel.findById(
    req.params.customerId
  ).select('-password');

  if (!customer) res.status(404).json({ msg: 'Customer not found' });

  res.json(customer);
};
