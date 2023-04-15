export type StationShort = {
  id: number;
  name: string;
  address: string;
};

export type StationCounted = {
  id: number;
  count: number;
  name: string;
};

export type StationSingle = {
  id: number;
  name: string;
  x: string;
  y: string;
  city?: string;
  operator?: string;
  address: string;
  capacity: number;
  journeysCount: {
    fromHere: number;
    toHere: number;
  };
  topStations: {
    fromHere: StationCounted[];
    toHere: StationCounted[];
  };
};

export type StationApiError = {
  code: string;
  message: string;
};

export type StationsApiResponse = {
  stations: StationShort[];
  totalPages: number;
};
