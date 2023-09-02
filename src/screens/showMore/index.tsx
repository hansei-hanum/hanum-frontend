import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Text, Section } from 'src/components';
import { colors } from 'src/styles';
import { useFetchUser, useNavigate, usePressingAnimation } from 'src/hooks';
import { checkHeight, iosCheckHeight } from 'src/utils';

import { UserLogo } from '../../../assets/images';

import * as S from './styled';

export const ShowMoreScreen: React.FC = () => {
  const navigate = useNavigate();
  const { handlePressIn, handlePressOut, animatedStyle } = usePressingAnimation();
  const { data, isLoading } = useFetchUser();
  console.log(data);

  const verifyUser = data?.data.verification;

  return (
    <S.ShowMoreScreenContainer
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: iosCheckHeight ? 70 : checkHeight ? 26 : 46,
        paddingBottom: 40,
        paddingLeft: 10,
        paddingRight: 10,
        rowGap: 16,
      }}
    >
      {!isLoading && data && (
        <>
          <S.ShowMoreHeaderScreen>
            <Text size={20} fontFamily="bold">
              더 보기
            </Text>
          </S.ShowMoreHeaderScreen>
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
            onPress={() => navigate('UserInformation')}
          >
            <S.ShowMoreUserContainer style={[animatedStyle]}>
              <S.ShowMoreUserInfo>
                <S.ShowMoreUserImage
                  source={data.data.profile ? data.data.profile : UserLogo}
                  style={{
                    resizeMode: 'contain',
                    borderColor: colors.lightGray,
                    borderWidth: 1,
                  }}
                />
                <S.ShowMoreUserNameContainer>
                  <Text size={18} fontFamily="bold">
                    {data.data.name}
                  </Text>
                  <Text
                    size={14}
                    fontFamily="medium"
                    color={verifyUser ? colors.black : colors.danger}
                  >
                    {verifyUser ? '인증된 사용자' : '정회원 인증 안 됨'}
                  </Text>
                </S.ShowMoreUserNameContainer>
              </S.ShowMoreUserInfo>
              <MaterialIcons name="chevron-right" size={30} color={colors.placeholder} />
            </S.ShowMoreUserContainer>
          </TouchableOpacity>
          <Section />
        </>
      )}
    </S.ShowMoreScreenContainer>
  );
};
