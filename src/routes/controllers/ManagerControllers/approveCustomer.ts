import { Request, Response } from 'express';
import CustomersModel, { Customers } from '../../../models/Customers';

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const approveCustomer = async (req: Request, res: Response) => {
  const customerId = req.params.customerId;
  const customer: Customers | null = await CustomersModel.findById(customerId);

  if (customer) {
    await CustomersModel.findByIdAndUpdate(customerId, { isApproved: true });

    var email = customer.email;
    console.log(email);

    const msg = { // send an email confirmation to customer
      to: email,
      from: 'foodtopia322@gmail.com',
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

    res.status(202).json("Customer approved");
  }
  else
    res.status(404).json({ msg: 'Customer not found' });
};