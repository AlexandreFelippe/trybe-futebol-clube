import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async getAll(req: Request, res: Response) {
    const { data } = await this.leaderboardService.getAll();
    return res.status(mapStatusHTTP('SUCCESSFUL')).json(data);
  }
}
