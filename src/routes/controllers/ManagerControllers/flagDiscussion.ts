import { Request, Response } from 'express';
import axios, {AxiosResponse} from 'axios';
import DiscussionsModel, { Discussions } from '../../../models/Discussions';
import CustomersModel, { Customers } from '../../../models/Customers';

export const flagDiscussion = async (req: Request, res: Response) => {
  try {
    const postID = req.params.discussionPostId;
    var discussionLink = 'http://localhost:5000/api/discussions/' + postID;
    const discussionPost = await axios.get(discussionLink);
    var customerID = discussionPost.data.messageFrom; // get customerID of person who created the discussion post


    var customerProfile = 'http://localhost:5000/api/customers/' + customerID;
    const customer = await axios.get(customerProfile);
    var numOfWarnings = customer.data.warnings; // get number of warnings for customer
    var vipStatus = customer.data.isVIP; // get VIP status for customer

    if (vipStatus == false && numOfWarnings < 3) // if numOfWarnings < 3, increment numOfWarnings
      await CustomersModel.findByIdAndUpdate(customerID, { warnings: ++numOfWarnings });
    else if (vipStatus == false && numOfWarnings >= 3) // if numOfWarnings >= 3, blacklist customer
      await CustomersModel.findByIdAndUpdate(customerID, { isBlacklisted: true });
    else if (vipStatus == true && numOfWarnings < 2) // if VIP and numOfWarnings < 2, increment numOfWarnings
      await CustomersModel.findByIdAndUpdate(customerID, { warnings: ++numOfWarnings });
    else if (vipStatus == true && numOfWarnings >= 2) // if VIP and numOfWarnings >= 2, get rid of VIP staus
      await CustomersModel.findByIdAndUpdate(customerID, { isVIP: false, warnings: 0 });

    await DiscussionsModel.findByIdAndDelete(postID); // delete post

    res.json({ msg: 'Discussion post deleted!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};