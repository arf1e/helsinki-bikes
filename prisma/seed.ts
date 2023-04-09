import { PrismaClient } from '@prisma/client';
import { createReadStream } from 'fs';
import * as csv from 'fast-csv';
import * as path from 'path';
import {
  JOURNEYS_CSV_HEADERS,
  STATIONS_CSV_HEADERS,
  getJourneyValidationSchema,
  stationSchema,
} from '../utils/seeding';
const prisma = new PrismaClient();

/**
 * This function will read the given csv file and execute the given function on each row of data.
 * @param filepath path to the csv file
 * @param dataHandler function that will be executed on each row of data.
 * @optional renamedHeaders
 */
const handleCsvImport = (
  filepath: string,
  dataHandler: (data: any) => any,
  renamedHeaders?: string[],
) => {
  return new Promise<void>((resolve, reject) => {
    createReadStream(filepath)
      .pipe(
        csv.parse({
          headers: true,
          ...(renamedHeaders && {
            headers: renamedHeaders,
            renameHeaders: true,
          }),
        }),
      )
      .on('error', reject)
      .on('data', dataHandler)
      .on('end', () => {
        resolve();
      });
  });
};

/**
 * This function will seed the database with stations data.
 */
const seedStations = async () => {
  const stationsPath = path.resolve(__dirname, '__fixtures__', 'stations.csv');
  const stations = [];
  const stationHandler = async (station) => {
    let castedStation;
    try {
      castedStation = await stationSchema.cast(station, { stripUnknown: true });
    } catch (e) {
      console.log(`Failed to process station: ${JSON.stringify(station)}`);
    }
    const shouldAddStation = await stationSchema.isValid(castedStation);
    if (shouldAddStation) {
      stations.push(castedStation);
    }
  };

  await handleCsvImport(stationsPath, stationHandler, STATIONS_CSV_HEADERS);
  await prisma.station
    .createMany({ data: stations, skipDuplicates: true })
    .catch(console.error);
};

/**
 * This function will seed the database with journeys data.
 */
const seedJourneys = async (stationIds: number[], filename: string) => {
  const journeysPath = path.resolve(__dirname, '__fixtures__', filename);
  const journeysToInsert = [];
  const journeysSchema = getJourneyValidationSchema(stationIds);
  const journeysHandler = async (journeyInput) => {
    let castedJourney;
    try {
      castedJourney = journeysSchema.cast(journeyInput, {
        stripUnknown: true,
      });
    } catch (e) {
      console.log(`Failed to process journey: ${JSON.stringify(journeyInput)}`);
    }
    const shouldAddJourney = await journeysSchema.isValid(castedJourney);
    if (shouldAddJourney) {
      journeysToInsert.push({
        ...castedJourney,
        distance: Number.isInteger(castedJourney.distance)
          ? castedJourney.distance
          : Math.floor(castedJourney.distance),
      });
    }
  };

  await handleCsvImport(journeysPath, journeysHandler, JOURNEYS_CSV_HEADERS);
  await prisma.journey
    .createMany({
      data: journeysToInsert,
      skipDuplicates: true,
    })
    .catch((e) => console.log(e));
};

/**
 * Function that will get executed on "seed" command.
 * All the seeding functions should be called here.
 */
const main = async () => {
  console.time('Seeding');
  await seedStations();
  const stations = await prisma.station.findMany({ select: { id: true } });
  const stationIds = stations.map((station) => station.id);

  await Promise.all([
    seedJourneys(stationIds, 'journeys-may.csv'),
    seedJourneys(stationIds, 'journeys-june.csv'),
    seedJourneys(stationIds, 'journeys-july.csv'),
  ]).then(() => console.timeEnd('Seeding'));
};

main().finally(async () => {
  await prisma.$disconnect();
});
