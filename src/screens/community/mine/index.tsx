import React, { useEffect, useState } from 'react';
import { FlatList, LayoutChangeEvent, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@emotion/react';

import {
  COMMUNITY_LIST,
  COMMUNITY_MINE_BOTTOM_SHEET_OPTION_LIST,
  CommunityMineBottomSheetTextEnum,
} from 'src/constants';
import { isIos } from 'src/utils';
import {
  BottomSheet,
  Button,
  CommunityPost,
  CommunityPostHeader,
  GoBackIcon,
  Modal,
  PostBottom,
  ScaleOpacity,
  Text,
} from 'src/components';
import { useBottomSheet, useGetImagesHeight, useNavigate } from 'src/hooks';

import * as S from './styled';

export const CommunityMineScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const [height, setHeight] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet();
  const { getHeightsForImage, imageHeights } = useGetImagesHeight();

  const navigate = useNavigate();

  const onChatScreenNavigate = (index: number) => {
    navigate('CommunityPostDetail', { id: index });
  };

  const onPress = (option: CommunityMineBottomSheetTextEnum) => {
    closeBottomSheet();
    switch (option) {
      case CommunityMineBottomSheetTextEnum.EDIT:
        return;
      case CommunityMineBottomSheetTextEnum.DELETE:
        return setModalOpen(true);
    }
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height + insets.bottom + 30);
  };

  useEffect(() => {
    COMMUNITY_LIST.forEach((item, index) => {
      item.content.image.forEach((image, i) => {
        getHeightsForImage(image, index * item.content.image.length + i);
      });
    });
  }, [COMMUNITY_LIST, getHeightsForImage]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <S.CommunityMineHeader>
        <GoBackIcon style={{ position: 'absolute', left: 0, paddingLeft: 10 }} />
        <Text size={16} fontFamily="bold">
          내 게시물{' '}
        </Text>
      </S.CommunityMineHeader>
      <S.CommunityMineWrapper>
        <FlatList
          scrollEventThrottle={16}
          data={COMMUNITY_LIST}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            paddingTop: isIos ? 10 : 38,
            paddingBottom: 60,
            rowGap: 16,
          }}
          renderItem={({ item: { author, type, time, content }, index }) => (
            <S.CommunityMinePostBox>
              <CommunityPostHeader
                author={author}
                type={type}
                time={time}
                style={{ width: '100%' }}
                openBottomSheet={() => openBottomSheet({ scrollTo: -height })}
                onPress={() => onChatScreenNavigate(index)}
              />
              <CommunityPost
                author={author}
                content={content}
                time={time}
                type={type}
                onPress={() => onChatScreenNavigate(index)}
                index={index}
                imageHeights={imageHeights}
              />
              <PostBottom
                index={index}
                likesLength={content.likes}
                commentsLength={content.comments}
              />
            </S.CommunityMinePostBox>
          )}
        />
        <BottomSheet ref={bottomSheetRef} scrollHeight={-height}>
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
      </S.CommunityMineWrapper>
      <Modal
        modalVisible={modalOpen}
        title="게시물 삭제"
        text={`정말로 게시글을 삭제하시겠어요?\n삭제된 게시글은 복구할 수 없어요.`}
        button={
          <Button.Container>
            <Button onPress={() => setModalOpen(false)} isModalBtn isWhite>
              취소
            </Button>
            <Button onPress={() => setModalOpen(false)} isModalBtn backgroundColor={theme.danger}>
              삭제
            </Button>
          </Button.Container>
        }
      />
    </SafeAreaView>
  );
};
