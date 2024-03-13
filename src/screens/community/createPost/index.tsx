import React, { Key, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import { useIsFocused } from '@react-navigation/native';

import { useTheme } from '@emotion/react';
import { useRecoilState, useRecoilValue } from 'recoil';

import {
  ScreenHeader,
  PhotoCard,
  OptionCard,
  ScaleOpacity,
  Text,
  NoScrollbarScrollView,
  PhotosInterface,
  Spinner,
} from 'src/components';
import { useBlockGesture, useCreatePost, useEditPost, useGetUser, useNavigate } from 'src/hooks';
import { UserLogo } from 'src/assets';
import {
  ANONYMITY_OPTION_LIST,
  POST_OPTION_LIST,
  PostOptionEnum,
  VISIBLE_TYPE_LIST,
} from 'src/constants';
import { anonymityTypeAtom, communityEditAtom, visibleTypeAtom } from 'src/atoms';
import { formatVisibleType, isIos } from 'src/utils';
import { LimitedArticleScopeOfDisclosure } from 'src/api';

import * as S from './styled';

const UserSection: React.FC = () => {
  const anonymityType = useRecoilValue(anonymityTypeAtom);
  const theme = useTheme();

  const { userProfile, userData } = useGetUser();

  const visibleType = useRecoilValue(visibleTypeAtom);

  return (
    <S.UserSectionContainer>
      <S.UserSectionImage
        resizeMode="contain"
        source={userProfile ? { uri: userProfile } : UserLogo}
      />
      <View style={{ rowGap: 2 }}>
        <Text size={16}>
          {anonymityType.nickname
            ? anonymityType.nickname
            : anonymityType.type === '익명으로 표시'
              ? '익명'
              : userData?.name}
        </Text>
        <S.VisibleTypeContainer>
          {visibleType === LimitedArticleScopeOfDisclosure.Public ? (
            <MI name="public" size={16} color={theme.white} />
          ) : visibleType === LimitedArticleScopeOfDisclosure.Peer ? (
            <MCI name="account-group" size={16} color={theme.white} />
          ) : (
            <MI name="lock" size={16} color={theme.white} />
          )}
          <Text size={12} color={theme.white} fontFamily="bold">
            {formatVisibleType(visibleType)}
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

  const { mutate, isLoading } = useCreatePost();
  const { mutate: editPostMutate, isLoading: isEditPostLoading } = useEditPost();

  const navigate = useNavigate();

  const textInputRef = useRef<TextInput>(null);

  const theme = useTheme();

  const [text, setText] = useState<string>(communityEdit.text);
  const [selectedImage, setSelectedImage] = useState<PhotosInterface[] | string[]>([]);

  const [keyboardShow, setKeyboardShow] = useState<boolean>(false);

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
    if (selectedImage.length >= 5) {
      Toast.show({ type: 'error', text1: '이미지는 5장까지만 업로드 가능해요' });
      return;
    } else {
      const options = {
        mediaType: 'photo' as MediaType,
        includeBase64: true,
        maxHeight: 2000,
        maxWidth: 2000,
        selectionLimit: 5,
      };
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('Image picker error: ', response.errorMessage);
        } else {
          const imageUri = response.assets?.map((item) => item.uri);
          const imageName = response.assets?.map((item) => item.fileName);
          const imageType = response.assets?.map((item) => item.type);
          const images = imageUri?.map((uri, index) => ({
            uri,
            name: imageName?.[index] || '',
            type: imageType?.[index] || '',
          }));
          setSelectedImage([
            ...(selectedImage as PhotosInterface[]),
            ...(images as PhotosInterface[]),
          ]);
        }
      });
    }
  };

  const onPhotoPres = (index: number) => {
    if (Boolean(communityEdit.images?.length)) {
      setCommunityEdit({
        ...communityEdit,
        images: communityEdit.images?.filter((_, i) => i !== index),
      });
    }
    setSelectedImage(selectedImage?.filter((_, i) => i !== index) as string[]);
  };

  const onKeyboardShow = () => {
    setKeyboardShow(true);
  };

  const onKeyboardHide = () => {
    setKeyboardShow(false);
  };

  const onPost = () => {
    if (communityEdit.id) {
      editPostMutate({
        id: communityEdit.id,
        content: text,
        attachments: selectedImage as PhotosInterface[],
        keepAttachments: communityEdit.images?.map((image) => image.id),
      });
    } else {
      mutate({
        isAnonymous: anonymityType.type === '실명 표시' ? false : true,
        author:
          anonymityType.type === '닉네임 사용' && anonymityType.nickname !== ''
            ? anonymityType.nickname
            : undefined,
        content: text,
        scopeOfDisclosure: visibleType,
        attachments: selectedImage as PhotosInterface[],
      });
    }
  };

  const isFocused = useIsFocused();
  const blockGesture = useBlockGesture(isLoading || isEditPostLoading);

  useEffect(() => {
    if (communityEdit.images && Boolean(communityEdit.images?.length) && isFocused) {
      const images = communityEdit.images.map((image) => image.uri);
      setSelectedImage(images);
    }
    blockGesture;
  }, [isFocused]);

  const convertToKey = (value: string | PhotosInterface): Key | null | undefined => {
    if (typeof value === 'string') {
      return value;
    } else if (value && 'uri' in value) {
      return value.uri;
    } else {
      return undefined;
    }
  };

  const convertToString = (value: string | PhotosInterface): string | undefined => {
    if (typeof value === 'string') {
      return value;
    } else if (value && 'uri' in value) {
      return value.uri;
    } else {
      return undefined;
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setText('');
      setSelectedImage([]);
      setVisibleType(VISIBLE_TYPE_LIST[0].text);
      setAnonymityTypes({ type: ANONYMITY_OPTION_LIST[0].title });
    }
  }, [isLoading]);

  return (
    <S.CreatePostContainer>
      <ScreenHeader
        isLoading={isLoading || isEditPostLoading}
        title={`게시글 ${communityEdit.id ? '수정' : '작성'}하기`}
        rightContent={
          isLoading || isEditPostLoading ? (
            <Spinner size={24} color={theme.primary} />
          ) : (
            <ScaleOpacity onPress={onPost}>
              <Text size={16} color={text.length >= 1 ? theme.primary : theme.placeholder}>
                게시
              </Text>
            </ScaleOpacity>
          )
        }
      />
      <S.CreatePostInnerContainer behavior="padding" enabled={isIos}>
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
            {(exitSelectedImage || Boolean(communityEdit.images?.length)) && (
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
                    onPress={() => onPhotoPres(index)}
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
      </S.CreatePostInnerContainer>
    </S.CreatePostContainer>
  );
};
