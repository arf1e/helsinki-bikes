import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  DESTINATION_FROM,
  DESTINATION_TO,
  DESTINATION_TYPE,
  STATIONS_PER_PAGE,
} from './stations.constants';
import { StationPaginationQueryDto } from 'src/common/dto/station-pagination-query.dto';

@Injectable()
export class StationsService {
  constructor(private prisma: PrismaService) {}

  /**
   * This method gets the total amount of journeys from/to the given station.
   * @param destination Where to look for journeys that start or end on the given station.
   * @param id Station id
   * @returns Promise resolving to journeys count
   */
  private async getJourneysCount(
    destination: DESTINATION_TYPE,
    id: number,
  ): Promise<number> {
    const filter =
      destination === DESTINATION_FROM ? 'departureId' : 'returnId';
    return this.prisma.journey.count({ where: { [filter]: id } });
  }

  /**
   * This method is used to get top most popular stations for journeys starting and ending on the given station.
   * @param destination Whether to look for journeys that start or end on the given station.
   * @param id Station id
   * @returns Promise resolving to an array of objects containing station id, journeys count, and the station name.
   */
  private async getTopStations(
    destination: DESTINATION_TYPE,
    id: number,
  ): Promise<
    {
      id: number;
      count: never;
      name: string;
    }[]
  > {
    const groupBy =
      destination === DESTINATION_FROM ? 'returnId' : 'departureId';
    const select =
      destination === DESTINATION_FROM ? 'departureId' : 'returnId';

    /* 
      This Prisma query that counts the number of journeys to/from a given station 
      and returns the station IDs in descending order based on the count.
    */
    const topStationsIdsArray = await this.prisma.journey.groupBy({
      by: [groupBy],
      where: {
        [select]: id,
      },
      _count: {
        [groupBy]: true,
      },
      orderBy: {
        _count: {
          [groupBy]: 'desc',
        },
      },
      take: 5,
    });
    /*
      As the 'include' option is not supported by 'groupBy', we need to retrieve station names by querying the database. 
      We can use Promise.all since it maintains the order of promises.
    */
    const topStationsWithNames = await Promise.all(
      topStationsIdsArray.map(async (elt) => ({
        id: elt[groupBy],
        count: elt._count[groupBy],
        name: await this.prisma.station
          .findUnique({
            where: { id: elt[groupBy] },
            select: { name: true },
          })
          .then((response) => response.name),
      })),
    );
    return topStationsWithNames;
  }

  /**
   * This method constructs the filtering part of the database query
   * @param query Query object containing current page and filtering options
   * @returns Object of type {where: ...} containing filtering rules accroding to the given query
   */
  private constructFiltersByQuery(query: StationPaginationQueryDto): {
    where: object;
  } {
    return {
      where: {
        ...(query.name && {
          name: {
            startsWith: query.name,
            mode: 'insensitive',
          },
        }),
      },
    };
  }

  /**
   * This method constructs the pagination part of the database query
   * @param query Query object containing current page and filtering options
   * @returns Object of type {skip: number, take: number} responsible for pagination in Prisma queries
   */
  private constructPaginationByQuery(query: StationPaginationQueryDto): {
    skip: number;
    take: number;
  } {
    const page = query.page || 1;
    return {
      skip: (page - 1) * STATIONS_PER_PAGE,
      take: STATIONS_PER_PAGE,
    };
  }

  /**
   * Interface method to access the database for one station by its id.
   * @param id Station id
   * @returns Station data, including most popular stations and journeys count. If the station with given id does not exists, throws NotFoundException.
   */
  async findOne(id: number) {
    const station = await this.prisma.station.findUnique({ where: { id } });
    if (!station) {
      throw new NotFoundException(`Station #${id} not found`);
    }
    const journeysFromThisStationCount = await this.getJourneysCount(
      DESTINATION_FROM,
      id,
    );
    const journeysToThisStationCount = await this.getJourneysCount(
      DESTINATION_TO,
      id,
    );
    const topFiveStationsFromHere = await this.getTopStations(
      DESTINATION_FROM,
      id,
    );
    const topFiveStationsToHere = await this.getTopStations(DESTINATION_TO, id);

    return {
      station,
      journeysCount: {
        fromHere: journeysFromThisStationCount,
        toHere: journeysToThisStationCount,
      },
      topStations: {
        fromHere: topFiveStationsFromHere,
        toHere: topFiveStationsToHere,
      },
    };
  }

  /**
   * Interface method to access the database for stations
   * @param query Query object containing current page and filtering options
   * @returns Promise resolving to an array of stations
   */
  async findMany(query: StationPaginationQueryDto) {
    const filters = this.constructFiltersByQuery(query);
    const pagination = this.constructPaginationByQuery(query);

    return this.prisma.station.findMany({
      ...filters,
      ...pagination,
      select: {
        id: true,
        name: true,
        address: true,
      },
    });
  }
}
