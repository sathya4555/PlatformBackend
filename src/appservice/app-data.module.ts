import { Module } from '@nestjs/common';
import { AppDataService } from '../facade/app-data.service';
import { AppDataController } from '../Routes/app-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Admin } from 'src/entity/admin.entity';
import { App } from 'src/entity/app.entity';
import { Client } from 'src/entity/client.entity';
import { Crud } from 'src/entity/crud.entity';
import { Feature } from 'src/entity/features.entity';
import { Role } from 'src/entity/role.entity';

@Module({
  providers: [AppDataService],
  controllers: [AppDataController],
  imports: [TypeOrmModule.forFeature([Admin,Role,Client,Crud,App,Feature]),
  JwtModule.register({
    secret: 'secret',
    signOptions:{expiresIn: '2d'}
  })

],
})
export class AppDataModule {}
