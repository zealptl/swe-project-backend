import { Request, Response } from 'express';

export const healthMiddleware = (req: Request, res: Response) => {
  res.json({ msg: 'Software Engineering Project Backend is live!' });
};
