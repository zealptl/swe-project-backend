import { Request, Response } from 'express';
import axios, {AxiosResponse} from 'axios';

const Customer = require("../../models/Customers");

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const approveCustomerMiddleware = (req: Request, res: Response) => {
  Customer.findOneAndUpdate({ _id: req.params.customerId }, { isApproved: true })
    .then(() => {
      var link = 'http://localhost:5000/api/customers/' + req.params.customerId;

      axios.get(link) // retrieve email for customer
        .then((response : AxiosResponse) => {
          var email = response.data.email;
          console.log(email);

          const msg = { // send an email confirmation to customer
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

      res.status(202).json("Customer approved");
    })
    .catch((err : Error) => res.status(500).json(err));
};
