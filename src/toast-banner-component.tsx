// @flow

import React from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import { Transition } from './types';

const DEFAULT_NAV_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const HEIGHT_NOTCH_SAFE = 100;
const DEFAULT_DURATION = 3000;

let expoPaddingTop: number = 0;
const setExpoAndroidPaddingTop = (paddingTop: number) => {
  if (Platform.OS === 'android') {
    expoPaddingTop = paddingTop;
  }
};

type NotchSafeDummyViewProps = {
  bannerHeight: number;
  color: string;
};

const NotchSafeDummyView = ({ color }: NotchSafeDummyViewProps) => (
  <View
    style={{
      position: 'absolute',
      width: '100%',
      height: HEIGHT_NOTCH_SAFE,
      top: -HEIGHT_NOTCH_SAFE,
      backgroundColor: color,
    }}
  />
);

type Props = {
  onPress: () => void;
  onPostHide: (isMounted: boolean) => void;
  duration?: number;
  contentView: React.ReactNode;
  backgroundColor?: string;
  transitions: Transition[];
};

type State = {
  contentHeight: number;
};

class ToastBanner extends React.Component<Props, State> {
  state = { contentHeight: 0 };

  componentWillUnmount() {
    this.isBannerMounted = false;
  }

  isBannerMounted = true;
  animation = new Animated.Value(-10);

  handleLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    if (height !== 0 && this.state.contentHeight === 0) {
      this.setState({ contentHeight: height }, () => {
        this.animation.setValue(0);
        this.show();
      });
    }
  };

  show = () => {
    Animated.timing(this.animation, {
      duration: 300,
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.elastic(1.1),
    }).start(() => {
      setTimeout(
        this.hide,
        this.props.duration === undefined
          ? DEFAULT_DURATION
          : this.props.duration
      );
    });
  };

  hide = () => {
    Animated.timing(this.animation, {
      duration: 200,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => this.props.onPostHide(this.isBannerMounted));
  };

  render() {
    const { onPress, contentView, backgroundColor, transitions } = this.props;

    const translateY = this.animation.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [
        -1000,
        transitions.includes(Transition.Move)
          ? -(this.state.contentHeight + HEIGHT_NOTCH_SAFE)
          : 0,
        0,
      ],
    });
    const opacity = this.animation.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, transitions.includes(Transition.FadeInOut) ? 0 : 1, 1],
    });

    return (
      <SafeAreaView
        style={{
          position: 'absolute',
          width: '100%',
          paddingTop: expoPaddingTop,
        }}>
        <Animated.View
          style={{
            width: '100%',
            minHeight: DEFAULT_NAV_HEIGHT,
            transform: [{ translateY }],
            opacity,
            backgroundColor,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={{ width: '100%', height: '100%' }}>
            <NotchSafeDummyView
              bannerHeight={DEFAULT_NAV_HEIGHT}
              color={backgroundColor}
            />
            <View
              onLayout={this.handleLayout}
              style={{ flex: 1, justifyContent: 'center' }}>
              {contentView}
            </View>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    );
  }
}

export { ToastBanner, setExpoAndroidPaddingTop };
