import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ComfortsService } from './comforts.service';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';

@Controller('comforts')
export class ComfortsController {
  constructor(private readonly comfortsService: ComfortsService) {}

  @Post()
  create(@Body() createComfortDto: CreateComfortDto) {
    return this.comfortsService.createComfort(createComfortDto);
  }

  @Get()
  findAll() {
    return this.comfortsService.findAllComfort();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comfortsService.findById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateComfortDto: UpdateComfortDto) {
    return this.comfortsService.updateById(+id, updateComfortDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comfortsService.deleteById(+id);
  }
}
