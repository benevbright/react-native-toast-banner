import React, { useState, useContext } from 'react';

import { ToastBanner } from './toast-banner-component';
import { Transition } from './types';

type BannerConfig = {
  onPress?: Function;
  duration?: number;
  contentView: React.ReactNode | null;
  backgroundColor?: string;
  transitions?: Transition[];
  disableHideOnPress?: boolean;
};
type BannerConfigWithKey = BannerConfig & {
  key: string | null;
};

type ToastBannerContextType = {
  showBanner: (configArg: BannerConfig) => void;
  hideBanner: () => void;
  removeBanner: (isMounted: boolean) => void;
  bannerConfig: BannerConfigWithKey;
  hideRequested: boolean;
};

const ToastBannerContext = React.createContext<ToastBannerContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  showBanner: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hideBanner: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeBanner: () => {},
  bannerConfig: {
    key: null,
    contentView: null,
  },
  hideRequested: false,
});

type Props = {
  children: React.ReactNode;
};

const ToastBannerProvider = ({ children }: Props) => {
  const [bannerConfig, setBannerConfig] = useState<BannerConfigWithKey>({
    key: null,
    contentView: null,
  });
  const [hideRequested, setHideRequested] = useState<boolean>(false);

  const showBanner = (configArg: BannerConfig) => {
    setHideRequested(false);
    setBannerConfig({
      key: Math.random().toString(),
      ...configArg,
    });
  };

  const hideBanner = () => {
    setHideRequested(true);
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
      value={{
        showBanner,
        hideBanner,
        removeBanner,
        bannerConfig,
        hideRequested,
      }}>
      {children}
    </ToastBannerContext.Provider>
  );
};

const ToastBannerPresenter = () => (
  <ToastBannerContext.Consumer>
    {({
      bannerConfig,
      hideBanner,
      removeBanner,
      hideRequested,
    }: ToastBannerContextType) => {
      const handlePress = () => {
        if (bannerConfig.onPress) bannerConfig.onPress();
        if (!bannerConfig.disableHideOnPress) hideBanner();
      };

      return (
        bannerConfig.key && (
          <ToastBanner
            {...bannerConfig}
            transitions={bannerConfig.transitions}
            onPress={handlePress}
            onPostHide={removeBanner}
            hideRequested={hideRequested}
          />
        )
      );
    }}
  </ToastBannerContext.Consumer>
);

export interface WithToastBannerTogglerProps {
  showBanner: (configArg: BannerConfig) => void;
  hideBanner: () => void;
}

const useToastBannerToggler = (): WithToastBannerTogglerProps => {
  const { showBanner, hideBanner } = useContext(ToastBannerContext);
  return { showBanner, hideBanner };
};

const withToastBannerToggler = <P,>(
  WrappedComponent: React.ComponentType<P>
) => (props: P & WithToastBannerTogglerProps) => (
  <ToastBannerContext.Consumer>
    {({ showBanner, hideBanner }: ToastBannerContextType) => (
      <WrappedComponent
        {...props}
        showBanner={showBanner}
        hideBanner={hideBanner}
      />
    )}
  </ToastBannerContext.Consumer>
);

export {
  ToastBannerProvider,
  ToastBannerPresenter,
  useToastBannerToggler,
  withToastBannerToggler,
};
