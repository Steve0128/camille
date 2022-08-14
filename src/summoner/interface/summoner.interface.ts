export interface Summoner {
  id: string;
  summonerName: string;
  riotId: string;
  riotAccountId: string;
  riotPuuid: string;
  profileIconId: number;
  lastUpdatedDate: string;
  summonerLevel: number;
}

export interface SummonerDTO {
  username: string;
  champion?: string;
}
