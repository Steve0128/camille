import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SummonerModule } from './summoner/summoner.module';
import { SummonerController } from './summoner/summoner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SummonerModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [SummonerController],
  providers: [],
})
export class AppModule {}
