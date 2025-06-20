import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './interfaces/http/tasks.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
