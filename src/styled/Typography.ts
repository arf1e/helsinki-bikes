import styled from 'styled-components';
export const Subtitle = styled.b`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.darkGrayColor};
`;

export const Title = styled.h3`
  font-size: 36px;
  color: ${({ theme }) => theme.blackColor};
  font-weight: 500;
`;
