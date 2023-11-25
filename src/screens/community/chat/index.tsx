import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';

import { CommunityPost, GoBackIcon, Header } from 'src/components';
import { COMMUNITY_POST } from 'src/constants';
import { useGetImagesHeight } from 'src/hooks';

import * as S from './styled';

export const CommunityChatScreen: React.FC = () => {
  const { getHeightsForImage, imageHeights } = useGetImagesHeight();

  useEffect(() => {
    COMMUNITY_POST.content.image.forEach((uri, index) => {
      getHeightsForImage(uri, index);
    });
  }, [getHeightsForImage]);

  return (
    <S.CommunityChatWrapper>
      <Header>
        <GoBackIcon />
      </Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          rowGap: 16,
        }}
      >
        <CommunityPost
          author={COMMUNITY_POST.author}
          content={COMMUNITY_POST.content}
          time={COMMUNITY_POST.time}
          type={COMMUNITY_POST.type}
          imageHeights={imageHeights}
          index={0}
          isSingle
        />
      </ScrollView>
    </S.CommunityChatWrapper>
  );
};
