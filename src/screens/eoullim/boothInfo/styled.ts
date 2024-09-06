import styled from '@emotion/native';

export const BoothInfoScreenInfoWrapper = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.background};
  width: 100%;
`;

export const BoothInfoContainer = styled.ScrollView`
  padding: 0 20px;
  width: 100%;
  flex-direction: column;
`;
