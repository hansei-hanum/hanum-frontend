import styled from '@emotion/native';

export const ShowMoreScreenWrapper = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.background};
`;

export const ShowMoreScreenContainer = styled.View`
  padding: 0 10px;
  row-gap: 16px;
`;
export const SectionContainer = styled.View`
  width: 100%;
  flex-direction: column;
  row-gap: 40px;
  padding: 0 10px;
  margin-top: 20px;
`;
