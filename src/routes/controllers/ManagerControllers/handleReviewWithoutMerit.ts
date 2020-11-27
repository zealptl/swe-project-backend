import { Request, Response } from 'express';
import axios, {AxiosResponse} from 'axios';
import ReviewModel, { Reviews } from '../../../models/Reviews';
import CustomersModel, { Customers } from '../../../models/Customers';
import EmployeesModel, { Employees } from '../../../models/Employees';

export const handleReviewWithoutMerit = async (req: Request, res: Response) => {
  try {
    const reviewID = req.params.reviewId;
    var reviewLink = 'http://localhost:5000/api/reviews/' + reviewID;
    const review = await axios.get(reviewLink);

    var senderType = review.data.reviewFromType; 
    var senderID = review.data.reviewFrom;

    if (senderType == "DeliveryPerson") {
      var deliveryPersonProfile = 'http://localhost:5000/api/employees/' + senderID;
      const deliveryPerson = await axios.get(deliveryPersonProfile);

      var numOfWarnings = deliveryPerson.data.warnings; // get number of warnings for delivery person
      await CustomersModel.findByIdAndUpdate(senderID, { warnings: ++numOfWarnings }); // increment numOfWarnings
    }
    else if (senderType == "Customer") {
        var customerProfile = 'http://localhost:5000/api/customers/' + senderID;
        const customer = await axios.get(customerProfile);

        var numOfWarnings = customer.data.warnings; // get number of warnings for customer
        var vipStatus = customer.data.isVIP; // get VIP status for customer
        
        if (vipStatus == false && numOfWarnings < 3) // if numOfWarnings < 3, increment numOfWarnings
          await CustomersModel.findByIdAndUpdate(senderID, { warnings: ++numOfWarnings });
        else if (vipStatus == false && numOfWarnings >= 3) // if numOfWarnings >= 3, blacklist customer
          await CustomersModel.findByIdAndUpdate(senderID, { isBlacklisted: true });
        else if (vipStatus == true && numOfWarnings < 2) // if VIP and numOfWarnings < 2, increment numOfWarnings
          await CustomersModel.findByIdAndUpdate(senderID, { warnings: ++numOfWarnings });
        else if (vipStatus == true && numOfWarnings >= 2) // if VIP and numOfWarnings >= 2, get rid of VIP staus
          await CustomersModel.findByIdAndUpdate(senderID, { isVIP: false, warnings: 0 });
    }
    res.json({ msg: 'Non merit review was handled!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};