import * as React from 'react';
import {View, Text} from 'react-native';

const RegularBanner = () => (
  <Text
    style={{
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      marginHorizontal: 20,
    }}>
    Hello the regular banner!
  </Text>
);

const BigBanner = () => (
  <View style={{paddingVertical: 20}}>
    <Text
      style={{
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 20,
      }}>
      {`Hello the Big banner!
Don't worry about how big this is.
It should render correctly.
Cool!`}
    </Text>
  </View>
);

const Toast = () => (
  <View style={{padding: 14}}>
    <View
      style={{
        backgroundColor: '#0007',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        width: '100%',
        height: 60,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
          marginHorizontal: 20,
          textAlign: 'center',
        }}>
        Allright! This is a toast :)
      </Text>
    </View>
  </View>
);

export {RegularBanner, BigBanner, Toast};
