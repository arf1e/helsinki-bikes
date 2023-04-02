import { Injectable } from '@nestjs/common';
import { JourneyPaginationQueryDto } from 'src/common/dto/journey-pagination-query.dto';
import { PrismaService } from 'src/prisma.service';
import { kmToMeters, minutesToSeconds } from 'utils/journeys';
import { JOURNEYS_PER_PAGE } from './journeys.constants';

@Injectable()
export class JourneysService {
  constructor(private prisma: PrismaService) {}

  /**
   * This method constructs the filtering part of the database query
   * @param query Query object containing current page, filters and sorting options
   * @returns Object of type {where: ...} containing filtering rules according to the given query
   */
  private constructFiltersByQuery(query: JourneyPaginationQueryDto): {
    where: object;
  } {
    return {
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
    };
  }

  /**
   * This method constructs the sorting part of the database query
   * @param query Query object containing current page, filters and sorting options
   * @returns Object of type {orderBy: ...} containing sorting rules according to the given query
   */
  private constructSortingByQuery(query: JourneyPaginationQueryDto) {
    return {
      ...(query.sortBy && {
        orderBy: {
          [query.sortBy]: query.sortOrder,
        },
      }),
    };
  }

  private constructPaginationByQuery(query: JourneyPaginationQueryDto): {
    skip: number;
    take: number;
  } {
    const page = query.page || 1;
    const documentsPerPage = JOURNEYS_PER_PAGE;
    return {
      skip: (page - 1) * documentsPerPage,
      take: documentsPerPage,
    };
  }

  private async getJourneysByQuery(query: JourneyPaginationQueryDto) {
    const filters = this.constructFiltersByQuery(query);
    const sorting = this.constructSortingByQuery(query);
    const pagination = this.constructPaginationByQuery(query);

    return this.prisma.journey.findMany({
      ...filters,
      ...sorting,
      ...pagination,
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

  /**
   * Interface method to access the database for journeys
   * @param query Query object containing current page, filters and sorting options
   * @returns Promise resolving to an array of journeys
   */
  async findMany(query: JourneyPaginationQueryDto) {
    return this.getJourneysByQuery(query);
  }
}
