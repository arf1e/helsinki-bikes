import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  DESTINATION_FROM,
  DESTINATION_TO,
  DESTINATION_TYPE,
  STATIONS_PER_PAGE,
  TAKE_STATIONS_ON_SEARCH,
} from './stations.constants';
import { StationPaginationQueryDto } from 'src/common/dto/station-pagination-query.dto';
import { CreateStationDto } from 'src/common/dto/create-station.dto';
import { LookupStationsDto } from 'src/common/dto/lookup-stations.dto';

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
   * This method counts all the stations that fit under the given filter.
   * @param query Query object containing current page and filtering options
   * @returns Promise resolving to a count of stations
   */
  private async countFilteredStations(query: StationPaginationQueryDto) {
    const filters = this.constructFiltersByQuery(query);
    const totalCount = await this.prisma.station.count(filters);
    return totalCount;
  }

  /**
   * This method gets total pages count for stations that fit under the given filter.
   * @param query Query object containing current page and filtering options
   * @returns Promise resolving to a number of total pages
   */
  private async getStationsTotalPagesCount(query: StationPaginationQueryDto) {
    const stationsCount = await this.countFilteredStations(query);
    const totalPages = Math.ceil(stationsCount / STATIONS_PER_PAGE);
    return totalPages;
  }

  /**
   * This method queries the database for stations based on given query options.
   * @param query Query object containing current page and filtering options
   * @returns Promise resolving to an array of stations
   */
  private async getStationsByQuery(query: StationPaginationQueryDto) {
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

  private async checkIfStationAlreadyExists(data: CreateStationDto) {
    const { name, address } = data;
    const station = await this.prisma.station.findUnique({
      where: {
        name_address: {
          name,
          address,
        },
      },
      select: {
        id: true,
      },
    });
    return Boolean(station);
  }

  /**
   * This method creates a new station in the database
   * @param data Object containing new station data
   * @returns Promise resolving to a newly created station object
   * @throws ServerErrorException if failed to create a new station
   */
  private async createNewStation(data: CreateStationDto) {
    try {
      const stationAlreadyExists = await this.checkIfStationAlreadyExists(data);
      if (stationAlreadyExists) {
        throw new BadRequestException({
          message: 'Station with given name and address already exists.',
        });
      }
      const station = await this.prisma.station.create({ data });
      return station;
    } catch (error) {
      throw error;
    }
  }

  /**
   * This method queries the database for stations suggestions based on the given name
   * @param query Query object containing station name
   * @returns Promise resolving to an array of found stations
   */
  private async getStationsSuggestions(query: LookupStationsDto) {
    if (!query.name) return [];
    return this.prisma.station.findMany({
      where: { name: { startsWith: query.name, mode: 'insensitive' } },
      take: TAKE_STATIONS_ON_SEARCH,
      select: {
        id: true,
        name: true,
        address: true,
        x: true,
        y: true,
      },
    });
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
      station: {
        ...station,
        journeysCount: {
          fromHere: journeysFromThisStationCount,
          toHere: journeysToThisStationCount,
        },
        topStations: {
          fromHere: topFiveStationsFromHere,
          toHere: topFiveStationsToHere,
        },
      },
    };
  }

  /**
   * Interface method to access the database for stations
   * @param query Query object containing current page and filtering options
   * @returns Promise resolving to an array of stations
   */
  async findMany(query: StationPaginationQueryDto) {
    const stations = await this.getStationsByQuery(query);
    const totalPages = await this.getStationsTotalPagesCount(query);

    return { stations, totalPages };
  }

  /**
   * Interface method to create a new station
   * @param data Object containing station data
   * @returns Promise resolving to a new station object
   */
  async createOne(data: CreateStationDto) {
    return this.createNewStation(data);
  }

  /**
   * Interface method to access the database for stations suggestions on given name
   * @param query Query object containing name of the searched station
   * @returns Promise resolving to an array of stations
   */
  async searchStations(query: LookupStationsDto) {
    return this.getStationsSuggestions(query);
  }
}
