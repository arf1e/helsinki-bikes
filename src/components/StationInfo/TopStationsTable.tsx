import { StationCounted } from '@/app/types/stations';

const TopStationsTable = ({ top }: { top: StationCounted[] }) => {
  return (
    <table className="top-stations-table" cellSpacing={0}>
      <thead className="top-stations-table__head">
        <tr className="top-stations-table__head-row">
          <th className="top-stations-table__head-cell top-stations-table__head-cell--place">#</th>
          <th className="top-stations-table__head-cell top-stations-table__head-cell--name">Station name</th>
          <th className="top-stations-table__head-cell top-stations-table__head-cell--count">Count</th>
        </tr>
      </thead>
      <tbody className="top-stations-table__body">
        {top.map((station, index) => (
          <tr className="top-stations-table__station-row" key={station.id}>
            <td className="top-stations-table__station-cell top-stations-table__station-cell--place">{index + 1}</td>
            <td className="top-stations-table__station-cell top-stations-table__station-cell--name">{station.name}</td>
            <td className="top-stations-table__station-cell top-stations-table__station-cell--count">
              {station.count}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TopStationsTable;
