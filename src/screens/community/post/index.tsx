import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FI from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { TextInput } from 'react-native';

import { useTheme } from '@emotion/react';

import { Button, GoBackIcon, ScaleOpacity, Text } from 'src/components';
import { useGetUser } from 'src/hooks';
import { UserLogo } from 'src/assets';
import { POST_OPTION_LIST } from 'src/constants';
import { isAndroid } from 'src/utils';

import * as S from './styled';

export const CommunityPostScreen: React.FC = () => {
  const textInputRef = useRef<TextInput>(null);

  const theme = useTheme();

  const { userProfile, userData } = useGetUser();

  const [visibleType, setVisibleType] = useState<
    'ALL' | 'STUDENT' | 'PRIVATE' | 'CURRENT STUDENT' | 'TEACHER' | 'GRADUATE'
  >('ALL');
  const [text, setText] = useState<string>('');

  const onChangeText = (text: string) => {
    setText(text);
  };

  return (
    <S.CommunityPostWrapper>
      <S.CommunityPostHeader>
        <GoBackIcon />
        <Text size={16}>게시글 작성하기</Text>
        <View style={{ flexGrow: 0.1 }} />
      </S.CommunityPostHeader>
      <ScrollView
        contentContainerStyle={{
          height: '100%',
          paddingHorizontal: 14,
          paddingVertical: 14,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          rowGap: 20,
        }}
      >
        <S.CommunityPostUserSection>
          <S.CommunityPostUserImage
            resizeMode="contain"
            source={userProfile ? { uri: userProfile } : UserLogo}
          />
          <View style={{ rowGap: 2 }}>
            <Text size={16}>{userData?.name || '박찬영'}</Text>
            <S.CommunityPostVisibleTypeWrapper>
              {visibleType === 'ALL' && <Icon name="public" size={16} color={theme.white} />}
              {visibleType === 'PRIVATE' && <Icon name="lock" size={16} color={theme.white} />}
              {visibleType === 'STUDENT' && (
                <MCI name="account-group" size={16} color={theme.white} />
              )}
              <Text size={12} color={theme.white} fontFamily="bold">
                공개범위:{' '}
                {visibleType === 'ALL' ? '전체' : visibleType === 'PRIVATE' ? '비공개' : '학생'}
              </Text>
            </S.CommunityPostVisibleTypeWrapper>
          </View>
        </S.CommunityPostUserSection>
        <S.CommunityPostTextInput
          ref={textInputRef}
          multiline={true}
          placeholder="어떤 생각을 하고 계신가요?"
          placeholderTextColor={theme.placeholder}
          value={text}
          onChangeText={onChangeText}
        />
        {POST_OPTION_LIST.map(({ iconName, text }, index) => (
          <ScaleOpacity key={index} onPress={() => null} style={{ width: '100%' }}>
            <S.CommunityBottomSheetListContainer>
              <S.CommunityBottomSheetList>
                <FI name={iconName} size={30} color={theme.default} />
                <Text size={15}>{text}</Text>
              </S.CommunityBottomSheetList>
              <Entypo name="chevron-thin-right" size={20} color={theme.placeholder} />
            </S.CommunityBottomSheetListContainer>
          </ScaleOpacity>
        ))}
      </ScrollView>
      <KeyboardAvoidingView enabled={!isAndroid} behavior="position">
        <S.CommunityPostButtonWrapper>
          <Button>게시글 작성</Button>
        </S.CommunityPostButtonWrapper>
      </KeyboardAvoidingView>
    </S.CommunityPostWrapper>
  );
};
