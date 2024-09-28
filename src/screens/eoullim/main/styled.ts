import styled from '@emotion/native';

export const EoullimWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

export const EoullimContainer = styled.ImageBackground`
  flex: 1;
  padding: 20px 0;
  row-gap: 30px;
  flex-direction: column;
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
  margin-top: 20px;
  flex-direction: column;
  row-gap: 10px;
  gap: 10px;
`;

export const EoullimRow = styled.View`
  flex-direction: row;
  gap: 10px;
`;
