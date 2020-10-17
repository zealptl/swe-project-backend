import { Request, Response } from 'express';
import { Customers } from '../../models/Customers';

const Customer = require("../../models/Customers");

export const getCustomerMiddleware = (req: Request, res: Response) => {
    Customer.findById(req.params.customerId, function(err: Error, customer: Customers) {
        if (err)
            res.send(err);
        res.json(customer);
    });
};
