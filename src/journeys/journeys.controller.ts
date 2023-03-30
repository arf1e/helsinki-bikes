import { Controller, Get } from '@nestjs/common';

@Controller('journeys')
export class JourneysController {
  @Get()
  findAll(): string {
    return 'This action returns all journeys.';
  }
}
