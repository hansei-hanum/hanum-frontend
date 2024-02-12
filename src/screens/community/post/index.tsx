/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Animated } from 'react-native';

import { useTheme } from '@emotion/react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { CommunityHeader, Icon, ImageCard, OptionCard, ScaleOpacity, Text } from 'src/components';
import { useGetUser, useNavigate, useSetAnimation } from 'src/hooks';
import { UserLogo } from 'src/assets';
import {
  ANONYMITY_OPTION_LIST,
  POST_OPTION_LIST,
  PostOptionEnum,
  VISIBLE_TYPE_LIST,
} from 'src/constants';
import { anonymityTypeAtom, visibleTypeAtom } from 'src/atoms';
import { isIos } from 'src/utils';

import * as S from './styled';

const UserSection: React.FC = () => {
  const theme = useTheme();
  const { userProfile, userData } = useGetUser();

  const visibleType = useRecoilValue(visibleTypeAtom);

  const setVisibleTypeText = () => {
    switch (visibleType.text) {
      case '모두에게 공개':
        return '전체';
      case '제한적 공개':
        return '제한됨';
      case '학생 공개':
        return '학생';
      default:
        return '';
    }
  };

  return (
    <S.CommunityPostUserSection>
      <S.CommunityPostUserImage
        resizeMode="contain"
        source={userProfile ? { uri: userProfile } : UserLogo}
      />
      <View style={{ rowGap: 2 }}>
        <Text size={16}>{userData?.name || '박찬영'}</Text>
        <S.CommunityPostVisibleTypeWrapper>
          {visibleType.text === '모두에게 공개' && (
            <MI name="public" size={16} color={theme.white} />
          )}
          {visibleType.text === '제한적 공개' && <MI name="lock" size={16} color={theme.white} />}
          {visibleType.text === '학생 공개' && (
            <MCI name="account-group" size={16} color={theme.white} />
          )}
          <Text size={12} color={theme.white} fontFamily="bold">
            공개범위: {setVisibleTypeText()}
          </Text>
        </S.CommunityPostVisibleTypeWrapper>
      </View>
    </S.CommunityPostUserSection>
  );
};

export const CommunityPostScreen: React.FC = () => {
  const [visibleType, setVisibleType] = useRecoilState(visibleTypeAtom);
  const [anonymityType, setAnonymityTypes] = useRecoilState(anonymityTypeAtom);

  const { animation } = useSetAnimation();

  const navigate = useNavigate();

  const textInputRef = useRef<TextInput>(null);

  const theme = useTheme();

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
    animation({ animation: keyboardOptionTranslateY, value: isIos ? -10 : 0, duration: 400 });
    animation({ animation: keyboardOptionOpacity, value: 1, duration: 200 });
    setKeyboardShow(true);
  };

  const onKeyboardHide = () => {
    animation({ animation: keyboardOptionTranslateY, value: 0, duration: 400 });
    animation({ animation: keyboardOptionOpacity, value: 0, duration: 200 });
    setKeyboardShow(false);
  };

  const onPost = () => {
    setText('');
    console.log('image', selectedImage, 'visible', visibleType, 'anonymityType', anonymityType);
    setVisibleType({ text: VISIBLE_TYPE_LIST[0].text, limitType: '' });
    setAnonymityTypes(ANONYMITY_OPTION_LIST[0].title);
  };

  return (
    <S.CommunityPostWrapper>
      <CommunityHeader
        title="게시글 작성하기"
        rightContent={
          <ScaleOpacity onPress={onPost}>
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
            <UserSection />
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
                  <ImageCard
                    key={item}
                    item={item}
                    index={index}
                    setSelectedImage={setSelectedImage}
                    selectedImage={selectedImage}
                  />
                ))}
              </ScrollView>
            )}
          </S.CommunityPostImageSection>
          <S.CommunityPostSection>
            {POST_OPTION_LIST.map((props, index) => (
              <OptionCard key={index} index={index} onOptionClick={onOptionClick} {...props} />
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
