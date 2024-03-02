import Icon from 'react-native-vector-icons/Entypo';
import Ai from 'react-native-vector-icons/FontAwesome5';
import { ToastConfig } from 'react-native-toast-message';

import { ToastLayout } from 'src/components';

const colors = {
  success: '#4785FA',
  info: '#FED545',
};

export const useToastConfig = () => {
  const toastConfig: ToastConfig = {
    success: ({ text1 }) => (
      <ToastLayout
        icon={<Icon name="check" size={18} color={'white'} />}
        text={text1}
        iconBackgroundColor={colors.success}
      />
    ),
    info: ({ text1 }) => (
      <ToastLayout
        icon={<Ai name="info" size={15} color={'white'} />}
        text={text1}
        iconBackgroundColor={colors.info}
      />
    ),
  };

  return { toastConfig };
};
