import {useTheme} from '@theme';
import Helper from '@utils/helpers';
import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {LayoutChangeEvent, TouchableOpacity} from 'react-native';
import Block from '../Block';
import IconComponent from '../Icon';
import Text from '../Text';
import {isString} from '../utils';
import {HeaderTitleProps} from './types';

const HeaderTitle: React.FC<HeaderTitleProps> = ({
  title,
  isMultiple,
  onPressClose,
  onPressDone,
  HeaderLeftComponent,
  HeaderRightComponent,
  submitText,
  submitTextStyle,
  submitDisabled,
}) => {
  const {t} = useTranslation();
  const {Colors} = useTheme();

  const [leftButtonWidth, setLeftButtonWidth] = useState(0);
  const [rightButtonWidth, setRightButtonWidth] = useState(0);

  const _onHeaderLeftLayout = ({
    nativeEvent: {
      layout: {width},
    },
  }: LayoutChangeEvent) => {
    setLeftButtonWidth(width);
  };

  const _onHeaderRightLayout = ({
    nativeEvent: {
      layout: {width},
    },
  }: LayoutChangeEvent) => {
    setRightButtonWidth(width);
  };

  const margin = useMemo(
    () => ({
      horizontal:
        leftButtonWidth > rightButtonWidth ? leftButtonWidth : rightButtonWidth,
    }),
    [leftButtonWidth, rightButtonWidth],
  );

  return (
    <Block
      row
      align="center"
      justify="space-between"
      padding={{vertical: 12}}
      border={{
        bottom: {width: 1, color: Colors.border},
      }}
      backgroundColor="white"
      radius={{topLeft: 12, topRight: 12}}>
      <Block position="absolute" left={0} right={0} top={-11} align="center">
        <Block
          width={40}
          height={5}
          radius={15}
          backgroundColor={'rgba(255,255,255,0.8)'}
        />
      </Block>
      <Block onLayout={_onHeaderLeftLayout}>
        {HeaderLeftComponent || (
          <TouchableOpacity
            disabled={!isMultiple}
            hitSlop={Helper.getHitSlop()}
            onPress={onPressClose}>
            <Block padding={{horizontal: 12}}>
              {isMultiple && (
                <IconComponent
                  size={21}
                  color={Colors.primaryText}
                  name="close"
                  type="ionicons"
                />
              )}
            </Block>
          </TouchableOpacity>
        )}
      </Block>
      <Block position="absolute" left={0} right={0} margin={margin}>
        {isString(title) && (
          <Text fontType="bold" center>
            {title}
          </Text>
        )}
      </Block>
      <Block onLayout={_onHeaderRightLayout}>
        {HeaderRightComponent || (
          <TouchableOpacity
            disabled={isMultiple && submitDisabled}
            onPress={isMultiple ? onPressDone : onPressClose}
            hitSlop={Helper.getHitSlop()}>
            <Block
              padding={{horizontal: 12}}
              opacity={submitDisabled ? 0.6 : 1}>
              {isMultiple ? (
                <Text color="primary" fontType="bold" style={submitTextStyle}>
                  {submitText || t('common.done')}
                </Text>
              ) : (
                <IconComponent
                  size={21}
                  color={Colors.primaryText}
                  name="close"
                  type="ionicons"
                />
              )}
            </Block>
          </TouchableOpacity>
        )}
      </Block>
    </Block>
  );
};

export default HeaderTitle;
