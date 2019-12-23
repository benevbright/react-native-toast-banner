import React from 'react';

import {ToastBanner} from './toast-banner-component';

type BannerConfig = {
  onPress?: Function;
  duration?: number;
  contentView: React.ReactNode;
  backgroundColor?: string;
};
type BannerConfigWithKey = BannerConfig & {key: string | null};

type ToastBannerContextType = {
  showBanner: (configArg: BannerConfig) => void;
  removeBanner: (isMounted: boolean) => void;
  bannerConfig: BannerConfigWithKey;
};

// @ts-ignore
const ToastBannerContext = React.createContext<ToastBannerContextType>({});

type Props = {
  children: React.ReactNode;
};

const ToastBannerProvider = ({children}: Props) => {
  // @ts-ignore
  const [bannerConfig, setBannerConfig] = React.useState<BannerConfigWithKey>({
    key: null,
  });

  const showBanner = (configArg: BannerConfig) => {
    setBannerConfig({
      key: Math.random().toString(),
      ...configArg,
    });
  };

  const removeBanner = (isMounted: boolean) => {
    if (isMounted) {
      setBannerConfig({
        key: null,
      });
    }
  };

  return (
    <ToastBannerContext.Provider
      value={{showBanner, removeBanner, bannerConfig}}>
      {children}
    </ToastBannerContext.Provider>
  );
};

const ToastBannerPresenter = () => {
  const banner = React.useRef(null);

  return (
    <ToastBannerContext.Consumer>
      {({bannerConfig, removeBanner}: ToastBannerContextType) => {
        const handlePress = () => {
          if (banner.current) banner.current.hide();
          if (bannerConfig.onPress) bannerConfig.onPress();
        };

        return (
          bannerConfig.key && (
            <ToastBanner
              {...bannerConfig}
              ref={banner}
              onPress={handlePress}
              onPostHide={removeBanner}
            />
          )
        );
      }}
    </ToastBannerContext.Consumer>
  );
};

const withToastBannerToggler = (WrappedComponent: any) => (props: any) => (
  <ToastBannerContext.Consumer>
    {({showBanner}: ToastBannerContextType) => (
      <WrappedComponent {...props} showBanner={showBanner} />
    )}
  </ToastBannerContext.Consumer>
);

export type WithToastBannerTogglerProps = Pick<
  ToastBannerContextType,
  'showBanner'
>;
export {ToastBannerProvider, ToastBannerPresenter, withToastBannerToggler};
