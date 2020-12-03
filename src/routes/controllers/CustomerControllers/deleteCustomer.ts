import { Request, Response } from 'express';
import CustomersModel, { Customers } from '../../../models/Customers';

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    if (
      req.currentUser.role === 'manager' ||
      req.currentUser.id === req.params.customerId
    ) {
      const customer: Customers | null = await CustomersModel.findOneAndDelete({
        _id: req.params.customerId,
      });

      if (!customer) {
        return res.status(404).json({ msg: 'User not found' });
      }

      res.json({ msg: 'Account deletion successful' });
    } else {
      return res.status(401).json({ msg: 'Not authorized' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
