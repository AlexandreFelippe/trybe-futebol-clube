import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMachModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class MatchModel implements IMatchModel {
  private matchModel = SequelizeMatches;

  async findAll(): Promise<IMatch[]> {
    const matches = await this.matchModel.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'],
        },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'],
        },
      ],
      attributes: { exclude: ['homeTeamId', 'awayTeamId'] },
    });
    return matches;
  }

  async findByProgress(query: string): Promise<IMatch[]> {
    const progress = query === 'true';
    const matches = await this.matchModel.findAll({
      where: { inProgress: progress },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'],
        },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'],
        },
      ],
      attributes: { exclude: ['home_Team_Id', 'away_Team_Id'] },
    });
    return matches;
  }
}
