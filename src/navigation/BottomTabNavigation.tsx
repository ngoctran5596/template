import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTab} from '@screens';
import {useTheme} from '@theme';
import React from 'react';
import ExampleNavigation from './ExampleNavigation';
import {BottomTabRoutes} from './types';

const BottomTabNav = createBottomTabNavigator<BottomTabRoutes>();

const BottomTabNavigation = () => {
  const {Colors, Fonts} = useTheme();

  return (
    <BottomTabNav.Navigator
      tabBarOptions={{
        allowFontScaling: false,
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.secondaryText,
        labelStyle: {...Fonts.regular},
      }}>
      <BottomTabNav.Screen name="Home" component={BottomTab.Home} />
      <BottomTabNav.Screen name="Messenger" component={ExampleNavigation} />
      <BottomTabNav.Screen name="Notification" component={BottomTab.Home} />
      <BottomTabNav.Screen name="Profile" component={BottomTab.Home} />
    </BottomTabNav.Navigator>
  );
};

export default BottomTabNavigation;
