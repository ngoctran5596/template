import React from 'react';
import {IconComponent, Block, Text} from '@components/base';
import {StyleSheet} from 'react-native';
import {useTheme} from '@theme';

const ExampleIcon = () => {
  const {Colors} = useTheme();

  return (
    <Block flex backgroundColor="white" padding={16}>
      <Block margin={{bottom: 16}}>
        <Text fontType="bold" size={16} padding={{bottom: 12}}>
          Icon Simple
        </Text>
        <Block row justify="space-around" align="center">
          <IconComponent
            type="materialCommunityIcons"
            name="home"
            size={26}
            color="red"
          />
          <IconComponent
            type="fontAwesome5"
            name="archive"
            size={19}
            color="blue"
          />
          <IconComponent
            type="fontisto"
            name="google-play"
            size={19}
            color="purple"
          />
          <IconComponent
            type="ionicons"
            name="briefcase"
            size={24}
            color="green"
          />
        </Block>
      </Block>
      <Block margin={{bottom: 16}}>
        <Text fontType="bold" size={16} padding={{bottom: 12}}>
          Icon Button
        </Text>
        <Block>
          <Block row justify="space-between" align="center">
            <Text>Default</Text>
            <IconComponent
              type="materialCommunityIcons"
              name="home"
              size={26}
              color="white"
              onPress={() => console.log('ABC')}
              style={styles.iconContainer}
              backgroundColor={Colors.primary}
            />
          </Block>
          <Block row justify="space-between" align="center" margin={{top: 12}}>
            <Text>Disabled</Text>
            <IconComponent
              type="materialCommunityIcons"
              name="home"
              size={26}
              color="white"
              onPress={() => console.log('ABC')}
              style={styles.iconContainer}
              backgroundColor={Colors.primary}
              disabled
            />
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default ExampleIcon;

const styles = StyleSheet.create({
  iconContainer: {padding: 12},
});
