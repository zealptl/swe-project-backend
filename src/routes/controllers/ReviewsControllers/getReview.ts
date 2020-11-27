import { Request, Response } from 'express';
import ReviewsModel, { Reviews } from '../../../models/Reviews';

export const getReview = async (req: Request, res: Response) => {
  const review: Reviews | null = await ReviewsModel.findById(
    req.params.reviewId
  );

  if (!review) res.status(404).json({ msg: 'Reviews not found' });

  res.json(review);
};
