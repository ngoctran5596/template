import {AlertDialog, BottomMenu} from '@components/base';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {PortalProvider} from '@gorhom/portal';
import {NavigationContainer} from '@react-navigation/native';
import {startupRequest} from '@store/actions/startupAction';
import {getBottomMenuState, getStartUpLoading} from '@store/selectors';
import {useTheme} from '@theme';
import moment from 'moment';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StatusBar} from 'react-native';
import Splash from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import {navigationRef} from './NavigationServices';
import RootStackNavigation from './RootStackNavigation';

const MainNavigation = () => {
  const {i18n} = useTranslation();
  const {NavigationTheme} = useTheme();
  const dispatch = useDispatch();
  const isLoading = useSelector(getStartUpLoading);
  const bottomMenuProps = useSelector(getBottomMenuState);

  useEffect(() => {
    dispatch(startupRequest());
  }, [dispatch]);

  useEffect(() => {
    moment.locale(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    if (!isLoading) {
      Splash.hide();
    }
  }, [isLoading]);

  return (
    <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
      <PortalProvider>
        <BottomSheetModalProvider>
          <StatusBar barStyle="dark-content" />
          <RootStackNavigation />
          <BottomMenu {...bottomMenuProps} />
        </BottomSheetModalProvider>
      </PortalProvider>
      <AlertDialog />
    </NavigationContainer>
  );
};

export default MainNavigation;
