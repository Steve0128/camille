export interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: string;
  revisionDate: string;
  summonerLevel: number;
}

export interface SummonerDTO {
  username: string;
  champion?: string;
}
