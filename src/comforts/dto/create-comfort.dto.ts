import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class CreateComfortDto {
    @ApiProperty({example:'Comfort_name', description:"Comfortni nomi"})
    @IsNotEmpty()
    @IsString()
    name:string
}