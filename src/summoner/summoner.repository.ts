import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SummonerDocument } from './summoner.schema';
import { Summoner } from './summoner.interface';

@Injectable()
export class SummonerRepository {
  constructor(
    @InjectModel('Summoners') private summonerModel: Model<SummonerDocument>,
  ) {}
  public async registerSummoner(summoner: Summoner): Promise<void> {
    this.summonerModel.create({
      id: summoner.id,
      accountId: summoner.accountId,
      puuid: summoner.puuid,
      name: summoner.name,
      profileIconId: summoner.profileIconId,
      revisionDate: summoner.revisionDate,
      summonerLevel: summoner.summonerLevel,
    });
  }
  public async findSummoner(username: string) {
    return this.summonerModel.findOne({ name: username }, (err, docs) => {
      if (err) {
      } else {
        return docs as Summoner;
      }
    });
  }
}
