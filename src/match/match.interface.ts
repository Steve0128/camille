export class Match {
  matchId: string;
  duration: string;
  gameMode: string;
  players: MatchPlayer[];
}

enum GameModes {}

export class MatchPlayer {
  summonerName: string;
  puuid: string;
  summonerId: string;
  championPlayed: string;
  championId: number;
  championLevel: number;
  teamId: number;
  kills: number;
  deaths: number;
  assists: number;
  creepScore: number;
  goldEarned: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  largestKillingSpree: number;
  position: string;
  damageDealtToChampions: number;
  profileIcon: number;
  summoner1Id: number;
  summoner2Id: number;
  visionScore: number;
  wardsPlaced: number;
  wardsKilled: number;
  win: boolean;
}

class PrimaryRunes {
  perk: number;
  var1: number;
}
