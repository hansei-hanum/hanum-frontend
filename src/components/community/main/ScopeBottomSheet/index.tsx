import { forwardRef } from 'react';
import Octicons from 'react-native-vector-icons/Octicons';

import { useTheme } from '@emotion/react';

import { BottomSheet, ScaleOpacity, Text } from 'src/components/common';
import { BottomSheetRefProps } from 'src/types';
import { SCOPE_OPTION_LIST } from 'src/constants';
import { useFilteredVisibleType } from 'src/hooks';
import { LimitedArticleScopeOfDisclosure } from 'src/api';

import * as S from './styled';

export interface ScopeBottomSheetProps {
  SCOPE_BOTTOM_SHEET_HEIGHT: number;
  scope: LimitedArticleScopeOfDisclosure | null;
  onPress: (scope: LimitedArticleScopeOfDisclosure | null) => void;
}

export const ScopeBottomSheet = forwardRef<BottomSheetRefProps, ScopeBottomSheetProps>(
  ({ SCOPE_BOTTOM_SHEET_HEIGHT, scope, onPress }, ref) => {
    const { filteredVisibleType } = useFilteredVisibleType();
    const theme = useTheme();
    const options = SCOPE_OPTION_LIST();

    return (
      <BottomSheet
        ref={ref}
        scrollHeight={SCOPE_BOTTOM_SHEET_HEIGHT}
        maxScrollHeight={SCOPE_BOTTOM_SHEET_HEIGHT}
      >
        <S.ScopeBottomSheetContainer>
          {options?.map(({ text, type }) => (
            <ScaleOpacity
              key={text}
              activeScale={filteredVisibleType(type)}
              style={{ opacity: filteredVisibleType(type) ? 1 : 0.3 }}
              onPress={() => {
                filteredVisibleType(type) && onPress(type);
              }}
            >
              <S.ScopeBottomSheetOptionContainer>
                <S.ScopeBottomSheetIconContainer>
                  <Text size={16} color={theme.default}>
                    {text}
                  </Text>
                </S.ScopeBottomSheetIconContainer>
                <Octicons
                  name="check"
                  size={26}
                  color={scope === type ? theme.primary : theme.placeholder}
                />
              </S.ScopeBottomSheetOptionContainer>
            </ScaleOpacity>
          ))}
        </S.ScopeBottomSheetContainer>
      </BottomSheet>
    );
  },
);
