import {BottomSheetHandleProps} from '@gorhom/bottom-sheet';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {IconComponentProps} from '../utils';

export interface SelectIconItem extends IconComponentProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export interface SelectItemType {
  label: string | number;
  value: string | number;
  icon?: SelectIconItem | React.ReactNode;
}

export interface SelectProps {
  /**
   * Type of select
   *
   * Default is **single**
   */
  type?: 'single' | 'multiple';

  /**
   * Data of select box
   */
  data?: SelectItemType[];

  /**
   * Value of select box
   */
  selected?: SelectItemType | SelectItemType[];

  /**
   * Action after selected item
   */
  onSelected?: (value: any) => void;

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

  HeaderLeftComponent?: React.Component;

  HeaderRightComponent?: React.Component;

  /**
   * Submit Text
   * Default is **Done**
   */
  submitText?: string;

  /**
   * Styling for submit text
   */
  submitTextStyle?: StyleProp<TextStyle>;

  /**
   * Disable submit button
   */
  submitDisabled?: boolean;

  /**
   * Height of select item
   * Default: **45**
   */
  itemHeight?: number;
}

export interface SelectPopupProps {
  data: SelectItemType[];
  isMultiple?: boolean;
  onPressClose: () => void;
  onSelected?: (value: any) => void;
  selected: any;
  label?: React.ReactNode;
  HeaderLeftComponent?: React.Component;
  HeaderRightComponent?: React.Component;
  submitText?: string;
  submitTextStyle?: StyleProp<TextStyle>;
  submitDisabled?: boolean;
  itemHeight: number;
}

export interface HeaderTitleProps extends BottomSheetHandleProps {
  isMultiple?: boolean;
  onPressClose?: () => void;
  onPressDone?: () => void;
  title?: React.ReactNode;
  HeaderLeftComponent?: React.Component;
  HeaderRightComponent?: React.Component;
  submitText?: string;
  submitTextStyle?: StyleProp<TextStyle>;
  submitDisabled?: boolean;
}

export interface SelectItemProps {
  data: SelectItemType;
  onPress?: (data: SelectItemType) => void;
  isSelected?: boolean;
  multiple?: boolean;
  itemHeight: number;
}
