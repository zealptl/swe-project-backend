import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

export const isUserSignedInMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('x-auth-token');

  if (!token)
    return res.status(401).json({ msg: 'No token. Authorization denied.' });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    req.currentUser = decoded.currentUser;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
