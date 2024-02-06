import MatchesModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  constructor(
    private matchModel = new MatchesModel(),
    private teamModel = new TeamModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async findByProgress(query: string): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findByProgress(query);
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async finishMatch(id: number): Promise<ServiceResponse<{ message: string }>> {
    await this.matchModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<ServiceResponse<{ message: string }>> {
    await this.matchModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async createMatch(newMatchData: {
    homeTeamId: number;
    awayTeamId: number;
    homeTeamGoals: number;
    awayTeamGoals: number;
  }): Promise<ServiceResponse<IMatch>> {
    const homeTeamId = await this.teamModel.findById(newMatchData.homeTeamId);
    const awayTeamId = await this.teamModel.findById(newMatchData.awayTeamId);
    if (!homeTeamId || !awayTeamId) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.matchModel.createMatch({ ...newMatchData, inProgress: true,
    });

    return { status: 'CREATED', data: newMatch };
  }
}
