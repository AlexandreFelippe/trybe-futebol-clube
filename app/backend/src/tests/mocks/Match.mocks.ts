const matchGames = [{

  "id": 5,
  "homeTeamId": 1,
  "homeTeamGoals": 2,
  "awayTeamId": 5,
  "awayTeamGoals": 0,
  "inProgress": false,
  "homeTeam": {
    "teamName": "Avaí/Kindermann"
  },
  "awayTeam": {
    "teamName": "Cruzeiro"
  }
},
{
  "id": 22,
  "homeTeamId": 7,
  "homeTeamGoals": 1,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
  "homeTeam": {
    "teamName": "Flamengo"
  },
  "awayTeam": {
    "teamName": "Gremio"
  }
}
];

const finishedGame = [
  {
    "id": 22,
    "homeTeamId": 7,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 2,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Flamengo"
    },
    "awayTeam": {
      "teamName": "Gremio"
    }
  }
]

export { 
  matchGames,
  finishedGame,
};