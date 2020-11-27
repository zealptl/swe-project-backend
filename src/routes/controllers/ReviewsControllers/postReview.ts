import { Request, Response } from 'express';
import ReviewsModel, { Reviews } from '../../../models/Reviews';

export const postReview = async (req: Request, res: Response) => {
  try {
    let review: Reviews = new ReviewsModel({
      review: req.body.review,
      reviewFrom: req.body.reviewFrom,
      reviewTo: req.body.reviewTo,
      starRating: req.body.starRating,
      type: req.body.type,
    });

    await review.save();

    res.json({ msg: 'Review posted!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};