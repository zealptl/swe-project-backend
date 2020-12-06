import { Request, Response } from 'express';
import EmployeesModel, { Employees } from '../../../models/Employees';
import BlacklistedUserModel, {
  BlacklistedUser,
} from '../../../models/BlacklistedUser';
const bcryptjs = require('bcryptjs');

export const createEmployee = async (req: Request, res: Response) => {
  try {
    // check if employee is blacklisted
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

    let employee: Employees | null = await EmployeesModel.findOne({
      email: req.body.email,
    });

    if (employee) res.status(400).json({ msg: 'User already exists' });

    employee = new EmployeesModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
    });

    const salt = await bcryptjs.genSalt(10);

    employee.password = await bcryptjs.hash(employee.password, salt);

    await employee.save();

    res.json({ msg: 'Account waiting for approval' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};
