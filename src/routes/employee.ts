import express from 'express';
import { createEmployee } from './controllers/EmployeeControllers/createEmployee';
import { getEmployees } from './controllers/EmployeeControllers/getEmployees';
import { getEmployee } from './controllers/EmployeeControllers/getEmployee';
import { deleteEmployee } from './controllers/EmployeeControllers/deleteEmployee';
import { isUserAllowedMiddleware } from './middlewares/isUserAllowed';
import { isUserSignedInMiddleware } from './middlewares/isUserSignedIn';

const router = express.Router();

router.post('/', createEmployee);
router.get('/', getEmployees);
router.get('/:employeeId', getEmployee);
router.delete(
  '/:employeeId',
  isUserSignedInMiddleware,
  isUserAllowedMiddleware(['manager', 'chef', 'delivery']),
  deleteEmployee
);
export default router;
