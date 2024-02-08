import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import {
  games,
  victoriesHome,
  victoriesAway,
  lossesHome,
  lossesAway,
  drawsHome,
  drawsAway,
  allPoints,
  goalsFavorHome,
  goalsFavorAway,
  goalsOwnHome,
  goalsOwnAway,
} from '../utils/calcPoints';

export default class LeaderboardService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) {}

  async getAll() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findByProgress('false');
    const leaderboard = teams.map((team) => ({
      name: team.teamName,
      totalPoints: allPoints(team.id, matches),
      totalGames: games(team.id, matches),
      totalVictories: victoriesHome(team.id, matches) + victoriesAway(team.id, matches),
      totalDraws: drawsHome(team.id, matches) + drawsAway(team.id, matches),
      totalLosses: lossesHome(team.id, matches) + lossesAway(team.id, matches),
      goalsFavor: goalsFavorHome(team.id, matches) + goalsFavorAway(team.id, matches),
      goalsOwn: goalsOwnHome(team.id, matches) + goalsOwnAway(team.id, matches),
    }));
    return { status: 'SUCCESFULL', data: leaderboard };
  }
}
