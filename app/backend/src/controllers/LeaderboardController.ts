import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async getAllHome(req: Request, res: Response) {
    const { data } = await this.leaderboardService.getAllHome();
    return res.status(mapStatusHTTP('SUCCESSFUL')).json(data);
  }

  async getAllAway(req: Request, res: Response) {
    const { data } = await this.leaderboardService.getAllAway();
    return res.status(mapStatusHTTP('SUCCESSFUL')).json(data);
  }

  async getAllTotal(req: Request, res: Response) {
    const { data } = await this.leaderboardService.getAllTotal();
    return res.status(mapStatusHTTP('SUCCESSFUL')).json(data);
  }
}
