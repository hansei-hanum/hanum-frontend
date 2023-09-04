import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button, InfoBox, Text } from 'src/components';
import { useFetchUser } from 'src/hooks';
import { colors } from 'src/styles';
import { formattedDepartment } from 'src/utils';

import { UserLogo } from '../../../assets/images';

import * as S from './styled';

export const UserInfoScreen: React.FC = () => {
  const navigation = useNavigation();
  const { data, isLoading } = useFetchUser();

  const userData = data && data.data;
  const verifyUser = userData && userData.verification;
  const classRoom = verifyUser && verifyUser.classroom;
  const grade = verifyUser && verifyUser.grade;
  const department = verifyUser && verifyUser.department;
  const number = verifyUser && verifyUser.number;
  return (
    <S.UserInfoWrapper>
      {!isLoading && data && (
        <S.UserInfoContainer>
          <S.UserInfoProfileContainer>
            <TouchableOpacity activeOpacity={0.2} onPress={() => navigation.goBack()}>
              <Entypo
                name="chevron-thin-left"
                size={28}
                color="black"
                style={{ marginBottom: 10 }}
              />
            </TouchableOpacity>
            <S.UserInfoProfile>
              <S.UserInfoProfileImage
                source={userData?.profile ? { uri: userData?.profile } : UserLogo}
                style={{
                  resizeMode: 'contain',
                  borderColor: colors.lightGray,
                  borderWidth: 1,
                }}
              />
              <Text size={20} fontFamily="bold">
                {userData?.name}
              </Text>
              <Text size={15} fontFamily="medium" color={verifyUser ? colors.black : colors.danger}>
                {verifyUser
                  ? `${formattedDepartment(
                      department,
                    )} ${grade}학년 ${classRoom}반 ${number}번 재학생`
                  : `정회원 인증이 안되어 있어요.`}
              </Text>
            </S.UserInfoProfile>
            <InfoBox
              number={'010-3176-0552'}
              isVerify={data.data.verification ? true : false}
              endDate="없음"
            />
          </S.UserInfoProfileContainer>
          <S.UserInfoButtonContainer>
            <Button isSecondary>로그아웃</Button>
            <Button isDanger>회원 탈퇴하기</Button>
          </S.UserInfoButtonContainer>
        </S.UserInfoContainer>
      )}
    </S.UserInfoWrapper>
  );
};
