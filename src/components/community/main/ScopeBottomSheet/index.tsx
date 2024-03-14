import { forwardRef } from 'react';

import { BottomSheet } from 'src/components/common';
import { BottomSheetRefProps } from 'src/types';

import * as S from './styled';

export interface ScopeBottomSheetProps {
  SCOPE_BOTTOM_SHEET_HEIGHT: number;
}

export const ScopeBottomSheet = forwardRef<BottomSheetRefProps, ScopeBottomSheetProps>(
  ({ SCOPE_BOTTOM_SHEET_HEIGHT }, ref) => {
    return (
      <BottomSheet
        ref={ref}
        scrollHeight={SCOPE_BOTTOM_SHEET_HEIGHT}
        maxScrollHeight={SCOPE_BOTTOM_SHEET_HEIGHT}
      >
        <S.ScopeBottomSheetContainer></S.ScopeBottomSheetContainer>
      </BottomSheet>
    );
  },
);
