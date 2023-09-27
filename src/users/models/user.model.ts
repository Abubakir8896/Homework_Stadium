import {ApiProperty} from '@nestjs/swagger'
import { Table, Model, Column , DataType} from 'sequelize-typescript'

interface UserAttr{
    first_name: string
    last_name: string
    username: string
    hashed_password: string
    tg_link: string
    email: string
    phone: string
    user_photo: string
    birthday:Date 
    is_owner:boolean;
    is_active:boolean
    hashed_refresh_token:string,
    activation_link:string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserAttr>{
    @ApiProperty({example:1, description:"Unique ID"})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:"Eshmat", description:"Foydalanuvchining ismi"})
    @Column({
        type: DataType.STRING
    })
    first_name: string

    @ApiProperty({example:"Eshmatov", description:"Foydalanuvchining Familiyasi"})
    @Column({
        type: DataType.STRING
    })
    last_name: string

    @ApiProperty({example:"Eshmat77", description:"Foydalanuvchining username"})
    @Column({
        type: DataType.STRING,
        unique:true
    })
    username: string

    @ApiProperty({example:"^%$#EWRTYUIOKJHGFDSERTYU#$%", description:"Foydalanuvchining Hashlangan passwordi"})
    @Column({
        type: DataType.STRING
    })
    hashed_password: string

    @ApiProperty({example:"t.me/AbubakirBlog", description:"Foydalanuvchining telegram linki"})
    @Column({
        type: DataType.STRING
    })
    tg_link: string

    @ApiProperty({example:"Abubakir.zikirov8896@gmail.com", description:"Foydalanuvchining emaili"})
    @Column({
        type: DataType.STRING,
        unique:true,
        allowNull:false
    })
    email: string

    @ApiProperty({example:"image.png", description:"Foydalanuvchining rasmi"})
    @Column({
        type: DataType.STRING
    })
    user_photo: string

    @ApiProperty({example:"+998931208896", description:"Foydalanuvchining Telefon raqami"})
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    phone: string

    @ApiProperty({example:"2008-12-20", description:"Foydalanuvchining tug'ilgan kuni"})
    @Column({
        type: DataType.DATE
    })
    birthday: Date

    @ApiProperty({example:"true", description:"Foydalanuvchi maydan egasi yoki yo'qligi"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue:false
    })
    is_owner: boolean

    @ApiProperty({example:"true", description:"Foydalanuvchi tasdiqlangan xolati"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue:false
    })
    is_active: boolean

    @ApiProperty({example:"token", description:"hashlandan tokeni"})
    @Column({
        type: DataType.STRING
    })
    hashed_refresh_token: string

    @Column({
        type: DataType.STRING,
    })
    activation_link:string
}
