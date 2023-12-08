/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Modal as ModalElement } from 'react-native';

import { Text } from '../Text';

import * as S from './styled';

export interface ModalProps {
  title: string;
  linkText?: React.ReactNode;
  text?: string | React.ReactNode;
  button: React.ReactNode;
  modalVisible: boolean;
  backDropVisible?: boolean;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  text,
  button,
  modalVisible,
  linkText,
  backDropVisible = true,
  children,
}) => {
  return (
    <>
      {backDropVisible && <S.ModalDummyContainer />}
      <ModalElement animationType="slide" transparent={true} visible={modalVisible}>
        <S.ModalWrapper>
          <S.ModalContainer>
            <Text size={24} fontFamily="bold">
              {title}
            </Text>
            {linkText ? (
              <>{linkText}</>
            ) : (
              <Text size={16} style={{ width: '100%' }}>
                {typeof text === 'string'
                  ? text?.split('\n').map((line, index) => (
                      <Text size={16} key={line} style={{ width: '100%' }}>
                        {line}
                        {index !== text.split('\n').length - 1 && <>{'\n'}</>}
                      </Text>
                    ))
                  : text}
              </Text>
            )}
            {children}
            {button}
          </S.ModalContainer>
        </S.ModalWrapper>
      </ModalElement>
    </>
  );
};
