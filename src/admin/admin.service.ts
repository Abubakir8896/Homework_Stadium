import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {JwtService} from '@nestjs/jwt'
import { Response } from 'express';
import { BadRequestException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt'
import {v4} from 'uuid';
import { MailService } from 'src/mail/mail.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './models/admin.model';

@Injectable()
export class AdminsService 
{
  constructor(
    @InjectModel(Admin) private readonly adminRepo: typeof Admin,
    private readonly jwtService:JwtService,
    private readonly mailService: MailService){}

    async getTokens(user:Admin){
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

    async registration(createAdminDto:CreateAdminDto, res:Response){
      const user = await this.adminRepo.findOne({where:{username:createAdminDto.username}})

      if(user) throw new BadRequestException("Username already exist!")

      if(createAdminDto.password != createAdminDto.confirm_password) throw new BadRequestException("Password is not match")

      const hashed_password = await bcrypt.hash(createAdminDto.password, 7)

      
      const newUser = await this.adminRepo.create({
        ...createAdminDto,
        hashed_password:hashed_password,
      });

      const tokens = await this.getTokens(newUser)

      const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)

      const uniqueKey:string = v4()

      const updatedAdmin = await this.adminRepo.update({
        hashed_refresh_token:hashed_refresh_token,
        activation_link:uniqueKey,
      },{where:{id:newUser.id}, returning:true});

      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge:15*24*60*60*1000,
        httpOnly:true
      });

      try {
        await this.mailService.sendAdminConfirmation(updatedAdmin[1][0]);
      } catch (error) {
        console.log(error);
        
      }

      const response = {
        message:"Admin Registered",
        user:updatedAdmin[1][0],
        tokens,
      }
      return response
    
    }

  async activate(link:string){
    console.log(link);
    
    if(!link) throw new BadRequestException('Activation link not found')

    const updatedAdmin = await this.adminRepo.update({is_active:true}, {where:{activation_link: link, is_active:false}, returning:true});
    
    
    if(!updatedAdmin) throw new BadRequestException("Admin already exist");
    
      const response ={
        message:'Admin Activated successfully',
        use:updatedAdmin[1][0]
      };
      return response
  }
  }
