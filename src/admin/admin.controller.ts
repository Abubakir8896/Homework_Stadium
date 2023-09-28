import { Controller, Get, Post, Body,Param,Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AdminsService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './models/admin.model';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({summary: 'register Admin'})
  @ApiResponse({status: 201, type: Admin})
  @Post('signup')
  registration(@Body() createAdminDto: CreateAdminDto,
  @Res({passthrough: true}) res: Response){
    return this.adminsService.registration(createAdminDto, res)
  }

  @Get('activate/:link')
  activate(@Param('link') link:string){
    return this.adminsService.activate(link);
  }
}
