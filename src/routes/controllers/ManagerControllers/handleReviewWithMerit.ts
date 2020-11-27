import { Request, Response } from 'express';
import axios, {AxiosResponse} from 'axios';
import ReviewModel, { Reviews } from '../../../models/Reviews';
import CustomersModel, { Customers } from '../../../models/Customers';
import EmployeesModel, { Employees } from '../../../models/Employees';

export const handleDiscussion = async (req: Request, res: Response) => {
  try {
    const reviewID = req.params.reviewId;
    var reviewLink = 'http://localhost:5000/api/reviews/' + reviewID;

      axios.get(reviewLink)
        .then((response : AxiosResponse) => {
          var senderType = response.data.reviewFromType; 
          var recipientType = response.data.reviewToType; 
          var recipientID = response.data.reviewTo;
          var weight = 1;

          if (senderType == "VIP") // if VIP, double weight
            weight = 2;
          if (response.data.type == "Complaint") // if complaint, make weight negative
            weight *= -1;

          if (recipientType == "DeliveryPerson") {
              var deliveryPersonProfile = 'http://localhost:5000/api/employees/' + recipientID;
              axios.get(deliveryPersonProfile)
                  .then((response2 : AxiosResponse) => {
                      var dpScore = response2.data.score; // get score for delivery person
                      var dpSalary = response2.data.demotedTimes; // get salary for delivery person
                      
                      dpScore += weight; // update delivery person's current score
                      await EmployeesModel.findByIdAndUpdate(recipientID, { score: dpScore });

                      if (dpScore == 0) // if delivery person score = 0, they are fired
                          await EmployeesModel.findByIdAndUpdate(recipientID, { demotedTimes: 2, status: "Fired" });
                      else if (dpScore == 3) // if delivery person score = 3, they are demoted
                          await EmployeesModel.findByIdAndUpdate(recipientID, { demotedTimes: 1, salary: dpSalary - 5000 });
                      else if (dpScore == 6) // if delivery person score = 6, their demotion history is cleared
                          await EmployeesModel.findByIdAndUpdate(recipientID, { demotedTimes: 0 });
                      else (dpScore%3==0 && dpScore > 6) // if delivery person score > 6 and is divisible by 3, they are promoted
                          await EmployeesModel.findByIdAndUpdate(recipientID, { salary: dpSalary + 5000 });
                  })
                  .catch((error : Error) => {
                      console.log(error);
                  });
          }
          else if (recipientType == "Dish") {
              var chefProfile = 'http://localhost:5000/api/employees/' + recipientID;
              axios.get(chefProfile)
                  .then((response2 : AxiosResponse) => {
                      var chefScore = response2.data.score; // get score for chef
                      var chefSalary = response2.data.demotedTimes; // get salary for chef
                      
                      chefScore += weight; // update chef's current score
                      await EmployeesModel.findByIdAndUpdate(recipientID, { score: dpScore });

                      if (chefScore == 0) // if chef score = 0, they are fired
                          await EmployeesModel.findByIdAndUpdate(recipientID, { demotedTimes: 2, status: "Fired" });
                      else if (chefScore == 3) // if chef score = 3, they are demoted
                          await EmployeesModel.findByIdAndUpdate(recipientID, { demotedTimes: 1, salary: chefSalary - 5000 });
                      else if (chefScore == 6) // if chef score = 6, their demotion history is cleared
                          await EmployeesModel.findByIdAndUpdate(recipientID, { demotedTimes: 0 });
                      else (chefScore%3==0 && chefScore > 6) // if chef score > 6 and is divisible by 3, they are promoted
                          await EmployeesModel.findByIdAndUpdate(recipientID, { salary: chefSalary + 5000 });
                  })
                  .catch((error : Error) => {
                      console.log(error);
                  });
          }
          else if (recipientType == "Customer") {
              var customerlink = 'http://localhost:5000/api/customers/' + recipientID;
              axios.get(customerlink)
                  .then((response2 : AxiosResponse) => {
                      var customerScore = response2.data.score; // get score for customer
                      var numOfWarnings = response2.data.warnings; // get number of warnings for customer
                      
                      customerScore += weight; // update customer's current score
                      await EmployeesModel.findByIdAndUpdate(recipientID, { score: customerScore });

                      if (weight < 0) { // if customer received negative review
                        if (numOfWarnings < 3) { // if numOfWarnings < 3, increment numOfWarnings
                          await CustomersModel.findByIdAndUpdate(recipientID, { warnings: ++numOfWarnings });
                        }
                        else { // if numOfWarnings >= 3, blacklist customer
                          await CustomersModel.findByIdAndUpdate(recipientID, { isBlacklisted: true });
                        }
                      }
                  })
                  .catch((error : Error) => {
                      console.log(error);
                  });
          }
        }
    res.json({ msg: 'Merit review was handled!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};