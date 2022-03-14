import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { forkJoin, lastValueFrom } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ChampionService } from 'src/champion/champion.service';
import { MatchService } from 'src/match/match.service';
import { Summoner } from './summoner.interface';
import { SummonerRepository } from './summoner.repository';

@Injectable()
export class SummonerService {
  constructor(
    private readonly summonerRepository: SummonerRepository,
    private championService: ChampionService,
    private httpService: HttpService,
    private matchService: MatchService,
  ) {}

  //TODO: Handle the case where summoner is already in the DB
  findSummonerByUsername(username: string) {
    const usernameURI = encodeURIComponent(username);
    const user = this.httpService
      .get(
        `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${usernameURI}?api_key=${process.env.API_KEY}`,
      )
      .pipe(
        map((res: AxiosResponse) => {
          const userData = res.data as Summoner;
          return userData;
        }),
      );
    return user;
  }
  //TODO: Add summoner name to response, also handle the case where summoner is not already in the db
  async findChampionMastery(username: string, champion: string) {
    const summoner: Summoner = await lastValueFrom(this.findSummonerByUsername(username));
    return this.championService
      .getChampionId(champion)
      .pipe(
        switchMap((id) =>
          this.httpService
            .get(
              `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summoner.id}/by-champion/${id}?api_key=${process.env.API_KEY}`,
            )
            .pipe(map((res: AxiosResponse) => res.data)),
        ),
      );
  }
  async findAllChampionMastery(username: string) {
    
  }
  //TODO Let caller choose between 1-20 matches
  //TODO If you make too many requests axios gives error 429. Build custom http client to prevent this. For now, let's request 5
  async findSummonerMatchHistory(username: string) {
    const summoner: Summoner = await lastValueFrom(this.findSummonerByUsername(username));
    return this.httpService
      .get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${summoner.puuid}/ids?start=0&count=5&api_key=${process.env.API_KEY}`,
      )
      .pipe(
        switchMap((res: AxiosResponse) =>
          forkJoin(
            res.data.map((match) =>
              this.matchService
                .getMatchFromId(match)
                .pipe(map((match) => match)),
            ),
          ),
        ),
      );
  }
}
