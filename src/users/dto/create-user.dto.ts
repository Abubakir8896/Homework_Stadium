import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEmail, IsPhoneNumber, IsDateString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example:'Eshmat', description:"Foydalanuvchi ismi"})
    @IsNotEmpty()
    @IsString()
    first_name:string

    @ApiProperty({example:'Eshmatov', description:"Foydalanuvchi familiyasi"})
    @IsNotEmpty()
    @IsString()
    last_name:string

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
    @IsPhoneNumber('UZ')
    phone:string

    @ApiProperty({example:'2008-12-20', description:"Foydalanuvchi Tugilgan kuni"})
    @IsNotEmpty()
    @IsDateString()
    birthday:Date
}
