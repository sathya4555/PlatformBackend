import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './appservice/admin.module';
import { AppDataModule } from './appservice/app-data.module';

@Module({
  imports: [DatabaseModule, AdminModule, AppDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
