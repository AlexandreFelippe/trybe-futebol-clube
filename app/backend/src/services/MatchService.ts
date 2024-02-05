import MatchesModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel = new MatchesModel(),
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
    if (newMatchData.homeTeamId === newMatchData.awayTeamId) {
      return { status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    if (!newMatchData.homeTeamId || !newMatchData.awayTeamId) {
      return { status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' } };
    }

    const newMatch = await this.matchModel.createMatch({ ...newMatchData, inProgress: true,
    });

    return { status: 'CREATED', data: newMatch };
  }
}
