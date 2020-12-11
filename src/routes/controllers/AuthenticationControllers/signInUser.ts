import { Request, Response } from 'express';
import EmployeesModel, { Employees } from '../../../models/Employees';
import BlacklistedUserModel, {
  BlacklistedUser,
} from '../../../models/BlacklistedUser';
import userRoles from '../../../utils/userRolesModels';
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

export const signInUser = async (req: Request, res: Response) => {
  try {
    const userRole: any = req.query.role;

    const user: any = await userRoles[userRole].findOne({
      email: req.body.email,
    });

    if (!user) res.status(401).json({ msg: 'Invalid Credentials' });

    // properly auth customer type
    if (userRole === 'customer') {
      // if user isnt approved then deny
      if (user.isApprroved === false)
        return res.status(401).json({ msg: 'Account waiting for approval' });

      // if user is customer then check if is blacklisted
      if (user.isBlacklisted) {
        return res
          .status(401)
          .json({ msg: 'Sorry this account been blacklisted' });
      }
    }

    // properly auth employee type
    if (userRole === 'chef' || userRole === 'delivery') {
      // if user isnt approved then deny
      if (user.isApprroved === false)
        return res.status(401).json({ msg: 'Account waiting for approval' });

      // if user is chef || delivery then check if is blacklisted
      if (user.status === 'Fired') {
        return res
          .status(401)
          .json({ msg: 'Sorry this account been blacklisted' });
      }

      // if user if employee then he/she must match the type of employee to userRole
      if (user.type !== userRole) {
        return res.status(401).json({ msg: 'Invalid Credentials' });
      }
    }

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

    var msg: String;

    if (userRole == 'chef' || userRole == 'delivery') {
      const employee: Employees = user;

      // if 3 or more days have elapsed since employee completed an order, either demote or fire employee
      const currentDate = new Date();
      if (
        employee != null &&
        (currentDate.getTime() - employee.updated_at.getTime()) /
          (1000 * 3600 * 24) >=
          1
      ) {
        var employeeScore = employee.score;
        employeeScore = employeeScore > 3 ? 3 : 0;

        if (employeeScore == 0) {
          // if employee score = 0, they are fired
          await EmployeesModel.findByIdAndUpdate(user.id, {
            updated_at: currentDate,
            score: employeeScore,
            demotedTimes: 2,
            status: 'Fired',
          });
          msg =
            'Apologies you have been fired and no longer have access to the system.';
          res.json({ msg });
        } else if (employeeScore == 3) {
          // if employee score = 3, they are demoted
          await EmployeesModel.findByIdAndUpdate(user.id, {
            updated_at: currentDate,
            score: employeeScore,
            demotedTimes: 1,
            salary: employee.salary - 5000,
          });
          msg = 'You have been demoted.';
        }
      }
    }

    // "deleting" password from object because we dont want to expose it
    user.password = undefined;

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600000 }, // its in seconds, for now have an arbitrarily big num
      (err: Error, token: string) => {
        if (err) throw err;
        res.json({ token, user, msg });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
