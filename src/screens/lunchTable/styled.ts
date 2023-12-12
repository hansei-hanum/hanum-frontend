import { BlurView } from '@react-native-community/blur';

import styled from '@emotion/native';

export const LunchTableWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
`;

export const LunchTableContainer = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;

export const LunchTableIosHeader = styled(BlurView)`
  position: absolute;
  flex-direction: column;
  z-index: 0;
  width: 100%;
  padding: 0px 20px;
  padding-top: 70px;
  padding-bottom: 10px;
  row-gap: 20px;
  align-items: flex-start;
`;

export const LunchTableAndroidHeaderBlur = styled(BlurView)`
  position: absolute;
  width: 100%;
  height: 90px;
`;

export const HomeScreenAndroidHeader = styled.View`
  width: 100%;
  height: 90px;
  padding: 0 20px;
  padding-bottom: 10px;
  row-gap: 10px;
  position: absolute;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
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
