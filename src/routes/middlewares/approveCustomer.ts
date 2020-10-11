import { Request, Response } from 'express';

const CustomerModel = require("../../models/CustomersModel");

export const approveCustomerMiddleware = (req: Request, res: Response) => {
  CustomerModel.findOneAndUpdate({ _id: req.params.customerId }, { isApproved: true })
    .then(() => res.status(202).json("Customer approved"))
    .catch((err : Error) => res.status(500).json(err));
};
