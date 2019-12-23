// @flow

import React from 'react';
import {View, Platform, TouchableOpacity, Animated, Easing} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const DEFAULT_NAV_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const HEIGHT_NOTCH_SAFE = 100;
const DEFAULT_DURATION = 3000;

type NotchSafeDummyViewProps = {
  bannerHeight: number;
  color: string;
};

const NotchSafeDummyView = ({color}: NotchSafeDummyViewProps) => (
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
};

class ToastBanner extends React.Component<Props> {
  componentWillUnmount() {
    this.isBannerMounted = false;
  }

  isBannerMounted: boolean = true;
  translateY = new Animated.Value(-1000);
  contentHeight?: number;

  handleLayout = ({
    nativeEvent: {
      layout: {height},
    },
  }) => {
    if (height !== 0 && this.contentHeight === undefined) {
      this.contentHeight = height;
      this.translateY.setValue(-(height + HEIGHT_NOTCH_SAFE));
      this.show();
    }
  };

  show = () => {
    Animated.timing(this.translateY, {
      duration: 300,
      toValue: 0,
      useNativeDriver: true,
      easing: Easing.elastic(1.1),
    }).start(() => {
      setTimeout(
        this.hide,
        this.props.duration === undefined
          ? DEFAULT_DURATION
          : this.props.duration,
      );
    });
  };

  hide = () => {
    Animated.timing(this.translateY, {
      duration: 200,
      toValue: -(this.contentHeight + HEIGHT_NOTCH_SAFE),
      useNativeDriver: true,
      easing: Easing.elastic(1),
    }).start(() => this.props.onPostHide(this.isBannerMounted));
  };

  render() {
    const {onPress, contentView, backgroundColor} = this.props;

    return (
      <SafeAreaView
        style={{
          position: 'absolute',
          width: '100%',
        }}>
        <Animated.View
          style={{
            width: '100%',
            minHeight: DEFAULT_NAV_HEIGHT,
            transform: [{translateY: this.translateY}],
            backgroundColor,
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={{width: '100%', height: '100%'}}>
            <NotchSafeDummyView
              bannerHeight={DEFAULT_NAV_HEIGHT}
              color={backgroundColor}
            />
            <View
              onLayout={this.handleLayout}
              style={{flex: 1, justifyContent: 'center'}}>
              {contentView}
            </View>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    );
  }
}

export {ToastBanner};
