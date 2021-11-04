import Switch from '@components/base/Switch';
import React from 'react';
import {Controller} from 'react-hook-form';
import {FormSwitchProps} from './types';

const FormSwitch: React.FC<FormSwitchProps> = ({name, control, ...props}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}}) => (
        <Switch
          {...props}
          value={value}
          onValueChange={(toggle: boolean) => {
            onChange(toggle);
            props.onValueChange && props.onValueChange(toggle);
          }}
        />
      )}
    />
  );
};

export default FormSwitch;
