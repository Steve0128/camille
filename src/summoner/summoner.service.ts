import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { ChampionService } from 'src/champion/champion.service';
import { MatchService } from 'src/match/match.service';
import { Repository } from 'typeorm';
import { Summoner } from './summoner.entity';

@Injectable()
export class SummonerService {
  constructor(
    @InjectRepository(Summoner)
    private readonly summonerRepository: Repository<Summoner>,
    private championService: ChampionService,
    private httpService: HttpService,
    private matchService: MatchService,
  ) {}

  async findSummonerByUsername(username: string) {
    const usernameURI = encodeURIComponent(username);
    const summoner = await this.summonerRepository.findOne({
      summonerName: username
    })
    if(typeof summoner !== 'undefined')
    {
      return summoner;
    }
    else 
    {
      const summonerDetails = await firstValueFrom(this.httpService.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${usernameURI}?api_key=${process.env.API_KEY}`))
      const rankedDetails = await firstValueFrom(this.httpService.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerDetails.data.id}?api_key=${process.env.API_KEY}`))
      const soloQueueDetails = rankedDetails.data.find(queue => queue.queueType === "RANKED_SOLO_5x5")
      const flexQueueDetails = rankedDetails.data.find(queue => queue.queueType === "RANKED_FLEX_SR")
      const summoner : Summoner = {
        summonerName: summonerDetails.data.name,
        riotId: summonerDetails.data.id,
        riotAccountId: summonerDetails.data.accountId,
        riotPuuid: summonerDetails.data.puuid,
        profileIconId: summonerDetails.data.profileIconId,
        profileIconURL: `http://ddragon.leagueoflegends.com/cdn/12.14.1/img/profileicon/${summonerDetails.data.profileIconId}.png`,
        soloRank: soloQueueDetails.tier + " " + soloQueueDetails.rank,
        soloWins: soloQueueDetails.wins,
        soloLosses: soloQueueDetails.losses,
        soloRankIconURL: '',
        flexRank: flexQueueDetails.tier + " " + flexQueueDetails.rank,
        flexWins: flexQueueDetails.wins,
        flexLosses: flexQueueDetails.losses,
        flexRankIconURL: '',
        lastUpdatedDate: Date.now().toString(),
        summonerLevel: summonerDetails.data.summonerLevel
      }
      return summoner;
    }
  }
  async findAllChampionMastery(username: string) {
    
  }
}
