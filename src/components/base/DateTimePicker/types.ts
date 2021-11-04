import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {IconComponentProps} from '../utils';

export interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;

  placeholder?: string;

  placeholderTextColor?: string;

  /**
   * Styling for view containing label, input and error message
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Styling for view containing input
   */
  inputContainerStyle?: StyleProp<ViewStyle>;

  /**
   * if **true**, text is not editable
   */
  disabled?: boolean;

  /**
   * Label of input
   */
  label?: React.ReactNode;

  /**
   * Style of label if label is string
   */
  labelStyle?: StyleProp<TextStyle>;

  /**
   * Add **"*"** after label if label is string
   */
  required?: boolean;

  /**
   * Error message
   */
  error?: React.ReactNode;

  /**
   * Style of error message if error is string
   */
  errorStyle?: StyleProp<TextStyle>;

  /**
   * Show error message
   */
  showError?: boolean;

  /**
   * Left icon
   */
  leftIcon?: IconComponentProps | React.ReactNode;

  /**
   * Styling for view containing the left icon
   */
  leftIconContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Right icon
   */
  rightIcon?: IconComponentProps | React.ReactNode;

  /**
   * Styling for view containing the right icon
   */
  rightIconContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Mode of picker
   * Default: **date**
   */
  mode?: 'date' | 'time';

  /**
   * Defines the maximum date that can be selected
   */
  maximumDate?: Date;

  /**
   * Defines the minimum date that can be selected
   */
  minimumDate?: Date;

  valueFormat?: string;
}
