import { Request, Response } from 'express';
import CustomersModel from '../../../models/Customers';

export const getSignedInUser = async (
  req: Request,
  res: Response
) => {
  try {
    const userRolesModels: any = {
      customer: CustomersModel,
    };

    const userRole: any = req.currentUser.role;

    const user: any = await userRolesModels[userRole]
      .findById(req.currentUser.id)
      .select('-password');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
