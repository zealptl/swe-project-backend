import express from 'express';
import { postToDiscussion } from './controllers/DiscussionController/postToDiscussion';
import { getDiscussions } from './controllers/DiscussionController/getDiscussions';
import { getDiscussionPost } from './controllers/DiscussionController/getDiscussionPost';
import { updateDiscussion } from './controllers/DiscussionController/updateDiscussion';
import { deleteDiscussionPost } from './controllers/DiscussionController/deleteDiscussionPost';


const router = express.Router();
router.post('/', postToDiscussion);
router.get('/', getDiscussions);
router.get('/:discussionPostId', getDiscussionPost);
router.patch('/:discussionPostId', updateDiscussion);
router.delete('/:discussionPostId', deleteDiscussionPost);

export default router;
