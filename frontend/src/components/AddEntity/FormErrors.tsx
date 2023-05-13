import { ReactElement } from 'react';

type Props = {
  shouldDisplay: boolean;
  errors: (string | undefined)[];
};

const FormErrors = ({ shouldDisplay, errors }: Props): ReactElement => {
  return shouldDisplay ? (
    <div className="field form-errors">
      {errors
        .filter((err) => err !== undefined)
        .map((err) => (
          <span className="form-error" key={err}>
            {err}
          </span>
        ))}
    </div>
  ) : (
    <></>
  );
};

export default FormErrors;
