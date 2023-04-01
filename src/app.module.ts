import { Module } from '@nestjs/common';
import { JourneysController } from './journeys/journeys.controller';
import { JourneysService } from './journeys/journeys.service';
import { PrismaService } from './prisma.service';
import { StationsService } from './stations/stations.service';
import { StationsController } from './stations/stations.controller';

@Module({
  controllers: [JourneysController, StationsController],
  providers: [PrismaService, JourneysService, StationsService],
})
export class AppModule {}
