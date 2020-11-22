import express from 'express';
import { postToDiscussion } from './controllers/DiscussionController/postToDiscussion';
import { getDiscussions } from './controllers/DiscussionController/getDiscussions';
import { updateDiscussion } from './controllers/DiscussionController/updateDiscussion';
import { deleteDiscussion } from './controllers/DiscussionController/deleteDiscussion';
import { isUserSignedInMiddleware } from './middlewares/isUserSignedIn';
import { isUserAllowedMiddleware } from './middlewares/isUserAllowed';

const router = express.Router();
router.post('/', postToDiscussion);
router.get('/', getDiscussions);
router.patch('/:discussionPostId', updateDiscussion);
router.delete(
  '/:discussionId',
  isUserSignedInMiddleware,
  isUserAllowedMiddleware(['manager', 'customer', 'chef', 'delivery']),
  deleteDiscussion
);

export default router;
