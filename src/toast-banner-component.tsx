/* global global */

import React from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import { Transition } from './types';

const DEFAULT_NAV_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const HEIGHT_NOTCH_SAFE = 100;
const DEFAULT_DURATION = 3000;

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
  duration: number;
  contentView: React.ReactNode;
  backgroundColor?: string;
  transitions: Transition[];
  hideRequested: boolean;
};

type State = {
  contentHeight: number;
};

class ToastBanner extends React.Component<Props, State> {
  static defaultProps = {
    duration: DEFAULT_DURATION,
    transitions: [Transition.Move],
  };

  state = { contentHeight: 0 };

  componentWillUnmount() {
    this.isBannerMounted = false;
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.hideRequested && this.props.hideRequested) {
      this.hide();
    }
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
      duration: this.props.transitions.includes(Transition.Move) ? 330 : 250,
      toValue: 1,
      useNativeDriver: true,
      easing: this.props.transitions.includes(Transition.Move)
        ? Easing.elastic(1.1)
        : undefined,
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
        transitions.includes(Transition.MoveLinear) ||
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

    const expoPaddingTop =
      // @ts-ignore
      Platform.OS === 'android' && global.Expo ? StatusBar.currentHeight : 0;

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

export { ToastBanner };
