import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class UpdateDestrictDto{
    @ApiProperty({example:'Category name', description:"Categoryni nomi"})
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty({example:'Parent id', description:"Parent id"})
    region_id:number
}
