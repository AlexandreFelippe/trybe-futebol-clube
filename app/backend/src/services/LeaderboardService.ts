import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import {
  homeGames,
  victoriesHome,
  lossesHome,
  drawsHome,
  pointsHome,
  goalsFavorHome,
  goalsOwnHome,
  goalsBalanceHome,
  efficiencyHome,
  sortTeams,
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
      totalPoints: pointsHome(team.id, matches),
      totalGames: homeGames(team.id, matches),
      totalVictories: victoriesHome(team.id, matches),
      totalDraws: drawsHome(team.id, matches),
      totalLosses: lossesHome(team.id, matches),
      goalsFavor: goalsFavorHome(team.id, matches),
      goalsOwn: goalsOwnHome(team.id, matches),
      goalsBalance: goalsBalanceHome(team.id, matches),
      efficiency: efficiencyHome(team.id, matches),
    }));
    sortTeams(leaderboard);
    return { status: 'SUCCESFULL', data: leaderboard };
  }
}
