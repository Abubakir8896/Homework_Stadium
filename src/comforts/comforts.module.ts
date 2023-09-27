import { Module } from '@nestjs/common';
import { ComfortsService } from './comforts.service';
import { ComfortsController } from './comforts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comfort } from './models/comfort.model';

@Module({
  imports:[SequelizeModule.forFeature([Comfort])], 
  controllers: [ComfortsController],
  providers: [ComfortsService],
})
export class ComfortsModule {}
