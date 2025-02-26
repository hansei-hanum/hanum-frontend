import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from 'src/types';

export const useNavigate = () => {
  const navigate = useNavigation().navigate as unknown as (
    screen: keyof RootStackParamList,
    params?: RootStackParamList[keyof RootStackParamList],
  ) => void;

  return navigate;
};
