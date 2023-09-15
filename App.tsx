import { QueryClient, QueryClientProvider } from 'react-query';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { NotifierWrapper } from 'react-native-notifier';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { RecoilRoot } from 'recoil';

import { Router } from 'src/Router';

const client = new QueryClient();

LogBox.ignoreAllLogs();

function App() {
  return (
    <RecoilRoot>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={client}>
          <NotifierWrapper>
            <Router />
            <Toast />
          </NotifierWrapper>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </RecoilRoot>
  );
}

export default App;
