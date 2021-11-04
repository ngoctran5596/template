import {Block} from '@components/base';
import {Portal} from '@gorhom/portal';
import {useBackHandler} from '@hooks';
import {removeModal} from '@store/actions';
import {useTheme} from '@theme';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import ModalStyles from './Modal.styles';

interface ModalProps {
  id: string;
  isVisible: boolean;
  onBackdropPress?: () => void;
  onRequestClose?: () => void;
  transparent?: boolean;
  showBackdrop?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  id,
  children,
  isVisible,
  onBackdropPress,
  transparent,
  showBackdrop,
  onRequestClose,
}) => {
  const {Colors} = useTheme();
  const {height: deviceHeight} = useWindowDimensions();
  const dispatch = useDispatch();
  const progress = useRef(new Animated.Value(0)).current;
  const [modalShow, setModalShow] = useState(false);
  const isMount = useRef(false);

  useEffect(() => {
    if (isVisible) {
      setModalShow(true);
      isMount.current = true;
    }
    Animated.timing(progress, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (!isVisible) {
        setModalShow(false);
        if (isMount.current) {
          dispatch(removeModal({id}));
        }
      }
    });
  }, [dispatch, id, isVisible, progress]);

  useBackHandler({
    enabled: isVisible,
    callback: () => {
      onRequestClose && onRequestClose();
    },
  });

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [deviceHeight, 0],
    extrapolate: 'clamp',
  });

  const opacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
    extrapolate: 'clamp',
  });

  if (!modalShow) {
    return <Block />;
  }

  return (
    <Portal name={id}>
      <Block style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
        {showBackdrop && (
          <TouchableWithoutFeedback onPress={onBackdropPress}>
            <Animated.View style={[ModalStyles.backdrop, {opacity}]} />
          </TouchableWithoutFeedback>
        )}
        <Animated.View
          style={[
            ModalStyles.modalStyle,
            !transparent && {backgroundColor: Colors.white},
            {transform: [{translateY}]},
          ]}>
          {children}
        </Animated.View>
      </Block>
    </Portal>
  );
};

export default Modal;
