/* eslint-disable react/jsx-no-useless-fragment */
import { TouchableOpacity } from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import { useNavigation } from '@react-navigation/native';

import { Button, Text } from 'src/components';

import * as S from './styled';

export interface AuthProps {
  headerText: string;
  subHeaderText?: React.ReactNode;
  children: React.ReactNode;
  isDisabled: boolean;
  onPress: () => void;
  bottomText: string;
}

export const Auth: React.FC<AuthProps> = ({
  children,
  isDisabled,
  headerText,
  subHeaderText,
  onPress,
  bottomText,
}) => {
  const navigation = useNavigation();

  return (
    <S.AuthContainer>
      <S.AuthInputContainer>
        <TouchableOpacity activeOpacity={0.2} onPress={() => navigation.goBack()}>
          <Entypo name="chevron-thin-left" size={28} color="black" style={{ marginBottom: 10 }} />
        </TouchableOpacity>
        <S.AuthTextContainer>
          <Text size={26} fontFamily="bold">
            {headerText.split('\n').map((line, index) => (
              <Text size={26} fontFamily="bold" key={line}>
                {line}
                {index !== headerText.split('\n').length - 1 && <>{'\n'}</>}
              </Text>
            ))}
          </Text>
          {subHeaderText}
        </S.AuthTextContainer>
        {children}
      </S.AuthInputContainer>
      <S.AuthButtonWrapper behavior="padding" keyboardVerticalOffset={15}>
        <Button isDisabled={isDisabled} onPress={onPress}>
          {bottomText}
        </Button>
      </S.AuthButtonWrapper>
    </S.AuthContainer>
  );
};
