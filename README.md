# react-native-toast-banner

[![npm](https://img.shields.io/npm/v/react-native-toast-banner.svg)](https://www.npmjs.com/package/react-native-toast-banner) [![npm](https://img.shields.io/npm/dm/react-native-toast-banner.svg)](https://www.npmjs.com/package/react-native-toast-banner)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![ci: github](https://github.com/benevbright/react-native-toast-banner/workflows/CI/badge.svg)](https://github.com/benevbright/react-native-toast-banner/actions?query=workflow%3ACI) [![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

An animating banner fully based on Javascript

<img src="https://github.com/benevbright/react-native-toast-banner/blob/master/docs/demo.gif?raw=true">

Try out the demo on [Expo Snack](https://snack.expo.io/@benevbright/react-native-toast-banner)

## Usage

```js
import {
  ToastBannerProvider,
  ToastBannerPresenter,
  useToastBannerToggler /* or withToastBannerToggler */,
  Transition,
} from 'react-native-toast-banner';

const MyScreen = () => {
  /* If you don't want hooks, there is also HOC 'withToastBannerToggler' */
  const { showBanner, hideBanner } = useToastBannerToggler();

  const onPress = () => {
    showBanner({
      contentView: <Text>Hello the regular banner!</Text>,
      backgroundColor: 'red' /* default: undefined */,
      duration: 2000 /* default: 3000 */,
      transitions: [
        Transition.Move,
        Transition.MoveLinear,
        Transition.FadeInOut,
      ] /* default: [Transition.Move] */,
      onPress: () => {
        console.log('banner pressed');
        // hideBanner(); // when specifying 'disableHideOnPress: true'
      } /* default: undefined */,
      disableHideOnPress: true /* default: undefined */,
    });
  };
  return <Text onPress={onPress}>Show Banner</Text>;
};

const App = () => (
  <SafeAreaProvider>
    <ToastBannerProvider>
      <MyScreen />
      <ToastBannerPresenter />
    </ToastBannerProvider>
  </SafeAreaProvider>
);
```

See [/example/App.tsx](https://github.com/benevbright/react-native-toast-banner/tree/master/example/App.tsx) and [/example/src/my-banners.tsx](https://github.com/benevbright/react-native-toast-banner/tree/master/example/src/my-banners.tsx)

## Install

```bash
# install peer dependencies
yarn add react-native-safe-area-context react-native-safe-area-view
# install module
yarn add react-native-toast-banner
```

## Contribution

PR is welcome!

### How to test changes with the example?

[/example](https://github.com/benevbright/react-native-toast-banner/tree/master/example) imports the library directly from the root folder, configured with [babel-plugin-module-resolver](https://github.com/benevbright/react-native-toast-banner/tree/master/example/babel.config.js#L10).
So, just build the library with the `watch` option and run the example.

```bash
yarn tsc -w
cd example && yarn ios
```
