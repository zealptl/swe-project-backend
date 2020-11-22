import express from 'express';
import { createCustomer } from './controllers/CustomerControllers/createCustomer';
import { getCustomers } from './controllers/CustomerControllers/getCustomers';
import { getCustomer } from './controllers/CustomerControllers/getCustomer';
import { deleteCustomer } from './controllers/CustomerControllers/deleteCustomer';
import { isUserAllowedMiddleware } from './middlewares/isUserAllowed';
import { isUserSignedInMiddleware } from './middlewares/isUserSignedIn';

const router = express.Router();
router.post('/', createCustomer);
router.get('/', getCustomers); // get all customers
router.get('/:customerId', getCustomer); // get particular customer
router.delete(
  '/:customerId',
  isUserSignedInMiddleware,
  isUserAllowedMiddleware(['manager', 'customer']),
  deleteCustomer
);
export default router;
