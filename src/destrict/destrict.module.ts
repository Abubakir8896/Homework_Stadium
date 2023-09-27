import { Module } from '@nestjs/common';
import { DestrictService } from './destrict.service';
import { DestrictController } from './destrict.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Destrict } from './models/destrict.model';

@Module({
  imports:[SequelizeModule.forFeature([Destrict])], 
  controllers: [DestrictController],
  providers: [DestrictService],
})
export class DestrictModule {}
