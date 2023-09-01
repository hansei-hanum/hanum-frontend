import { Platform } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import styled from '@emotion/native';

import { colors } from 'src/styles';

export const HomeScreenWrapper = styled.View`
  flex: 1;
  background-color: ${colors.background};
  width: 100%;
`;
export const HomeScreenContainer = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;

export const HomeScreenHeader = styled(BlurView)`
  position: absolute;
  flex-direction: row;
  width: 100%;
  padding: 12px 20px;
  padding-top: ${Platform.OS === 'ios' ? '60px' : '30px'};
  align-items: center;
  justify-content: space-between;
`;
