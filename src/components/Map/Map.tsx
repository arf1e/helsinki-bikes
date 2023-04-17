import { Title } from '@/app/styled/Typography';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import mapStyles from './mapStyles';
import { Coordinates } from '@/app/types/maps';

const HELSINKI_COORDINATES = {
  lat: 60.16897334465249,
  lng: 24.93799598347666,
};

const MapContainer = styled.div`
  flex: 1;

  .map-bounds {
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.grayColor};
  }

  .marker {
    width: 40px;
    height: 40px;
    content: none;
    border-radius: 50%;
    background: ${({ theme }) => theme.primaryColor};
    transform: translate(-50%, -50%);
  }
`;

type MarkerProps = {
  lat: number;
  lng: number;
  text?: string;
};

const Marker = ({ lat: _, lng: __, text }: MarkerProps) => <div className="marker">{text}</div>;

type Props = {
  points?: Coordinates[];
  initialCenter?: Coordinates;
};

const Map = ({ points = [], initialCenter }: Props) => {
  const centerCoords = {
    lat: initialCenter?.y ? parseFloat(initialCenter.y) : HELSINKI_COORDINATES.lat,
    lng: initialCenter?.x ? parseFloat(initialCenter.x) : HELSINKI_COORDINATES.lng,
  };
  return (
    <MapContainer>
      <div className="map-bounds">
        <GoogleMapReact
          options={{
            styles: mapStyles,
            fullscreenControl: false,
            noClear: false,
            disableDefaultUI: true,
            maxZoom: 20,
            minZoom: 1,
          }}
          //@ts-ignore
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY }}
          defaultCenter={centerCoords}
          defaultZoom={12}
        >
          {points &&
            points.map((element, i) => (
              <Marker key={`${element.x}-${element.y}-${i}`} lat={parseFloat(element.y)} lng={parseFloat(element.x)} />
            ))}
        </GoogleMapReact>
      </div>
    </MapContainer>
  );
};

export default Map;
