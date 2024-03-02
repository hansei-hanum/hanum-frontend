import React from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COMMUNITY_LIST } from 'src/constants';
import { isIos } from 'src/utils';
import { BottomSheet, CommunityPost, CommunityPostHeader, PostBottom, Text } from 'src/components';
import { useBottomSheet, useGetImagesHeight, useNavigate } from 'src/hooks';

import * as S from './styled';

const BOTTOM_SHEET_HEIGHT = -140;

export const CommunityMineScreen: React.FC = () => {
  const { bottomSheetRef, openBottomSheet, closeBottomSheet } = useBottomSheet();
  const { imageHeights } = useGetImagesHeight();

  const inset = useSafeAreaInsets();

  const navigate = useNavigate();

  const onChatScreenNavigate = (index: number) => {
    navigate('CommunityPostDetail', { id: index });
  };

  return (
    <S.CommunityMainWrapper>
      <FlatList
        scrollEventThrottle={16}
        data={COMMUNITY_LIST}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          paddingTop: isIos ? inset.top + 24 : 68,
          paddingBottom: 60,
          rowGap: 16,
        }}
        renderItem={({ item: { author, type, time, content }, index }) => (
          <S.CommunityMainBox>
            <CommunityPostHeader
              author={author}
              type={type}
              time={time}
              style={{ width: '100%' }}
              openBottomSheet={() => openBottomSheet(BOTTOM_SHEET_HEIGHT)}
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
          </S.CommunityMainBox>
        )}
      />
      <BottomSheet ref={bottomSheetRef} scrollHeight={BOTTOM_SHEET_HEIGHT}>
        <View>
          <Text size={16}>Bottom Sheet</Text>
        </View>
      </BottomSheet>
    </S.CommunityMainWrapper>
  );
};
