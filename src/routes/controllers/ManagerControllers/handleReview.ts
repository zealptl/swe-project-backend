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
          var senderID = response.data.reviewFrom; 
          var recipientType = response.data.reviewToType; 
          var recipientID = response.data.reviewTo;
          var weight = 1;

          if (senderType == "VIP")
            weight = 2;
          if (response.data.type == "Complaint")
            weight *= -1;

          if (req.body.merit == "true") {
            if (recipientType == "DeliveryPerson") {
                var employeelink = 'http://localhost:5000/api/employees/' + recipientID;
                axios.get(employeelink)
                    .then((response2 : AxiosResponse) => {
                        var dpScore = response2.data.score; // get score for employee
                        var dpSalary = response2.data.demotedTimes; // get salary
                        
                        dpScore += weight;
                        await EmployeesModel.findByIdAndUpdate(recipientID, { score: dpScore });

                        if (dpScore == 0)
                            await EmployeesModel.findByIdAndUpdate(recipientID, { demotedTimes: 2, status: "Fired" });
                        else if (dpScore == 6)
                            await EmployeesModel.findByIdAndUpdate(recipientID, { demotedTimes: 0 });
                        else if (dpScore%3==0 && dpScore < 6) {
                            await EmployeesModel.findByIdAndUpdate(recipientID, { demotedTimes: 1, salary: dpSalary - 5000 });
                        }
                        else (dpScore%3==0 && dpScore > 6) {
                            await EmployeesModel.findByIdAndUpdate(recipientID, { salary: dpSalary + 5000 });
                        }
                    })
                    .catch((error : Error) => {
                        console.log(error);
                    });
                })
            .catch((error : Error) => {
                console.log(error);
            });
                await CustomersModel.findByIdAndUpdate(customerID, { warnings: ++numOfWarnings });
            }
          }
          // merit
          // customer -> customer, delivery person
          // delivery person -> customer
          // without merit
          var customerlink = 'http://localhost:5000/api/customers/' + customerID;
          axios.get(customerlink)
            .then((response2 : AxiosResponse) => {
              var numOfWarnings = response2.data.warnings; // get number of warnings for customer
              if (numOfWarnings < 3) {
                await CustomersModel.findByIdAndUpdate(customerID, { warnings: ++numOfWarnings });
              }
              else {
                await CustomersModel.findByIdAndUpdate(customerID, { isBlacklisted: true });
              }
            })
            .catch((error : Error) => {
              console.log(error);
            });
          })
          .catch((error : Error) => {
            console.log(error);
          });

    await DiscussionsModel.findByIdAndDelete(postID); // delete post

    res.json({ msg: 'Discussion post deleted!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};