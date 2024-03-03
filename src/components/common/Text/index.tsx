import React from 'react';
import { StyleProp, Text as TextElement, TextProps, TextStyle } from 'react-native';

import { css } from '@emotion/native';
import { useTheme } from '@emotion/react';

import { fonts } from 'src/styles';

import * as S from './styled';

export interface TextCommonProps {
  children: React.ReactNode;
}

export type TextCommonType = TextCommonProps;

export const TextColumnContainer: React.FC<TextCommonType> = ({ children }) => {
  return <S.TextColumnContainer>{children}</S.TextColumnContainer>;
};

interface TextCustomProps {
  children: React.ReactNode;
  size: number;
  fontFamily?: keyof typeof fonts;
  color?: string;
  isCenter?: boolean;
  lineHeight?: number;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export type TextComponentProps = TextCustomProps & TextProps;

export const TextComponent: React.FC<TextComponentProps> = ({
  children,
  size,
  fontFamily,
  color,
  isCenter,
  lineHeight,
  style,
  onPress,
  ...props
}) => {
  const theme = useTheme();
  return (
    <TextElement
      onPress={onPress}
      style={[
        style,
        css`
          /* line-height: ${lineHeight ? lineHeight : size * 1.5}px; */
          font-size: ${size.toString()}px;
          font-family: ${fontFamily ? fonts[fontFamily] : fonts.medium};
          color: ${color ? color : theme.default};
          text-align: ${isCenter ? 'center' : 'left'};
        `,
      ]}
      {...props}
    >
      {children}
    </TextElement>
  );
};

export const Text = Object.assign(TextComponent, {
  Column: TextColumnContainer,
});
