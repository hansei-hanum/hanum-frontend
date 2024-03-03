import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { useSetRecoilState } from 'recoil';
import { useTheme } from '@emotion/react';

import { COMMUNITY_LIST } from 'src/constants';
import { isIos } from 'src/utils';
import {
  CommunityMineBottomSheet,
  CommunityPost,
  CommunityPostHeader,
  PostBottom,
  ScreenHeader,
} from 'src/components';
import { useBottomSheet, useGetImagesHeight, useNavigate } from 'src/hooks';
import { communityEditAtom } from 'src/atoms';

import * as S from './styled';

export const UserPostScreen: React.FC = () => {
  const theme = useTheme();
  const setCommunityEdit = useSetRecoilState(communityEditAtom);

  const { bottomSheetRef, closeBottomSheet } = useBottomSheet();

  const { getHeightsForImage, imageHeights } = useGetImagesHeight();

  const [height, setHeight] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navigate = useNavigate();

  const onChatScreenNavigate = (index: number) => {
    navigate('CommunityPostDetail', { id: index });
  };

  const openBottomSheet = (text: string, image: string[]) => {
    bottomSheetRef.current?.scrollTo(-height);
    setCommunityEdit({ text, image });
  };

  useEffect(() => {
    COMMUNITY_LIST.forEach((item, index) => {
      item.content.image.forEach((image, i) => {
        getHeightsForImage(image, index * item.content.image.length + i);
      });
    });
  }, [COMMUNITY_LIST, getHeightsForImage]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setCommunityEdit((prev) => ({ ...prev, isEdit: true }));
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader
        title="내 게시물"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: isScrolled ? theme.lightGray : 'transparent',
        }}
      />
      <S.UserPostWrapper>
        <FlatList
          onScroll={(e) => setIsScrolled(e.nativeEvent.contentOffset.y > 0)}
          scrollEventThrottle={16}
          data={COMMUNITY_LIST}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            paddingTop: isIos ? 10 : 38,
            paddingBottom: 60,
            rowGap: 16,
          }}
          renderItem={({ item: { author, type, time, content }, index }) => (
            <S.UserPostBox>
              <CommunityPostHeader
                author={author}
                type={type}
                time={time}
                style={{ width: '100%' }}
                openBottomSheet={() => openBottomSheet(content.message, content.image)}
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
            </S.UserPostBox>
          )}
        />
      </S.UserPostWrapper>
      <CommunityMineBottomSheet
        ref={bottomSheetRef}
        setHeight={setHeight}
        height={height}
        closeBottomSheet={closeBottomSheet}
      />
    </SafeAreaView>
  );
};
