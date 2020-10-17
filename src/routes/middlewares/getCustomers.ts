import { Request, Response } from 'express';
import { Customers } from '../../models/Customers';

const Customer = require("../../models/Customers");

export const getCustomersMiddleware = (req: Request, res: Response) => {
    Customer.find({}, '-username -password', function(err: Error, customer: Customers) {
        if (err)
            res.send(err);
        res.json(customer);
    });
};
