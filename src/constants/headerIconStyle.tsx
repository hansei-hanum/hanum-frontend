import { Platform } from 'react-native';

export const headerIconStyle = {
  width: Platform.OS === 'ios' ? 34 : 30,
  height: Platform.OS === 'ios' ? 34 : 30,
};
