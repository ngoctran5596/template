import {
  closeBottomMenu,
  showAlert,
  showBottomMenu,
} from '@store/actions/commonAction';
import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';
import ImageCropPicker, {
  ImageOrVideo,
  Options,
  PickerErrorCode,
} from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';

export interface MediaResponseType {
  name: string;
  uri: string;
  type: string;
  size: number;
}

export const useMediaPicker = (props?: Options) => {
  const dispatch = useDispatch();
  const {t} = useTranslation('Common');

  const [file, setFile] = useState<MediaResponseType | undefined>();

  const _handleResponse = (response: ImageOrVideo) => {
    const result = {
      name: 'MyApp-media',
      uri:
        Platform.OS === 'android'
          ? response.path
          : response.path.replace('file://', ''),
      type: response.mime || 'video/mp4',
      size: response.size || 0,
    };
    setFile(result);
  };

  const _handleError = useCallback(
    (error: {code: PickerErrorCode; message: string}) => {
      if (error.code !== 'E_PICKER_CANCELLED') {
        dispatch(showAlert({id: 'media_picker', message: error.message}));
      }
    },
    [dispatch],
  );

  const openPicker = () => {
    const options = props || {};
    const data = [
      {
        label: t('take_photo'),
        icon: {name: 'camera', type: 'ionicons'},
        onPress: () => {
          dispatch(closeBottomMenu());
          ImageCropPicker.openCamera(options)
            .then(_handleResponse)
            .catch(_handleError);
        },
      },
      {
        label: t('choose_from_library'),
        icon: {name: 'image', type: 'ionicons'},
        onPress: () => {
          dispatch(closeBottomMenu());
          ImageCropPicker.openPicker(options)
            .then(_handleResponse)
            .catch(_handleError);
        },
      },
    ];

    dispatch(
      showBottomMenu({
        data,
        bottomSheetModalProps: {onDismiss: () => dispatch(closeBottomMenu())},
      }),
    );
  };

  return {file, setFile, openPicker};
};
