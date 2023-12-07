import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import { useTheme } from '@emotion/react';

import { BottomSheet, BottomSheetRefProps, ScaleOpacity, Text } from 'src/components';
import { COMMUNITY_BOTTOM_SHEET_OPTION_LIST, CommunityBottomSheetTextEnum } from 'src/constants';

import * as S from './styled';

export interface CommunityBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetRefProps>;
}

export const CommunityBottomSheet: React.FC<CommunityBottomSheetProps> = ({ bottomSheetRef }) => {
  const theme = useTheme();

  const onPress = (option: CommunityBottomSheetTextEnum) => {
    switch (option) {
      case CommunityBottomSheetTextEnum.SHARE:
        return console.log('공유하기');
      case CommunityBottomSheetTextEnum.REPORT:
        return console.log('신고하기');
      case CommunityBottomSheetTextEnum.BLOCK:
        return console.log('차단하기');
    }
  };
  return (
    <BottomSheet ref={bottomSheetRef} snapTo="38%">
      <S.CommunityBottomSheetContainer>
        {COMMUNITY_BOTTOM_SHEET_OPTION_LIST.map(({ text, isBlock, icon }, index) => (
          <ScaleOpacity key={index} onPress={() => onPress(text)}>
            <S.CommunityBottomSheetListContainer>
              <S.CommunityBottomSheetList>
                {isBlock ? (
                  <Entypo name="block" size={30} color={theme.danger} />
                ) : (
                  <Icons name={icon} size={30} color={theme.default} />
                )}
                <Text size={15} color={isBlock ? theme.danger : theme.default}>
                  {text}
                </Text>
              </S.CommunityBottomSheetList>
              <Icons name="chevron-forward" size={26} color={theme.placeholder} />
            </S.CommunityBottomSheetListContainer>
          </ScaleOpacity>
        ))}
      </S.CommunityBottomSheetContainer>
    </BottomSheet>
  );
};
