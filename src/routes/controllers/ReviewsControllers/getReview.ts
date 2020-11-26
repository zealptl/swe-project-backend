import { Request, Response } from 'express';
import ReviewsModel, { Reviews } from '../../../models/Reviews';

export const getReview = async (req: Request, res: Response) => {
  const reviews: Reviews | null = await ReviewsModel.findById(
    req.params.reviewId
  );

  if (!reviews) res.status(404).json({ msg: 'Reviews not found' });

  res.json(reviews);
};
