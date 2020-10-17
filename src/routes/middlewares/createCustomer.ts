import { Request, Response } from 'express';
import { Customers } from '../../models/Customers';

const Customer = require("../../models/Customers");

export const createCustomerMiddleware = (req: Request, res: Response) => {
    console.log(req.body);
    const newCustomer = new Customer({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address
    });
    
    newCustomer.save(function(err: Error, customer: Customers) {
        if (err)
            res.send(err);
        res.json(customer);
    });
};