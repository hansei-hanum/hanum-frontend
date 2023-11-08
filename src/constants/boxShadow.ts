import { Platform } from 'react-native';

import { colors } from 'src/styles';

export const boxShadow = {
  ...Platform.select({
    ios: {
      shadowColor: colors.shadow.Ios,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 40,
    },
    android: {
      shadowColor: colors.shadow.Android,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 1,
      shadowRadius: 15,
      elevation: 10,
    },
  }),
};
