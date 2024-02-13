import React, { useEffect } from 'react';

import { useTheme } from '@emotion/react';

import { Button, Icon, ScaleOpacity, Text } from 'src/components';
import { isAndroid, openContactChannel } from 'src/utils';
import { useFetchUser, useNavigate } from 'src/hooks';

import * as S from './styled';

export const NoInternetScreen: React.FC = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const getUserData = useFetchUser();

  useEffect(() => {
    if (getUserData.data && getUserData.data?.data) {
      navigate('Main');
    }
  }, [getUserData]);

  return (
    <S.NoInternetWrapper>
      <S.NoInternetTopSection>
        <ScaleOpacity onPress={() => navigate('AuthMain')}>
          <Text size={14} color={theme.primary} fontFamily="bold">
            다시 로그인
          </Text>
        </ScaleOpacity>
      </S.NoInternetTopSection>
      <S.NoInternetMainSection>
        <Icon size={80} icon="⚠️" includeBackground={false} />
        <Text size={26} fontFamily="bold">
          인터넷 연결 없음
        </Text>
        <Text size={15} isCenter>
          서버에 연결할 수 없었어요. 네트워크 연결을 확인해주세요. {'\n'}만약 네트워크에 문제가
          없는데도 이 화면을 보신다면,{'\n'} 한움 지원센터로 문의를 접수해주세요.
        </Text>
      </S.NoInternetMainSection>
      <Button.Container style={isAndroid ? { padding: 10 } : { paddingHorizontal: 10 }}>
        <Button isModalBtn isWhite onPress={openContactChannel}>
          지원센터
        </Button>
        <Button isModalBtn onPress={() => getUserData.refetch()} isLoading={getUserData.isLoading}>
          재시도
        </Button>
      </Button.Container>
    </S.NoInternetWrapper>
  );
};
