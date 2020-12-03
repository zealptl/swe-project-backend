import { Request, Response } from 'express';
import ManagersModel, { Managers } from '../../../models/Managers';

export const getManager = async (req: Request, res: Response) => {
  const manager: Managers | null = await ManagersModel.findOne({
    _id: req.params.managerId,
  }).select('-password');

  if (!manager) res.status(404).json({ msg: 'Manager not found' });

  res.json(manager);
};
