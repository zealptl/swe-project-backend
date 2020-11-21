import express from 'express';
import { getReviews } from './controllers/ReviewsControllers/getReviews';
import { getReview } from './controllers/ReviewsControllers/getReview';

const router = express.Router();
router.get('/', getReviews); // get all review
router.get('/:reviewId', getReview); // get particular review

export default router;
