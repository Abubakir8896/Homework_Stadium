import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import {JwtService} from '@nestjs/jwt'
import { Response } from 'express';
import { BadRequestException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt'
import {v4} from 'uuid';

@Injectable()
export class UsersService 
{
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private readonly jwtService:JwtService){}

    async getTokens(user:User){
      const jwtPayload ={
        id:user.id,
        is_active:user.is_active,
        is_owner:user.is_owner,
      }

      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(jwtPayload, {
          secret: process.env.ACCESS_TOKEN_KEY,
          expiresIn: process.env.ACCESS_TOKEN_TIME
        }),
        this.jwtService.signAsync(jwtPayload, {
          secret: process.env.REFRESH_TOKEN_KEY,
          expiresIn: process.env.REFRESH_TOKEN_TIME
        })
      ]);
      return {access_token: accessToken, refresh_token:refreshToken}
    };

    async registration(createUserDto:CreateUserDto, res:Response){
      const user = await this.userRepo.findOne({where:{username:createUserDto.username}})

      if(user) throw new BadRequestException("Username already exist!")

      if(createUserDto.password != createUserDto.confirm_password) throw new BadRequestException("Password is not match")

      const hashed_password = await bcrypt.hash(createUserDto.password, 7)

      const newUser = await this.userRepo.create({
        ...createUserDto,
        hashed_password:hashed_password,
      });

      const tokens = await this.getTokens(newUser)

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)

      const uniqueKey:string = v4()

      const updatedUser = await this.userRepo.update({
        hashed_refresh_token:hashed_refresh_token,
        activation_link:uniqueKey,
      },{where:{id:newUser.id}, returning:true});

      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge:15*24*60*60*1000,
        httpOnly:true
      });

      const response = {
        message:"User Registered",
      }


    }

}
