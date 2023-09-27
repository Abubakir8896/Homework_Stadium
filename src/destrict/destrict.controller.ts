import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DestrictService } from './destrict.service';
import { CreateDestrictDto } from './dto/create-destrict.dto';
import { UpdateDestrictDto } from './dto/update-destrict.dto';

@Controller('destrict')
export class DestrictController {
  constructor(private readonly destrictService: DestrictService) {}

  @Post()
  create(@Body() createDestrictDto: CreateDestrictDto) {
    return this.destrictService.createDestrict(createDestrictDto);
  }

  @Get()
  findAll() {
    return this.destrictService.findAllDestrict();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.destrictService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDestrictDto: UpdateDestrictDto) {
    return this.destrictService.updateById(+id, updateDestrictDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.destrictService.deleteById(+id);
  }
}
