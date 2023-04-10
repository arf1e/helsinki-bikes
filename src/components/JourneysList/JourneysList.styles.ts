import styled from 'styled-components';

export const SList = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.appBoxPadding};
  padding-right: ${({ theme }) => theme.appBoxPadding};
  padding-bottom: ${({ theme }) => theme.appBoxPadding};

  .pagination-container {
    display: flex;
    margin-top: auto;
    align-self: flex-start;
    padding-left: ${({ theme }) => theme.appBoxPadding};
  }
`;
