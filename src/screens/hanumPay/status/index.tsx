import { View } from 'react-native';

import LottieView from 'lottie-react-native';

import { Text } from 'src/components';
import { FailedLottie, SuccessLottie } from 'src/assets';

import * as S from './styled';

export const HanumPayStatusScreen: React.FC = () => {
  console.log('HanumPayStatusScreen');
  return (
    <S.StatusScreenWrapper>
      <S.StatusScreenContainer>
        <S.StatusScreenLottie source={FailedLottie} autoPlay loop={false} speed={1.3} />
        <Text size={16}>asdf</Text>
      </S.StatusScreenContainer>
    </S.StatusScreenWrapper>
  );
};
