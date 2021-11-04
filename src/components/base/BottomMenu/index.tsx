import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {BottomMenuType} from '@store/types/commonType';
import {useTheme} from '@theme';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {ActivityIndicator, Keyboard} from 'react-native';
import {Easing} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Block from '../Block';
import {ITEM_HEIGHT_DEFAULT} from './constants';
import MenuItem from './MenuItem';
import styles from './styles';
import {MenuItemType} from './types';

const BottomMenu: React.FC<BottomMenuType> = props => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const {data = [], bottomSheetModalProps, isVisible = false} = props;

  const {Colors} = useTheme();
  const {bottom: safeBottomArea, top: safeTopArea} = useSafeAreaInsets();

  useEffect(() => {
    if (isVisible) {
      Keyboard.dismiss();
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const snapPoints = useMemo(
    () => [
      data.length === 0
        ? 90
        : data.length * ITEM_HEIGHT_DEFAULT + safeBottomArea,
    ],
    [data.length, safeBottomArea],
  );

  const _renderBackdrop = useCallback(
    backdropProps => <BottomSheetBackdrop {...backdropProps} opacity={0.2} />,
    [],
  );

  const _renderSelectItem = useCallback(({item}: {item: MenuItemType}) => {
    return <MenuItem data={item} onPress={item.onPress} />;
  }, []);

  const _keyExtractor = useCallback(
    (item, index) => `${item.value}_${index}`,
    [],
  );

  const _getItemLayout = useCallback(
    (_data, index) => ({
      length: ITEM_HEIGHT_DEFAULT,
      offset: ITEM_HEIGHT_DEFAULT * index,
      index,
    }),
    [],
  );

  const _renderEmptyList = useCallback(() => {
    return (
      <Block align="center" justify="center" flex>
        <ActivityIndicator color={Colors.primary} />
      </Block>
    );
  }, [Colors.primary]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      topInset={safeTopArea + 50}
      animationEasing={Easing.out(Easing.quad)}
      animationDuration={250}
      backdropComponent={_renderBackdrop}
      {...bottomSheetModalProps}>
      <BottomSheetFlatList
        data={data}
        bounces={false}
        contentContainerStyle={[
          styles.contentStyle,
          {paddingBottom: safeBottomArea},
        ]}
        renderItem={_renderSelectItem}
        keyExtractor={_keyExtractor}
        getItemLayout={_getItemLayout}
        ListEmptyComponent={_renderEmptyList}
      />
    </BottomSheetModal>
  );
};

export default BottomMenu;
