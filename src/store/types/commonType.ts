export type ActionPayload<T> = {type: string; payload: T};

import {MenuItemType} from '@components/base/BottomMenu/types';
import {ButtonProps} from '@components/base/Button/types';
import {CommonTextProps} from '@components/base/Text/types';
import {BottomSheetModalProps} from '@gorhom/bottom-sheet';
import {StyleProp, TextStyle} from 'react-native';

export interface AlertPayload {
  /**
   * Id of alert box
   */
  id: string;
  title?: string;
  message?: string;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;

  okText?: string;
  onOk?: () => void;
  okButtonProps?: ButtonProps;
  okTextProps?: CommonTextProps;

  cancelText?: string;
  onCancel?: () => void;
  cancelButtonProps?: ButtonProps;
  cancelTextProps?: CommonTextProps;

  options?: {
    cancelable?: boolean;
  };
}

export interface AlertType extends AlertPayload {
  isVisible?: boolean;
}

export interface ModalType {
  id: string;
  isVisible: boolean;
  customProps?: {[key: string]: any};
}

export interface BottomMenuPayload {
  data: MenuItemType[];
  bottomSheetModalProps?: Partial<BottomSheetModalProps>;
}

export interface BottomMenuType extends BottomMenuPayload {
  isVisible?: boolean;
}

export interface CommonState {
  modals: {[id: string]: ModalType};
  alerts: {[id: string]: AlertType};
  bottomMenu: BottomMenuType | null;
}
