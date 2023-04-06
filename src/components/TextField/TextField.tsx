import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styled, { StyledComponent } from 'styled-components';

const SInput = styled.input`
  height: 40px;
  border: 1px solid ${({ theme }) => theme.secondaryColor};
  transition: 0.3s;
  border-radius: 4px;
  padding: 12px 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.blackColor}

  &:placeholder {
    color: ${({ theme }) => theme.grayColor};
  }

  &:hover,
  &:active,
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primaryColor};
  }
`;

const TextField = (props: any) => {
  return <SInput type="text" {...props} />;
};

export default TextField;
