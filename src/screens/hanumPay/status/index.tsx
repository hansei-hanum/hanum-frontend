import { View } from 'react-native';

import LottieView from 'lottie-react-native';

import { Text } from 'src/components';

import { SuccessLottie } from '../../../../assets/lottie';

import * as S from './styled';

export const HanumPayStatusScreen: React.FC = () => {
  return (
    <S.StatusScreenContainer>
      <S.StatusScreenLottie source={SuccessLottie} autoPlay loop={false} speed={1.3} />
      <Text size={16}>asdf</Text>
    </S.StatusScreenContainer>
  );
};
