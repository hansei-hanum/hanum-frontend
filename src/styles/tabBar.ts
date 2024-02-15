import { EdgeInsets } from 'react-native-safe-area-context';

import { Theme } from '@emotion/react';

import { isIos } from 'src/utils';

export const TabBarStyle = (theme: Theme, inset: EdgeInsets) => ({
  zIndex: 10,
  borderTopRightRadius: 24,
  borderTopLeftRadius: 24,
  borderTopColor: theme.secondary,
  borderTopWidth: 1,
  borderLeftColor: theme.secondary,
  borderLeftWidth: 1,
  borderRightColor: theme.secondary,
  borderRightWidth: 1,
  backgroundColor: theme.tabBarBg,
  height: isIos ? 78 : 64,
  paddingBottom: isIos ? inset.bottom - 10 : 10,
});
