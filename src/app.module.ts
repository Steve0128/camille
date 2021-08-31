import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SummonerController } from './summoner/summoner.controller';
import { SummonerSchema } from './summoner/summoner.schema';
import { SummonerService } from './summoner/summoner.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
      }),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://steve:admin@cluster0.c5ar9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      { useNewUrlParser: true },
    ),
    MongooseModule.forFeature([{ name: 'Summoner', schema: SummonerSchema }]),
  ],
  controllers: [AppController, SummonerController],
  providers: [AppService, SummonerService],
})
export class AppModule {}
