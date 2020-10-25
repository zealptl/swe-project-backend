import { Request, Response } from 'express';
import CustomersModel from '../../models/Customers';
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

export const authUserMiddleware = async (req: Request, res: Response) => {
  try {
    const userRoles: any = {
      customer: CustomersModel,
    };
    const userRole: any = req.query.role;

    const user: any = await userRoles[userRole].findOne({
      email: req.body.email,
    });

    if (!user) res.status(401).json({ msg: 'Invalid Credentials' });

    const isMatch: boolean = await bcryptjs.compare(
      req.body.password,
      user.password
    );

    if (!isMatch) res.status(401).json({ msg: 'Invalid Credentials' });

    const payload: any = {
      currentUser: {
        id: user.id,
        role: req.query.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600000 }, // its in seconds, for now have an arbitrarily big num
      (err: Error, token: string) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
