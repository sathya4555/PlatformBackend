import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entity/admin.entity';
import { App } from 'src/entity/app.entity';
import { Client } from 'src/entity/client.entity';
import { Crud } from 'src/entity/crud.entity';
import { Feature } from 'src/entity/features.entity';
import { Role } from 'src/entity/role.entity';
import { AdminController } from '../Routes/admin.controller';
import { AdminService } from '../facade/admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [TypeOrmModule.forFeature([Admin,Role,Client,Crud,App,Feature]),
  JwtModule.register({
    secret: 'secret',
    signOptions:{expiresIn: '2d'}
  })

],
})
export class AdminModule {}
