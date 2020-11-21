import { Request, Response } from 'express';
import ReviewsModel, { Reviews } from '../../../models/Reviews';

export const getReviews = async (req: Request, res: Response) => {
  const reviews: Reviews[] | null = await ReviewsModel.find({});

  if (!reviews) res.status(404).json({ msg: 'Reviews not found' });

  res.json(reviews);
};
