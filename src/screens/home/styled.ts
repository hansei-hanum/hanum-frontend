import { Platform } from 'react-native';

import styled from '@emotion/native';

import { colors } from 'src/styles';

export const HomeScreenContainer = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #fefefe;
  row-gap: 40px;
  width: 100%;
  padding: 50px 20px ${Platform.OS == 'ios' ? '30px' : '20px'} 20px;
`;

export const HomeScreenTopSection = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ContentBoxContainer = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  background-color: ${colors.white};
  /* box-shadow: 0px 4px 40px 2px rgba(176, 185, 194, 0.2); // 해석하면 다음과 같다. (그림자의 x축, y축, blur, spread, 색상) */
  /* border: 1px solid red; */
`;
