/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
//import styles from './style.module.css';
import { splitFormProps, useField } from 'react-form';

function SelectField(props: any) {
  const [field, fieldOptions, { options, ...rest }] = splitFormProps(props);
  const {
    value = '',
    setValue,
    meta: { error, isTouched },
  } = useField(field, fieldOptions);

  const handleSelectChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <>
      <select {...rest} value={value} onChange={handleSelectChange}>
        <option disabled value="" />
        {options &&
          options.map((option: any) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>{' '}
      {isTouched && error ? <em>{error}</em> : null}
    </>
  );
}

export default SelectField;
