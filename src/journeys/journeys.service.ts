import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JourneyPaginationQueryDto } from 'src/common/dto/journey-pagination-query.dto';
import { PrismaService } from 'src/prisma.service';
import { kmToMeters, minutesToSeconds } from 'utils/journeys';
import { JOURNEYS_PER_PAGE } from './journeys.constants';
import { CreateJourneyDto } from 'src/common/dto/create-journey.dto';
import { DatesService } from 'src/dates/dates.service';

@Injectable()
export class JourneysService {
  constructor(private prisma: PrismaService, private dates: DatesService) {}

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
              startsWith: query.departureStationName.trim(),
              mode: 'insensitive',
            },
          },
        }),
        ...(query.returnStationName && {
          return: {
            name: {
              startsWith: query.returnStationName.trim(),
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

  /**
   * This method constructs the pagination part of the database query
   * @param query Query object containing current page, filters and sorting options
   * @returns Object of type {skip: number, take: number} responsible for pagination in Prisma queries
   */
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

  /**
   * This method counts all the journeys that fit under the given filter.
   * @param query Query object containing current page, filters and sorting options
   * @returns Promise resolving to a count of journeys
   */
  private async countFilteredJourneys(query: JourneyPaginationQueryDto) {
    const filters = this.constructFiltersByQuery(query);
    const totalCount = await this.prisma.journey.count(filters);
    return totalCount;
  }

  /**
   * This method gets total pages count for journeys that fit under the given filter.
   * @param query Query object containing current page, filters and sorting options
   * @returns Promise resolving to a number of total pages
   */
  private async getJourneysTotalPagesCount(query: JourneyPaginationQueryDto) {
    const journeysCount = await this.countFilteredJourneys(query);
    const totalPages = Math.ceil(journeysCount / JOURNEYS_PER_PAGE);
    return totalPages;
  }

  /**
   * This method queries the database for journeys based on given query options.
   * @param query Query object containing current page, filters and sorting options
   * @returns Promise resolving to an array of journeys
   */
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
    const journeys = await this.getJourneysByQuery(query);
    const totalPages = await this.getJourneysTotalPagesCount(query);
    return { journeys, totalPages };
  }

  private async createNewJourney(data: CreateJourneyDto) {
    try {
      const { distance, departureTime, returnTime } = data;
      const duration = this.dates.calculateDifferenceBetweenDatesInSeconds(
        departureTime,
        returnTime,
      );
      if (duration < 10) {
        throw new Error('Journey duration is too low.');
      }
      const journey = await this.prisma.journey.create({
        data: {
          distance,
          departureTime: new Date(departureTime),
          returnTime: new Date(returnTime),
          duration,
          departure: {
            connect: {
              id: data.departureId,
            },
          },
          return: {
            connect: {
              id: data.returnId,
            },
          },
        },
      });
      return journey;
    } catch (error) {
      throw new InternalServerErrorException(
        'Database Error: Failed to create new journey',
      );
    }
  }

  async createOne(data: CreateJourneyDto) {
    return this.createNewJourney(data);
  }
}
