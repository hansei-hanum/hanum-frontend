import React, { useState } from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { KeyboardAvoidingView, Share } from 'react-native';

import { useTheme } from '@emotion/react';

import {
  BottomSheet,
  BottomSheetRefProps,
  Button,
  ButtonContainer,
  Modal,
  ScaleOpacity,
  Text,
} from 'src/components';
import { COMMUNITY_BOTTOM_SHEET_OPTION_LIST, CommunityBottomSheetTextEnum } from 'src/constants';

import * as S from './styled';

export interface CommunityBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetRefProps>;
  isChatScreen?: boolean;
  closeBottomSheet: () => void;
}

export interface openModalProps {
  report: boolean;
  block: boolean;
}

export const CommunityBottomSheet: React.FC<CommunityBottomSheetProps> = ({
  bottomSheetRef,
  isChatScreen,
  closeBottomSheet,
}) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const [modalOpen, setModalOpen] = useState<openModalProps>({
    report: false,
    block: false,
  });

  const onPress = (option: CommunityBottomSheetTextEnum) => {
    closeBottomSheet();
    switch (option) {
      case CommunityBottomSheetTextEnum.SHARE:
        return sharePost();
      case CommunityBottomSheetTextEnum.REPORT:
        return setModalOpen({ report: true, block: false });
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalOpen({ report: false, block: false });
    }, 500);
  };

  const onModalCancelPress = () => {
    setModalOpen({ report: false, block: false });
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        scrollHeight={isChatScreen ? -250 : -300}
        modalBackDropVisible={modalOpen.block || modalOpen.report}
      >
        <S.CommunityBottomSheetContainer>
          {COMMUNITY_BOTTOM_SHEET_OPTION_LIST.map(({ text, isBlock, icon }) => (
            <ScaleOpacity key={text} onPress={() => onPress(text)}>
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
      {modalOpen.report && (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10}>
          <Modal
            backDropVisible={false}
            modalVisible={modalOpen.report}
            title="게시글 신고하기"
            text={`이 게시글을 신고하는 이유를 알려주세요.\n반복되는 허위 신고가 확인될 경우 대나무숲 서비스 이용이 제한될 수 있어요.`}
            button={
              <ButtonContainer>
                <Button onPress={onModalCancelPress} isModalBtn isWhite>
                  취소
                </Button>
                <Button onPress={onModalButtonPress} isModalBtn isLoading={loading}>
                  신고하기
                </Button>
              </ButtonContainer>
            }
          >
            <S.CommunityBottomSheetReportInput
              placeholder="신고 사유를 입력해주세요"
              placeholderTextColor={theme.placeholder}
            />
          </Modal>
        </KeyboardAvoidingView>
      )}
      {modalOpen.block && (
        <Modal
          backDropVisible={false}
          modalVisible={modalOpen.block}
          title="이 사용자 차단하기"
          text={`“박찬영” 님을 차단하면 대나무숲에서 게시글과 댓글을 포함하여 이 사용자의 모든 활동을 볼 수 없게 돼요.\n\n차단을 해제하기 위해서는 더 보기 > 설정 > 차단 목록에서 사용자를 제거해야 해요.\n\n계속할까요?`}
          button={
            <ButtonContainer>
              <Button onPress={onModalCancelPress} isModalBtn isWhite>
                다시 생각할래요
              </Button>
              <Button onPress={onModalButtonPress} isModalBtn isLoading={loading}>
                확인했어요
              </Button>
            </ButtonContainer>
          }
        />
      )}
    </>
  );
};
