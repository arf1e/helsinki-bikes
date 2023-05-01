import { Title } from '@/app/styled/Typography';
import styled from 'styled-components';
import GoogleMapReact from 'google-maps-react-markers';
import mapStyles from './mapStyles';
import { Coordinates } from '@/app/types/maps';
import { useEffect, useRef } from 'react';

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
`;

const SMarker = styled.div<{ hidden?: boolean }>`
  width: 40px;
  height: 40px;
  content: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.primaryColor};
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.backgroundColor};
  font-size: 16px;
`;

type MarkerProps = {
  lat: number;
  lng: number;
  text?: string;
};

const Marker = ({ lat: _, lng: __, text }: MarkerProps) => <SMarker onClick={() => null}>{text}</SMarker>;

interface MapPoint extends Coordinates {
  text?: string;
  hidden?: boolean;
}

type Props = {
  points?: MapPoint[];
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
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
          defaultCenter={centerCoords}
          defaultZoom={10}
        >
          {points &&
            points
              .filter((elt) => !elt.hidden)
              .map((element, i) => (
                <Marker
                  key={`${element.x}-${element.y}-${i}`}
                  lat={parseFloat(element.y)}
                  lng={parseFloat(element.x)}
                  text={element.text}
                />
              ))}
        </GoogleMapReact>
      </div>
    </MapContainer>
  );
};

export default Map;
