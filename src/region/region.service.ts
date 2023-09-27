import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { Region } from './models/region.model';
import { UpdateRegionDto } from './dto/update-region.dto';
import { CreateRegionDto } from './dto/create-region.dto';
@Injectable()
export class RegionService {
    constructor(@InjectModel(Region) private comfortRepo:typeof Region){}

    async createRegion(createRegionDto:CreateRegionDto): Promise<Region>{
        const region = await this.comfortRepo.create(createRegionDto);
        return region
    }

    async findAllRegion():Promise<Region[]>{
        const region = await this.comfortRepo.findAll({include:{all:true}})
        return region
    }

    async findById(id:number):Promise<Region>{
        return this.comfortRepo.findByPk(id)
    }
    
    async deleteById(id:number):Promise<string>{
        const region = await  this.comfortRepo.destroy({where:{id}})
        return "Success"
    }

    async updateById(id:number, updateRegionDto:UpdateRegionDto){
        const region = await this.comfortRepo.update(updateRegionDto,{where: {id},returning:true});
        return region[1][0]
    }
}