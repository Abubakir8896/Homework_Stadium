import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class UpdateRegionDto {
    @ApiProperty({example:'Comfort_name', description:"Comfortni nomi"})
    @IsNotEmpty()
    @IsString()
    name:string
}
