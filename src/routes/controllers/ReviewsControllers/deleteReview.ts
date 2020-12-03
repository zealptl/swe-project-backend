import { Request, Response } from 'express';
import ReviewsModel, { Reviews } from '../../../models/Reviews';

export const deleteReview = async (req: Request, res: Response) => {
  try {
    if (
      req.currentUser.role === 'manager' ||
      req.currentUser.id === req.query.reviewFromId
    ) {
      const review: Reviews | null = await ReviewsModel.findOneAndDelete(
        {
          _id: req.params.reviewId,
        }
      );

      if (!review) {
        return res.status(404).json({ msg: 'Review not found' });
      }

      res.json({ msg: 'Review deletion successful' });
    } else {
        res.status(401).json({ msg: 'Not authorized' });
      }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};