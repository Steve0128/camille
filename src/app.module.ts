import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SummonerModule } from './summoner/summoner.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI, { useNewUrlParser: true }),
    SummonerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
