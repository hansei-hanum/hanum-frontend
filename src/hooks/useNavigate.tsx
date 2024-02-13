import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from 'src/Router';

export const useNavigate = () => {
  const navigate = useNavigation().navigate as (screen: keyof RootStackParamList) => void;

  return navigate;
};
