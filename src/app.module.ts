import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/models/user.model';
import { UsersModule } from './users/users.module';
import { ComfortsModule } from './comforts/comforts.module';
import { RegionModule } from './region/region.module';
import { CategoriesModule } from './categories/categories.module';
import { DestrictModule } from './destrict/destrict.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User],
      autoLoadModels: true,
    }),
    UsersModule,
    ComfortsModule,
    RegionModule,
    CategoriesModule,
    DestrictModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
