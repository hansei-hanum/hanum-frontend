import { Linking } from 'react-native';

export const openContactChannel = () => {
  Linking.openURL('kakaoplus://plusfriend/talk/chat/405758775').catch(() =>
    Linking.openURL('https://pf.kakao.com/_xkMcxdG'),
  );
};
