import { useRecoilValue } from 'recoil';

import { Button, Text } from 'src/components';
import { FailedLottie, SuccessLottie } from 'src/assets';
import { hanumPayState } from 'src/atoms';
import { useInitNavigate } from 'src/hooks';

import * as S from './styled';

export const HanumPayStatusScreen: React.FC = () => {
  const { initNavigate } = useInitNavigate();
  const hanumPay = useRecoilValue(hanumPayState);
  return (
    <S.StatusScreenWrapper>
      <S.StatusScreenContainer>
        <S.StatusScreenLottie
          source={hanumPay.status ? SuccessLottie : FailedLottie}
          autoPlay
          loop={false}
          speed={1.3}
        />
        <Text.Column>
          <Text size={22} fontFamily="bold" isCenter>
            {hanumPay.status ? `${hanumPay.money}원을 성공적으로 결제했어요` : `결제 실패`}
          </Text>
          <Text size={18} isCenter>
            {hanumPay.message}
          </Text>
        </Text.Column>
      </S.StatusScreenContainer>
      <Button onPress={() => initNavigate('Main')}>확인</Button>
    </S.StatusScreenWrapper>
  );
};
