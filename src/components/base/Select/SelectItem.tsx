import {useTheme} from '@theme';
import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Block from '../Block';
import IconComponent from '../Icon';
import Text from '../Text';
import {isIcon} from '../utils';
import styles from './styles';
import {SelectItemProps, SelectItemType} from './types';

const SelectItem: React.FC<SelectItemProps> = ({
  data,
  onPress,
  isSelected,
  multiple,
  itemHeight,
}) => {
  const {Colors} = useTheme();

  const _renderIcon = (icon: SelectItemType['icon']) => {
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

  const _renderCheckbox = () => {
    const defaultRadioIcon = isSelected
      ? 'radio-button-checked'
      : 'radio-button-unchecked';

    const defaultcheckBoxIcon = isSelected
      ? 'check-box'
      : 'check-box-outline-blank';

    return (
      <MaterialIcons
        name={multiple ? defaultcheckBoxIcon : defaultRadioIcon}
        size={24}
        color={isSelected ? Colors.primary : Colors.primaryText}
      />
    );
  };
  const ButtonComponent = Platform.select<typeof React.Component>({
    android: TouchableNativeFeedback,
    default: TouchableOpacity,
  });

  return (
    <ButtonComponent
      activeOpacity={0.6}
      onPress={() => onPress && onPress(data)}>
      <Block
        style={{height: itemHeight}}
        row
        padding={{horizontal: 16}}
        backgroundColor="white"
        align="center">
        {data.icon && _renderIcon(data.icon)}
        <Block flexShrink row align="center">
          <Text flexGrow>{data.label}</Text>
          {_renderCheckbox()}
        </Block>
      </Block>
    </ButtonComponent>
  );
};

export default SelectItem;
