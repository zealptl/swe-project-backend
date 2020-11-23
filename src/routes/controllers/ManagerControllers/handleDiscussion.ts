import { Request, Response } from 'express';
import axios, {AxiosResponse} from 'axios';
import DiscussionsModel, { Discussions } from '../../../models/Discussions';
import CustomersModel, { Customers } from '../../../models/Customers';

export const handleDiscussion = async (req: Request, res: Response) => {
  try {
    const id = req.params.discussionPostId;
    var discussionlink = 'http://localhost:5000/api/discussions/' + req.params.discussionPostId;

      axios.get(discussionlink)
        .then((response : AxiosResponse) => {
          var customerID = response.data.messageFrom;

          var customerlink = 'http://localhost:5000/api/customers/' + customerID;
          axios.get(customerlink)
            .then((response2 : AxiosResponse) => {
              var numOfWarnings = response2.data.warnings;
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

    await DiscussionsModel.findByIdAndDelete(id);

    res.json({ msg: 'Discussion post deleted!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};


// delete post 