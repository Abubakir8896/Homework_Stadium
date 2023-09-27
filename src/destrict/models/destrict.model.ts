import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, ForeignKey} from 'sequelize-typescript'
import { Region } from 'src/region/models/region.model';

interface DestrictAttr{
    name: string,
    region_id:number
}

@Table({tableName: 'destrict'})
export class Destrict extends Model<Destrict, DestrictAttr>{
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
    @ForeignKey(() => Region)
    @Column({
        type: DataType.INTEGER
    })
    parent_id:number;
}
