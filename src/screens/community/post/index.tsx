import React, { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import FI from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { TextInput } from 'react-native';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';

import { useTheme } from '@emotion/react';

import { GoBackIcon, ScaleOpacity, Text } from 'src/components';
import { useGetUser } from 'src/hooks';
import { UserLogo } from 'src/assets';
import { POST_OPTION_LIST, PostOptionEnum } from 'src/constants';

import * as S from './styled';

export const CommunityPostScreen: React.FC = () => {
  const textInputRef = useRef<TextInput>(null);

  const theme = useTheme();

  const { userProfile, userData } = useGetUser();

  const [visibleType, setVisibleType] = useState<
    'ALL' | 'STUDENT' | 'PRIVATE' | 'CURRENT STUDENT' | 'TEACHER' | 'GRADUATE'
  >('ALL');
  const [text, setText] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<(string | undefined)[]>();

  const onChangeText = (text: string) => {
    setText(text);
  };

  const onOptionClick = (option: PostOptionEnum) => {
    switch (option) {
      case PostOptionEnum.IMAGE_UPLOAD:
        return openImagePicker();
      case PostOptionEnum.VISIBLE:
        return console.log('visible');

      case PostOptionEnum.ANONYMOUS:
        return console.log('anonymous');
    }
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
      selectionLimit: 10,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('Image picker error: ', response.errorMessage);
      } else {
        const imageUri = response.assets?.map((item) => item.uri);
        setSelectedImage(imageUri);
      }
    });
  };

  return (
    <S.CommunityPostWrapper>
      <S.CommunityPostHeader>
        <GoBackIcon />
        <Text size={16}>게시글 작성하기</Text>
        <ScaleOpacity
          onPress={() => {
            setText('');
          }}
        >
          <Text size={16} color={text.length >= 1 ? theme.primary : theme.placeholder}>
            공유
          </Text>
        </ScaleOpacity>
      </S.CommunityPostHeader>
      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ height: '100%' }}>
        <S.CommunityPostSection>
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
        </S.CommunityPostSection>
        <S.CommunityPostImageSection>
          {selectedImage && selectedImage?.length > 0 && (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'row',
                columnGap: 4,
                paddingRight: 14,
                marginVertical: 10,
              }}
            >
              {selectedImage?.map((item, index) => (
                <ScaleOpacity
                  onPress={() => {
                    setSelectedImage(selectedImage?.filter((_, i) => i !== index));
                  }}
                >
                  <S.CommunityPostImageWrapper key={item}>
                    <S.CommunityPostImage source={{ uri: item }} />
                    <S.CommunityPostImageIconWrapper>
                      <Icons name="close" size={26} color={theme.black} />
                    </S.CommunityPostImageIconWrapper>
                  </S.CommunityPostImageWrapper>
                </ScaleOpacity>
              ))}
            </ScrollView>
          )}
        </S.CommunityPostImageSection>
        <S.CommunityPostSection>
          {POST_OPTION_LIST.map(({ iconName, text }, index) => (
            <ScaleOpacity key={index} onPress={() => onOptionClick(text)} style={{ width: '100%' }}>
              <S.CommunityBottomSheetListContainer>
                <S.CommunityBottomSheetList>
                  <FI name={iconName} size={30} color={theme.default} />
                  <Text size={15}>{text}</Text>
                </S.CommunityBottomSheetList>
                <Entypo name="chevron-thin-right" size={20} color={theme.placeholder} />
              </S.CommunityBottomSheetListContainer>
            </ScaleOpacity>
          ))}
        </S.CommunityPostSection>
      </ScrollView>
    </S.CommunityPostWrapper>
  );
};
