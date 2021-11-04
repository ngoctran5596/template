import {Block, Text} from '@components/base';
import React from 'react';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <Block flex backgroundColor="white" inset="top">
      <Text>Hello world</Text>
    </Block>
  );
};

export default HomeScreen;
