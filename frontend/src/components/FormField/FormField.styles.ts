import styled from 'styled-components';

const SFormField = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    font-size: 14px;
    color: ${({ theme }) => theme.darkGrayColor};
    margin-bottom: 8px;
  }

  .error {
    margin-top: 4px;
    color: ${({ theme }) => theme.errorColor};
    font-size: 12px;
  }
`;

export default SFormField;
