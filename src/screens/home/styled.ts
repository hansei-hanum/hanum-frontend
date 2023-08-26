import { Platform } from 'react-native';

import styled from '@emotion/native';

import { colors } from 'src/styles';

export const HomeScreenWrapper = styled.View`
  flex: 1;
  background-color: #fefefe;
  width: 100%;
  padding: 50px 20px ${Platform.OS == 'ios' ? '30px' : '20px'} 20px;
`;

export const HomeScreenContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #fefefe;
  row-gap: 40px;
`;

export const HomeScreenTopSection = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PayContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const PayButtonContainer = styled(HomeScreenTopSection)`
  margin-top: 20px;
`;

export const PayButton = styled.TouchableOpacity`
  width: 49%;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.lightGray};
  padding: 10px 0;
`;
