import { Request, Response } from 'express';
import CustomersModel, { Customers } from '../../../models/Customers';

export const getCustomers = async (req: Request, res: Response) => {
  const customers: Customers[] | null = await CustomersModel.find({}).select(
    '-password'
  );

  if (!customers) res.status(404).json({ msg: 'Customer not found' });

  res.json(customers);
};
