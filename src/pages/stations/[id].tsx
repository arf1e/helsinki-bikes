import client from '@/app/common/api';
import StationError from '@/app/components/StationError/StationError';
import StationView from '@/app/components/StationView/StationView';
import { StationApiError, StationSingle } from '@/app/types/stations';
import { AxiosError } from 'axios';
import { NextPageContext } from 'next';

type PageProps = {
  station?: StationSingle;
  error?: StationApiError;
};

const SingleStation = ({ station, error }: PageProps) => {
  return (
    <>
      {error && <StationError error={error} />}
      {station && <StationView station={station} />}
    </>
  );
};

export default SingleStation;

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  const { error, station } = await client
    .get(`stations/${id}`)
    .then(({ data }: { data: { station: StationSingle } }) => ({ station: data.station, error: null }))
    .catch((error: AxiosError) => ({ error: { message: error.message, code: error.code }, station: null }));

  return { props: { error, station } };
}
