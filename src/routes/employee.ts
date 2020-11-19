import express from 'express';
import { createEmployee } from './controllers/EmployeeControllers/createEmployee';
import { getEmployees } from './controllers/EmployeeControllers/getEmployees';
import { getEmployee } from './controllers/EmployeeControllers/getEmployee';
const router = express.Router();

router.post('/', createEmployee);
router.get('/', getEmployees);
router.get('/:employeeId', getEmployee);

export default router;
