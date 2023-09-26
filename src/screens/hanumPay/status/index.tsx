import { useRecoilValue } from 'recoil';

import {  Status, Text } from 'src/components';
import { hanumPayState } from 'src/atoms';

import * as S from './styled';
import { FailedLottie, SuccessLottie } from 'src/assets';

export const HanumPayStatusScreen: React.FC = () => {
  const hanumPay = useRecoilValue(hanumPayState);
  return (
    <Status navigateUrl='Main'>
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
    </Status>
  );
};
