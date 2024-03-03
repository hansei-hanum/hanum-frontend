import React, { useRef, useState } from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Animated, Share } from 'react-native';

import { useTheme } from '@emotion/react';

import { BottomSheet, Button, ButtonContainer, Modal, ScaleOpacity, Text } from 'src/components';
import {
  COMMUNITY_BOTTOM_SHEET_OPTION_LIST,
  CommunityBottomSheetTextEnum,
  COMMUNITY_BOTTOM_SHEET_HEIGHT,
  SCREEN_WIDTH,
} from 'src/constants';
import { BottomSheetRefProps } from 'src/types';
import { RPH } from 'src/utils';
import { useBlock } from 'src/hooks';

import { ReportBottomSheet } from '../reports';

import * as S from './styled';

export interface CommunityBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetRefProps>;
  closeBottomSheet: () => void;
}

export interface openModalProps {
  report: boolean;
  block: boolean;
}

const REPORT_BOTTOM_SHEET_HEIGHT = RPH(-60);

export const PostOptionBottomSheet: React.FC<CommunityBottomSheetProps> = ({
  bottomSheetRef,
  closeBottomSheet,
}) => {
  const reportScreenAnimationValue = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const reportBottomSheetRef = useRef<BottomSheetRefProps>(null);

  const { mutate, isLoading } = useBlock();

  const theme = useTheme();

  const [modalOpen, setModalOpen] = useState<openModalProps>({
    report: false,
    block: false,
  });

  const onPress = (option: CommunityBottomSheetTextEnum) => {
    reportScreenAnimationValue.setValue(SCREEN_WIDTH);
    closeBottomSheet();
    switch (option) {
      case CommunityBottomSheetTextEnum.SHARE:
        return sharePost();
      case CommunityBottomSheetTextEnum.REPORT:
        return reportBottomSheetRef.current?.scrollTo(REPORT_BOTTOM_SHEET_HEIGHT);

      case CommunityBottomSheetTextEnum.BLOCK:
        return setModalOpen({ report: false, block: true });
    }
  };

  const sharePost = async () => {
    await Share.share({
      url: 'app://',
    });
  };

  const onModalButtonPress = () => {
    mutate({ targetId: 6 });
    if (!isLoading) {
      setModalOpen({ report: false, block: false });
    }
  };

  const onModalCancelPress = () => {
    setModalOpen({ report: false, block: false });
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        maxScrollHeight={COMMUNITY_BOTTOM_SHEET_HEIGHT}
        scrollHeight={COMMUNITY_BOTTOM_SHEET_HEIGHT}
        modalBackDropVisible={modalOpen.block || modalOpen.report}
      >
        <S.PostOptionBottomSheetContainer>
          {COMMUNITY_BOTTOM_SHEET_OPTION_LIST.map(({ text, isBlock, icon }) => (
            <ScaleOpacity key={text} onPress={() => onPress(text)}>
              <S.PostOptionBottomSheetOptionContainer>
                <S.PostOptionBottomSheetIconContainer>
                  {isBlock ? (
                    <Entypo name="block" size={30} color={theme.danger} />
                  ) : (
                    <Icons name={icon} size={30} color={theme.default} />
                  )}
                  <Text size={15} color={isBlock ? theme.danger : theme.default}>
                    {text}
                  </Text>
                </S.PostOptionBottomSheetIconContainer>
                <Icons name="chevron-forward" size={26} color={theme.placeholder} />
              </S.PostOptionBottomSheetOptionContainer>
            </ScaleOpacity>
          ))}
        </S.PostOptionBottomSheetContainer>
      </BottomSheet>
      <ReportBottomSheet
        reportScreenAnimationValue={reportScreenAnimationValue}
        ref={reportBottomSheetRef}
        scrollHeight={REPORT_BOTTOM_SHEET_HEIGHT}
      />
      {modalOpen.block && (
        <Modal
          backDropVisible={false}
          modalVisible={modalOpen.block}
          title="이 사용자 차단하기"
          text={`“박찬영” 님을 차단하면 대나무숲에서 게시글과 댓글을 포함하여 이 사용자의 모든 활동을 볼 수 없게 돼요.\n\n차단을 해제하기 위해서는 더 보기 > 설정 > 차단 목록에서 사용자를 제거해야 해요.\n\n계속할까요?`}
          button={
            <ButtonContainer>
              <Button onPress={onModalCancelPress} isModalBtn isWhite isDisabled={isLoading}>
                다시 생각할래요
              </Button>
              <Button onPress={onModalButtonPress} isModalBtn isLoading={isLoading}>
                확인했어요
              </Button>
            </ButtonContainer>
          }
        />
      )}
    </>
  );
};
