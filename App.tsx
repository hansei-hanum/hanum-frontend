import { QueryClient, QueryClientProvider } from 'react-query';
import { LogBox } from 'react-native';
import { NotifierWrapper } from 'react-native-notifier';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CodePush from 'react-native-code-push';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { BlurView } from '@react-native-community/blur';

import { RecoilRoot } from 'recoil';
import { PortalProvider } from '@gorhom/portal';

import { Router } from 'src/Router';
import { Text } from 'src/components';
import { useToastConfig } from 'src/constants';

const client = new QueryClient();

LogBox.ignoreAllLogs();

function App() {
  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PortalProvider>
            <QueryClientProvider client={client}>
              <NotifierWrapper>
                <Router />
              </NotifierWrapper>
            </QueryClientProvider>
          </PortalProvider>
        </GestureHandlerRootView>
      </RecoilRoot>
    </SafeAreaProvider>
  );
}

export default CodePush(App);
