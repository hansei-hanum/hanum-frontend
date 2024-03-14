import React, { useRef, useState } from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Animated } from 'react-native';
import Toast from 'react-native-toast-message';
import { WithLocalSvg } from 'react-native-svg';

import { useTheme } from '@emotion/react';

import {
  BottomSheet,
  Button,
  ButtonContainer,
  Modal,
  ScaleOpacity,
  Spinner,
  Text,
} from 'src/components';
import {
  CommunityBottomSheetTextEnum,
  COMMUNITY_BOTTOM_SHEET_HEIGHT,
  SCREEN_WIDTH,
  CommunityOptionList,
  CommunityBottomSheetUserTextEnum,
} from 'src/constants';
import { BottomSheetRefProps } from 'src/types';
import { RPH, isIos } from 'src/utils';
import { useBlock } from 'src/hooks';
import { UserLogo, VerifyCheckIcon } from 'src/assets';
import { GetCommentsAuthorProps } from 'src/api';

import { ReportBottomSheet } from '../reports';

import * as S from './styled';

export interface CommunityBottomSheetProps {
  bottomSheetRef: React.RefObject<BottomSheetRefProps>;
  closeBottomSheet: () => void;
  userBottomSheet: boolean;
  author?: GetCommentsAuthorProps | null;
  bottomSheetLoading: boolean;
}

export interface openModalProps {
  report: boolean;
  block: boolean;
}

export const REPORT_BOTTOM_SHEET_HEIGHT = isIos ? RPH(-55) : RPH(-64);

export const PostOptionBottomSheet: React.FC<CommunityBottomSheetProps> = ({
  bottomSheetRef,
  closeBottomSheet,
  userBottomSheet,
  author,
  bottomSheetLoading,
}) => {
  const { option, enums } = CommunityOptionList(userBottomSheet);
  const reportScreenAnimationValue = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const reportBottomSheetRef = useRef<BottomSheetRefProps>(null);

  const { mutate, isLoading } = useBlock();

  const theme = useTheme();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onPress = (option: CommunityBottomSheetUserTextEnum | CommunityBottomSheetTextEnum) => {
    reportScreenAnimationValue.setValue(SCREEN_WIDTH);
    closeBottomSheet();
    switch (option) {
      // case enums.SHARE:
      //   return sharePost();
      case enums.REPORT:
        // if (!targetId) {
        //   Toast.show({
        //     type: 'info',
        //     text1: '익명 사용자는 신고할 수 없어요',
        //   });
        //   return;
        // }
        return reportBottomSheetRef.current?.scrollTo(REPORT_BOTTOM_SHEET_HEIGHT);
      case enums.BLOCK:
        if (author?.name === '') {
          Toast.show({
            type: 'info',
            text1: '익명 사용자는 차단할 수 없어요',
          });
          return;
        }
        return setModalOpen(true);
    }
  };

  // const sharePost = async () => {
  //   await Share.share({
  //     url: 'app://',
  //   });
  // };

  const onModalButtonPress = () => {
    author && mutate({ targetId: author?.id });
    setTimeout(() => setModalOpen(false), 400);
  };

  const onModalCancelPress = () => {
    setModalOpen(false);
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        maxScrollHeight={
          userBottomSheet ? COMMUNITY_BOTTOM_SHEET_HEIGHT - 70 : COMMUNITY_BOTTOM_SHEET_HEIGHT
        }
        scrollHeight={
          userBottomSheet ? COMMUNITY_BOTTOM_SHEET_HEIGHT - 70 : COMMUNITY_BOTTOM_SHEET_HEIGHT
        }
        modalBackDropVisible={modalOpen}
      >
        <S.PostOptionBottomSheetContainer>
          {bottomSheetLoading ? (
            <Spinner size={40} color={theme.placeholder} />
          ) : (
            <>
              {userBottomSheet && (
                <S.UserInfoContainer>
                  <S.UserInfoImage
                    source={author && author.picture ? { uri: author.picture } : UserLogo}
                    style={{ resizeMode: 'contain' }}
                  />
                  <S.UserInfoAuthorContainer>
                    <Text size={16} fontFamily="bold" color={theme.default}>
                      {author?.name}
                    </Text>
                    {author && author.verificationInfo && (
                      <S.UserInfoVerificationContainer>
                        <Text size={14} color={theme.default}>
                          {author.verificationInfo}
                        </Text>
                        <WithLocalSvg asset={VerifyCheckIcon} width={16} height={16} />
                      </S.UserInfoVerificationContainer>
                    )}
                  </S.UserInfoAuthorContainer>
                </S.UserInfoContainer>
              )}
              {option.map(({ text, isBlock, icon }) => (
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
            </>
          )}
        </S.PostOptionBottomSheetContainer>
      </BottomSheet>
      <ReportBottomSheet
        isUserReport={userBottomSheet}
        reportScreenAnimationValue={reportScreenAnimationValue}
        ref={reportBottomSheetRef}
        scrollHeight={REPORT_BOTTOM_SHEET_HEIGHT}
      />
      {modalOpen && (
        <Modal
          backDropVisible={false}
          modalVisible={modalOpen || isLoading}
          title="이 사용자 차단하기"
          text={`“${author?.name}” 님을 차단하면 대나무숲에서 게시글과 댓글을 포함하여 이 사용자의 모든 활동을 볼 수 없게 돼요.\n\n차단을 해제하기 위해서는 더 보기 > 설정 > 차단 목록에서 사용자를 제거해야 해요.\n\n계속할까요?`}
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
