import { IMatch } from '../Interfaces/matches/IMatch';
import ILeaderboard from '../Interfaces/leaderboardHome/Ileaderboard';

export function homeGames(teamId: number, matches: IMatch[]) {
  return matches.filter(
    (match) => teamId === match.homeTeamId,
  ).length;
}

export function awayGames(teamId: number, matches: IMatch[]) {
  return matches.filter(
    (match) => teamId === match.awayTeamId,
  ).length;
}

export function victoriesHome(teamId: number, matches: IMatch[]) {
  return matches.filter(
    (match) => match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals,
  ).length;
}

export function victoriesAway(teamId: number, matches: IMatch[]) {
  return matches.filter(
    (match) => match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals,
  ).length;
}

export function lossesHome(teamId: number, matches: IMatch[]) {
  return matches.filter(
    (match) => match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals,
  ).length;
}

export function lossesAway(teamId: number, matches: IMatch[]) {
  return matches.filter(
    (match) => match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals,
  ).length;
}

export function drawsHome(teamId: number, matches: IMatch[]) {
  return matches.filter(
    (match) => match.homeTeamId === teamId && match.homeTeamGoals === match.awayTeamGoals,
  ).length;
}

export function drawsAway(teamId: number, matches: IMatch[]) {
  return matches.filter(
    (match) => match.awayTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals,
  ).length;
}

export function pointsHome(teamId: number, matches: IMatch[]) {
  const victories = victoriesHome(teamId, matches) * 3;
  const draws = drawsHome(teamId, matches) * 1;
  const homePoints = victories + draws;
  return homePoints;
}

export function pointsAway(teamId: number, matches: IMatch[]) {
  const victories = victoriesAway(teamId, matches) * 3;
  const draws = drawsAway(teamId, matches) * 1;
  const totalPoints = victories + draws;
  return totalPoints;
}

export function goalsFavorHome(teamId: number, matches: IMatch[]) {
  return matches.filter((match) => match.homeTeamId === teamId)
    .reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
}

export function goalsFavorAway(teamId: number, matches: IMatch[]) {
  return matches.filter((match) => match.awayTeamId === teamId)
    .reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
}

export function goalsOwnHome(teamId: number, matches: IMatch[]) {
  const goals = matches.reduce((acc, curr) => {
    let sum = acc;
    if (curr.homeTeamId === teamId) sum += curr.awayTeamGoals;
    return sum;
  }, 0);
  return goals;
}

export function goalsOwnAway(teamId: number, matches: IMatch[]) {
  const goals = matches.reduce((acc, curr) => {
    let sum = acc;
    if (curr.awayTeamId === teamId) sum += curr.homeTeamGoals;
    return sum;
  }, 0);
  return goals;
}

export function goalsBalanceHome(teamId: number, matches: IMatch[]) {
  const GP = goalsFavorHome(teamId, matches);
  const GC = goalsOwnHome(teamId, matches);
  const data = GP - GC;
  return data;
}

export function goalsBalanceAway(teamId: number, matches: IMatch[]) {
  const GP = goalsFavorAway(teamId, matches);
  const GC = goalsOwnAway(teamId, matches);
  const data = GP - GC;
  return data;
}

export function efficiencyHome(teamId: number, matches: IMatch[]) {
  const totalPoints = pointsHome(teamId, matches);
  const totalGames = homeGames(teamId, matches);
  const data = (totalPoints / (totalGames * 3)) * 100;
  return data.toFixed(2);
}

export function efficiencyAway(teamId: number, matches: IMatch[]) {
  const totalPoints = pointsAway(teamId, matches);
  const totalGames = awayGames(teamId, matches);
  const data = (totalPoints / (totalGames * 3)) * 100;
  return data.toFixed(2);
}

export function sortTeams(team: ILeaderboard[]) {
  team.sort((a, b) => b.totalPoints - a.totalPoints
  || b.goalsBalance - a.goalsBalance
 || b.goalsFavor - a.goalsFavor);
}
