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

  public static validateMatch = (req: Request, res: Response, next: NextFunction) => {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    if (homeTeamId.status === 'NOT_FOUND' || awayTeamId === 'NOT_FOUND') {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  };
}
