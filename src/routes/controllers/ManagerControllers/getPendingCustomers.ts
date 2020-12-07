import { Request, Response } from 'express';
import CustomersModel, { Customers } from '../../../models/Customers';

export const getPendingCustomers = async (req: Request, res: Response) => {
  const customers: Customers[] | null = await CustomersModel.find({ isApproved : false }).select(
    '-password'
  );

  if (!customers) res.status(404).json({ msg: 'Customers not found' });

  res.json(customers);
};