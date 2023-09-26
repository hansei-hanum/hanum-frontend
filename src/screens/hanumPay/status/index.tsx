import { useRecoilValue } from 'recoil';

import { Button, Status, Text } from 'src/components';
import { FailedLottie, SuccessLottie } from 'src/assets';
import { hanumPayState } from 'src/atoms';
import {  useNavigate } from 'src/hooks';

import * as S from './styled';

export const HanumPayStatusScreen: React.FC = () => {
  const navigate = useNavigate();
  const hanumPay = useRecoilValue(hanumPayState);
  return (
    <Status navigateUrl='Main' status={hanumPay.status}>
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
