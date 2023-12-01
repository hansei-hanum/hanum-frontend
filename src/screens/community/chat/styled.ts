import styled from '@emotion/native';

export const CommunityChatWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
`;

export const CommunityUserImage = styled.Image`
  border-radius: 100px;
  width: 40px;
  height: 40px;
`;
