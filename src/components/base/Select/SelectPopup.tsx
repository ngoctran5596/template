import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {useTheme} from '@theme';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {ActivityIndicator} from 'react-native';
import {Easing} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Block from '../Block';
import HeaderTitle from './HeaderTitle';
import SelectItem from './SelectItem';
import styles from './styles';
import {SelectItemType, SelectPopupProps} from './types';

const SelectPopup = forwardRef<any, SelectPopupProps>((props, ref) => {
  const {
    data,
    isMultiple,
    onPressClose,
    onSelected,
    selected,
    label,
    HeaderLeftComponent,
    HeaderRightComponent,
    submitText,
    submitTextStyle,
    submitDisabled,
    itemHeight,
  } = props;

  const {Colors} = useTheme();
  const {bottom: safeBottomArea, top: safeTopArea} = useSafeAreaInsets();

  const [tempSelected, setTempSelected] = useState<SelectItemType[]>([]);

  useEffect(() => {
    if (isMultiple) {
      setTempSelected(selected);
    }
  }, [isMultiple, selected]);

  const _onPressItem = useCallback(
    (item: SelectItemType) => {
      if (!isMultiple) {
        onSelected && onSelected(item);
        (ref as any)?.current?.close();
      } else {
        const cloneSelected = [...tempSelected];
        const curIndex = cloneSelected.findIndex(
          temp => temp.value === item.value,
        );
        if (curIndex === -1) {
          cloneSelected.push(item);
        } else {
          cloneSelected.splice(curIndex, 1);
        }
        setTempSelected(cloneSelected);
      }
    },
    [isMultiple, onSelected, ref, tempSelected],
  );

  const snapPoints = useMemo(
    () => [data.length === 0 ? 90 : data.length * itemHeight + safeBottomArea],
    [data.length, itemHeight, safeBottomArea],
  );

  const _renderBackdrop = useCallback(
    backdropProps => <BottomSheetBackdrop {...backdropProps} opacity={0.2} />,
    [],
  );

  const _onPressDone = useCallback(() => {
    onSelected && onSelected(tempSelected);
    (ref as any)?.current?.close();
  }, [onSelected, ref, tempSelected]);

  const _renderHandle = useCallback(
    handleProps => (
      <HeaderTitle
        title={label}
        onPressDone={_onPressDone}
        onPressClose={onPressClose}
        isMultiple={isMultiple}
        HeaderLeftComponent={HeaderLeftComponent}
        HeaderRightComponent={HeaderRightComponent}
        submitText={submitText}
        submitTextStyle={submitTextStyle}
        submitDisabled={submitDisabled}
        {...handleProps}
      />
    ),
    [
      label,
      _onPressDone,
      onPressClose,
      isMultiple,
      HeaderLeftComponent,
      HeaderRightComponent,
      submitTextStyle,
      submitText,
      submitDisabled,
    ],
  );

  const _renderSelectItem = useCallback(
    ({item}: {item: SelectItemType}) => {
      let isSelected = false;
      if (!isMultiple) {
        isSelected = selected.value === item.value;
      } else {
        isSelected =
          tempSelected.findIndex(temp => temp.value === item.value) !== -1;
      }

      return (
        <SelectItem
          itemHeight={itemHeight}
          data={item}
          onPress={_onPressItem}
          isSelected={isSelected}
          multiple={isMultiple}
        />
      );
    },
    [_onPressItem, isMultiple, itemHeight, selected.value, tempSelected],
  );

  const _keyExtractor = useCallback(
    (item, index) => `${item.value}_${index}`,
    [],
  );

  const _getItemLayout = useCallback(
    (_data, index) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }),
    [itemHeight],
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
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      topInset={safeTopArea + 50}
      animationEasing={Easing.out(Easing.quad)}
      animationDuration={250}
      handleComponent={_renderHandle}
      backdropComponent={_renderBackdrop}>
      <BottomSheetFlatList
        data={data}
        contentContainerStyle={[
          styles.contentStyle,
          {paddingBottom: safeBottomArea},
        ]}
        showsVerticalScrollIndicator={false}
        renderItem={_renderSelectItem}
        keyExtractor={_keyExtractor}
        getItemLayout={_getItemLayout}
        ListEmptyComponent={_renderEmptyList}
      />
    </BottomSheetModal>
  );
});

export default SelectPopup;
