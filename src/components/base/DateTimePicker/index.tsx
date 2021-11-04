import {useModalController} from '@hooks';
import {useTheme} from '@theme';
import moment from 'moment';
import React, {useMemo} from 'react';
import {Keyboard, StyleSheet, ViewStyle} from 'react-native';
import Block from '../Block';
import Button from '../Button';
import IconComponent from '../Icon';
import Text from '../Text';
import {isIcon, isString} from '../utils';
import Picker from './Picker';
import {DateTimePickerProps} from './types';

const DateTimePicker: React.FC<DateTimePickerProps> = props => {
  const {
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
    placeholder,
    placeholderTextColor = 'secondaryText',
    containerStyle,
    inputContainerStyle,
    value,
    onChange,
    mode = 'date',
    maximumDate,
    minimumDate,
    valueFormat = mode === 'date' ? 'DD/MM/YYYY' : 'HH:mm',
  } = props;

  const {Colors} = useTheme();

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
      minHeight: 45,
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

  const _renderDateTimeValue = () => {
    return (
      <Block flexGrow flexShrink padding={{left: leftIcon ? 0 : 16}}>
        <Text
          numberOfLines={1}
          color={
            value === '' || disabled ? placeholderTextColor : Colors.primaryText
          }>
          {value === '' ? placeholder : value}
        </Text>
      </Block>
    );
  };

  const pickerId = useMemo(() => Math.random().toString(), []);
  const pickerState = useModalController({id: `date_time_picker_${pickerId}`});

  const _onPressDone = (date?: Date) => {
    onChange && onChange(moment(date).format(valueFormat));
  };

  const _openDateTimePicker = () => {
    Keyboard.dismiss();
    pickerState.show();
  };

  return (
    <Block style={containerStyle}>
      {label && _renderLabel()}
      <Button
        height={45}
        radius={8}
        align="center"
        row
        border={{
          width: StyleSheet.hairlineWidth,
          color: error ? Colors.error : Colors.border,
        }}
        backgroundColor={disabled ? 'disabled' : 'inputBG'}
        disabled={disabled}
        onPress={_openDateTimePicker}
        style={inputContainerStyle}>
        {leftIcon && _renderIcon()}
        {_renderDateTimeValue()}
        {_renderIcon(true)}
      </Button>
      {showError && error && _renderError()}
      <Picker
        {...pickerState}
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        mode={mode}
        value={value === '' ? new Date() : moment(value, valueFormat).toDate()}
        onPressDone={_onPressDone}
      />
    </Block>
  );
};

export default DateTimePicker;
