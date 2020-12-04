import { Request, Response } from 'express';
import BlacklistedUserModel, { BlacklistedUser } from '../../../models/BlacklistedUser';

export const getBlacklistedUser = async (req: Request, res: Response) => {
    const blacklistedUser: BlacklistedUser | null = await BlacklistedUserModel.findById(
        req.params.blacklistedUserId
      );
  
    if (!blacklistedUser) res.status(404).json({ msg: 'Blacklisted User not found' });
  
    res.json(blacklistedUser);
  };