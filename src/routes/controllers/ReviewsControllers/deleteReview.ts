import { Request, Response } from 'express';
import ReviewsModel, { Reviews } from '../../../models/Reviews';

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review: Reviews | null = await ReviewsModel.findOneAndDelete(
      {
        _id: req.params.reviewId,
      }
    );

    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }

    res.json({ msg: 'Review deletion successful' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};