import { Test, TestingModule } from '@nestjs/testing';
import { JourneysController } from './journeys.controller';
import { JourneysService } from './journeys.service';
import { PrismaService } from '../prisma.service';

describe('JourneysController', () => {
  let controller: JourneysController;
  let service: JourneysService;

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
    it('should return an array of journeys when provided with valid query', () => {
      const result = [
        {
          id: 1,
          departureId: 1,
          returnId: 1,
          departureTime: new Date(),
          returnTime: new Date(),
          distance: 1000,
          duration: 100,
          departure: { name: 'Test Journey' },
          return: { name: 'Test Journey' },
        },
      ];
      jest.spyOn(service, 'findMany').mockResolvedValue(result);
    });
  });
});
