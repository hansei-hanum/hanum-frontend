import { useRecoilValue } from 'recoil';

import { Button, Text } from 'src/components';
import { FailedLottie, SuccessLottie } from 'src/assets';
import { hanumPayState } from 'src/atoms';
import {  useNavigate } from 'src/hooks';

import * as S from './styled';

export interface StatusProps {
    children: React.ReactNode;
    navigateUrl: string;
}

export const Status: React.FC<StatusProps> = ({children, navigateUrl}) => {
  const navigate = useNavigate();
  return (
    <S.StatusScreenWrapper>
      <S.StatusScreenContainer>
        {children}
      </S.StatusScreenContainer>
      <S.StatusButtonWrapper>
        <Button onPress={() => navigate(navigateUrl)}>확인</Button>
      </S.StatusButtonWrapper>
    </S.StatusScreenWrapper>
  );
};
