import { Request, Response } from 'express';
import { createCustomer } from '../CustomerControllers/createCustomer';

export const signUpUser = async (req: Request, res: Response) => {
  try {
    switch (req.query.role) {
      case 'customer':
        await createCustomer(req, res);
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
