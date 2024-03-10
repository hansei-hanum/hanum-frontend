import React from 'react';
import { FlatList, View } from 'react-native';

import { useTheme } from '@emotion/react';

import { CommunityUserImage, ScaleOpacity, Text } from 'src/components';
import { onTagProps } from 'src/screens';
import { APIResponse, GetUserMentionResponse } from 'src/api';

import * as S from './styled';

export interface MentionUserListProps {
  onTag: ({ userName, isReply, commentId }: onTagProps) => void;
  data: APIResponse<GetUserMentionResponse> | undefined;
  isLoading: boolean;
}

export const MentionUserList: React.FC<MentionUserListProps> = ({ onTag, data, isLoading }) => {
  const theme = useTheme();

  if (isLoading && !data) {
    return (
      <View style={{ padding: 14 }}>
        <Text size={14} color={theme.placeholder}>
          로딩중..
        </Text>
      </View>
    );
  } else if (data && data.data) {
    return (
      <FlatList
        keyboardShouldPersistTaps="always"
        data={data.data.items}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{
          width: '100%',
          padding: 14,
          rowGap: 24,
        }}
        renderItem={({ item: { name, picture, verificationInfo } }) => (
          <ScaleOpacity onPress={() => onTag({ userName: name })}>
            <S.MentionUserContainer>
              <CommunityUserImage userImage={picture} />
              <View>
                <Text size={16}>{name}</Text>
                <Text size={14} color={theme.placeholder}>
                  {verificationInfo}
                </Text>
              </View>
            </S.MentionUserContainer>
          </ScaleOpacity>
        )}
      />
    );
  } else {
    return null;
  }
};
