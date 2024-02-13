import React from 'react';
import { FlatList, View } from 'react-native';

import { useTheme } from '@emotion/react';

import { COMMUNITY_USER_LIST } from 'src/constants';
import { CommunityUserImage, ScaleOpacity, Text } from 'src/components';

import * as S from './styled';

export interface MentionUserListProps {
  onMention: (id: string, isReply?: boolean) => void;
}

export const MentionUserList: React.FC<MentionUserListProps> = ({ onMention }) => {
  const theme = useTheme();

  return (
    <FlatList
      keyboardShouldPersistTaps={true}
      data={COMMUNITY_USER_LIST}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={{
        width: '100%',
        padding: 14,
        rowGap: 24,
      }}
      renderItem={({ item: { name, image, id } }) => (
        <ScaleOpacity onPress={() => onMention(id)}>
          <S.MentionUserContainer>
            <CommunityUserImage userImage={image} />
            <View>
              <Text size={16}>{name}</Text>
              <Text size={14} color={theme.placeholder}>
                {id}
              </Text>
            </View>
          </S.MentionUserContainer>
        </ScaleOpacity>
      )}
    />
  );
};
