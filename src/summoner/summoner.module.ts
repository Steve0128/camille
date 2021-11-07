import { Module } from '@nestjs/common';
import { SummonerService } from './summoner.service';
import { SummonerController } from './summoner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SummonerSchema } from './summoner.schema';
import { HttpModule } from '@nestjs/axios';
import { SummonerRepository } from './summoner.repository';
import { ChampionService } from 'src/champion/champion.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
      }),
    }),
    MongooseModule.forFeature([{ name: 'Summoners', schema: SummonerSchema }]),
  ],
  controllers: [SummonerController],
  providers: [ChampionService, SummonerService, SummonerRepository],
  exports: [SummonerService],
})
export class SummonerModule {}
