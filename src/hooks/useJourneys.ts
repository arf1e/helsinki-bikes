import useGetApi from './useGet';

function useJourneys() {
  const { data: journeys, loading, error } = useGetApi('journeys');
  return { journeys, loading, error };
}

export default useJourneys;
