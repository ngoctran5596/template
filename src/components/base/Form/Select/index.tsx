import Select from '@components/base/Select';
import {isString} from '@components/base/utils';
import React from 'react';
import {Controller} from 'react-hook-form';
import {FormSelectProps} from './types';

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  error,
  control,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {onChange, value, ref},
        fieldState: {error: fieldError},
      }) => {
        return (
          <Select
            {...props}
            ref={ref}
            selected={value}
            onSelected={(newValue: any) => {
              onChange(newValue);
              props.onSelected && props.onSelected(newValue);
            }}
            error={fieldError && (error || handleError(fieldError))}
          />
        );
      }}
    />
  );
};

export default FormSelect;

const handleError = (errors: any) => {
  if (errors !== undefined) {
    if (isString(errors?.message)) {
      return errors?.message;
    }
    for (const key in errors) {
      if (Object.prototype.hasOwnProperty.call(errors, key)) {
        const element = errors[key];
        if (isString(element?.message)) {
          return element?.message;
        }
      }
    }
    return undefined;
  }
  return errors;
};
