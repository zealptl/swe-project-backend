import express from 'express';
import { getReviews } from './controllers/ReviewsControllers/getReviews';
import { getReview } from './controllers/ReviewsControllers/getReview';

import { deleteReview } from './controllers/ReviewsControllers/deleteReview';
import { isUserSignedInMiddleware } from './middlewares/isUserSignedIn';
import { isUserAllowedMiddleware } from './middlewares/isUserAllowed';

const router = express.Router();
router.get('/', getReviews); // get all review
router.get('/:reviewId', getReview); // get particular review

router.delete(
    '/:reviewId',
    isUserSignedInMiddleware,
    isUserAllowedMiddleware(['manager', 'customer', 'delivery']),
    deleteReview
);

export default router;
