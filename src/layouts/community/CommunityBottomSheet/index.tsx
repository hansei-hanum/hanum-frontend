import React, { useState } from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { runOnJS } from 'react-native-reanimated';

import { useTheme } from '@emotion/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  BottomSheet,
  BottomSheetRefProps,
  Button,
  Modal,
  ScaleOpacity,
  Text,
} from 'src/components';
import { COMMUNITY_BOTTOM_SHEET_OPTION_LIST, CommunityBottomSheetTextEnum } from 'src/constants';
import { useBottomSheet } from 'src/hooks';
import { backDropVisibleAtom } from 'src/atoms';

import * as S from './styled';

export interface CommunityBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetRefProps>;
  closeBottomSheet: () => void;
}

export interface openModalProps {
  share: boolean;
  report: boolean;
  block: boolean;
}

export const CommunityBottomSheet: React.FC<CommunityBottomSheetProps> = ({
  bottomSheetRef,
  closeBottomSheet,
}) => {
  const setBackDropVisible = useSetRecoilState(backDropVisibleAtom);
  const theme = useTheme();

  const [modalOpen, setModalOpen] = useState<openModalProps>({
    share: false,
    report: false,
    block: false,
  });

  const onPress = (option: CommunityBottomSheetTextEnum) => {
    closeBottomSheet();
    runOnJS(setBackDropVisible)(true);
    switch (option) {
      case CommunityBottomSheetTextEnum.SHARE:
        return setModalOpen({ share: true, report: false, block: false });
      case CommunityBottomSheetTextEnum.REPORT:
        return setModalOpen({ share: false, report: true, block: false });
      case CommunityBottomSheetTextEnum.BLOCK:
        return setModalOpen({ share: false, report: false, block: true });
    }
  };

  return (
    <>
      <BottomSheet ref={bottomSheetRef} snapTo="35%" withModal>
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
      {modalOpen.share && (
        <Modal
          backDropVisible={false}
          modalVisible={modalOpen.share}
          title="공유하기"
          text="공유하기 기능은 준비 중입니다."
          button={
            <Button
              onPress={() => {
                setBackDropVisible(false);
                setModalOpen({ share: false, report: false, block: false });
              }}
            >
              확인
            </Button>
          }
        />
      )}
      {modalOpen.report && (
        <Modal
          backDropVisible={false}
          modalVisible={modalOpen.share}
          title="공유하기"
          text="공유하기 기능은 준비 중입니다."
          button={
            <Button
              onPress={() => {
                setModalOpen({ share: false, report: false, block: false });
              }}
            >
              확인
            </Button>
          }
        />
      )}
      {modalOpen.block && (
        <Modal
          backDropVisible={false}
          modalVisible={modalOpen.share}
          title="공유하기"
          text="공유하기 기능은 준비 중입니다."
          button={
            <Button
              onPress={() => {
                setModalOpen({ share: false, report: false, block: false });
              }}
            >
              확인
            </Button>
          }
        />
      )}
    </>
  );
};
