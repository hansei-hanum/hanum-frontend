import { QueryClient, QueryClientProvider } from 'react-query';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';

import { Router } from 'src/Router';

const client = new QueryClient();

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Router />
      <Toast />
    </QueryClientProvider>
  );
}
