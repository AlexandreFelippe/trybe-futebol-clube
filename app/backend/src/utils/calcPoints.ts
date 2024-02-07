import { IMatch } from '../Interfaces/matches/IMatch';

export function games(teamId: number, matches: IMatch[]) {
  return matches.filter(
    (match) => teamId === match.awayTeamId || teamId === match.homeTeamId,
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

export function allPoints(teamId: number, matches: IMatch[]) {
  return pointsHome(teamId, matches) + pointsAway(teamId, matches);
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
  return matches.filter((match) => match.homeTeamId === teamId)
    .reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
}

export function goalsOwnAway(teamId: number, matches: IMatch[]) {
  return matches.filter((match) => match.awayTeamId === teamId)
    .reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
}
