import { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { useTheme } from '@emotion/react';

import * as S from './styled';

export interface ApplyInputCustomProps {
  height: number;
  placeholder: string;
}

export type ApplyInputProps = ApplyInputCustomProps & TextInputProps;

export const ApplyInput = forwardRef<TextInput, ApplyInputProps>(
  ({ height, placeholder, ...props }, ref) => {
    const theme = useTheme();

    return (
      <S.ApplyDetailInput
        ref={ref}
        height={height}
        multiline={true}
        style={{ borderColor: theme.lightGray, textAlignVertical: 'top' }}
        placeholder={placeholder}
        placeholderTextColor={theme.placeholder}
        {...props}
      />
    );
  },
);
