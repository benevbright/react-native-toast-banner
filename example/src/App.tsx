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
import {RegularBanner} from './banners';

const bannersList = [
  {
    buttonTitle: 'Regular banner',
    bannerConfig: {
      contentView: <RegularBanner />,
      backgroundColor: 'red',
    },
  },
];

const HomeScreen = ({showBanner}: WithToastBannerTogglerProps) => (
  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    {bannersList.map((banner, i) => (
      <Text
        style={{marginVertical: 10}}
        key={i.toString()}
        onPress={() => showBanner(banner.bannerConfig)}>
        {banner.buttonTitle}
      </Text>
    ))}
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
