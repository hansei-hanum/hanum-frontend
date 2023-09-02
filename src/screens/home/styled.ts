import { Platform } from 'react-native';

import { BlurView } from '@react-native-community/blur';
import styled from '@emotion/native';

import { colors } from 'src/styles';

export const HomeScreenWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
  width: 100%;
`;

export const HomeScreenContainer = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;
