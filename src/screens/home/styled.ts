import styled from '@emotion/native';

import { colors, fonts } from 'src/styles';

export const HomeScreenWrapper = styled.View`
  flex: 1;
  background-color: #fefefe;
  width: 100%;
  padding-top: 50px;
`;

export const HomeScreenHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
`;

export const HomeScreenContainer = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  background-color: #fefefe;
`;

export const HomeScreenLunchTableTextContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  row-gap: 6px;
  text-align: center;
`;

export const HomeScreenLunchTableText = styled.Text`
  text-align: center;
  font-size: 18px;
  font-family: ${fonts.bold};
  color: ${colors.black};
`;
