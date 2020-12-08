import { Request, Response } from 'express';
import ReviewsModel, { Reviews } from '../../../models/Reviews';

export const getAverageMenuItemRating = async (req: Request, res: Response) => {
  try {
    const reviews: Reviews[] | null = await ReviewsModel.find({
      reviewTo: req.params.menuItemId,
    });

    if (reviews.length === 0)
      return res.status(404).json({ msg: 'Reviews not found' });

    const totalRatings = reviews.reduce(
      (sum, review) => sum + review.starRating,
      0
    );

    const averageRating = (totalRatings / reviews.length).toFixed(1);

    res.json(averageRating);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
