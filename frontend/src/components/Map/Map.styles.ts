import styled from 'styled-components';

export const MapContainer = styled.div`
  flex: 1;
  border-top-right-radius: ${({ theme }) => theme.appBoxPadding};
  border-bottom-right-radius: ${({ theme }) => theme.appBoxPadding};
  overflow: hidden;

  .map-bounds {
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.grayColor};
  }
`;

export const SMarker = styled.div<{ hidden?: boolean }>`
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
