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
    if (numOfWarnings < 3)
      await CustomersModel.findByIdAndUpdate(customerID, { warnings: ++numOfWarnings });
    else
      await CustomersModel.findByIdAndUpdate(customerID, { isBlacklisted: true });


    await DiscussionsModel.findByIdAndDelete(postID); // delete post

    res.json({ msg: 'Discussion post deleted!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};