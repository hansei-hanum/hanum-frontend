import { CommonActions, useNavigation } from '@react-navigation/native';

export const useInitNavigate = () => {
  const navigation = useNavigation();

  const initNavigate = (name: string) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: name }],
      }),
    );
  };

  return { initNavigate };
};
