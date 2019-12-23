// @flow

import React from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Animated,
  Easing
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";

const DEFAULT_NAV_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const HEIGHT_NOTCH_SAFE = 100;
const DEFAULT_DURATION = 3000;

type NotchSafeDummyViewProps = {
  bannerHeight: number;
  color: string;
};

const NotchSafeDummyView = ({
  bannerHeight,
  color
}: NotchSafeDummyViewProps) => (
  <View
    style={{
      position: "absolute",
      width: "100%",
      height: HEIGHT_NOTCH_SAFE,
      bottom: bannerHeight,
      backgroundColor: color
    }}
  />
);

type Props = {
  onPress: () => void;
  onPostHide: (isMounted: boolean) => void;
  duration?: number;
  contentView: React.ReactNode;
  backgroundColor?: string;
  height?: number;
};

class ToastBanner extends React.Component<Props> {
  componentDidMount() {
    this.show();
  }

  componentWillUnmount() {
    this.isBannerMounted = false;
  }

  getHeight = () =>
    this.props.height === undefined ? DEFAULT_NAV_HEIGHT : this.props.height;
  isBannerMounted: boolean = true;
  translateY = new Animated.Value(-(this.getHeight() + HEIGHT_NOTCH_SAFE));

  show = () => {
    Animated.timing(this.translateY, {
      duration: 300,
      toValue: 0,
      useNativeDriver: true,
      easing: Easing.elastic(1.1)
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
    Animated.timing(this.translateY, {
      duration: 200,
      toValue: -(this.getHeight() + HEIGHT_NOTCH_SAFE),
      useNativeDriver: true,
      easing: Easing.elastic(1)
    }).start(() => this.props.onPostHide(this.isBannerMounted));
  };

  render() {
    const { onPress, contentView, backgroundColor } = this.props;

    return (
      <SafeAreaView
        style={{
          position: "absolute",
          width: "100%",
          height: this.getHeight()
        }}
      >
        <Animated.View
          style={{
            width: "100%",
            height: "100%",
            transform: [{ translateY: this.translateY }],
            backgroundColor
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}
            style={{ width: "100%", height: "100%" }}
          >
            <NotchSafeDummyView
              bannerHeight={this.getHeight()}
              color={backgroundColor}
            />
            {contentView}
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    );
  }
}

export { ToastBanner };
