import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public async getAllMatches(_req: Request, res: Response) {
    const matches = await this.matchService.getAllMatches();
    return res.status(200).json(matches);
  }
}
