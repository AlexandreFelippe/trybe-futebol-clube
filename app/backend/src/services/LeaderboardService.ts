import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import {
  homeGames,
  awayGames,
  victoriesHome,
  victoriesAway,
  lossesHome,
  lossesAway,
  drawsHome,
  drawsAway,
  pointsHome,
  pointsAway,
  goalsFavorHome,
  goalsFavorAway,
  goalsOwnHome,
  goalsOwnAway,
  goalsBalanceHome,
  goalsBalanceAway,
  efficiencyHome,
  efficiencyAway,
  sortTeams,
} from '../utils/calcPoints';

export default class LeaderboardService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) {}

  async getAllHome() {
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

  async getAllAway() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findByProgress('false');
    const leaderboard = teams.map((team) => ({
      name: team.teamName,
      totalPoints: pointsAway(team.id, matches),
      totalGames: awayGames(team.id, matches),
      totalVictories: victoriesAway(team.id, matches),
      totalDraws: drawsAway(team.id, matches),
      totalLosses: lossesAway(team.id, matches),
      goalsFavor: goalsFavorAway(team.id, matches),
      goalsOwn: goalsOwnAway(team.id, matches),
      goalsBalance: goalsBalanceAway(team.id, matches),
      efficiency: efficiencyAway(team.id, matches),
    }));
    sortTeams(leaderboard);
    return { status: 'SUCCESFULL', data: leaderboard };
  }
}
