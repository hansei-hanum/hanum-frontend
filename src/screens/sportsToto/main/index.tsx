import React from 'react';
import { TotoMainWebView } from 'src/components/sportsToto/MainWebView';
import { GoBackIcon } from 'src/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isAndroid } from 'src/utils';

export const SportsTotoMainScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <GoBackIcon
        style={{
          position: 'absolute',
          top: insets.top + 10,
          left: 10,
          zIndex: 999,
          marginTop: isAndroid ? 10 : 0,
        }}
      />

      <TotoMainWebView />
    </>
  );
};
