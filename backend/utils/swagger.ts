import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Helsinki Bikes API')
  .setDescription('Helsinki bike journeys & stations tracking application')
  .setVersion('1.0')
  .setContact(
    'Egor Bulgakov',
    'https://github.com/arf1e',
    'egorushque@gmail.com',
  )
  .build();
