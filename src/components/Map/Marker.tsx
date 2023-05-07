import { SMarker } from './Map.styles';

type MarkerProps = {
  lat: number;
  lng: number;
  text?: string;
};

const Marker = ({ lat, lng, text }: MarkerProps) => (
  <SMarker data-cy={`marker-${lat}-${lng}-${text || 'untitled'}`} onClick={() => null}>
    {text}
  </SMarker>
);

export default Marker;
