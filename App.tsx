import { QueryClient, QueryClientProvider } from 'react-query';
import { LogBox, PermissionsAndroid, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { NotifierWrapper } from 'react-native-notifier';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { Notifier } from 'react-native-notifier';

import messaging from '@react-native-firebase/messaging';
import { RecoilRoot } from 'recoil';

import { Router } from 'src/Router';

const client = new QueryClient();

LogBox.ignoreAllLogs();

function App() {
  async function requestUserPermission() {
    let isGranted = false;

    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      isGranted =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    } else if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      const authStatus = await messaging().hasPermission();
      isGranted = authStatus === messaging.AuthorizationStatus.AUTHORIZED;
    }

    if (isGranted) {
      console.log('User has notification permissions granted.');
      console.log('FCM Token:', await messaging().getToken());
    }
  }

  const messageListener = async () => {
    await messaging().onMessage(async (remoteMessage) => {
      await Notifier.showNotification({
        title: remoteMessage.notification?.title || '알림',
        description: remoteMessage.notification?.body,
        duration: 3000,
        showAnimationDuration: 500,
        hideOnPress: false,
      });
    });
  };

  useEffect(() => {
    requestUserPermission();
    messageListener();
  }, []);

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
