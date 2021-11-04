import {DateTimePickerProps} from '@components/base/DateTimePicker/types';
import {Control} from 'react-hook-form';

export interface FormDateTimePickerProps extends Partial<DateTimePickerProps> {
  name: string;
  control: Control<any>;
}
