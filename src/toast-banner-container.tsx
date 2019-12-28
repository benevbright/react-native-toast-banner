import React, { useState, useRef, useContext } from 'react';

import { ToastBanner } from './toast-banner-component';
import { Transition } from './types';

type BannerConfig = {
  onPress?: Function;
  duration?: number;
  contentView: React.ReactNode | null;
  backgroundColor?: string;
  transitions?: Transition[];
};
type BannerConfigWithKey = BannerConfig & { key: string | null };

type ToastBannerContextType = {
  showBanner: (configArg: BannerConfig) => void;
  removeBanner: (isMounted: boolean) => void;
  bannerConfig: BannerConfigWithKey;
};

const ToastBannerContext = React.createContext<ToastBannerContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  showBanner: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeBanner: () => {},
  bannerConfig: {
    key: null,
    contentView: null,
  },
});

type Props = {
  children: React.ReactNode;
};

const ToastBannerProvider = ({ children }: Props) => {
  const [bannerConfig, setBannerConfig] = useState<BannerConfigWithKey>({
    key: null,
    contentView: null,
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
        contentView: null,
      });
    }
  };

  return (
    <ToastBannerContext.Provider
      value={{ showBanner, removeBanner, bannerConfig }}>
      {children}
    </ToastBannerContext.Provider>
  );
};

const ToastBannerPresenter = () => {
  const banner = useRef(null);

  return (
    <ToastBannerContext.Consumer>
      {({ bannerConfig, removeBanner }: ToastBannerContextType) => {
        const handlePress = () => {
          if (banner.current) banner.current.hide();
          if (bannerConfig.onPress) bannerConfig.onPress();
        };

        return (
          bannerConfig.key && (
            <ToastBanner
              {...bannerConfig}
              transitions={bannerConfig.transitions}
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

export interface WithToastBannerTogglerProps {
  showBanner: (configArg: BannerConfig) => void;
}

const useToastBannerToggler = (): WithToastBannerTogglerProps => {
  const { showBanner } = useContext(ToastBannerContext);
  return { showBanner };
};

const withToastBannerToggler = <P,>(
  WrappedComponent: React.ComponentType<P>
) => (props: P & WithToastBannerTogglerProps) => (
  <ToastBannerContext.Consumer>
    {({ showBanner }: ToastBannerContextType) => (
      <WrappedComponent {...props} showBanner={showBanner} />
    )}
  </ToastBannerContext.Consumer>
);

export {
  ToastBannerProvider,
  ToastBannerPresenter,
  useToastBannerToggler,
  withToastBannerToggler,
};
