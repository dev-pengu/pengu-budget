import React from 'react';
import { splitFormProps, useField } from 'react-form';
//import styles from './styles.module.css';

const InputField = React.forwardRef<HTMLInputElement>((props, ref) => {
  const [field, fieldOptions, rest] = splitFormProps(props);
  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField(field, fieldOptions);

  return (
    <>
      <input {...getInputProps({ ref, ...rest })} />{' '}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
});
InputField.displayName = 'InputField';

export default InputField;
