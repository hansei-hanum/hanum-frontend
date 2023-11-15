import { Button, GoBackIcon, Header } from 'src/components';
import { useNavigate } from 'src/hooks';

import * as S from './styled';

export interface StatusProps {
  children: React.ReactNode;
  navigateUrl: string;
}

export const Status: React.FC<StatusProps> = ({ children, navigateUrl }) => {
  const navigate = useNavigate();
  return (
    <S.StatusScreenWrapper>
      <Header>
        <GoBackIcon />
      </Header>
      <S.StautsScreenContainer>
        <S.StatusScreenContentContainer>{children}</S.StatusScreenContentContainer>
        <S.StatusButtonWrapper>
          <Button onPress={() => navigate(navigateUrl)}>확인</Button>
        </S.StatusButtonWrapper>
      </S.StautsScreenContainer>
    </S.StatusScreenWrapper>
  );
};
