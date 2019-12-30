# react-native-toast-banner

[![npm](https://img.shields.io/npm/v/react-native-toast-banner.svg)](https://www.npmjs.com/package/react-native-toast-banner) [![npm](https://img.shields.io/npm/dm/react-native-toast-banner.svg)](https://www.npmjs.com/package/react-native-toast-banner)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![ci: github](https://github.com/benevbright/react-native-toast-banner/workflows/CI/badge.svg)](https://github.com/benevbright/react-native-toast-banner/actions?query=workflow%3ACI)

An animating banner fully based on Javascript

<img src="https://github.com/benevbright/react-native-toast-banner/blob/master/docs/demo.gif?raw=true">

Try out on [Expo Snack](https://snack.expo.io/@benevbright/react-native-toast-banner)

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
  const { showBanner } = useToastBannerToggler();

  const onPress = () => {
    showBanner({
      contentView: <Text>Hello the regular banner!</Text>,
      backgroundColor: 'red' /* optional */,
      duration: 2000 /* optional */,
      transitions: [Transition.Move, Transition.FadeInOut] /* optional */,
      onPress: () => {
        console.log('banner pressed');
      } /* optional */,
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

### Expo on Android

If your Expo app is using a translucent status-bar, please let the module know the height of the status-bar.

```js
import { StatusBar } from 'react-native';
import { setExpoAndroidPaddingTop } from 'react-native-toast-banner';

setExpoAndroidPaddingTop(StatusBar.currentHeight);
```

## Install

```bash
# install peer dependencies
yarn add react-native-safe-area-context react-native-safe-area-view
# install module
yarn add react-native-toast-banner
```

## Contribution

PR is welcome!

### Testing your library code with the example

Turn the watch option on at the root folder

```bash
yarn tsc -w
```
