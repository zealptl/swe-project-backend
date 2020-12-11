import { Request, Response } from 'express';
import axios, {AxiosResponse} from 'axios';
import DiscussionsModel, { Discussions } from '../../../models/Discussions';
import CustomersModel, { Customers } from '../../../models/Customers';

export const flagDiscussion = async (req: Request, res: Response) => {
  try {
    var customerID = req.params.customerID; // get customerID of person who created the discussion post

    const customer: Customers | null = await CustomersModel.findById(customerID);

    if (customer) {
      var numOfWarnings = customer.warnings; // get number of warnings for customer
      var vipStatus = customer.isVIP; // get VIP status for customer

      if (vipStatus == false && numOfWarnings+1 < 3) // if numOfWarnings < 3, increment numOfWarnings
        await CustomersModel.findByIdAndUpdate(customerID, { warnings: ++numOfWarnings });
      else if (vipStatus == false && numOfWarnings+1 >= 3) // if numOfWarnings >= 3, blacklist customer
        await CustomersModel.findByIdAndUpdate(customerID, { isBlacklisted: true });
      else if (vipStatus == true && numOfWarnings+1 < 2) // if VIP and numOfWarnings < 2, increment numOfWarnings
        await CustomersModel.findByIdAndUpdate(customerID, { warnings: ++numOfWarnings });
      else if (vipStatus == true && numOfWarnings+1 >= 2) // if VIP and numOfWarnings >= 2, get rid of VIP staus
        await CustomersModel.findByIdAndUpdate(customerID, { isVIP: false, warnings: 0 });

      res.json(customer);
    }
    else
      res.status(404).json({ msg: 'Customer not found' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};