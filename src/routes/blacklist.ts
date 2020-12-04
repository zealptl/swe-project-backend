import express from 'express';

import { getBlacklistedUser } from './controllers/BlacklistControllers/getBlacklistedUser';
import { getBlacklistedUsers } from './controllers/BlacklistControllers/getBlacklistedUsers';
import { postBlacklistedUser } from './controllers/BlacklistControllers/postBlacklistedUser';

const router = express.Router();
router.get('/', getBlacklistedUsers); // get all reviews
router.get('/:blacklistId', getBlacklistedUser); // get particular blacklisted user
router.post('/', postBlacklistedUser); // add user to blacklist

export default router;
