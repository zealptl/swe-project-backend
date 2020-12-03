import express from 'express';
import { getReviews } from './controllers/ReviewsControllers/getReviews';
import { getReview } from './controllers/ReviewsControllers/getReview';

const router = express.Router();
router.get('/', getReviews); // get all reviews
router.get('/:reviewId', getReview); // get particular review

export default router;
