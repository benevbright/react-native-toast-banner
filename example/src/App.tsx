import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  ToastBannerProvider,
  ToastBannerPresenter,
  withToastBannerToggler,
  WithToastBannerTogglerProps,
} from 'react-native-toast-banner';

const HomeScreen = ({showBanner}: WithToastBannerTogglerProps) => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text
      onPress={() => {
        showBanner({});
      }}>
      Home Screen
    </Text>
  </View>
);

const AppNavigator = createStackNavigator({
  Home: {
    screen: withToastBannerToggler(HomeScreen),
    navigationOptions: {
      title: 'react-native-toast-banner',
    },
  },
});

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <SafeAreaProvider>
    <ToastBannerProvider>
      <AppContainer />
      <ToastBannerPresenter />
    </ToastBannerProvider>
  </SafeAreaProvider>
);

export default App;
