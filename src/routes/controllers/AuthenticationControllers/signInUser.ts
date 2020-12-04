import { Request, Response } from 'express';
import CustomersModel from '../../../models/Customers';
import EmployeesModel, { Employees } from '../../../models/Employees';
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

    console.log(userRole);
    var message : String;

    // if 3 or more days have elapsed since employee completed an order, either demote or fire employee
    if (userRole == "employee") {
      const employee: Employees | null = await EmployeesModel.findOne({
        _id: user.id,
      }).select('-password');

      if (employee != null && ((employee.updated_at.getTime() - new Date().getTime())/(1000*3600*24)) >= 3) {
        var employeeScore = employee.score;
        employeeScore = (employeeScore > 3 ? 3 : 0);

        if (employeeScore == 0) { // if employee score = 0, they are fired
          await EmployeesModel.findByIdAndUpdate(user.id, { score: employeeScore, demotedTimes: 2, status: "Fired" });
          message = "Apologies you have been fired and no longer have access to the system.";
          res.json({ message });
        }
        else if (employeeScore == 3) { // if employee score = 3, they are demoted
          await EmployeesModel.findByIdAndUpdate(user.id, { score: employeeScore, demotedTimes: 1, salary: employee.salary - 5000 });
          message = "You have been demoted.";
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
        res.json({ token, user, message });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
