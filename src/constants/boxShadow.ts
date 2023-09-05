import { Platform } from "react-native";

export const boxShadow = {
  ...Platform.select({
    ios: {
      shadowColor: '#B0B9C2',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 40,
    },
    android: {
      shadowColor: '#808992',
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
