import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SummonerModule } from './summoner/summoner.module';
import { SummonerController } from './summoner/summoner.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SummonerModule,
  ],
  controllers: [SummonerController],
  providers: [],
})
export class AppModule {}
