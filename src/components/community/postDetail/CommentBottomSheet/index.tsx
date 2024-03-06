import React, { forwardRef } from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import FA5 from 'react-native-vector-icons/FontAwesome5';

import { useTheme } from '@emotion/react';

import { BottomSheet, ScaleOpacity, Text } from 'src/components/common';
import { BottomSheetRefProps } from 'src/types';

import * as S from './styled';

export const CommentBottomSheet = forwardRef<BottomSheetRefProps>((props, ref) => {
  const theme = useTheme();

  return (
    <BottomSheet ref={ref} scrollHeight={-100}>
      <ScaleOpacity>
        <S.CommentBottomSheetOptionContainer>
          <S.CommentBottomSheetOptionIconContainer>
            <FA5 name="trash-alt" size={30} color={theme.danger} />
            <Text size={15} color={theme.danger}>
              삭제
            </Text>
          </S.CommentBottomSheetOptionIconContainer>
          <Icons name="chevron-forward" size={26} color={theme.placeholder} />
        </S.CommentBottomSheetOptionContainer>
      </ScaleOpacity>
    </BottomSheet>
  );
});
