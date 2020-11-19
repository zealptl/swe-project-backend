import { Request, Response } from 'express';
import DiscussionsModel, { Discussions } from '../../../models/Discussions';

export const postToDiscussion = async (req: Request, res: Response) => {
  try {
    let discussion = new DiscussionsModel({
      message: req.body.message,
      messageFrom: req.body.messageFrom,
    });

    await discussion.save();

    res.json({ msg: 'Discussions post created!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
