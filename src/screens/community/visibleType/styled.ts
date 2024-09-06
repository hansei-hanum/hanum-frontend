import { Animated } from 'react-native';

import styled from '@emotion/native';

export const VisibleTypeWrapper = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;
  padding: 14px;
`;

export const VisibleTypeContainer = styled.View`
  row-gap: 20;
  margin-top: 14px;
`;

export const VisibleTypeListContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const VisibleTypeList = styled(VisibleTypeListContainer)`
  width: auto;
  column-gap: 10px;
  justify-content: center;
`;

export const VisibleTypeBoxContainer = styled(Animated.View)`
  width: 100%;
  background-color: ${({ theme }) => theme.secondary};
  row-gap: 14px;
  padding: 14px;
  border-radius: 8px;
`;

export const VisibleTypeLimitContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
