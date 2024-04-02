import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './CarsProject/Users/users.module';
import { RegistersCarsModule } from './CarsProject/RegistersCars/registerscars.module';

@Module({
  imports: [UsersModule, RegistersCarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
