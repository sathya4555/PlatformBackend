import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entity/admin.entity';
import { App } from 'src/entity/app.entity';
import { AppRoles } from 'src/entity/app_roles.entity';
import { Client } from 'src/entity/client.entity';
import { Crud } from 'src/entity/crud.entity';
import { Feature } from 'src/entity/features.entity';
import { Role } from 'src/entity/role.entity';
// import { Admin } from 'src/entity/admin.entity';
// import { Client } from 'src/entity/client.entity';
// import { Data } from 'src/entity/data.entity';
import config from '../../src/ormconfig'
@Module({
    imports: [
        TypeOrmModule.forRoot(
            {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '123456',
            database: 'platform',
            entities: [Admin,Role,Client,Crud,App,Feature,AppRoles],
            synchronize: true,
        }
        ),
    ]
}
)
export class DatabaseModule {}
