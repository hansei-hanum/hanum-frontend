import { useNavigation } from '@react-navigation/native';

export const useNavigate = () => {
  const navigate = useNavigation().navigate as (screen: string) => void;

  return navigate;
};
