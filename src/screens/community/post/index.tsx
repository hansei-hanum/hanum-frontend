/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { TextInput } from 'react-native';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Animated } from 'react-native';

import { useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { CommunityHeader, Icon, ScaleOpacity, Text } from 'src/components';
import { useGetUser, useNavigate } from 'src/hooks';
import { UserLogo } from 'src/assets';
import { POST_OPTION_LIST, PostOptionEnum } from 'src/constants';
import { visibleTypeAtom } from 'src/atoms';
import { isIos } from 'src/utils';

import * as S from './styled';

export const CommunityPostScreen: React.FC = () => {
  const visibleType = useRecoilValue(visibleTypeAtom);

  const navigate = useNavigate();

  const textInputRef = useRef<TextInput>(null);

  const theme = useTheme();

  const { userProfile, userData } = useGetUser();

  const [text, setText] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<(string | undefined)[]>();
  const [keyboardShow, setKeyboardShow] = useState<boolean>(false);

  const keyboardOptionTranslateY = useRef<any>(new Animated.Value(0)).current;
  const keyboardOptionOpacity = useRef<any>(new Animated.Value(0)).current;

  const exitSelectedImage = selectedImage && selectedImage?.length > 0;

  const onTextInputBlur = () => {
    textInputRef.current?.blur();
  };

  const onChangeText = (text: string) => {
    setText(text);
  };

  const onOptionClick = (option: PostOptionEnum) => {
    switch (option) {
      case PostOptionEnum.IMAGE_UPLOAD:
        onTextInputBlur();
        return openImagePicker();
      case PostOptionEnum.VISIBLE:
        return navigate('CommunityVisibleType');

      case PostOptionEnum.ANONYMOUS:
        return navigate('CommunityAnonymitySettings');
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

  const onKeyboardShow = () => {
    Animated.timing(keyboardOptionTranslateY, {
      toValue: isIos ? -10 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
    Animated.timing(keyboardOptionOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setKeyboardShow(true);
  };

  const onKeyboardHide = () => {
    Animated.timing(keyboardOptionTranslateY, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
    Animated.timing(keyboardOptionOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setKeyboardShow(false);
  };

  return (
    <S.CommunityPostWrapper>
      <CommunityHeader
        title="게시글 작성하기"
        leftContent={
          <ScaleOpacity
            onPress={() => {
              setText('');
            }}
          >
            <Text size={16} color={text.length >= 1 ? theme.primary : theme.placeholder}>
              공유
            </Text>
          </ScaleOpacity>
        }
      />
      <S.CommunityPostContainer
        behavior="padding"
        keyboardVerticalOffset={isIos ? -10 : 0}
        enabled={isIos}
      >
        <S.CommunityPostSection style={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={onTextInputBlur}>
            <S.CommunityPostUserSection>
              <S.CommunityPostUserImage
                resizeMode="contain"
                source={userProfile ? { uri: userProfile } : UserLogo}
              />
              <View style={{ rowGap: 2 }}>
                <Text size={16}>{userData?.name || '박찬영'}</Text>
                <S.CommunityPostVisibleTypeWrapper>
                  {visibleType === 'ALL' && <MI name="public" size={16} color={theme.white} />}
                  {visibleType === 'LIMITED' && <MI name="lock" size={16} color={theme.white} />}
                  {visibleType === 'STUDENT' && (
                    <MCI name="account-group" size={16} color={theme.white} />
                  )}
                  <Text size={12} color={theme.white} fontFamily="bold">
                    공개범위:{' '}
                    {visibleType === 'ALL' ? '전체' : visibleType === 'LIMITED' ? '제한됨' : '학생'}
                  </Text>
                </S.CommunityPostVisibleTypeWrapper>
              </View>
            </S.CommunityPostUserSection>
          </TouchableWithoutFeedback>
          <S.CommunityPostTextInput
            ref={textInputRef}
            multiline={true}
            placeholder="어떤 생각을 하고 계신가요?"
            placeholderTextColor={theme.placeholder}
            value={text}
            onChangeText={onChangeText}
            onFocus={onKeyboardShow}
            onBlur={onKeyboardHide}
          />
        </S.CommunityPostSection>
        <View style={{ display: keyboardShow ? 'none' : 'flex' }}>
          <S.CommunityPostImageSection>
            {exitSelectedImage && (
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
                        <Icons name="close" size={26} color={theme.default} />
                      </S.CommunityPostImageIconWrapper>
                    </S.CommunityPostImageWrapper>
                  </ScaleOpacity>
                ))}
              </ScrollView>
            )}
          </S.CommunityPostImageSection>
          <S.CommunityPostSection>
            {POST_OPTION_LIST.map(({ icon, text }, index) => (
              <ScaleOpacity
                key={index}
                onPress={() => onOptionClick(text)}
                style={{ width: '100%' }}
              >
                <S.CommunityBottomSheetListContainer>
                  <S.CommunityBottomSheetList>
                    <Icon icon={icon} includeBackground={false} />
                    <Text size={15}>{text}</Text>
                  </S.CommunityBottomSheetList>
                  <Entypo name="chevron-thin-right" size={20} color={theme.placeholder} />
                </S.CommunityBottomSheetListContainer>
              </ScaleOpacity>
            ))}
          </S.CommunityPostSection>
        </View>
        <S.CommunityPostIconContainer
          ref={keyboardOptionTranslateY}
          style={{
            transform: [{ translateY: keyboardOptionTranslateY }],
            display: keyboardShow ? 'flex' : 'none',
          }}
        >
          {POST_OPTION_LIST.map(({ icon, text }, index) => (
            <ScaleOpacity key={index} onPress={() => onOptionClick(text)}>
              <Icon icon={icon} includeBackground={false} />
            </ScaleOpacity>
          ))}
        </S.CommunityPostIconContainer>
      </S.CommunityPostContainer>
    </S.CommunityPostWrapper>
  );
};
