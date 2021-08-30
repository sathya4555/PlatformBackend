import { HttpModule, HttpService, Module } from '@nestjs/common';
import { ApproleService } from '../facade/approle.service';
import { ApproleController } from '../Routes/approle.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entity/admin.entity';
import { App } from 'src/entity/app.entity';
import { Client } from 'src/entity/client.entity';
import { Crud } from 'src/entity/crud.entity';
import { Feature } from 'src/entity/features.entity';
import { Role } from 'src/entity/role.entity';
import { AppRoles } from 'src/entity/app_roles.entity';

@Module({
  providers: [ApproleService],
  controllers: [ApproleController],
  imports: [HttpModule,TypeOrmModule.forFeature([Admin,Role,Client,Crud,App,Feature,AppRoles]),
  JwtModule.register({
    secret: 'secret',
    signOptions:{expiresIn: '2d'}
  }),


],
})
export class ApproleModule {}
