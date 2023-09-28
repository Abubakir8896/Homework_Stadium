import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail, IsPhoneNumber, IsDateString } from "class-validator";

export class CreateAdminDto {
    @ApiProperty({example:'Eshmat77', description:"Foydalanuvchi username"})
    @IsNotEmpty()
    @IsString()
    username:string

    @ApiProperty({example:'password', description:"Foydalanuvchi passwordi"})
    @IsNotEmpty()
    @IsString()
    password:string

    @ApiProperty({example:'confirm password', description:"Foydalanuvchi passwordi"})
    @IsNotEmpty()
    @IsString()
    confirm_password:string

    @ApiProperty({example:'@Eshmat77.gmail.com', description:"Foydalanuvchi emaili"})
    @IsEmail()
    email:string

    @ApiProperty({example:'+998931208896', description:"Foydalanuvchi Telefon raqami"})
    @IsString()
    tg_link:string

    @ApiProperty({example:'2008-12-20', description:"Foydalanuvchi Tugilgan kuni"})
    @IsNotEmpty()
    @IsDateString()
    birthday:Date
}
