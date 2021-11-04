import {Block, Text} from '@components/base';
import {useBackHandler} from '@hooks';
import {closeAlert, dismissAlert} from '@store/actions';
import {AlertType} from '@store/types';
import React, {useCallback, useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Animated, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {useDispatch} from 'react-redux';
import Button from '../Button';
import AlertStyles from './Alert.styles';

const Alert: React.FC<AlertType> = props => {
  const {
    isVisible,
    title,
    titleTextStyle,
    message,
    messageTextStyle,
    options,
    id,
    onCancel,
    cancelText,
    cancelTextProps,
    cancelButtonProps,
    onOk,
    okText,
    okTextProps,
    okButtonProps,
  } = props;
  const {t} = useTranslation('Common');
  const dispatch = useDispatch();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (!isVisible) {
        dispatch(dismissAlert({id}));
      }
    });
  }, [dispatch, id, isVisible, progress]);

  useBackHandler({
    enabled: isVisible,
    callback: () => {
      if (options?.cancelable) {
        dispatch(closeAlert({id}));
      }
    },
  });

  const _onBackdropPress = useCallback(() => {
    if (options?.cancelable) {
      dispatch(closeAlert({id}));
    }
  }, [dispatch, id, options?.cancelable]);

  const _renderCancelButton = () => {
    if (!onCancel) {
      return;
    }
    return (
      <Button
        flex
        type="text"
        padding={10}
        radius={0}
        {...cancelButtonProps}
        onPress={() => {
          dispatch(closeAlert());
          onCancel();
        }}
        title={cancelText || `${t('cancel')}`}
        titleProps={{
          fontType: 'bold',
          size: 17,
          color: 'secondaryText',
          ...cancelTextProps,
        }}
      />
    );
  };

  const _renderOkButton = () => {
    return (
      <Button
        flex
        type="text"
        padding={10}
        radius={0}
        {...okButtonProps}
        onPress={() => (onOk ? onOk() : dispatch(closeAlert()))}
        title={okText || `${t('ok')}`}
        titleProps={{fontType: 'bold', size: 17, ...okTextProps}}
      />
    );
  };

  const opacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
    extrapolate: 'clamp',
  });

  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Block
      style={StyleSheet.absoluteFill}
      pointerEvents="box-none"
      align="center"
      justify="center">
      <TouchableWithoutFeedback onPress={_onBackdropPress}>
        <Animated.View style={[AlertStyles.backdrop, {opacity}]} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[AlertStyles.modalContainer, {transform: [{scale}]}]}>
        <Block padding={16}>
          {!!title && (
            <Text
              center
              size={16}
              fontType="bold"
              margin={{bottom: 2}}
              style={titleTextStyle}>
              {title}
            </Text>
          )}
          {!!message && (
            <Text
              size={14}
              color="secondaryText"
              center
              style={messageTextStyle}>
              {message}
            </Text>
          )}
        </Block>
        <Block height={1} backgroundColor="border" />
        <Block row>
          {_renderCancelButton()}
          {onCancel && <Block width={1} backgroundColor="border" />}
          {_renderOkButton()}
        </Block>
      </Animated.View>
    </Block>
  );
};

export default Alert;
