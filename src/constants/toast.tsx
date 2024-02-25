import Icon from 'react-native-vector-icons/Entypo';
import { ToastConfig } from 'react-native-toast-message';

import { ToastLayout } from 'src/components';

export const useToastConfig = () => {
  const toastConfig: ToastConfig = {
    success: ({ text1 }) => (
      <ToastLayout icon={<Icon name="check" size={18} color={'white'} />} text={text1} />
    ),
  };

  return { toastConfig };
};
