import { Request, Response } from 'express';
import EmployeesModel, { Employees } from '../../../models/Employees';

export const getPendingEmployees = async (req: Request, res: Response) => {
  const employees: Employees[] | null = await EmployeesModel.find({ isApproved : false }).select(
    '-password'
  );
 
  if (!employees) res.status(404).json({ msg: 'Employees not found' });

  res.json(employees);
};