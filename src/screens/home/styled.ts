import styled from '@emotion/native';
import { BlurView } from 'expo-blur';

export const HomeScreenWrapper = styled.View`
  flex: 1;
  background-color: #fefefe;
  width: 100%;
`;
export const HomeScreenContainer = styled.ScrollView`
  flex: 1;
  flex-direction: column;
  background-color: #fefefe;
  padding-top: 120px;
`;

export const HomeScreenHeader = styled(BlurView)`
  position: absolute;
  flex-direction: row;
  z-index: 0;
  width: 100%;
  padding: 20px 20px;
  padding-top: 70px;
  align-items: center;
  justify-content: space-between;
`;
