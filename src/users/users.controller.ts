  import { Controller, Get, Post, Body,Param,Res } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './models/user.model';
import { Response } from 'express';

  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({summary: 'register User'})
    @ApiResponse({status: 201, type: User})
    @Post('signup')
    registration(@Body() createUserDto: CreateUserDto,
    @Res({passthrough: true}) res: Response){
      return this.usersService.registration(createUserDto, res)
    }

    @Get('activate/:link')
    activate(@Param('link') link:string){
      return this.usersService.activate(link);
    }
  }
