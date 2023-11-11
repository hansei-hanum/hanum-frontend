import styled from '@emotion/native';

export const WebViewSafeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const HeaderContainer = styled.View`
  padding: 0px 20px 0px 20px;
  padding-left: 0;
  height: 40px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const HeaderContentWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

export const LoadingWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
