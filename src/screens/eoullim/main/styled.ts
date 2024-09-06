import styled from '@emotion/native';

export const EoullimWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const EoullimContainer = styled.ImageBackground`
  flex: 1;
  padding: 20px 0;
  row-gap: 30px;
`;

export const EoulimContentContainer = styled.View`
  padding: 0 20px;
  row-gap: 30px;
`;

export const EoullimBoxContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
