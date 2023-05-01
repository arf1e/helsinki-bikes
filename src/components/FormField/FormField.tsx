import SInput from '@/app/styled/Input';
import { ChangeEventHandler } from 'react';
import SFormField from './FormField.styles';

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
      <label htmlFor={title}>{title}</label>
      <SInput
        id={title}
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
