import { PartialType } from '@nestjs/swagger';
import { CreateComfortDto } from './create-comfort.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from "class-validator";

export class UpdateComfortDto extends PartialType(CreateComfortDto) {
@ApiProperty({example:'Comfort_name', description:"Comfortni nomi"})
@IsNotEmpty()
@IsString()
name:string
}