import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize'
import { Category } from './models/category.model';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category) private comfortRepo:typeof Category){}

    async createCategory(createCategoryDto:CreateCategoryDto): Promise<Category>{
        const category = await this.comfortRepo.create(createCategoryDto);
        return category
    }

    async findAllCategory():Promise<Category[]>{
        const category = await this.comfortRepo.findAll({include:{all:true}})
        return category
    }

    async findById(id:number):Promise<Category>{
        return this.comfortRepo.findByPk(id)
    }
    
    async deleteById(id:number):Promise<string>{
        const category = await  this.comfortRepo.destroy({where:{id}})
        return "Success"
    }

    async updateById(id:number, updateCategoryDto:UpdateCategoryDto){
        const category = await this.comfortRepo.update(updateCategoryDto,{where: {id},returning:true});
        return category[1][0]
    }
}