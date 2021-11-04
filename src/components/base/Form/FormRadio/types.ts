import {RadioProps} from '@components/base/Radio/types';
import {Control} from 'react-hook-form';

export interface FormRadioProps extends Partial<RadioProps> {
  name: string;
  control: Control<any>;
}
