import styled from '@emotion/native';
import { Animated } from 'react-native';


export const Overlay = styled(Animated.View)`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const BottomSheetContainer = styled(Animated.View)`
  height: 220px;
  align-items: center;
  background-color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 15px 20px;

`;

export const BottomSheetHandle = styled.View`
  height: 4px;
  width: 75px;
  background-color: gray;
  border-radius: 2px;
  margin: 0 auto;
`

export const BottomSheetItemContainer = styled.View` ㅍㅊ
  width: 100%;
`

export const BottomSheetItem = styled.TouchableOpacity`
  align-items: flex-start;
`
