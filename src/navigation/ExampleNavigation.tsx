import {createStackNavigator} from '@react-navigation/stack';
import {
  ExampleButton,
  ExampleDateTimePicker,
  ExampleIcon,
  ExampleImage,
  ExampleInput,
  ExampleModal,
  ExampleRadio,
  ExampleScreen,
  ExampleSelect,
  ExampleSwitch,
  ExampleText,
} from '@screens/Example';
import {useTheme} from '@theme';
import Helper from '@utils/helpers';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ExampleStack = createStackNavigator();

const ExampleNavigation = () => {
  const {Fonts, Colors} = useTheme();
  return (
    <ExampleStack.Navigator
      screenOptions={{
        title: '',
        headerTitleAllowFontScaling: false,
        headerTitleStyle: {
          ...Fonts.bold,
          color: Colors.primaryText,
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
      <ExampleStack.Screen name="Example" component={ExampleScreen} />
      <ExampleStack.Screen name="ExampleText" component={ExampleText} />
      <ExampleStack.Screen name="ExampleButton" component={ExampleButton} />
      <ExampleStack.Screen name="ExampleIcon" component={ExampleIcon} />
      <ExampleStack.Screen name="ExampleInput" component={ExampleInput} />
      <ExampleStack.Screen name="ExampleRadio" component={ExampleRadio} />
      <ExampleStack.Screen name="ExampleModal" component={ExampleModal} />
      <ExampleStack.Screen name="ExampleSelect" component={ExampleSelect} />
      <ExampleStack.Screen name="ExampleSwitch" component={ExampleSwitch} />
      <ExampleStack.Screen name="ExampleImage" component={ExampleImage} />
      <ExampleStack.Screen
        name="ExampleDateTimePicker"
        component={ExampleDateTimePicker}
      />
    </ExampleStack.Navigator>
  );
};

export default ExampleNavigation;
