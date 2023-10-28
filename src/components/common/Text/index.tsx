import React from 'react';
import { StyleProp, Text as TextElement, TextStyle } from 'react-native';

import { css } from '@emotion/native';

import { colors, fonts } from 'src/styles';

import * as S from './styled';

export interface TextCommonProps {
  children: React.ReactNode;
}

export type TextCommonType = TextCommonProps;

export const TextColumnContainer: React.FC<TextCommonType> = ({ children }) => {
  return <S.TextColumnContainer>{children}</S.TextColumnContainer>;
};

interface TextProps {
  children: React.ReactNode;
  size: number;
  fontFamily?: keyof typeof fonts;
  color?: string;
  isCenter?: boolean;
  lineHeight?: number;
  style?: StyleProp<TextStyle>;
}

export const TextComponent: React.FC<TextProps> = ({
  children,
  size,
  fontFamily,
  color,
  isCenter,
  lineHeight,
  style,
}) => {
  return (
    <TextElement
      style={[
        style,
        css`
          line-height: ${lineHeight ? `${lineHeight.toString()}px` : 'normal'};
          font-size: ${size.toString()}px;
          font-family: ${fontFamily ? fonts[fontFamily] : fonts.medium};
          color: ${color ? color : colors.black};
          text-align: ${isCenter ? 'center' : 'left'};
        `,
      ]}
    >
      {children}
    </TextElement>
  );
};

export const Text = Object.assign(TextComponent, {
  Column: TextColumnContainer,
});
