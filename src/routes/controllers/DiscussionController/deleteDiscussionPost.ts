import { Request, Response } from 'express';
import DiscussionsModel, { Discussions } from '../../../models/Discussions';

export const deleteDiscussionPost = async (req: Request, res: Response) => {
  try {
    const id = req.params.discussionPostId;
    await DiscussionsModel.findByIdAndDelete(id);

    res.json("Post deleted!");
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};