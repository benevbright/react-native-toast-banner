# react-native-toast-banner

An animating banner fully based on Javascript

<img src="https://github.com/benevbright/react-native-toast-banner/blob/master/docs/demo.gif?raw=true">

## Usage

```js
import {
  ToastBannerProvider,
  ToastBannerPresenter,
  withToastBannerToggler,
  WithToastBannerTogglerProps
} from "react-native-toast-banner";

const MyScreen = ({ showBanner }) => {
  const onPress = () => {
    showBanner({
      contentView: <Text>Hello the regular banner!</Text>,
      backgroundColor: "red", // Optional
      duration: 2000 // Optional
    });
  };
  return <Text onPress={onPress}>Show Banner</Text>;
};

const MyScreenContainer = withToastBannerToggler(MyScreen);

const App = () => (
  <SafeAreaProvider>
    <ToastBannerProvider>
      <MyScreenContainer />
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
