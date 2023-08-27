import styled from '@emotion/native';
import { BlurView } from 'expo-blur';

import { colors } from 'src/styles';

export const LunchTableWrapper = styled.View`
  flex: 1;
  background-color: ${colors.background};
  width: 100%;
`;
export const LunchTableContainer = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;

export const LunchTableHeader = styled(BlurView)`
  position: absolute;
  flex-direction: row;
  z-index: 0;
  width: 100%;
  padding: 10px 20px;
  padding-top: 70px;
  align-items: flex-start;
`;

export const LunchTableAlertContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LunchTableBoxContainer = styled.View`
  flex-direction: column;
  row-gap: 30px;
`;
