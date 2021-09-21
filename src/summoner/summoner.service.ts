import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'rxjs/operators';
import { Summoner } from './summoner.interface';
import { SummonerDocument } from './summoner.schema';

@Injectable()
export class SummonerService {
  constructor(
    @InjectModel('Summoners') private summonerModel: Model<SummonerDocument>,
    private httpService: HttpService,
  ) {}
  private readonly summoner: Summoner[] = [];

  findSummonerByUsername(username: string) {
    const usernameURI = encodeURIComponent(username);
    this.summonerModel.findOne({ username: username }).exec();
    return this.httpService
      .get(
        `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${usernameURI}?api_key=${process.env.API_KEY}`,
      )
      .pipe(map((res) => res.data));
  }
}
