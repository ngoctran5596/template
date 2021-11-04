import {SwitchProps} from '@components/base/Switch/types';
import {Control} from 'react-hook-form';

export interface FormSwitchProps extends Partial<SwitchProps> {
  name: string;
  control: Control<any>;
}
