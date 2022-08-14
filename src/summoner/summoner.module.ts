import { Module } from '@nestjs/common';
import { SummonerService } from './summoner.service';
import { SummonerController } from './summoner.controller';

import { HttpModule } from '@nestjs/axios';
import { SummonerRepository } from './summoner.repository';
import { ChampionService } from 'src/champion/champion.service';
import { MatchService } from 'src/match/match.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Summoner } from './summoner.entity';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
      }),
    }),
    TypeOrmModule.forFeature([Summoner])
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
