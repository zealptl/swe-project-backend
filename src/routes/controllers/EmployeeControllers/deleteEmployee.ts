import { Request, Response } from 'express';
import EmployeesModel, { Employees } from '../../../models/Employees';

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    if (
      req.currentUser.role === 'manager' ||
      req.currentUser.id === req.params.employeeId
    ) {
      const employee: Employees | null = await EmployeesModel.findOneAndDelete({
        _id: req.params.employeeId,
      });

      if (!employee) {
        return res.status(404).json({ msg: 'Employee not found' });
      }

      res.json({ msg: 'Account deletion successful' });
    } else {
      return res.status(401).json({ msg: 'Not authorized' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
