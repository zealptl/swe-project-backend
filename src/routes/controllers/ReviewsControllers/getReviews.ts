import { Request, Response } from 'express';
import ReviewsModel, { Reviews } from '../../../models/Reviews';

export const getReviews = async (req: Request, res: Response) => {
  const query: any = { isApproved : false };
  if (req.query.reviewFrom) query.reviewFrom = req.query.reviewFrom;

  if (req.query.reviewTo) query.reviewTo = req.query.reviewTo;

  if (req.query.type) query.type = req.query.type;

  if (req.query.needToBeHandled)
    query.needToBeHandled = req.query.needToBeHandled;

  const reviews: Reviews[] | null = await ReviewsModel.find(query);

  if (reviews.length == 0) res.status(404).json({ msg: 'Reviews not found' });

  res.json(reviews);
};
