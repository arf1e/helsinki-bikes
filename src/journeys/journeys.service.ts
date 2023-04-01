import { Injectable } from '@nestjs/common';
import { JourneyPaginationQueryDto } from 'src/common/dto/journey-pagination-query.dto';
import { PrismaService } from 'src/prisma.service';
import { kmToMeters, minutesToSeconds } from 'utils/journeys';
import { JOURNEYS_PER_PAGE } from './journeys.constants';

@Injectable()
export class JourneysService {
  constructor(private prisma: PrismaService) {}

  async findMany(query: JourneyPaginationQueryDto) {
    const page = query.page || 1;
    const documentsPerPage = JOURNEYS_PER_PAGE;
    return this.prisma.journey.findMany({
      where: {
        ...(query.departureStationName && {
          departure: {
            name: {
              startsWith: query.departureStationName,
              mode: 'insensitive',
            },
          },
        }),
        ...(query.returnStationName && {
          return: {
            name: {
              startsWith: query.returnStationName,
              mode: 'insensitive',
            },
          },
        }),
        distance: {
          ...(query.minDistance && { gte: kmToMeters(query.minDistance) }),
          ...(query.maxDistance && { lte: kmToMeters(query.maxDistance) }),
        },
        duration: {
          ...(query.minDuration && {
            gte: minutesToSeconds(query.minDuration),
          }),
          ...(query.maxDuration && {
            lte: minutesToSeconds(query.maxDuration),
          }),
        },
      },
      ...(query.sortBy && {
        orderBy: {
          [query.sortBy]: query.sortOrder,
        },
      }),
      skip: (page - 1) * documentsPerPage,
      take: documentsPerPage,
      include: {
        departure: {
          select: {
            name: true,
          },
        },
        return: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
