import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType, HasMany} from 'sequelize-typescript'
import { Destrict } from 'src/destrict/models/destrict.model';

interface RegionAttr{
    name: string
}

@Table({tableName: 'regions'})
export class Region extends Model<Region, RegionAttr>{
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

    @HasMany(() => Destrict)
    desctricts: Destrict[]
}
