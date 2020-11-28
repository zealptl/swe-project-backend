import express from 'express';
import { createManager } from './controllers/ManagerControllers/createManager';
import { getManager } from './controllers/ManagerControllers/getManager';
import { approveCustomer } from './controllers/ManagerControllers/approveCustomer';
import { hireEmployee } from './controllers/ManagerControllers/hireEmployee';
import { handleReviewWithMerit } from './controllers/ManagerControllers/handleReviewWithMerit';
import { handleReviewWithoutMerit } from './controllers/ManagerControllers/handleReviewWithoutMerit';
import { flagDiscussion } from './controllers/ManagerControllers/flagDiscussion';


const router = express.Router();
router.post('/', createManager);
router.get('/:managerId', getManager);
router.post('/approve/:customerId', approveCustomer);
router.post('/hire/:employeeId', hireEmployee);
router.post('/reviewWithMerit/:reviewId', handleReviewWithMerit);
router.post('/reviewWithoutMerit/:reviewId', handleReviewWithoutMerit);
router.post('/discussion/:discussionPostId', flagDiscussion);


export default router;