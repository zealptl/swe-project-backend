import { Request, Response } from 'express';
import ReviewsModel, { Reviews } from '../../../models/Reviews';

export const getPendingReviews = async (req: Request, res: Response) => {
  const reviews: Reviews[] | null = await ReviewsModel.find({ isApproved : false });

  if (!reviews) res.status(404).json({ msg: 'Reviews not found' });

  res.json(reviews);
};