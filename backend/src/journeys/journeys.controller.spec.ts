import { Test, TestingModule } from '@nestjs/testing';
import { JourneysController } from './journeys.controller';
import { JourneysService } from './journeys.service';
import { PrismaService } from '../prisma.service';

describe('JourneysController', () => {
  let controller: JourneysController;
  let service: JourneysService;

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JourneysController],
      providers: [
        PrismaService,
        {
          provide: JourneysService,
          useValue: {
            findMany: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<JourneysController>(JourneysController);
    service = module.get<JourneysService>(JourneysService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call the service when provided with valid query', async () => {
      await controller.findAll(baseJourneyQuery);
      expect(service.findMany).toHaveBeenCalledWith({});

      await controller.findAll({ ...baseJourneyQuery, page: 20 });
      expect(service.findMany).toHaveBeenCalledWith({ page: 20 });
    });
  });
});
