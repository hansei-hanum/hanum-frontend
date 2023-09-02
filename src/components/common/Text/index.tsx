import React from 'react';
import { Platform, StyleProp, Text as TextElement, TextStyle } from 'react-native';

import { css } from '@emotion/native';

import { colors, fonts } from 'src/styles';

interface TextProps {
  children: React.ReactNode;
  size: number;
  fontFamily?: keyof typeof fonts;
  color?: string;
  isCenter?: boolean;
  style?: StyleProp<TextStyle>;
}

export const Text: React.FC<TextProps> = ({
  children,
  size,
  fontFamily,
  color,
  isCenter,
  style,
}) => {
  const fontSize = Platform.OS === 'ios' ? size : size - 2;
  return (
    <TextElement
      style={[
        style,
        css`
          font-size: ${size.toString()}px;
          font-family: ${fontFamily ? fonts[fontFamily] : fonts.medium};
          color: ${color ? color : colors.black};
          text-align: ${isCenter ? 'center' : 'auto'};
        `,
      ]}
    >
      {children}
    </TextElement>
  );
};
