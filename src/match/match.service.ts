import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { Match, MatchPlayer } from './match.interface';

@Injectable()
export class MatchService {
  constructor(private httpService: HttpService) {}
  //TODO: Extract only the properties I need from matches
  getMatchFromId(id: string) {
    return this.httpService
      .get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${process.env.API_KEY}`,
      )
      .pipe(
        map((match: AxiosResponse) => {
          const players: MatchPlayer[] = [];
          for (const participant of match.data.info.participants) {
            const player: MatchPlayer = {
              summonerName: participant.summonerName,
              puuid: participant.puuid,
              summonerId: participant.summonerId,
              championPlayed: participant.championName,
              championId: participant.championId,
              championLevel: participant.champLevel,
              teamId: participant.teamId,
              kills: participant.kills,
              deaths: participant.deaths,
              assists: participant.assists,
              creepScore: participant.totalMinionsKilled,
              goldEarned: participant.goldEarned,
              item0: participant.item0,
              item1: participant.item1,
              item2: participant.item2,
              item3: participant.item3,
              item4: participant.item4,
              item5: participant.item5,
              item6: participant.item6,
              largestKillingSpree: participant.largestKillingSpree,
              position: participant.teamPosition,
              damageDealtToChampions: participant.totalDamageDealtToChampions,
              profileIcon: participant.profileIcon,
              summoner1Id: participant.summoner1Id,
              summoner2Id: participant.summoner2Id,
              visionScore: participant.visionScore,
              wardsPlaced: participant.wardsPlaced,
              wardsKilled: participant.wardsKilled,
              win: participant.win,
            };
            players.push(player);
          }

          const condensedMatch: Match = {
            matchId: match.data.metadata.matchId,
            duration: match.data.info.gameDuration,
            gameMode: 'SR',
            players: players,
          };
          return condensedMatch;
        }),
      );
  }
}
