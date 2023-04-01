import { Test, TestingModule } from '@nestjs/testing';
import { JourneysService } from './journeys.service';
import { PrismaService } from '../prisma.service';
import { JOURNEYS_PER_PAGE } from './journeys.constants';
import { kmToMeters, minutesToSeconds } from 'utils/journeys';

describe('JourneysService', () => {
  let service: JourneysService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JourneysService, PrismaService],
    }).compile();

    service = module.get<JourneysService>(JourneysService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const baseJourneyQuery = {
    departureStationName: undefined,
    returnStationName: undefined,
    minDistance: undefined,
    maxDistance: undefined,
    minDuration: undefined,
    maxDuration: undefined,
    sortBy: undefined,
    sortOrder: undefined,
    page: undefined,
  };

  describe('findMany', () => {
    it('queries db without filters', async () => {
      jest.spyOn(prismaService.journey, 'findMany');

      await service.findMany(baseJourneyQuery);

      expect(prismaService.journey.findMany).toHaveBeenCalledWith({
        where: {
          distance: {},
          duration: {},
        },
        skip: 0,
        take: JOURNEYS_PER_PAGE,
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
    });

    it('handles pagination', async () => {
      jest.spyOn(prismaService.journey, 'findMany');
      const page = 10;
      await service.findMany({ ...baseJourneyQuery, page });

      expect(prismaService.journey.findMany).toHaveBeenCalledWith({
        where: {
          distance: {},
          duration: {},
        },
        skip: (page - 1) * JOURNEYS_PER_PAGE,
        take: JOURNEYS_PER_PAGE,
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
    });

    it('handles filtering and sorting', async () => {
      jest.spyOn(prismaService.journey, 'findMany');
      const query = {
        departureStationName: 'te',
        returnStationName: 'st',
        minDistance: 100,
        maxDistance: 1000,
        minDuration: 10,
        maxDuration: 100,
        sortBy: 'distance',
        sortOrder: 'asc',
        page: undefined,
      };
      await service.findMany(query);

      expect(prismaService.journey.findMany).toHaveBeenCalledWith({
        where: {
          distance: {
            gte: kmToMeters(query.minDistance),
            lte: kmToMeters(query.maxDistance),
          },
          duration: {
            gte: minutesToSeconds(query.minDuration),
            lte: minutesToSeconds(query.maxDuration),
          },
          return: {
            name: {
              startsWith: query.returnStationName,
              mode: 'insensitive',
            },
          },
          departure: {
            name: {
              startsWith: query.departureStationName,
              mode: 'insensitive',
            },
          },
        },
        orderBy: {
          [query.sortBy]: query.sortOrder,
        },
        skip: 0,
        take: JOURNEYS_PER_PAGE,
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
    });
  });
});
