import { Request, Response } from 'express';
import EmployeesModel, { Employees } from '../../../models/Employees';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const hireEmployee = async (req: Request, res: Response) => {
  const employeeId = req.params.employeeId;
  const employee: Employees | null = await EmployeesModel.findById(employeeId);

  if (employee) {
    await EmployeesModel.findByIdAndUpdate(employeeId, {
      isApproved: true,
      status: 'Hired',
    });

    var email = employee.email;
    console.log(email);

    const msg = {
      // send an email confirmation to employee
      to: email,
      from: 'foodtopia322@gmail.com',
      templateId: 'd-2a58c0cc781044039ce2485164092a02',
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error: Error) => {
        console.error(error);
      });

    res.status(202).json('Employee hired');
  } else res.status(404).json({ msg: 'Employee not found' });
};
