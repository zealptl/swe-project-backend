import { Request, Response } from 'express';
import EmployeesModel, { Employees } from '../../../models/Employees';

export const getEmployees = async (req: Request, res: Response) => {
  const employees: Employees[] | null = await EmployeesModel.find({}).select(
    '-password'
  );

  if (!employees) res.status(404).json({ msg: 'Employees not found' });

  res.json(employees);
};
