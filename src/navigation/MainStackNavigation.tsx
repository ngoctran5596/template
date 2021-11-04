import {createStackNavigator} from '@react-navigation/stack';
import {getIsAuth} from '@store/selectors/authSelector';
import {useTheme} from '@theme';
import Helper from '@utils/helpers';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import BottomTabNavigation from './BottomTabNavigation';
import {MainStackRoutes} from './types';

const MainStack = createStackNavigator<MainStackRoutes>();

const MainStackNavigation = () => {
  const {Colors, Fonts} = useTheme();
  const isAuth = useSelector(getIsAuth);

  const getLoggedInStack = () => <></>;

  return (
    <MainStack.Navigator
      screenOptions={{
        title: '',
        headerTitleAllowFontScaling: false,
        headerTitleStyle: {
          ...Fonts.bold,
          color: Colors.dark,
          fontSize: 16,
        },
        headerLeft: ({onPress, canGoBack}) =>
          canGoBack && (
            <TouchableOpacity onPress={onPress} hitSlop={Helper.getHitSlop()}>
              <Ionicons
                name="chevron-back"
                color={Colors.primaryText}
                size={24}
              />
            </TouchableOpacity>
          ),
        headerLeftContainerStyle: {paddingHorizontal: 16},
      }}>
      <MainStack.Screen
        name="BottomTab"
        component={BottomTabNavigation}
        options={{headerShown: false}}
      />
      {isAuth && getLoggedInStack()}
    </MainStack.Navigator>
  );
};

export default MainStackNavigation;
