/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Key, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Animated } from 'react-native';
import Toast from 'react-native-toast-message';

import { useIsFocused } from '@react-navigation/native';

import { useTheme } from '@emotion/react';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  CommunityHeader,
  Icon,
  PhotoCard,
  OptionCard,
  ScaleOpacity,
  Text,
  NoScrollbarScrollView,
  PhotosInterface,
} from 'src/components';
import { useGetUser, useNavigate, useSetAnimation } from 'src/hooks';
import { UserLogo } from 'src/assets';
import {
  ANONYMITY_OPTION_LIST,
  POST_OPTION_LIST,
  PostOptionEnum,
  VISIBLE_TYPE_LIST,
} from 'src/constants';
import { anonymityTypeAtom, communityEditAtom, visibleTypeAtom } from 'src/atoms';
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
    <S.UserSectionContainer>
      <S.UserSectionImage
        resizeMode="contain"
        source={userProfile ? { uri: userProfile } : UserLogo}
      />
      <View style={{ rowGap: 2 }}>
        <Text size={16}>{userData?.name || '박찬영'}</Text>
        <S.VisibleTypeContainer>
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
        </S.VisibleTypeContainer>
      </View>
    </S.UserSectionContainer>
  );
};

export const CommunityCreatePostScreen: React.FC = () => {
  const [communityEdit, setCommunityEdit] = useRecoilState(communityEditAtom);
  const [visibleType, setVisibleType] = useRecoilState(visibleTypeAtom);
  const [anonymityType, setAnonymityTypes] = useRecoilState(anonymityTypeAtom);

  const { animation } = useSetAnimation();

  const navigate = useNavigate();

  const textInputRef = useRef<TextInput>(null);

  const theme = useTheme();

  const [text, setText] = useState<string>(communityEdit.text);
  const [selectedImage, setSelectedImage] = useState<PhotosInterface[] | string[]>([]);

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
        if (Boolean(communityEdit.text)) {
          Toast.show({
            type: 'error',
            text1: '편집할때 공개범위는 설정할 수 없어요',
          });
          return;
        } else {
          return navigate('CommunityVisibleType');
        }
      case PostOptionEnum.ANONYMOUS:
        if (Boolean(communityEdit.text)) {
          Toast.show({
            type: 'error',
            text1: '편집할때 익명성은 설정할 수 없어요',
          });
          return;
        } else {
          return navigate('CommunityAnonymitySettings');
        }
    }
  };

  const openImagePicker = () => {
    if (selectedImage.length >= 10) {
      Toast.show({ type: 'error', text1: '이미지는 10장까지만 업로드 가능해요' });
      return;
    } else {
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
          const imageName = response.assets?.map((item) => item.fileName) || 'image.png';
          const image = imageUri?.map((uri, index) => ({ uri, name: imageName[index] }));
          setSelectedImage((prev: string[] | PhotosInterface[]) => {
            if (typeof prev[0] === 'string') {
              return prev as string[];
            } else {
              return prev as PhotosInterface[];
            }
          });
        }
      });
    }
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
    setSelectedImage([]);
    setVisibleType({ text: VISIBLE_TYPE_LIST[0].text, limitType: '' });
    setAnonymityTypes(ANONYMITY_OPTION_LIST[0].title);
  };

  const isFocused = useIsFocused();

  console.log(selectedImage);
  useEffect(() => {
    if (communityEdit.image && Boolean(communityEdit.image?.length) && isFocused) {
      const images = communityEdit.image.map((image) => image);
      setSelectedImage(images);
    } else {
      setCommunityEdit({ text: '', image: [] });
    }
  }, [isFocused]);

  const convertToKey = (value: string | PhotosInterface): Key | null | undefined => {
    if (typeof value === 'string') {
      return value;
    } else if (value && 'uri' in value) {
      return value.uri; // 'key'는 PhotosInterface의 속성이어야 합니다.
    } else {
      return undefined;
    }
  };

  const convertToString = (value: string | PhotosInterface): string | undefined => {
    if (typeof value === 'string') {
      return value;
    } else if (value && 'uri' in value) {
      return value.uri; // 'uri'는 PhotosInterface의 속성이어야 합니다.
    } else {
      return undefined;
    }
  };

  return (
    <S.CreatePostContainer>
      <CommunityHeader
        title="게시글 작성하기"
        rightContent={
          <ScaleOpacity onPress={onPost}>
            <Text size={16} color={text.length >= 1 ? theme.primary : theme.placeholder}>
              게시
            </Text>
          </ScaleOpacity>
        }
      />
      <S.CreatePostInnerContainer
        behavior="padding"
        keyboardVerticalOffset={isIos ? -10 : 0}
        enabled={isIos}
      >
        <S.CreatePostMainSection style={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={onTextInputBlur}>
            <UserSection />
          </TouchableWithoutFeedback>
          <S.CreatePostTextInput
            ref={textInputRef}
            multiline={true}
            placeholder="어떤 생각을 하고 계신가요?"
            placeholderTextColor={theme.placeholder}
            value={text}
            onChangeText={onChangeText}
            onFocus={onKeyboardShow}
            onBlur={onKeyboardHide}
            maxLength={5000}
          />
        </S.CreatePostMainSection>
        <View style={{ display: keyboardShow ? 'none' : 'flex' }}>
          <S.CreatePostImageSection>
            {(exitSelectedImage || Boolean(communityEdit.image?.length)) && (
              <NoScrollbarScrollView
                horizontal={true}
                contentContainerStyle={{
                  flexDirection: 'row',
                  columnGap: 4,
                  paddingRight: 14,
                  marginVertical: 10,
                }}
              >
                {selectedImage?.map((item, index) => (
                  <PhotoCard
                    key={`${convertToKey(item)}` + `${index}`}
                    item={convertToString(item)}
                    index={index}
                    setSelectedImage={setSelectedImage}
                    selectedImage={selectedImage}
                  />
                ))}
              </NoScrollbarScrollView>
            )}
          </S.CreatePostImageSection>
          <S.CreatePostMainSection>
            {POST_OPTION_LIST.map((props, index) => (
              <OptionCard key={index} index={index} onOptionClick={onOptionClick} {...props} />
            ))}
          </S.CreatePostMainSection>
        </View>
        <S.CreatePostIconContainer
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
        </S.CreatePostIconContainer>
      </S.CreatePostInnerContainer>
    </S.CreatePostContainer>
  );
};
