# react-native-toast-banner

[![npm](https://img.shields.io/npm/v/react-native-toast-banner.svg)](https://www.npmjs.com/package/react-native-toast-banner) [![npm](https://img.shields.io/npm/dm/react-native-toast-banner.svg)](https://www.npmjs.com/package/react-native-toast-banner)

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
  /* you can also use HoC, 'withToastBannerToggler' */
  const { showBanner } = useToastBannerToggler();

  const onPress = () => {
    showBanner({
      contentView: <Text>Hello the regular banner!</Text>,
      backgroundColor: 'red' /* optional */,
      duration: 2000 /* optional */,
      transitions: [Transition.Move, Transition.FadeInOut] /* optional */,
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

See [/example](https://github.com/benevbright/react-native-toast-banner/tree/master/example/src)

## Install

```bash
# install peer dependencies
yarn add react-native-safe-area-context react-native-safe-area-view
# install module
yarn add react-native-toast-banner
```

## Contribution

PR is welcome!

Tip for development: Just remove `example/node_modules/react-native-toast-banner` and do `git clone {forked-repo}` again in the `/example/node_modules`. Sounds weird. But with this way, Metro won't complain about it. I tried many things such as [Adding an example app to your React Native library](https://callstack.com/blog/adding-an-example-app-to-your-react-native-library/) and yarn-workspaces, but couldn't get it to work.
