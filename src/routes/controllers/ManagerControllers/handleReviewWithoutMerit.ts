import { Request, Response } from 'express';
import axios, {AxiosResponse} from 'axios';
import ReviewModel, { Reviews } from '../../../models/Reviews';
import CustomersModel, { Customers } from '../../../models/Customers';
import EmployeesModel, { Employees } from '../../../models/Employees';

export const handleReviewWithoutMerit = async (req: Request, res: Response) => {
  try {
    const reviewID = req.params.reviewId;
    var reviewLink = 'http://localhost:5000/api/reviews/' + reviewID;

      axios.get(reviewLink)
        .then((response : AxiosResponse) => {
          var senderType = response.data.reviewFromType; 
          var senderID = response.data.reviewFrom;

          if (senderType == "DeliveryPerson") {
              var deliveryPersonProfile = 'http://localhost:5000/api/employees/' + senderID;
              axios.get(deliveryPersonProfile)
                  .then((response2 : AxiosResponse) => {
                      var numOfWarnings = response2.data.warnings; // get number of warnings for delivery person
                
                      await CustomersModel.findByIdAndUpdate(senderID, { warnings: ++numOfWarnings }); // increment numOfWarnings
                  })
                  .catch((error : Error) => {
                      console.log(error);
                  });
          }
          else if (senderType == "Customer") {
              var customerlink = 'http://localhost:5000/api/customers/' + senderID;
              axios.get(customerlink)
                  .then((response2 : AxiosResponse) => {
                      var numOfWarnings = response2.data.warnings; // get number of warnings for customer
                      
                      if (numOfWarnings < 3) { // if numOfWarnings < 3, increment numOfWarnings
                          await CustomersModel.findByIdAndUpdate(senderID, { warnings: ++numOfWarnings });
                      }
                      else { // if numOfWarnings >= 3, blacklist customer
                          await CustomersModel.findByIdAndUpdate(senderID, { isBlacklisted: true });
                      }
                  })
                  .catch((error : Error) => {
                      console.log(error);
                  });
          }
        }
    res.json({ msg: 'Non merit review was handled!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};