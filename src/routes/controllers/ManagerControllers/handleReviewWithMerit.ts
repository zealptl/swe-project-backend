import { Request, Response } from 'express';
import axios, {AxiosResponse} from 'axios';
import ReviewModel, { Reviews } from '../../../models/Reviews';
import CustomersModel, { Customers } from '../../../models/Customers';
import EmployeesModel, { Employees } from '../../../models/Employees';

export const handleReviewWithMerit = async (req: Request, res: Response) => {
  try {
    const reviewID = req.params.reviewId;
    var reviewLink = 'http://localhost:5000/api/reviews/' + reviewID;
    const review = await axios.get(reviewLink);

    var senderType = review.data.reviewFromType; 
    var recipientType = review.data.reviewToType; 
    var recipientID = review.data.reviewTo;
    var weight = 1;

    if (senderType == "VIP") // if VIP, double weight
      weight = 2;
    if (review.data.type == "Complaint") // if complaint, make weight negative
      weight *= -1;

    if (recipientType == "DeliveryPerson") {
      var deliveryPersonProfile = 'http://localhost:5000/api/employees/' + recipientID;
      const deliveryPerson = await axios.get(deliveryPersonProfile);

      var dpScore = deliveryPerson.data.score; // get score for delivery person
      var dpSalary = deliveryPerson.data.demotedTimes; // get salary for delivery person
      
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
    else if (recipientType == "Chef") {
      var chefProfile = 'http://localhost:5000/api/employees/' + recipientID;
      const chef = await axios.get(chefProfile);

      var chefScore = chef.data.score; // get score for chef
      var chefSalary = chef.data.demotedTimes; // get salary for chef
      
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
    else if (recipientType == "Customer") {
      var customerProfile = 'http://localhost:5000/api/customers/' + recipientID;
      const customer = await axios.get(customerProfile);

      var customerScore = customer.data.score; // get score for customer
      var numOfWarnings = customer.data.warnings; // get number of warnings for customer
      
      customerScore += weight; // update customer's current score
      await EmployeesModel.findByIdAndUpdate(recipientID, { score: customerScore });

      if (weight < 0) { // if customer received negative review
        if (numOfWarnings < 3) // if numOfWarnings < 3, increment numOfWarnings
          await CustomersModel.findByIdAndUpdate(recipientID, { warnings: ++numOfWarnings });
        else // if numOfWarnings >= 3, blacklist customer
          await CustomersModel.findByIdAndUpdate(recipientID, { isBlacklisted: true });
      }     
    }
    res.json({ msg: 'Merit review was handled!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};