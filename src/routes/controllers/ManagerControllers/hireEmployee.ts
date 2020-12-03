import { Request, Response } from 'express';
import axios, {AxiosResponse} from 'axios';

const Employee = require("../../../models/Employees");

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const hireEmployee = (req: Request, res: Response) => {
  Employee.findOneAndUpdate({ _id: req.params.employeeId }, { isApproved: true })
    .then(() => {
      var link = 'http://localhost:5000/api/employees/' + req.params.employeeId;

      axios.get(link) // retrieve email for employee
        .then((response : AxiosResponse) => {
          var email = response.data.email;
          console.log(email);

          const msg = { // send an email confirmation to employee
            to: email,
            from: 'bhavesh.shah@macaulay.cuny.edu',
            templateId: 'd-296b3c7a87534eedb896f5fc49bdb1d6',
          }
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent')
            })
            .catch((error : Error) => {
              console.error(error)
            })
        })
        .catch((error : Error) => {
          console.log(error);
        });

      res.status(202).json("Employee hired");
    })
    .catch((err : Error) => res.status(500).json(err));
};
