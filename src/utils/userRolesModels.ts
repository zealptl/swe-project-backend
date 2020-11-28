import CustomersModel from '../models/Customers';
import EmployeesModel from '../models/Employees';
import ManagersModel from '../models/Managers';

export default {
  customer: CustomersModel,
  chef: EmployeesModel,
  delivery: EmployeesModel,
  manager: ManagersModel,
} as any;
