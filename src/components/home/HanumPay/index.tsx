import React from 'react';
import { Platform } from 'react-native';

import { Content, Text } from 'src/components';
import { colors } from 'src/styles';
import { PayIcon } from 'src/assets';

import * as S from './styled';

export interface HanumPayButton {
  onPress: () => void;
  text: string;
}

export const HanumPayButton: React.FC<HanumPayButton> = ({ onPress, text }) => {
  return (
    <S.HanumPayButton activeOpacity={0.4} onPress={onPress}>
      <Text size={Platform.OS === 'ios' ? '15' : '14'} fontFamily="bold" color={colors.black}>
        {text}
      </Text>
    </S.HanumPayButton>
  );
};

export const HanumPay: React.FC = () => {
  return (
    <Content icon={PayIcon} name="한움페이" navigateUrl="HanumPay">
      <S.HanumPayContainer>
        <Text size="24" fontFamily="bold" color={colors.black}>
          19,000원
        </Text>
        <S.HanumPayButtonContainer>
          <HanumPayButton text="결제" onPress={() => console.log('결제')} />
          <HanumPayButton text="송금" onPress={() => console.log('송금')} />
        </S.HanumPayButtonContainer>
      </S.HanumPayContainer>
    </Content>
  );
};
