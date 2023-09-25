import styled from '@emotion/native';
import { BlurView } from '@react-native-community/blur';

export const EoullimBoxWrapper = styled.TouchableOpacity`
  width: 160px;
  height: 216px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const EoullimBox = styled(BlurView)`
  width: 180px;
  height: 220px;
  background-color: rgba(245, 245, 245, 0.8);
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  position: absolute;
`;

export const EoullimBoxTextContainer = styled.View`
  flex-direction: column;
  row-gap: 12px;
  align-items: center;
  justify-content: center;
`;
