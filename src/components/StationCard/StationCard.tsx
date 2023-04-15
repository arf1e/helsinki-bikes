import { StationShort } from '@/app/types/stations';
import styled from 'styled-components';
import Link from 'next/link';
type Props = {
  station: StationShort;
};

const StationCardContainer = styled(Link)`
  padding: 16px;
  width: 200px;
  min-height: 80px;
  margin-bottom: 18px;
  border: 1px solid ${({ theme }) => theme.secondaryColor};
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;
  border-radius: 4px;

  :not(:nth-child(5n)) {
    margin-right: 18px;
  }
  .station-name {
    font-size: 14px;
    width: 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: ${({ theme }) => theme.blackColor};
    margin-bottom: 8px;
  }

  .station-address {
    font-size: 12px;
    color: ${({ theme }) => theme.darkGrayColor};
  }

  &:hover {
    border-color: ${({ theme }) => theme.primaryColor};
    background-color: ${({ theme }) => theme.primaryColor};

    .station-name,
    .station-address {
      color: ${({ theme }) => theme.backgroundColor};
    }
  }
`;

const StationCard = ({ station }: Props) => {
  return (
    <StationCardContainer href={`stations/${station.id}`}>
      <strong className="station-name">{station.name}</strong>
      <span className="station-address">{station.address}</span>
    </StationCardContainer>
  );
};

export default StationCard;
