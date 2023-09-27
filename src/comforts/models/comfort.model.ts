import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType} from 'sequelize-typescript'

interface ComfortAttr{
    name: string
}

@Table({tableName: 'comforts'})
export class Comfort extends Model<Comfort, ComfortAttr>{
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
    name: string
}
