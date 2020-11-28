import { Request, Response } from 'express';
import ManagersModel, { Managers } from '../../../models/Managers';
const bcryptjs = require('bcryptjs');

export const createManager = async (req: Request, res: Response) => {
  try {
    let manager: Managers | null = await ManagersModel.findOne({
      email: req.body.email,
    });

    if (manager) res.status(400).json({ msg: 'Manager already exists' });

    manager = new ManagersModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });

    const salt = await bcryptjs.genSalt(10);

    manager.password = await bcryptjs.hash(manager.password, salt);

    await manager.save();

    res.json({ manager: manager });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};
