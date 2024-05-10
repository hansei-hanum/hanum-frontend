import React from 'react';
import WebView from 'react-native-webview';

export const LiveChattingScreen: React.FC = () => {
  return <WebView source={{ uri: 'http://localhost:5173/liveChatting' }} />;
};
