import { Module } from '@nestjs/common';
import { SummonerService } from './summoner.service';
import { SummonerController } from './summoner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SummonerSchema } from './summoner.schema';
import { HttpModule } from '@nestjs/axios';

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
  providers: [SummonerService],
  exports: [SummonerService],
})
export class SummonerModule {}
