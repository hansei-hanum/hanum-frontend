import { useNavigation } from '@react-navigation/native';

import { TextFieldForm } from 'src/components';

export const PhoneScreen: React.FC = () => {
  const navigate = useNavigation().navigate as (screen: string) => void;

  const onSubmit = () => {
    navigate('VerifyCode');
  };

  return <TextFieldForm title="전화번호를 알려주세요" placeHolder="전화번호" onSubmit={onSubmit} />;
};
