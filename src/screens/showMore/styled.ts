import styled from '@emotion/native';

import { colors } from 'src/styles';

export const ShowMoreScreenContainer = styled.ScrollView`
  flex: 1;
  background-color: ${colors.background};
`;

export const ShowMoreHeaderScreen = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ShowMoreUserContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ShowMoreUserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
`;

export const ShowMoreUserImage = styled.Image`
  border-radius: 50%;
  width: 64px;
  height: 64px;
  border: 1px ${colors.placeholder};
`;

export const ShowMoreUserNameContainer = styled.View`
  flex-direction: column;
`;
