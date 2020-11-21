import { Request, Response } from 'express';
import DiscussionsModel, { Discussions } from '../../../models/Discussions';

export const getDiscussions = async (req: Request, res: Response) => {
    const discussions: Discussions[] | null = await DiscussionsModel.find({});
  
    if (!discussions) res.status(404).json({ msg: 'Discussions not found' });
  
    res.json(discussions);
  };
  