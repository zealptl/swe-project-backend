import { Request, Response } from 'express';
import BlacklistedUserModel, { BlacklistedUser } from '../../../models/BlacklistedUser';

export const getBlacklistedUsers = async (req: Request, res: Response) => {
    const blacklistedUser: BlacklistedUser[] | null = await BlacklistedUserModel.find({});
  
    if (!blacklistedUser) res.status(404).json({ msg: 'Blacklisted Users not found' });
  
    res.json(blacklistedUser);
  };