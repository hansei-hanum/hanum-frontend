import styled from '@emotion/native';
import { BlurView } from '@react-native-community/blur';

import { colors } from 'src/styles';

export const EoullimWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const EoullimContainer = styled.ImageBackground`
  flex: 1;
  padding: 20px;
  row-gap: 30px;
`;

export const EoullimBoxContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const EoullimBoxWrapper = styled.TouchableOpacity`
  width: 164px;
  height: 214px;
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
