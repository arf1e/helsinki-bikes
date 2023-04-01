import { PrismaClient } from '@prisma/client';
import { createReadStream } from 'fs';
import * as csv from 'fast-csv';
import * as path from 'path';
import { journeySchema } from '../utils/seeding';
const prisma = new PrismaClient();

/**
 * This function will read the given csv file and execute the given function on each row of data.
 * @param filepath path to the csv file
 * @param dataHandler function that will be executed on each row of data.
 * @optional renamedHeaders
 */
const handleCsvImport = async (
  filepath: string,
  dataHandler: (data: any) => any,
  renamedHeaders?: string[],
) => {
  await createReadStream(filepath)
    .pipe(
      csv.parse({
        headers: true,
        ...(renamedHeaders && { headers: renamedHeaders, renameHeaders: true }),
      }),
    )
    .on('error', console.error)
    .on('data', dataHandler)
    .on('end', (rowCount) => console.log(`Parsed ${rowCount} rows.`));
};

/**
 * This function will seed the database with stations data.
 */
const seedStations = async () => {
  const stationsPath = path.resolve(__dirname, '__fixtures__', 'stations.csv');
  const stations = [];
  const stationHandler = (station) => {
    stations.push({
      id: Number(station.ID),
      name: station.Nimi.trim(),
      city: station.Kaupunki.trim(),
      capacity: Number(station.Kapasiteet),
      address: station.Osoite.trim(),
      operator: station.Operaattor.trim(),
      x: station.x,
      y: station.y,
    });
  };
  await handleCsvImport(stationsPath, stationHandler);
  await prisma.station.createMany({ data: stations });
};

/**
 * This function will seed the database with journeys data.
 */
const seedJourneys = async () => {
  const journeysPath = path.resolve(
    __dirname,
    '__fixtures__',
    'journeys-may.csv',
  );
  const journeysPromises = [];
  const journeysHandler = async (journeyInput) => {
    const castedJourney = await journeySchema.cast(journeyInput, {
      stripUnknown: true,
    });
    const shouldAddJourney = await journeySchema.isValid(castedJourney);
    if (!shouldAddJourney) {
    }
    if (shouldAddJourney) {
      journeysPromises.push(
        prisma.journey
          .create({
            data: {
              departure: { connect: { id: castedJourney.departureId } },
              return: { connect: { id: castedJourney.returnId } },
              departureTime: castedJourney.departureTime,
              returnTime: castedJourney.returnTime,
              distance: Number.isInteger(castedJourney.distance)
                ? castedJourney.distance
                : Math.floor(castedJourney.distance),
              duration: castedJourney.duration,
            },
          })
          .catch(() =>
            console.log(`Skipping journey: ${JSON.stringify(castedJourney)}`),
          ),
      );
    }
  };
  const journeysCsvHeaders = [
    'departureTime',
    'returnTime',
    'departureId',
    'departureName',
    'returnId',
    'returnName',
    'distance',
    'duration',
  ];
  await handleCsvImport(journeysPath, journeysHandler, journeysCsvHeaders);
  await Promise.all(journeysPromises);
};

/**
 * Function that will get executed on "seed" command.
 * All the seeding functions should be called here.
 */
const main = async () => {
  await seedStations().then(() => seedJourneys());
};

main().finally(async () => {
  await prisma.$disconnect();
});
