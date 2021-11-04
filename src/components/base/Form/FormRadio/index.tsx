import Radio from '@components/base/Radio';
import React from 'react';
import {Controller} from 'react-hook-form';
import {FormRadioProps} from './types';

const FormRadio: React.FC<FormRadioProps> = ({name, control, ...props}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}}) => (
        <Radio
          {...props}
          checked={value}
          onChange={(isChecked: boolean) => {
            onChange(isChecked);
            props.onChange && props.onChange(isChecked);
          }}
        />
      )}
      defaultValue={false}
    />
  );
};

export default FormRadio;
