import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import {
  games,
  victoriesHome,
  lossesHome,
  drawsHome,
  allPoints,
  goalsFavorHome,
  goalsOwnHome,
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
      games: games(team.id, matches),
      victories: victoriesHome(team.id, matches),
      losses: lossesHome(team.id, matches),
      draws: drawsHome(team.id, matches),
      allPoints: allPoints(team.id, matches),
      goalsFavor: goalsFavorHome(team.id, matches),
      goalsOwn: goalsOwnHome(team.id, matches),
    }));
    return { status: 200, data: leaderboard };
  }
}
