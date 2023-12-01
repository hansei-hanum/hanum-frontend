/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextInput } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import FI from 'react-native-vector-icons/Feather';

import { useTheme } from '@emotion/react';

import { CommunityUserImage, ScaleOpacity, Text } from 'src/components';
import { useGetUser } from 'src/hooks';

import * as S from './styled';

interface CommunityChatBottomInputProps {
  replyTranslateY: any;
  userId: string;
  closeReplyBox: () => void;
  chatRef: React.RefObject<TextInput>;
  onChangeChat: (text: string) => void;
  onSendChat: () => void;
  chat: string;
}

export const CommunityChatBottomInput: React.FC<CommunityChatBottomInputProps> = ({
  replyTranslateY,
  userId,
  closeReplyBox,
  chatRef,
  onChangeChat,
  onSendChat,
  chat,
}) => {
  const theme = useTheme();

  const { userProfile } = useGetUser();

  return (
    <S.CommunityChatBottom behavior="padding" keyboardVerticalOffset={10}>
      <S.CommunityChatBottomContainer behavior="padding" keyboardVerticalOffset={10}>
        <S.CommunityChatReplyContainer
          ref={replyTranslateY}
          style={{ transform: [{ translateY: replyTranslateY }] }}
        >
          <Text size={14} color={theme.placeholder}>
            {userId}님에게 답글 남기는 중
          </Text>
          <ScaleOpacity onPress={closeReplyBox}>
            <MI name="cancel" size={24} color={theme.placeholder} />
          </ScaleOpacity>
        </S.CommunityChatReplyContainer>
        <S.CommunityChatBottomWrapper>
          <CommunityUserImage userProfile={userProfile} />
          <S.CommunityChatInputContainer>
            <S.CommunityChatInput
              placeholder="댓글을 입력하세요"
              placeholderTextColor={theme.placeholder}
              ref={chatRef}
              value={chat}
              onChangeText={onChangeChat}
            />
            {chat.length > 0 ? (
              <ScaleOpacity onPress={onSendChat}>
                <MI name="send" size={28} color={theme.primary} />
              </ScaleOpacity>
            ) : (
              <ScaleOpacity onPress={() => null}>
                <FI name="image" size={28} color={theme.black} />
              </ScaleOpacity>
            )}
          </S.CommunityChatInputContainer>
        </S.CommunityChatBottomWrapper>
      </S.CommunityChatBottomContainer>
    </S.CommunityChatBottom>
  );
};
