import { useNavigation } from '@react-navigation/native';

import { TextFieldForm } from 'src/components';

export const NameScreen: React.FC = () => {
  const navigate = useNavigation().navigate as (screen: string) => void;

  const onSubmit = () => {
    navigate('Phone');
  };

  return (
    <TextFieldForm title="이름을 알려주세요" placeHolder="이름" isNameScreen onSubmit={onSubmit} />
  );
};
