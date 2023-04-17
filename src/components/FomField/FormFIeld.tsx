import SInput from '@/app/styled/Input';
import { ChangeEventHandler } from 'react';
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

type Props = {
  value: string;
  title: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: string;
  placeholder?: string;
  handleBlur?: (e: any) => void;
};

const FormTextField = ({ value, title, onChange, error, placeholder, handleBlur }: Props) => {
  return (
    <SFormField>
      <label>{title}</label>
      <SInput
        type="text"
        value={value}
        placeholder={placeholder}
        onInput={onChange}
        onBlur={handleBlur}
        isInvalid={Boolean(error)}
      />
      {error && <span className="error">{error}</span>}
    </SFormField>
  );
};

export default FormTextField;
