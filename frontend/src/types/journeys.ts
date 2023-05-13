export type Journey = {
  id: number;
  departureId: number;
  returnId: number;
  departure: {
    name: string;
  };
  return: {
    name: string;
  };
  departureTime: string;
  returnTime: string;
  distance: number;
  duration: number;
};

export type JourneysApiResponse = {
  journeys: Journey[];
  totalPages: number;
};
