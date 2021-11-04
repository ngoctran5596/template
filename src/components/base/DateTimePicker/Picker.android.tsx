import DateTimePicker, {
  AndroidEvent,
  AndroidNativeProps,
} from '@react-native-community/datetimepicker';
import React from 'react';

interface PickerAndroidProps extends AndroidNativeProps {
  isVisible: boolean;
  close: () => void;
  show: () => void;
  onPressDone?: (value: Date) => void;
}

const PickerIos: React.FC<PickerAndroidProps> = props => {
  const {isVisible, close, value, onPressDone, ...rest} = props;

  if (!isVisible) {
    return null;
  }

  const _onChange = (_e: AndroidEvent, date?: Date) => {
    close();
    if (date) {
      onPressDone && onPressDone(date);
    }
  };

  return (
    <DateTimePicker
      display="default"
      is24Hour={true}
      {...rest}
      value={value}
      onChange={_onChange}
    />
  );
};

export default PickerIos;
