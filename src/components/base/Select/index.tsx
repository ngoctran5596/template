import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useTheme} from '@theme';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {Keyboard} from 'react-native';
import {StyleSheet, ViewStyle} from 'react-native';
import Block from '../Block';
import Button from '../Button';
import IconComponent from '../Icon';
import Text from '../Text';
import {isIcon, isString} from '../utils';
import {HEIGHT_SELECT_BOX, ITEM_HEIGHT_DEFAULT} from './constants';
import SelectPopup from './SelectPopup';
import {SelectItemType, SelectProps} from './types';

declare type Select = {
  openSelect: () => void;
  closeSelect: () => void;
};

const Select = forwardRef<any, SelectProps>((props, ref) => {
  const {
    containerStyle,
    inputContainerStyle,
    label,
    labelStyle,
    required,
    error,
    showError,
    errorStyle,
    leftIcon,
    leftIconContainerStyle,
    rightIcon,
    rightIconContainerStyle,
    disabled,
    data = [],
    type = 'single',
    onSelected,
    selected = type === 'single' ? {label: '', value: ''} : [],
    placeholder,
    placeholderTextColor = 'secondaryText',
    HeaderLeftComponent,
    HeaderRightComponent,
    submitText,
    submitTextStyle,
    submitDisabled,
    itemHeight = ITEM_HEIGHT_DEFAULT,
  } = props;

  const {Colors} = useTheme();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const isMultiple = type === 'multiple';

  useImperativeHandle(
    ref,
    () => ({
      focus: () => bottomSheetRef.current?.present(),
      blur: () => bottomSheetRef.current?.close(),
    }),
    [],
  );

  const _renderLabel = () => {
    if (isString(label)) {
      return (
        <Text margin={{bottom: 4}} color="primaryText" style={labelStyle}>
          {label}
          {required && <Text color="error"> *</Text>}
        </Text>
      );
    }
    return label;
  };

  const _renderError = () => {
    if (isString(error)) {
      return (
        <Text margin={{top: 4}} color="error" style={errorStyle}>
          {error}
        </Text>
      );
    }
    return error;
  };

  const _renderIcon = (isRight?: boolean) => {
    const defaultIconStyle = {
      minHeight: HEIGHT_SELECT_BOX,
      paddingHorizontal: 16,
      opacity: disabled ? 0.5 : 1,
      justifyContent: 'center' as ViewStyle['justifyContent'],
    };

    if (isRight && !rightIcon) {
      return (
        <IconComponent
          style={defaultIconStyle}
          size={21}
          color={Colors.secondaryText}
          name="chevron-down"
          type="ionicons"
        />
      );
    }

    const [icon, iconStyle] = isRight
      ? [rightIcon, rightIconContainerStyle]
      : [leftIcon, leftIconContainerStyle];

    if (isIcon(icon)) {
      return (
        <IconComponent
          style={StyleSheet.flatten([defaultIconStyle, iconStyle])}
          name={icon.name}
          size={icon.size || 16}
          color={icon.color || Colors.secondaryText}
          type={icon.type}
        />
      );
    }

    return icon;
  };

  const _renderSelectBox = () => {
    const placeholderColor =
      Colors[placeholderTextColor] || placeholderTextColor;

    const selectedValue = isMultiple
      ? (selected as SelectItemType[])
          .map((item: SelectItemType) => item.label)
          .join(', ')
      : (selected as SelectItemType).label;

    return (
      <Block flexGrow flexShrink padding={{left: leftIcon ? 0 : 16}}>
        <Text
          numberOfLines={1}
          color={
            selectedValue === '' || disabled
              ? placeholderColor
              : Colors.primaryText
          }>
          {selectedValue === '' ? placeholder : selectedValue}
        </Text>
      </Block>
    );
  };

  const _openSelectPopup = () => {
    Keyboard.dismiss();
    bottomSheetRef.current?.present();
  };

  const _onPressClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const selectPopup = {
    HeaderLeftComponent,
    HeaderRightComponent,
    submitText,
    submitTextStyle,
    label,
    selected,
    isMultiple,
    onSelected,
    data,
    submitDisabled,
  };

  return (
    <Block style={containerStyle}>
      {label && _renderLabel()}
      <Button
        disabled={disabled}
        onPress={_openSelectPopup}
        backgroundColor={disabled ? 'disabled' : 'inputBG'}
        align="center"
        row
        border={{
          width: StyleSheet.hairlineWidth,
          color: error ? Colors.error : Colors.border,
        }}
        style={[{height: HEIGHT_SELECT_BOX}, inputContainerStyle]}>
        {leftIcon && _renderIcon()}
        {_renderSelectBox()}
        {_renderIcon(true)}
      </Button>
      {showError && error && _renderError()}
      <SelectPopup
        ref={bottomSheetRef}
        onPressClose={_onPressClose}
        itemHeight={itemHeight}
        {...selectPopup}
      />
    </Block>
  );
});

export default Select;
