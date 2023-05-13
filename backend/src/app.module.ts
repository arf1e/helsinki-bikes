import { Module } from '@nestjs/common';
import { JourneysController } from './journeys/journeys.controller';
import { JourneysService } from './journeys/journeys.service';
import { PrismaService } from './prisma.service';
import { StationsService } from './stations/stations.service';
import { StationsController } from './stations/stations.controller';
import { LookupService } from './lookup/lookup.service';
import { LookupController } from './lookup/lookup.controller';
import { GoogleService } from './google/google.service';
import { DatesService } from './dates/dates.service';

@Module({
  controllers: [JourneysController, StationsController, LookupController],
  providers: [
    PrismaService,
    JourneysService,
    StationsService,
    LookupService,
    GoogleService,
    DatesService,
  ],
})
export class AppModule {}
