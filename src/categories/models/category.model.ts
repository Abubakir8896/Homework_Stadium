import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType} from 'sequelize-typescript'

interface CategoryAttr{
    name: string,
    parent_id:number
}

@Table({tableName: 'categories'})
export class Category extends Model<Category, CategoryAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"Eshmat", description:"Comfort nomi"})
    @Column({
        type: DataType.STRING
    })
    name: string;


    @ApiProperty({example:"1",description:"Parent_idsi"})
    @Column({
        type: DataType.INTEGER
    })
    parent_id:number;
}
