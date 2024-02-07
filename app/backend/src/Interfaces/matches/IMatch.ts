import { Identifiable } from '..';

export interface IMatch extends Identifiable {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchWithTeams extends IMatch {
  homeTeam: {
    teamName: string;
  };
  awayTeam: {
    teamName: string;
  };
}
