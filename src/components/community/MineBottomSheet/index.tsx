import React, { forwardRef, useState } from 'react';
import Icons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@emotion/react';
import { useSetRecoilState } from 'recoil';

import { BottomSheet, Button, Modal, ScaleOpacity, Text } from 'src/components/common';
import {
  ANONYMITY_OPTION_LIST,
  COMMUNITY_BOTTOM_SHEET_HEIGHT,
  COMMUNITY_MINE_BOTTOM_SHEET_OPTION_LIST,
  CommunityMineBottomSheetTextEnum,
  VISIBLE_TYPE_LIST,
} from 'src/constants';
import { useNavigate, useDeletePost } from 'src/hooks';
import { BottomSheetRefProps } from 'src/types';
import { anonymityTypeAtom, communityEditAtom, visibleTypeAtom } from 'src/atoms';

import * as S from './styled';

export interface CommunityMineBottomSheetProps {
  closeBottomSheet: () => void;
  postId: number | null;
}

export const CommunityMineBottomSheet = forwardRef<
  BottomSheetRefProps,
  CommunityMineBottomSheetProps
>(({ closeBottomSheet, postId }, ref) => {
  const setCommunityEdit = useSetRecoilState(communityEditAtom);
  const setVisibleType = useSetRecoilState(visibleTypeAtom);
  const setAnonymityTypes = useSetRecoilState(anonymityTypeAtom);

  const { options } = COMMUNITY_MINE_BOTTOM_SHEET_OPTION_LIST();
  const theme = useTheme();

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { mutate, isLoading } = useDeletePost();

  const onPress = (option: CommunityMineBottomSheetTextEnum) => {
    closeBottomSheet();
    switch (option) {
      case CommunityMineBottomSheetTextEnum.EDIT:
        navigate('CommunityCreatePost', { isEdit: true });
        return;
      case CommunityMineBottomSheetTextEnum.DELETE:
        return setModalOpen(true);
    }
  };

  const onModalDeleteButtonPress = () => {
    postId && mutate({ id: postId });
    if (!isLoading) {
      setModalOpen(false);
    }
  };

  const reset = () => {
    setCommunityEdit({ text: '', images: [], id: null });
    setVisibleType(VISIBLE_TYPE_LIST[0].text);
    setAnonymityTypes({ type: ANONYMITY_OPTION_LIST[0].title });
  };

  return (
    <>
      <BottomSheet
        ref={ref}
        scrollHeight={COMMUNITY_BOTTOM_SHEET_HEIGHT}
        onBottomSheetClosePress={reset}
      >
        <S.CommunityMineBottomSheetContainer>
          {options.map(({ text, icon, isDanger }) => (
            <ScaleOpacity onPress={() => onPress(text)} key={text}>
              <S.CommunityMineOptionContainer key={text}>
                <S.CommunityMainOptionIconContainer>
                  {icon}
                  <Text size={15} color={isDanger ? theme.danger : theme.default}>
                    게시글 {text}하기
                  </Text>
                </S.CommunityMainOptionIconContainer>
                <Icons name="chevron-forward" size={26} color={theme.placeholder} />
              </S.CommunityMineOptionContainer>
            </ScaleOpacity>
          ))}
        </S.CommunityMineBottomSheetContainer>
      </BottomSheet>
      <Modal
        modalVisible={modalOpen}
        title="게시물 삭제"
        text={`정말로 게시글을 삭제하시겠어요?\n삭제된 게시글은 복구할 수 없어요.`}
        button={
          <Button.Container>
            <Button onPress={() => setModalOpen(false)} isModalBtn isWhite>
              취소
            </Button>
            <Button
              onPress={onModalDeleteButtonPress}
              isModalBtn
              backgroundColor={theme.danger}
              isLoading={isLoading}
            >
              삭제
            </Button>
          </Button.Container>
        }
      />
    </>
  );
});
