import React, { useEffect, useState } from 'react';
import { NativeSyntheticEvent, ScrollView, TextLayoutEventData, View } from 'react-native';

import moment from 'moment-timezone';
import { useTheme } from '@emotion/react';

import { CommunityPost, GoBackIcon, Header, ScaleOpacity, Text } from 'src/components';
import { COMMUNITY_POST } from 'src/constants';
import { useGetImagesHeight } from 'src/hooks';
import { UserLogo } from 'src/assets';

import * as S from './styled';

export const CommunityChatScreen: React.FC = () => {
  const [isOverlay, setIsOverlay] = useState<Array<boolean>>([]);
  const [isShow, setIsShow] = useState<Array<boolean>>([]);

  const theme = useTheme();

  const { getHeightsForImage, imageHeights } = useGetImagesHeight();

  const getTime = (date: string) => {
    const now = moment().tz('Asia/Seoul');
    const target = moment(date).tz('Asia/Seoul');
    const units = ['방금 전', '분', '시간', '일', '주', '달', '년'];
    const diffs = [
      now.diff(target, 'seconds'),
      now.diff(target, 'minutes'),
      now.diff(target, 'hours'),
      now.diff(target, 'days'),
      now.diff(target, 'weeks'),
      now.diff(target, 'months'),
      now.diff(target, 'years'),
    ];

    for (let i = 0; i < units.length; i++) {
      if (diffs[i] < 1) {
        return units[i];
      } else if (diffs[i + 1] < 60) {
        return `${diffs[i + 1]}${units[i + 1]} 전`;
      }
    }

    return `${diffs[6]}${units[6]} 전`;
  };

  const showMore = (index: number) => {
    setIsShow((prev) => {
      const temp = [...prev];
      temp[index] = true;
      return temp;
    });
  };

  const showLess = (index: number) => {
    setIsShow((prev) => {
      const temp = [...prev];
      temp[index] = false;
      return temp;
    });
  };

  const overlay = (index: number) => {
    setIsOverlay((prev) => {
      const temp = [...prev];
      temp[index] = true;
      return temp;
    });
  };

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
          rowGap: 10,
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
        <S.CommunityChatContainer>
          <Text size={15}>댓글 {COMMUNITY_POST.chats.length}</Text>
          {COMMUNITY_POST.chats.map(({ author, time, message }, i) => {
            return (
              <S.CommunityChatContent key={i}>
                <S.CommunityPostImage source={author.image ? { uri: author.image } : UserLogo} />
                <View style={{ rowGap: 4, flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text size={12}>{author.name}</Text>
                    <Text size={12} color={theme.placeholder}>
                      {'  '}
                      {getTime(time)}
                    </Text>
                  </View>
                  {!isShow[i] ? (
                    <S.ChatContainer>
                      <S.Chat
                        numberOfLines={14}
                        ellipsizeMode="tail"
                        onTextLayout={(event: NativeSyntheticEvent<TextLayoutEventData>) => {
                          event.nativeEvent.lines.length >= 14 && overlay(i);
                        }}
                      >
                        {message}
                      </S.Chat>
                      {isOverlay[i] && (
                        <ScaleOpacity onPress={() => showMore(i)}>
                          <Text size={14} color={theme.placeholder}>
                            더보기
                          </Text>
                        </ScaleOpacity>
                      )}
                    </S.ChatContainer>
                  ) : (
                    <S.ChatContainer>
                      <S.Chat>{message}</S.Chat>
                      <ScaleOpacity onPress={() => showLess(i)}>
                        <Text size={14} color={theme.placeholder}>
                          간략하게 보기
                        </Text>
                      </ScaleOpacity>
                    </S.ChatContainer>
                  )}
                </View>
              </S.CommunityChatContent>
            );
          })}
        </S.CommunityChatContainer>
      </ScrollView>
    </S.CommunityChatWrapper>
  );
};
