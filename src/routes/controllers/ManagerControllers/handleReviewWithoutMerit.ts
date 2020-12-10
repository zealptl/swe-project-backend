import { Request, Response } from 'express';
import axios, {AxiosResponse} from 'axios';
import ReviewModel, { Reviews } from '../../../models/Reviews';
import CustomersModel, { Customers } from '../../../models/Customers';
import EmployeesModel, { Employees } from '../../../models/Employees';

export const handleReviewWithoutMerit = async (req: Request, res: Response) => {
  try {
    const review: Reviews | null = await ReviewModel.findById(req.params.reviewId);

    if (review) {
      await ReviewModel.findByIdAndUpdate(req.params.reviewId, { isApproved: true });
      
      var senderType = review.reviewFromType; 
      var senderID = review.reviewFrom;
    
      if (senderType == "DeliveryPerson") {
        const deliveryPerson: Employees | null = await EmployeesModel.findById(senderID);

        if (deliveryPerson) {
          var numOfWarnings = deliveryPerson.warnings; // get number of warnings for delivery person
          await CustomersModel.findByIdAndUpdate(senderID, { warnings: ++numOfWarnings }); // increment numOfWarnings
        }
        else
          res.status(404).json({ msg: 'Delivery person not found' });
      }
      else if (senderType == "Customer") {
        const customer: Customers | null = await CustomersModel.findById(senderID);

        if (customer) {
          var numOfWarnings = customer.warnings; // get number of warnings for customer
          var vipStatus = customer.isVIP; // get VIP status for customer
          
          if (vipStatus == false && numOfWarnings < 3) // if numOfWarnings < 3, increment numOfWarnings
            await CustomersModel.findByIdAndUpdate(senderID, { warnings: ++numOfWarnings });
          else if (vipStatus == false && numOfWarnings >= 3) // if numOfWarnings >= 3, blacklist customer
            await CustomersModel.findByIdAndUpdate(senderID, { isBlacklisted: true });
          else if (vipStatus == true && numOfWarnings < 2) // if VIP and numOfWarnings < 2, increment numOfWarnings
            await CustomersModel.findByIdAndUpdate(senderID, { warnings: ++numOfWarnings });
          else if (vipStatus == true && numOfWarnings >= 2) // if VIP and numOfWarnings >= 2, get rid of VIP staus
            await CustomersModel.findByIdAndUpdate(senderID, { isVIP: false, warnings: 0 });
        }
        else
          res.status(404).json({ msg: 'Customer not found' });
      }
      
      res.json({ msg: 'Non merit review was handled!' });
    }
    else
      res.status(404).json({ msg: 'Review not found' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};