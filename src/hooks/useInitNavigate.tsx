import { CommonActions, useNavigation } from '@react-navigation/native';

export const useInitNavigate = () => {
  const navigation = useNavigation();

  const setNavigate = (names: string[]) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: names.map((name) => {
          return { name: name };
        }),
      }),
    );
  };

  const initNavigate = (name: string) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: name }],
      }),
    );
  };


  return { initNavigate, setNavigate };
};
