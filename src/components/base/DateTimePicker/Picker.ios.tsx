import {ActionSheet, Block, Button} from '@components/base';
import DateTimePicker, {
  IOSNativeProps,
} from '@react-native-community/datetimepicker';
import {useTheme} from '@theme';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

interface PickerIosProps extends IOSNativeProps {
  isVisible: boolean;
  close: () => void;
  show: () => void;
  dismiss: () => void;
  onPressDone?: (value: Date) => void;
}

const PickerIos: React.FC<PickerIosProps> = props => {
  const {t} = useTranslation('Common');
  const {Colors} = useTheme();
  const {isVisible, close, value, onPressDone, dismiss, ...rest} = props;
  const [pickerValue, setPickerValue] = useState<Date>(value);

  return (
    <ActionSheet
      isVisible={isVisible}
      onPressCancel={close}
      onDismiss={dismiss}>
      <Block backgroundColor="white" radius={14} overflow="hidden">
        <Block padding={8}>
          <DateTimePicker
            display="inline"
            {...rest}
            value={pickerValue}
            onChange={(_e, date) => date && setPickerValue(date)}
          />
        </Block>
        {!!pickerValue && (
          <Block
            border={{
              top: {width: StyleSheet.hairlineWidth, color: Colors.border},
            }}>
            <Button
              style={styles.doneBtn}
              type="text"
              titleProps={{style: styles.titleStyle}}
              title={t('done')}
              onPress={() => {
                close();
                onPressDone && onPressDone(pickerValue);
              }}
            />
          </Block>
        )}
      </Block>
    </ActionSheet>
  );
};

export default PickerIos;

const styles = StyleSheet.create({
  doneBtn: {paddingVertical: 12},
  titleStyle: {color: '#0A7AFF', fontSize: 18},
});
