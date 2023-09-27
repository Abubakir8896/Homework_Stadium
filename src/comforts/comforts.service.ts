import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { Comfort } from './models/comfort.model';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { CreateComfortDto } from './dto/create-comfort.dto';

@Injectable()
export class ComfortsService {
    constructor(@InjectModel(Comfort) private comfortRepo:typeof Comfort){}

    async createComfort(createComfortDto:CreateComfortDto): Promise<Comfort>{
        const comfort = await this.comfortRepo.create(createComfortDto);
        return comfort
    }

    async findAllComfort():Promise<Comfort[]>{
        const comfort = await this.comfortRepo.findAll({include:{all:true}})
        return comfort
    }

    async findById(id:number):Promise<Comfort>{
        return this.comfortRepo.findByPk(id)
    }
    
    async deleteById(id:number):Promise<string>{
        const comfort = await  this.comfortRepo.destroy({where:{id}})
        return "Success"
    }

    async updateById(id:number, updateComfortDto:UpdateComfortDto){
        const machine = await this.comfortRepo.update(updateComfortDto,{where: {id},returning:true});
        return machine[1][0]
    }
}