import { Request, Response, NextFunction } from 'express';

export default class Validations {
  public static validateEmailPassword(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return res.status(400).json({ message: 'All fields must be filled' });
    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (password.length < 6) return res.status(401).json({ message: 'Invalid email or password' });
    if (!regex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}
