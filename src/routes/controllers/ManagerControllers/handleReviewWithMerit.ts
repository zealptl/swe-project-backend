import { Request, Response } from 'express';
import axios, {AxiosResponse} from 'axios';
import ReviewModel, { Reviews } from '../../../models/Reviews';
import CustomersModel, { Customers } from '../../../models/Customers';
import EmployeesModel, { Employees } from '../../../models/Employees';

export const handleReviewWithMerit = async (req: Request, res: Response) => {
  try {
    const review: Reviews | null = await ReviewModel.findById(req.params.reviewId);

    if (review) {
      var senderType = review.reviewFromType; 
      var recipientType = review.reviewToType; 
      var recipientID = review.reviewTo;
      var reviewType = review.type;
      var weight = 1;

      if (senderType == "VIP") // if VIP, double weight
        weight = 2;
      if (reviewType == "Complaint") // if complaint, make weight negative
        weight *= -1;

      if (recipientType == "DeliveryPerson") {
        const deliveryPerson: Employees | null = await EmployeesModel.findById(recipientID);

        if (deliveryPerson) {
          var dpScore = deliveryPerson.score; // get score for delivery person
          var dpSalary = deliveryPerson.salary; // get salary for delivery person
          
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
        }
        else
          res.status(404).json({ msg: 'Delivery person not found' });
      }
      else if (recipientType == "Chef") {
        const chef: Employees | null = await EmployeesModel.findById(recipientID);
        
        if (chef) {
          var chefScore = chef.score; // get score for chef
          var chefSalary = chef.salary; // get salary for chef
          
          chefScore += weight; // update chef's current score
          await EmployeesModel.findByIdAndUpdate(recipientID, { score: chefScore });

          if (chefScore == 0) // if chef score = 0, they are fired
              await EmployeesModel.findByIdAndUpdate(recipientID, { demotedTimes: 2, status: "Fired" });
          else if (chefScore == 3) // if chef score = 3, they are demoted
              await EmployeesModel.findByIdAndUpdate(recipientID, { demotedTimes: 1, salary: chefSalary - 5000 });
          else if (chefScore == 6) // if chef score = 6, their demotion history is cleared
              await EmployeesModel.findByIdAndUpdate(recipientID, { demotedTimes: 0 });
          else (chefScore%3==0 && chefScore > 6) // if chef score > 6 and is divisible by 3, they are promoted
              await EmployeesModel.findByIdAndUpdate(recipientID, { salary: chefSalary + 5000 });
        }
        else
          res.status(404).json({ msg: 'Chef not found' });
      }
      else if (recipientType == "Customer") {
        const customer: Customers | null = await CustomersModel.findById(recipientID);
        
        if (customer) {
          var customerScore = customer.score; // get score for customer
          var numOfWarnings = customer.warnings; // get number of warnings for customer
          var vipStatus = customer.isVIP; // get VIP status for customer
          
          customerScore += weight; // update customer's current score
          await CustomersModel.findByIdAndUpdate(recipientID, { score: customerScore });

          if (weight < 0) { // if customer received negative review
            if (vipStatus == false && numOfWarnings < 3) // if numOfWarnings < 3, increment numOfWarnings
              await CustomersModel.findByIdAndUpdate(recipientID, { warnings: ++numOfWarnings });
            else if (vipStatus == false && numOfWarnings >= 3) // if numOfWarnings >= 3, blacklist customer
              await CustomersModel.findByIdAndUpdate(recipientID, { isBlacklisted: true });
            else if (vipStatus == true && numOfWarnings < 2) // if VIP and numOfWarnings < 2, increment numOfWarnings
              await CustomersModel.findByIdAndUpdate(recipientID, { warnings: ++numOfWarnings });
            else if (vipStatus == true && numOfWarnings >= 2) // if VIP and numOfWarnings >= 2, get rid of VIP staus
              await CustomersModel.findByIdAndUpdate(recipientID, { isVIP: false, warnings: 0 });
          }
        }
        else
          res.status(404).json({ msg: 'Customer not found' });
      }
      res.json({ msg: 'Merit review was handled!' });
    }
    else
      res.status(404).json({ msg: 'Review not found' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};