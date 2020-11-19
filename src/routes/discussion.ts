import express from 'express';
import { postToDiscussion } from './controllers/DiscussionController/postToDiscussion';
import { getDiscussions } from './controllers/DiscussionController/getDiscussions';
import { updateDiscussion } from './controllers/DiscussionController/updateDiscussion';


const router = express.Router();
router.post('/', postToDiscussion);
router.get('/', getDiscussions);
router.patch('/:discussionPostId', updateDiscussion);

export default router;
