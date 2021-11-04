import {StyleProp, ViewStyle} from 'react-native';
import {IconComponentProps} from '../utils';

export interface MenuIconItem extends IconComponentProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export interface MenuItemType {
  label: string | number;
  onPress: () => void;
  icon?: MenuIconItem | React.ReactNode;
}

export interface MenuItemProps {
  data: MenuItemType;
  onPress: () => void;
}
