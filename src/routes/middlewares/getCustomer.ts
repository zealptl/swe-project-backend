import { Request, Response } from 'express';
import { Customers } from '../../models/CustomersModel';

const CustomerModel = require("../../models/CustomersModel");

export const getCustomerMiddleware = (req: Request, res: Response) => {
    CustomerModel.findById(req.params.customerId, function(err: Error, customer: Customers) {
        if (err)
            res.send(err);
        res.json(customer);
    });
};
