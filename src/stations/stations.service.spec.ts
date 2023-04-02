import { Test, TestingModule } from '@nestjs/testing';
import { StationsService } from './stations.service';
import { PrismaService } from 'src/prisma.service';
import { STATIONS_PER_PAGE } from './stations.constants';
import { NotFoundException } from '@nestjs/common';

describe('StationsService', () => {
  let service: StationsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    station: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    journey: {
      count: jest.fn(),
      groupBy: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StationsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<StationsService>(StationsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findMany', () => {
    it('queries db for stations with no query params provided', async () => {
      mockPrismaService.station.findMany.mockResolvedValue([]);

      await service.findMany({ page: undefined, name: undefined });

      expect(mockPrismaService.station.findMany).toHaveBeenCalledWith({
        select: {
          address: true,
          id: true,
          name: true,
        },
        skip: 0,
        take: STATIONS_PER_PAGE,
        where: {},
      });
    });

    it('queries db according to the provided query params', async () => {
      mockPrismaService.station.findMany.mockResolvedValue([]);
      const testTextInput = 'te';
      const testPage = 10;
      await service.findMany({ page: testPage, name: testTextInput });

      expect(mockPrismaService.station.findMany).toHaveBeenCalledWith({
        select: {
          address: true,
          id: true,
          name: true,
        },
        skip: (testPage - 1) * STATIONS_PER_PAGE,
        take: STATIONS_PER_PAGE,
        where: {
          name: {
            startsWith: testTextInput,
            mode: 'insensitive',
          },
        },
      });
    });
  });

  describe('findOne', () => {
    const testId = 1;
    const mockStation = {
      id: testId,
      name: 'test',
      city: 'test',
      operator: undefined,
      x: '10',
      y: '10',
      address: 'test',
      capacity: 5,
    };

    const mockTopStationsFromHere = {
      prisma: [
        { _count: { returnId: 10 }, returnId: 1 },
        { _count: { returnId: 8 }, returnId: 2 },
      ],
      output: [
        {
          id: 1,
          name: mockStation.name,
          count: 10,
        },
        {
          id: 2,
          name: mockStation.name,
          count: 8,
        },
      ],
    };
    const mockTopStationsToHere = {
      prisma: [
        { _count: { departureId: 10 }, departureId: 1 },
        { _count: { departureId: 8 }, departureId: 2 },
      ],
      output: [
        {
          id: 1,
          name: mockStation.name,
          count: 10,
        },
        {
          id: 2,
          name: mockStation.name,
          count: 8,
        },
      ],
    };
    const mockJourneysCount = { fromHere: 10, toHere: 10 };
    it('returns station data with top stations and journeys count', async () => {
      mockPrismaService.station.findUnique.mockResolvedValue(mockStation);
      mockPrismaService.journey.count
        .mockResolvedValueOnce(mockJourneysCount.fromHere)
        .mockResolvedValueOnce(mockJourneysCount.toHere);
      mockPrismaService.journey.groupBy
        .mockResolvedValueOnce(mockTopStationsFromHere.prisma)
        .mockResolvedValueOnce(mockTopStationsToHere.prisma);

      const queryResult = await service.findOne(testId);

      expect(queryResult).toEqual({
        station: mockStation,
        journeysCount: mockJourneysCount,
        topStations: {
          fromHere: mockTopStationsFromHere.output,
          toHere: mockTopStationsToHere.output,
        },
      });
    });

    it('shoud throw NotFoundException if there is no station with given id', async () => {
      mockPrismaService.station.findUnique.mockResolvedValue(null);
      const testUnknownId = 404;
      await expect(service.findOne(testUnknownId)).rejects.toThrow(
        NotFoundException,
      );
      expect(prismaService.station.findUnique).toHaveBeenCalledWith({
        where: { id: testUnknownId },
      });
    });
  });
});
