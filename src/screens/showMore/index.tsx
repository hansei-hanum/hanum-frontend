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

  const verifyUser = data?.data.verification;
  const classRoom = verifyUser && verifyUser.classroom;
  const grade = verifyUser && verifyUser.grade;
  const department = verifyUser && verifyUser.department;
  const number = verifyUser && verifyUser.number;

  const formattedDepartment = () => {
    switch (department) {
      case 'CLOUD_SECURITY':
        return '클라우드보안과';
      case 'NETWORK_SECURITY':
        return '네트워크보안과';
      case 'METAVERSE_GAME':
        return '메타버스게임과';
      case 'GAME':
        return '게임과';
    }
  };

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
                    {verifyUser
                      ? `${formattedDepartment()} ${grade}학년 ${classRoom}반 ${number}번 재학생`
                      : `정회원 인증이 안되어 있어요.`}
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
