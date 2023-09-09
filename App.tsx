import { QueryClient, QueryClientProvider } from 'react-query';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';

import { RecoilRoot } from 'recoil';

import { Router } from 'src/Router';

const client = new QueryClient();

LogBox.ignoreAllLogs();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <Router />
        <Toast />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
