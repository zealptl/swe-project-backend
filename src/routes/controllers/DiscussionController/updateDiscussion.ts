import { Request, Response } from 'express';
import DiscussionsModel, { Discussions } from '../../../models/Discussions';

export const updateDiscussion = async (req: Request, res: Response) => {
  try {
    const id = req.params.discussionPostId;
    const updatedMessage: String = req.body.message;
    const post = await DiscussionsModel.findByIdAndUpdate(id, { message: updatedMessage }, { new: true });

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
