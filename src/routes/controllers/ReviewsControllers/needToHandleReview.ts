import { Request, Response } from 'express';
import ReviewsModel, { Reviews } from '../../../models/Reviews';

export const needToHandleReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.reviewId;

    console.log('In need to handle');
    const updatedReview: Reviews | null = await ReviewsModel.findByIdAndUpdate(
      id,
      { needToBeHandled: true },
      { new: true }
    );

    if (!updatedReview)
      return res.status(404).json({ msg: 'Review not found' });

    res.json(updatedReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
