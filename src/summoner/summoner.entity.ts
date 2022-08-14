import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Summoner{
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  summonerName: string;

  @Column()
  riotId: string;

  @Column()
  riotAccountId: string;

  @Column()
  riotPuuid: string;

  @Column()
  profileIconId: string;

  @Column()
  profileIconURL: string;

  @Column()
  soloRank: string;

  @Column()
  soloWins: number;

  @Column()
  soloLosses: number;

  @Column()
  soloRankIconURL: string;

  @Column()
  flexRank: string;

  @Column()
  flexWins: number;

  @Column()
  flexLosses: number;

  @Column()
  flexRankIconURL: string;

  @Column()
  lastUpdatedDate: string;

  @Column()
  summonerLevel: number;

  @Column({nullable: true})
  isProfessional?: boolean;
}