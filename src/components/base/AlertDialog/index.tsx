import {getAlertState} from '@store/selectors';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import Block from '../Block';
import Alert from './Alert';

const AlertDialog = () => {
  const alerts = useSelector(getAlertState);

  if (alerts.length === 0) {
    return <Block />;
  }

  return (
    <Block
      style={StyleSheet.absoluteFill}
      pointerEvents="box-none"
      align="center"
      justify="center">
      {alerts.map(item => (
        <Alert key={item.id} {...item} />
      ))}
    </Block>
  );
};

export default AlertDialog;
