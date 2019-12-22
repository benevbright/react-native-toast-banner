import React from 'react';
import {View, Text} from 'react-native';

const RegularBanner = () => (
  <View
    style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      paddingHorizontal: 20,
    }}>
    <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
      Hello the regular banner!
    </Text>
  </View>
);

export {RegularBanner};
