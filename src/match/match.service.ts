import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';

@Injectable()
export class MatchService {
  constructor(private httpService: HttpService) {}
  //TODO: Extract only the properties I need from matches
  getMatchFromId(id: string) {
    return this.httpService
      .get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/${id}?api_key=${process.env.API_KEY}`,
      )
      .pipe(map((res: AxiosResponse) => res.data));
  }
}
