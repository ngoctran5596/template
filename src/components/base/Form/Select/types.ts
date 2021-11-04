import {SelectProps} from '@components/base/Select/types';
import {Control} from 'react-hook-form';

export interface FormSelectProps extends SelectProps {
  name: string;
  control: Control<any>;
}
