import { Request, Response } from 'express';
import DiscussionsModel, { Discussions } from '../../../models/Discussions';

export const getDiscussionPost = async (req: Request, res: Response) => {
  const discussionPost: Discussions | null = await DiscussionsModel.findById(req.params.discussionPostId);

  if (!discussionPost) res.status(404).json({ msg: 'Discussion post not found' });

  res.json(discussionPost);
};
