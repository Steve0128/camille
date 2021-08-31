import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SummonerDocument = Summoner & Document;

@Schema()
export class Summoner {
  @Prop()
  id: string;

  @Prop()
  accountId: string;

  @Prop({ required: true })
  puuid: string;

  @Prop()
  name: string;

  @Prop()
  profileIconId: number;

  @Prop()
  revisionDate: string;

  @Prop()
  summonerLevel: number;
}

export const SummonerSchema = SchemaFactory.createForClass(Summoner);
