import { Request, Response } from 'express';
import EmployeesModel, { Employees } from '../../../models/Employees';

export const getEmployee = async (req: Request, res: Response) => {
  const employee: Employees | null = await EmployeesModel.findOne({
    _id: req.params.employeeId,
  }).select('-password');

  if (!employee) res.status(404).json({ msg: 'Employees not found' });

  res.json(employee);
};
