import { Request, Response } from 'express';
import BlacklistedUserModel, { BlacklistedUser } from '../../../models/BlacklistedUser';

export const postBlacklistedUser = async (req: Request, res: Response) => {
  try {
    let blacklistedUser: BlacklistedUser | null = await BlacklistedUserModel.findOne({
      email: req.body.email,
    });

    if (blacklistedUser) res.status(400).json({ msg: 'User already exists in blacklist' });

    blacklistedUser = new BlacklistedUserModel({
      email: req.body.email,
    });

    await blacklistedUser.save();

    res.json({ blacklistedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};