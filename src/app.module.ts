import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SummonerModule } from './summoner/summoner.module';
import { HttpModule } from '@nestjs/axios';
import { SummonerSchema } from './summoner/summoner.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://steve:admin@cluster0.c5ar9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      { useNewUrlParser: true },
    ),
    SummonerModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
