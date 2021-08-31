export interface Summoner {
  _id: string;
  accountId: string;
  puuid: string;
  username: string;
  profileIconId: string;
  revisionDate: string;
  summonerLevel: number;
}

export interface SummonerDTO {
  username: string;
  champion?: string;
}
