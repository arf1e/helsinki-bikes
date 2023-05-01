import { SMarker } from './Map.styles';

type MarkerProps = {
  lat: number;
  lng: number;
  text?: string;
};

const Marker = ({ lat: _, lng: __, text }: MarkerProps) => <SMarker onClick={() => null}>{text}</SMarker>;

export default Marker;
