import { Platform } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import styled from '@emotion/native';

import { colors } from 'src/styles';

export const LunchTableWrapper = styled.SafeAreaView`
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
  flex-direction: column;
  z-index: 0;
  width: 100%;
  padding: 0px 20px;
  padding-top: ${Platform.OS === 'ios' ? '70px' : '30px'};
  padding-bottom: ${Platform.OS === 'ios' ? '10px' : 0};
  row-gap: ${Platform.OS === 'ios' ? '20px' : '10px'};
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

export const LunchBoxContainer = styled.View`
  width: 48%;
  min-height: 60px;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  border-radius: 20px;
  row-gap: 10px;
`;

export const LunchBoxWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
