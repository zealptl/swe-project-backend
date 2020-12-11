import { Request, Response } from 'express';
import userRoles from '../../../utils/userRolesModels';

export const getSignedInUser = async (req: Request, res: Response) => {
  try {
    const userRole: any = req.currentUser.role;

    const user: any = await userRoles[userRole]
      .findById(req.currentUser.id)
      .select('-password');

    res.json({user, userRole});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
