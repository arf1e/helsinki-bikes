import { Test, TestingModule } from '@nestjs/testing';
import { LookupController } from './lookup.controller';
import { LookupService } from './lookup.service';
import { GoogleService } from 'src/google/google.service';
import { PrismaService } from 'src/prisma.service';
import { StationsService } from 'src/stations/stations.service';

describe('LookupController', () => {
  let controller: LookupController;

  const mockGoogleService = {
    autocomplete: jest.fn(),
    getCoordinates: jest.fn(),
  };

  const mockPrismaService = {};

  const mockStationsService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LookupController],
      providers: [
        LookupService,
        { provide: GoogleService, useValue: mockGoogleService },
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: StationsService, useValue: mockStationsService },
      ],
    }).compile();

    controller = module.get<LookupController>(LookupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
