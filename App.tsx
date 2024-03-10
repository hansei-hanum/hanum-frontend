import { QueryClient, QueryClientProvider } from 'react-query';
import { LogBox } from 'react-native';
import { NotifierWrapper } from 'react-native-notifier';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CodePush from 'react-native-code-push';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RecoilRoot } from 'recoil';
import { PortalProvider } from '@gorhom/portal';

import { Router } from 'src/Router';

const client = new QueryClient({ defaultOptions: { queries: { retry: 0 } } });

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
