import DateTimePicker from '@components/base/DateTimePicker';
import React from 'react';
import {Controller} from 'react-hook-form';
import {FormDateTimePickerProps} from './types';

const FormDateTimePicker: React.FC<FormDateTimePickerProps> = ({
  name,
  error,
  control,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}, fieldState: {error: fieldError}}) => (
        <DateTimePicker
          {...props}
          value={value}
          onChange={(text: string) => {
            onChange(text);
            props.onChange && props.onChange(text);
          }}
          error={fieldError && (error || fieldError?.message)}
        />
      )}
      defaultValue=""
    />
  );
};

export default FormDateTimePicker;
