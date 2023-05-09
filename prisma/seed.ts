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

const downloadCsvFromUrl = async (url: string, filename: string) => {
  const downloader = new Downloader({
    url,
    directory: './downloads',
    onBeforeSave: () => filename,
  });
  try {
    const { filePath } = await downloader.download(); //Downloader.download() resolves with some useful properties.

    console.log('All done');
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
};

const loadJourneysToTheDatabase = async (queue) => {
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
        await loadJourneysToTheDatabase(journeysQueue)
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
        ? loadJourneysToTheDatabase(journeysQueue)
        : null;
    })
    .then(() => {
      journeysQueue = [];
    });
};

const loadEntities = (
  urlArray: string[],
  entity: 'stations' | 'journeys',
  stationIds: number[] = [],
) => {
  return new Promise<void>(async (resolve) => {
    if (entity === 'journeys') {
      const stations = await prisma.station.findMany({ select: { id: true } });
      stationIds = stations.map((station) => station.id);
      console.log('JOURNEYS, SEEDING IDS:', stationIds);
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

/**
 * Function that will get executed on "seed" command.
 * All the seeding functions should be called here.
 */
const main = async () => {
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
  await resetStationsIdCounter(prisma);
  await prisma.$disconnect();
});
