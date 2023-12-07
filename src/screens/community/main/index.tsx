import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  TextInput,
  Easing,
  LayoutAnimation,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@emotion/react';

import {
  CommunityHeader,
  CommunityPost,
  CommunityUserImage,
  Header,
  ScaleOpacity,
  Text,
} from 'src/components';
import { useGetImagesHeight, useGetUser, useNavigate } from 'src/hooks';
import { COMMUNITY_LIST } from 'src/constants';
import { isIos } from 'src/utils';

import * as S from './styled';

export const CommunityMainScreen: React.FC = () => {
  const navigate = useNavigate();

  const { getHeightsForImage, imageHeights } = useGetImagesHeight();

  const { userProfile } = useGetUser();

  const theme = useTheme();

  const searchRef = useRef<TextInput>(null);

  const [isSearchScreen, setIsSearchScreen] = useState(false);
  const [likes, setLikes] = useState<Array<boolean>>([]);

  const searchAnimationValue = useRef(new Animated.Value(0)).current;

  const showSearchScreen = () => {
    setIsSearchScreen(true);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(searchAnimationValue, {
      toValue: 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const closeSearchScreen = () => {
    setIsSearchScreen(false);
    searchRef.current?.blur();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const searchBarAnimation = {
    flex: searchAnimationValue.interpolate({ inputRange: [0, 1], outputRange: [1, 1] }),
  };
  const opacityAnimation = {
    opacity: searchAnimationValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
    scale: searchAnimationValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0.9] }),
  };

  const onLikeClick = (index: number) => {
    setLikes((prev) => {
      const newLikes = [...prev];
      newLikes[index] = !newLikes[index];
      return newLikes;
    });
  };

  useEffect(() => {
    COMMUNITY_LIST.forEach((item, index) => {
      item.content.image.forEach((image, i) => {
        getHeightsForImage(image, index * item.content.image.length + i);
      });
    });
  }, [COMMUNITY_LIST, getHeightsForImage]);

  return (
    <S.CommunityMainWrapper>
      <Header isRow>
        <S.CommunityMainSearchBarContainer style={searchBarAnimation}>
          <S.CommunityMainSearchBar
            placeholder="대나무숲 게시글 검색하기"
            placeholderTextColor={theme.placeholder}
            selectionColor={theme.placeholder}
            ref={searchRef}
            onFocus={showSearchScreen}
          />
          <Icon name="search" size={24} color={theme.placeholder} />
        </S.CommunityMainSearchBarContainer>
        {isSearchScreen && (
          <S.CommunityMainIconWrapper style={opacityAnimation}>
            <TouchableOpacity activeOpacity={0.8} onPress={closeSearchScreen}>
              <Icon name="close" size={30} color={theme.placeholder} />
            </TouchableOpacity>
          </S.CommunityMainIconWrapper>
        )}
      </Header>
      {!isSearchScreen ? (
        <FlatList
          data={COMMUNITY_LIST}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingTop: isIos ? 20 : 0, paddingBottom: 40, rowGap: 16 }}
          ListHeaderComponent={
            <S.CommunityUserContainer>
              <CommunityUserImage userImage={userProfile} />
              <S.CommunityUserThinkBox>
                <Text size={16} color={theme.placeholder}>
                  어떤 생각을 하고 계신가요?
                </Text>
              </S.CommunityUserThinkBox>
            </S.CommunityUserContainer>
          }
          renderItem={({ item: { author, type, time, content }, index }) => (
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('CommunityChat')}>
              <S.CommunityMainBox>
                <CommunityHeader
                  author={author}
                  type={type}
                  time={time}
                  style={{ width: '100%' }}
                />
                <CommunityPost
                  author={author}
                  content={content}
                  time={time}
                  type={type}
                  index={index}
                  imageHeights={imageHeights}
                />
                <S.CommunityMainBottom>
                  <ScaleOpacity onPress={() => onLikeClick(index)}>
                    <S.CommunityMainBottomIconContainer>
                      {likes[index] ? (
                        <MCI name="cards-heart" size={24} color={theme.danger} />
                      ) : (
                        <MCI name="cards-heart-outline" size={24} color={theme.placeholder} />
                      )}
                      <Text size={14} color={theme.placeholder}>
                        좋아요 {likes[index] ? content.likes + 1 : content.likes}
                      </Text>
                    </S.CommunityMainBottomIconContainer>
                  </ScaleOpacity>
                  <ScaleOpacity onPress={() => navigate('CommunityChat')}>
                    <S.CommunityMainBottomIconContainer>
                      <Icon name="chatbubble-outline" size={24} color={theme.placeholder} />
                      <Text size={14} color={theme.placeholder}>
                        댓글 {content.comments}
                      </Text>
                    </S.CommunityMainBottomIconContainer>
                  </ScaleOpacity>
                </S.CommunityMainBottom>
              </S.CommunityMainBox>
            </TouchableOpacity>
          )}
        />
      ) : (
        <S.TextWrapper2 style={opacityAnimation}>
          <Text size={15}>This Is Search 잉기</Text>
        </S.TextWrapper2>
      )}
    </S.CommunityMainWrapper>
  );
};

// import React, { useEffect, useState } from 'react';
// import {
//   Dimensions,
//   FlatList,
//   Image,
//   PermissionsAndroid,
//   Platform,
//   SafeAreaView,
//   Text,
//   View,
// } from 'react-native';
// import RNFS from 'react-native-fs';

// import {
//   CameraRoll,
//   GetPhotosParams,
//   AssetType,
//   PhotoIdentifier,
// } from '@react-native-camera-roll/camera-roll';

// import { isAndroid, isIos } from 'src/utils';

// export const CommunityMainScreen = () => {
//   const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
//   async function hasAndroidPermission() {
//     const getCheckPermissionPromise = () => {
//       if (+Platform.Version >= 33) {
//         return Promise.all([
//           PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
//           PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
//         ]).then(
//           ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
//             hasReadMediaImagesPermission && hasReadMediaVideoPermission,
//         );
//       } else {
//         return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
//       }
//     };

//     const hasPermission = await getCheckPermissionPromise();
//     if (hasPermission) {
//       return true;
//     }
//     const getRequestPermissionPromise = () => {
//       if (+Platform.Version >= 33) {
//         return PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//           PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
//         ]).then(
//           (statuses) =>
//             statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
//               PermissionsAndroid.RESULTS.GRANTED &&
//             statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
//               PermissionsAndroid.RESULTS.GRANTED,
//         );
//       } else {
//         return PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         ).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
//       }
//     };

//     return await getRequestPermissionPromise();
//   }

//   async function savePicture() {
//     if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
//       return;
//     }

//     CameraRoll.getPhotos({
//       first: 20,
//       assetType: 'Photos',
//     })
//       .then((r) => {
//         setPhotos(r.edges);
//         console.log(
//           r.edges.map((item) => item.node.image.uri),
//           'noe',
//         );
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   useEffect(() => {
//     savePicture();
//   }, []);

//   return (
//     <SafeAreaView>
//       <View style={{ borderColor: 'red', borderWidth: 1, flexDirection: 'row' }}>
//         {photos.map((item) => (
//           <Image
//             key={item.node.image.uri}
//             source={{ uri: item.node.image.uri }}
//             style={{ width: 100, height: 100, borderColor: 'blue', borderWidth: 1 }}
//           />
//         ))}
//       </View>
//     </SafeAreaView>
//   );
// };
