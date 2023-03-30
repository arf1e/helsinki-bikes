import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JourneysController } from './journeys/journeys.controller';

@Module({
  imports: [],
  controllers: [AppController, JourneysController],
  providers: [AppService],
})
export class AppModule {}
