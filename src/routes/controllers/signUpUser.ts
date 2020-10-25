import { Request, Response } from 'express';
import CustomersModel from '../../models/Customers';
import { createCustomerMiddleware } from './createCustomer';

export const signUpUserMiddleware = async (req: Request, res: Response) => {
  try {
    switch (req.query.role) {
      case 'customer':
        await createCustomerMiddleware(req, res);
        break;

      default:
        return res
          .status(400)
          .json({ msg: 'Sign up not allowed on this role' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};
