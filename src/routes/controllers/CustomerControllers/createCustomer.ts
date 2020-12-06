import { Request, Response } from 'express';
import CustomersModel, { Customers } from '../../../models/Customers';
import BlacklistedUserModel, {
  BlacklistedUser,
} from '../../../models/BlacklistedUser';
const bcryptjs = require('bcryptjs');

export const createCustomer = async (req: Request, res: Response) => {
  try {
    // check if customer is blacklisted
    const isUserBlacklisted: BlacklistedUser | null = await BlacklistedUserModel.findOne(
      {
        email: req.body.email,
      }
    );

    if (isUserBlacklisted) {
      return res
        .status(401)
        .json({ msg: 'Sorry this email has been blacklisted' });
    }

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
