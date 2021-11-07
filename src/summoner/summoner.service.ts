import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, switchMap } from 'rxjs/operators';
import { ChampionService } from 'src/champion/champion.service';
import { Summoner } from './summoner.interface';
import { SummonerRepository } from './summoner.repository';

@Injectable()
export class SummonerService {
  constructor(
    private readonly summonerRepository: SummonerRepository,
    private championService: ChampionService,
    private httpService: HttpService,
  ) {}
  private readonly summoner: Summoner[] = [];
  private readonly finalJson: any = [];

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
          // this.summonerRepository.findSummoner(userData.name);
          this.summonerRepository.registerSummoner(userData);
          return userData;
        }),
      );
    //this.summonerRepository.registerSummoner;
    return user;
  }
  //TODO: Add summoner name to response, also handle the case where summoner is not already in the db
  async getChampionMastery(username: string, champion: string) {
    const user = await this.summonerRepository.findSummoner(username);
    return this.championService
      .getChampionId(champion)
      .pipe(
        switchMap((id) =>
          this.httpService
            .get(
              `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${user.id}/by-champion/${id}?api_key=${process.env.API_KEY}`,
            )
            .pipe(map((res: AxiosResponse) => res.data)),
        ),
      );
  }
  async getSummonerMatchHistory(username: string) {
    const user = await this.summonerRepository.findSummoner(username);
    // console.log(puuid);
    return this.httpService
      .get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${user.puuid}/ids?start=0&count=20&api_key=${process.env.API_KEY}`,
      )
      .pipe(
        map((res: AxiosResponse) => {
          return res.data;
        }),
      );
    //this.summonerRepository.registerSummoner;
  }
}
