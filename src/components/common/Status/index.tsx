import { useRecoilValue } from 'recoil';

import { Button, Text } from 'src/components';
import { FailedLottie, SuccessLottie } from 'src/assets';
import { hanumPayState } from 'src/atoms';
import {  useNavigate } from 'src/hooks';

import * as S from './styled';

export interface StatusProps {
    children: React.ReactNode;
    navigateUrl: string;
    status: boolean;
}

export const Status: React.FC<StatusProps> = ({children, navigateUrl, status}) => {
  const navigate = useNavigate();
  return (
    <S.StatusScreenWrapper>
      <S.StatusScreenContainer>
        <S.StatusScreenLottie
          source={status ? SuccessLottie : FailedLottie}
          autoPlay
          loop={false}
          speed={1.3}
        />
        {children}
      </S.StatusScreenContainer>
      <S.StatusButtonWrapper>
        <Button onPress={() => navigate(navigateUrl)}>확인</Button>
      </S.StatusButtonWrapper>
    </S.StatusScreenWrapper>
  );
};
