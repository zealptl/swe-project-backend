import { Request, Response, NextFunction } from 'express';

export const isUserAllowedMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.currentUser.role)) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    next();
  };
};
