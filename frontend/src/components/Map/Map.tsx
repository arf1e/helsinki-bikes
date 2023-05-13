import GoogleMapReact from 'google-maps-react-markers';
import googleMapStyles from './googleMapStyles';
import { Coordinates } from '@/app/types/maps';
import { MapContainer } from './Map.styles';
import Marker from './Marker';
import { HELSINKI_COORDINATES } from './Map.constants';

interface MapPoint extends Coordinates {
  text?: string;
  hidden?: boolean;
}

type Props = {
  points?: MapPoint[];
  initialCenter?: Coordinates;
  initialZoom?: number;
};

const Map = ({ points = [], initialCenter, initialZoom = 10 }: Props) => {
  const centerCoords = {
    lat: initialCenter?.y ? parseFloat(initialCenter.y) : HELSINKI_COORDINATES.lat,
    lng: initialCenter?.x ? parseFloat(initialCenter.x) : HELSINKI_COORDINATES.lng,
  };

  return (
    <MapContainer>
      <div className="map-bounds">
        <GoogleMapReact
          options={{
            styles: googleMapStyles,
            fullscreenControl: false,
            noClear: false,
            disableDefaultUI: true,
            maxZoom: 20,
            minZoom: 1,
          }}
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
          defaultCenter={centerCoords}
          defaultZoom={initialZoom}
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
