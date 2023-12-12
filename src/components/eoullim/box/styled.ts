import { BlurView } from '@react-native-community/blur';

import styled from '@emotion/native';

import { fonts } from 'src/styles';

export const EoullimBoxWrapper = styled.TouchableOpacity`
  height: 180px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const EoullimBox = styled(BlurView)`
  width: 100%;
  height: 220px;
  background-color: rgba(248, 248, 248, 0.8);
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  position: absolute;
`;

export const EoullimBoxTextContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EoullimBoxIcon = styled.Text`
  font-family: ${fonts.tossIcon};
  font-size: 50px;
`;

export const EoullimBoxText = styled.Text`
  font-size: 18px;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.black};
`;
