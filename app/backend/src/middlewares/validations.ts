import { Request, Response, NextFunction } from 'express';

export default class Validations {
  public static validateEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email) return res.status(400).json({ message: 'Invalid email or password' });
    if (!regex.test(email)) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  }

  public static validatePassword(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (password.length < 6) return res.status(401).json({ message: 'Invalid email or password' });
    next();
  }
}
