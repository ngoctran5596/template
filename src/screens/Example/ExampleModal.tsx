import {ActionSheet, Block, Button, Modal, Text} from '@components/base';
import {useMediaPicker, useModalController} from '@hooks';
import {showAlert} from '@store/actions/commonAction';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

const ExampleModal = () => {
  const dispatch = useDispatch();
  const modalState = useModalController({id: 'Modal_1'});
  const actionSheetState = useModalController({
    id: 'ActionSheet_Example',
  });
  const {openPicker, file, setFile} = useMediaPicker({mediaType: 'photo'});

  const _showAlert = () => {
    dispatch(
      showAlert({
        id: 'example_alert',
        title: 'Example Alert',
        message: 'Message odf ',
        options: {cancelable: true},
      }),
    );
  };

  return (
    <Block flex backgroundColor="white" padding={16}>
      <Text>Alert</Text>
      <Button title="Show Alert" onPress={_showAlert} />
      <Block height={24} />
      <Text>Modal Controller</Text>
      <Button title="Show Modal" onPress={modalState.show} />
      <Modal
        id="example_modal"
        isVisible={modalState.isVisible}
        onRequestClose={modalState.close}>
        <Block padding={16}>
          <Text fontType="bold" size={16} center>
            Modal Example
          </Text>
          <Block height={24} />
          <Button title="Show Alert In Modal" onPress={_showAlert} />
          <Block height={24} />
          <Button title="Close Modal" onPress={modalState.close} />
        </Block>
      </Modal>
      <Block height={24} />
      <Text>Action Sheet</Text>
      <Button title="Show Action Sheet" onPress={actionSheetState.show} />
      <ActionSheet
        isVisible={actionSheetState.isVisible}
        headerTitle="A short description of the actions goes here."
        buttons={[{text: 'Action 1'}, {text: 'Action 2'}, {text: 'Action 3'}]}
        onPressCancel={actionSheetState.close}
        onDismiss={actionSheetState.dismiss}
      />
      <Block height={24} />
      <Text>Image Picker</Text>
      <Button title="Show Image Picker" onPress={openPicker} />
      <Block height={24} />
      {!!file && (
        <Block align="center">
          <Image
            source={{uri: file.uri}}
            resizeMode="cover"
            style={styles.imageStyle}
          />
          <Button title="Remove" onPress={() => setFile(undefined)} />
        </Block>
      )}
    </Block>
  );
};

export default ExampleModal;

const styles = StyleSheet.create({
  imageStyle: {width: 100, height: 100},
});
