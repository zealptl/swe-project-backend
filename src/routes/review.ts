import express from 'express';
import { getReviews } from './controllers/ReviewsControllers/getReviews';
import { getReview } from './controllers/ReviewsControllers/getReview';

import { deleteReview } from './controllers/ReviewsControllers/deleteReview';
import { isUserSignedInMiddleware } from './middlewares/isUserSignedIn';
import { isUserAllowedMiddleware } from './middlewares/isUserAllowed';
import { postReview } from './controllers/ReviewsControllers/postReview';

const router = express.Router();
router.get('/', getReviews); // get all reviews
router.get('/:reviewId', getReview); // get particular review
router.post('/', postReview); // add review
router.delete(
    '/:reviewId',
    isUserSignedInMiddleware,
    isUserAllowedMiddleware(['manager', 'customer', 'delivery']),
    deleteReview
);

export default router;
