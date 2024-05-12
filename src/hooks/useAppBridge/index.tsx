import { bridge, createWebView } from '@webview-bridge/react-native';

import { RootStackParamList } from 'src/types';

import { useNavigate } from '../useNavigate';

type AppBridgeState = {
  goToScreen: (screenName: string) => Promise<void>;
};

export interface UseAppBridgeProps {
  screenName: keyof RootStackParamList;
}

export const useAppBridge = ({ screenName }: UseAppBridgeProps) => {
  const navigate = useNavigate();

  const appBridge = bridge<AppBridgeState>(() => ({
    goToScreen: async () => {
      await navigate(screenName);
    },
  }));

  const { WebView } = createWebView({
    bridge: appBridge,
    debug: true,
  });

  return { WebView, appBridge };
};
