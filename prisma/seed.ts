import { PrismaClient } from '@prisma/client';
import { createReadStream } from 'fs';
import * as csv from 'fast-csv';
import * as path from 'path';
import {
  JOURNEYS_CSV_HEADERS,
  STATIONS_CSV_HEADERS,
  getJourneyValidationSchema,
  resetStationsIdCounter,
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
 * This function loads
 */
const loadJourneysToTheDatabase = async (queue) => {
  console.log(`Inserting ${queue.length} journeys to the database...`);
  return prisma.journey.createMany({
    data: queue,
    skipDuplicates: true,
  });
};

/**
 * This function will seed the database with journeys data.
 */
const seedJourneys = async (
  stationIds: number[],
  filename: string,
  queueSize = 1000,
) => {
  const journeysPath = path.resolve(__dirname, '__fixtures__', filename);
  let journeysQueue = [];
  const journeysSchema = getJourneyValidationSchema(stationIds);
  const journeysHandler = async (journeyInput) => {
    let castedJourney;
    try {
      castedJourney = journeysSchema.cast(journeyInput, {
        stripUnknown: true,
      });
    } catch (e) {
      console.log(
        `Failed to validate journey: ${JSON.stringify(journeyInput)}`,
      );
    }
    const shouldAddJourney = await journeysSchema.isValid(castedJourney);
    if (shouldAddJourney) {
      journeysQueue.push({
        ...castedJourney,
        distance: Number.isInteger(castedJourney.distance)
          ? castedJourney.distance
          : Math.floor(castedJourney.distance),
      });
      if (journeysQueue.length === queueSize) {
        await loadJourneysToTheDatabase(journeysQueue)
          .then(() => {
            journeysQueue = [];
          })
          .catch((e) => console.log(e));
      }
    }
  };

  await handleCsvImport(journeysPath, journeysHandler, JOURNEYS_CSV_HEADERS)
    .then(() => {
      console.log(
        'FINISH CSV IMPORT, CURRENT QUEUE LENGTH:',
        journeysQueue.length,
      );
      return journeysQueue.length > 0
        ? loadJourneysToTheDatabase(journeysQueue)
        : null;
    })
    .then(() => {
      journeysQueue = [];
    });
};

/**
 * Function that will get executed on "seed" command.
 * All the seeding functions should be called here.
 */
const main = async () => {
  await seedStations();
  const stations = await prisma.station.findMany({ select: { id: true } });
  const stationIds = stations.map((station) => station.id);
  await seedJourneys(stationIds, 'journeys-may.csv')
    .then(() => seedJourneys(stationIds, 'journeys-june.csv'))
    .then(() => seedJourneys(stationIds, 'journeys-july.csv'))
    .then(() => console.timeEnd('Seeding'));
};

main().finally(async () => {
  await resetStationsIdCounter(prisma);
  await prisma.$disconnect();
});
