/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';

import { Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export const WebViewScreen: React.FC = ({ route }: any) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState<string>('읽어들이는 중..');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(typeof route, 'route type', 'isLoading changed to ' + isLoading);
  }, [isLoading]);

  return (
    <S.WebViewSafeContainer>
      <S.HeaderContainer>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
          style={{ justifyContent: 'flex-end', paddingLeft: 10 }}
        >
          <Entypo name="chevron-thin-left" size={24} />
        </TouchableOpacity>
        <S.HeaderContentWrapper>
          <Text size={18} fontFamily="bold">
            {title}
          </Text>
        </S.HeaderContentWrapper>
      </S.HeaderContainer>
      <WebView
        source={{ uri: route.params?.url }}
        onLoad={() => setIsLoading(false)}
        injectedJavaScript="window.ReactNativeWebView.postMessage(document.title)"
        onMessage={(message) => setTitle(message.nativeEvent.data)}
      >
        {isLoading ? (
          <S.LoadingWrapper>
            <ActivityIndicator size="large" color={colors.lightGray} />
          </S.LoadingWrapper>
        ) : null}
      </WebView>
    </S.WebViewSafeContainer>
  );
};
