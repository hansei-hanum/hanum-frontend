import React from 'react';
import { Text as TextElement } from 'react-native';

import { css } from '@emotion/native';

import { colors, fonts } from 'src/styles';

interface TextProps {
  children: React.ReactNode;
  size: string;
  fontFamily?: 'bold' | 'medium' | 'regular' | 'light' | 'thin';
  color?: string;
  isCenter?: boolean;
}

export const Text: React.FC<TextProps> = ({ children, size, fontFamily, color, isCenter }) => {
  return (
    <TextElement
      style={css`
        font-size: ${size}px;
        font-family: ${fontFamily ? fonts[fontFamily] : fonts.medium};
        color: ${color ? color : colors.black};
        text-align: ${isCenter ? 'center' : 'auto'};
      `}
    >
      {children}
    </TextElement>
  );
};
