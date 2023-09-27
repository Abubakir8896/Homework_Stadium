import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { Destrict } from './models/destrict.model';
import { UpdateDestrictDto } from './dto/update-destrict.dto';
import { CreateDestrictDto } from './dto/create-destrict.dto';

@Injectable()
export class DestrictService {
    constructor(@InjectModel(Destrict) private comfortRepo:typeof Destrict){}

    async createDestrict(createDestrictDto:CreateDestrictDto): Promise<Destrict>{
        const destrict = await this.comfortRepo.create(createDestrictDto);
        return destrict
    }

    async findAllDestrict():Promise<Destrict[]>{
        const destrict = await this.comfortRepo.findAll({include:{all:true}})
        return destrict
    }

    async findById(id:number):Promise<Destrict>{
        return this.comfortRepo.findByPk(id)
    }
    
    async deleteById(id:number):Promise<string>{
        const destrict = await  this.comfortRepo.destroy({where:{id}})
        return "Success"
    }

    async updateById(id:number, updateDestrictDto:UpdateDestrictDto){
        const category = await this.comfortRepo.update(updateDestrictDto,{where: {id},returning:true});
        return category[1][0]
    }
}