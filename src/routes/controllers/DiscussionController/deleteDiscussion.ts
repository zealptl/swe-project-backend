import { Request, Response } from 'express';
import DiscussionsModel, { Discussions } from '../../../models/Discussions';
export const deleteDiscussion = async (req: Request, res: Response) => {
  try {
    if (
      req.currentUser.role === 'manager' ||
      req.currentUser.id === req.query.discussionFromId
    ) {
      const discussion: Discussions | null = await DiscussionsModel.findOneAndDelete(
        {
          _id: req.params.discussionId,
        }
      );

      if (!discussion) {
        return res.status(404).json({ msg: 'Discussion not found' });
      }

      res.json({ msg: 'Discussion deletion successful' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
