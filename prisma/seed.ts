import { PrismaClient } from '@prisma/client';
import { createReadStream, readFileSync, unlink } from 'fs';
import * as csv from 'fast-csv';
import * as path from 'path';
import Downloader from 'nodejs-file-downloader';
import {
  JOURNEYS_CSV_HEADERS,
  STATIONS_CSV_HEADERS,
  getJourneyValidationSchema,
  resetStationsIdCounter,
  stationSchema,
} from '../utils/seeding';
const prisma = new PrismaClient();

/**
 * This function downloads csv file from provided url.
 * Here I make use of nodejs-file-downloader, because it handles all write/read-stream heavylifting for me, and most importantly it handles HTTP redirects out of the box.
 * @param url - Url of the file to be downloaded.
 * @param filename - This parameter specifies the name to be given to the file when saving it.
 * @returns filePath of the downloaded file
 */
const downloadCsvFromUrl = async (url: string, filename: string) => {
  const downloader = new Downloader({
    url,
    directory: path.join(__dirname, 'downloads'),
    onBeforeSave: () => filename,
  });
  try {
    const { filePath } = await downloader.download();
    return filePath;
  } catch (error) {
    console.log('Download failed', error);
  }
};

/**
 * This function will read the given csv file and execute the given function on each row of data.
 * @param filepath path to the csv file
 * @param dataHandler function that will be executed on each row of data.
 * @optional renamedHeaders custom headers for the csv file
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
 * @param filepath - Path to csv file containing stations data
 */
const seedStations = async (filepath: string) => {
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

  await handleCsvImport(filepath, stationHandler, STATIONS_CSV_HEADERS);
  await prisma.station
    .createMany({ data: stations, skipDuplicates: true })
    .catch(console.error);
  await resetStationsIdCounter(prisma);
};

const loadPortionOfJourneysToTheDatabase = async (queue) => {
  console.log(`Inserting ${queue.length} journeys to the database...`);
  return prisma.journey.createMany({
    data: queue,
    skipDuplicates: true,
  });
};

const seedJourneys = async (
  filepath: string,
  stationIds: number[],
  queueSize = 1000,
) => {
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
        await loadPortionOfJourneysToTheDatabase(journeysQueue)
          .then(() => {
            journeysQueue = [];
          })
          .catch((e) => console.log(e));
      }
    }
  };

  await handleCsvImport(filepath, journeysHandler, JOURNEYS_CSV_HEADERS)
    .then(() => {
      console.log(
        `FINISH CSV IMPORT, CURRENT QUEUE LENGTH: ${journeysQueue.length}`,
      );
      return journeysQueue.length > 0
        ? loadPortionOfJourneysToTheDatabase(journeysQueue)
        : null;
    })
    .then(() => {
      journeysQueue = [];
    });
};

/**
 * Loads entity data from CSV files downloaded from the specified URLs, and seeds the data into the database.
 * @param {string[]} urlArray - An array of URLs from which to download CSV files.
 * @param {'stations' | 'journeys'} entity - The type of entity to load (either 'stations' or 'journeys').
 * @returns {Promise<void>} - A Promise that resolves when all entities have been loaded and seeded into the database.
 */
const loadEntities = (urlArray: string[], entity: 'stations' | 'journeys') => {
  return new Promise<void>(async (resolve) => {
    let stationIds;
    if (entity === 'journeys') {
      const stations = await prisma.station.findMany({ select: { id: true } });
      stationIds = stations.map((station) => station.id);
    }
    const fMapper = {
      stations: (csv: string) => seedStations(csv),
      journeys: (csv: string) => seedJourneys(csv, stationIds),
    };
    const entityLoaderFunction = fMapper[entity];
    await Promise.all(
      urlArray.map(async (url, i) => {
        const csv = await downloadCsvFromUrl(url, `${entity}-${i}.csv`);
        await entityLoaderFunction(csv);
        await unlink(csv, () => {
          console.log(`File ${csv} has been deleted`);
        });
      }),
    ).then(() => resolve());
  });
};

const checkIfDatabaseNeedsToBeSeeded = async (): Promise<boolean> => {
  const journeysCount = await prisma.journey.count();
  const stationsCount = await prisma.station.count();

  if (journeysCount === 0 || stationsCount === 0) {
    return true;
  }

  return false;
};

/**
 * Function that will get executed on "seed" command.
 * All the seeding functions should be called here.
 */
const main = async () => {
  const shouldRunSeedingScript = await checkIfDatabaseNeedsToBeSeeded();
  if (!shouldRunSeedingScript) {
    console.log('Database already has data, no seeding needed.');
    return;
  }
  console.log('Database has no data, seeding...');
  console.time('seeding');
  const resourcesPath = path.join(__dirname, 'seed-data.json');
  const resourcesJsonFile = readFileSync(resourcesPath, 'utf-8');
  const { stations: stationsUrls, journeys: journeysUrls } =
    JSON.parse(resourcesJsonFile);
  await loadEntities(stationsUrls, 'stations');
  await loadEntities(journeysUrls, 'journeys').then(() => {
    console.timeEnd('seeding');
  });
};

main().finally(async () => {
  await prisma.$disconnect();
});
