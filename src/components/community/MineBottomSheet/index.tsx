import React, { forwardRef, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@emotion/react';

import { BottomSheet, Button, Modal, ScaleOpacityCustomProps, Text } from 'src/components/common';
import {
  COMMUNITY_MINE_BOTTOM_SHEET_OPTION_LIST,
  CommunityMineBottomSheetTextEnum,
} from 'src/constants';
import { useNavigate, useDeletePost } from 'src/hooks';
import { isIos } from 'src/utils';
import { BottomSheetRefProps } from 'src/types';

import * as S from './styled';

export interface CommunityMineBottomSheetProps {
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  height: number;
  closeBottomSheet: () => void;
}

export const CommunityMineBottomSheet = forwardRef<
  BottomSheetRefProps,
  CommunityMineBottomSheetProps
>(({ setHeight, height, closeBottomSheet }, ref) => {
  const theme = useTheme();

  const insets = useSafeAreaInsets();

  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { mutate, isLoading } = useDeletePost();

  const onPress = (option: CommunityMineBottomSheetTextEnum) => {
    closeBottomSheet();
    switch (option) {
      case CommunityMineBottomSheetTextEnum.EDIT:
        navigate('CommunityCreatePost');
        return;
      case CommunityMineBottomSheetTextEnum.DELETE:
        return setModalOpen(true);
    }
  };
  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height + insets.bottom + (isIos ? 30 : 80));
  };

  const onModalDeleteButtonPress = () => {
    mutate({ id: 53 });
    if (!isLoading) {
      setModalOpen(false);
    }
  };

  return (
    <>
      <BottomSheet ref={ref} scrollHeight={-height}>
        <S.CommunityMineBottomSheetContainer onLayout={onLayout}>
          {COMMUNITY_MINE_BOTTOM_SHEET_OPTION_LIST.map(({ text, icon, isDanger }) => (
            <ScaleOpacity onPress={() => onPress(text)}>
              <S.CommunityMineOptionContainer key={text}>
                <S.CommunityMainOptionIconContainer>
                  <Icon name={icon} size={24} color={isDanger ? theme.danger : theme.default} />
                  <Text size={15} color={theme.default}>
                    {text}
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
