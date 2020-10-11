import { Request, Response } from 'express';
import { Customers } from '../../models/CustomersModel';

const CustomerModel = require("../../models/CustomersModel");

export const getCustomersMiddleware = (req: Request, res: Response) => {
    CustomerModel.find({}, '-username -password', function(err: Error, customer: Customers) {
        if (err)
            res.send(err);
        res.json(customer);
    });
};
