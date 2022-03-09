import { Body, Controller, Get } from '@nestjs/common';
import { Summoner, SummonerDTO } from './summoner.interface';
import { SummonerService } from './summoner.service';

@Controller('summoner')
export class SummonerController {
  constructor(private readonly summonerService: SummonerService) {}

  @Get('/')
  findSummonerByUsername(@Body() summonerDTO: SummonerDTO) {
    return this.summonerService.findSummonerByUsername(summonerDTO.username);
  }
  @Get('/matchHistory')
  async findSummonerMatchHistory(@Body() summonerDTO: SummonerDTO) {
    return this.summonerService.findSummonerMatchHistory(summonerDTO.username);
  }
  @Get('/championMastery')
  findSummonerChampionMastery(@Body() summonerDTO: SummonerDTO) {
    return this.summonerService.findChampionMastery(
      summonerDTO.username,
      summonerDTO.champion,
    );
  }
}
