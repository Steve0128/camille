import { Module } from '@nestjs/common';
import { SummonerService } from './summoner.service';
import { SummonerController } from './summoner.controller';

import { HttpModule } from '@nestjs/axios';
import { SummonerRepository } from './summoner.repository';
import { ChampionService } from 'src/champion/champion.service';
import { MatchService } from 'src/match/match.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
      }),
    }),
  ],
  controllers: [SummonerController],
  providers: [
    ChampionService,
    SummonerService,
    SummonerRepository,
    MatchService,
  ],
  exports: [SummonerService],
})
export class SummonerModule {}
