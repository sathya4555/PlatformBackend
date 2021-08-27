import { HttpService, Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './appservice/admin.module';
import { AppDataModule } from './appservice/app-data.module';
import { ApproleModule } from './appservice/approle.module';
// import AppService from './app.service';
// import { ApproleFacade } from './approle-facade.ts/approle-facade.ts.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ApproleFacade.TsService } from './approle-facade.ts/approle-facade.ts.service';

@Module({
  imports: [DatabaseModule, AdminModule, AppDataModule, ApproleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
