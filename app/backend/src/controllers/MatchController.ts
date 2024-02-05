import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const { status, data } = await this.matchService.getAllMatches();
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const { status, data } = await this.matchService.findByProgress(inProgress as string);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.finishMatch(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this
      .matchService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchService.createMatch({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    });
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
