import {useTheme} from '@theme';
import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import Block from '../Block';
import IconComponent from '../Icon';
import Text from '../Text';
import {isIcon} from '../utils';
import {ITEM_HEIGHT_DEFAULT} from './constants';
import styles from './styles';
import {MenuItemProps, MenuItemType} from './types';

const MenuItem: React.FC<MenuItemProps> = ({data, onPress}) => {
  const {Colors} = useTheme();

  const _renderIcon = (icon: MenuItemType['icon']) => {
    if (isIcon(icon)) {
      return (
        <IconComponent
          style={StyleSheet.flatten([
            styles.itemIconStyle,
            icon.containerStyle,
          ])}
          name={icon.name}
          size={icon.size || 21}
          color={icon.color || Colors.secondaryText}
          type={icon.type}
        />
      );
    }

    return icon;
  };

  const ButtonComponent = Platform.select<typeof React.Component>({
    android: TouchableNativeFeedback,
    default: TouchableOpacity,
  });

  return (
    <ButtonComponent activeOpacity={0.6} onPress={onPress}>
      <Block
        style={{height: ITEM_HEIGHT_DEFAULT}}
        row
        padding={{horizontal: 16}}
        backgroundColor="white"
        align="center">
        {data.icon && _renderIcon(data.icon)}
        <Text flexGrow>{data.label}</Text>
      </Block>
    </ButtonComponent>
  );
};

export default MenuItem;
