import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Injectable()
export class ChampionService {
  constructor(private httpService: HttpService) {}

  getChampionId(champion: string) {
    return this.httpService
      .get(
        `https://ddragon.leagueoflegends.com/cdn/11.21.1/data/en_US/champion/${champion}.json`,
      )
      .pipe(
        map((res) => {
          return res.data.data[champion].key;
        }),
      );
  }
}
