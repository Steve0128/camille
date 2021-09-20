import { Module } from '@nestjs/common';
import { SummonerService } from './summoner.service';
import { SummonerController } from './summoner.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { SummonerSchema } from './summoner.schema';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
      }),
    }),
    MongooseModule.forRoot('', { useNewUrlParser: true }),
    MongooseModule.forFeature([{ name: 'Summoner', schema: SummonerSchema }]),
  ],
  controllers: [SummonerController],
  providers: [SummonerService],
})
export class SummonerModule {}
