import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import {A} from 'react-native-toast-banner';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView>
      <View>
        <A />
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  </SafeAreaProvider>
);

export default App;
