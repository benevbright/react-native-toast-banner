import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  ToastBannerProvider,
  ToastBannerPresenter,
  useToastBannerToggler,
  Transition,
} from 'react-native-toast-banner';
import {RegularBanner, BigBanner, Toast} from './my-banners';

const bannersList = [
  {
    buttonTitle: 'Regular banner',
    bannerConfig: {
      contentView: <RegularBanner />,
      backgroundColor: 'red',
    },
  },
  {
    buttonTitle: 'Big banner',
    bannerConfig: {
      contentView: <BigBanner />,
      backgroundColor: 'blue',
    },
  },
  {
    buttonTitle: 'Toast',
    bannerConfig: {
      contentView: <Toast />,
      transitions: [Transition.FadeInOut],
    },
  },
];

const HomeScreen = () => {
  const {showBanner} = useToastBannerToggler();

  return (
    <View style={{flex: 1, alignItems: 'center', top: 100}}>
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
};

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
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
