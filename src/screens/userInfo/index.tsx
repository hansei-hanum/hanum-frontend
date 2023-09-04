import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button, DummyContainer, InfoBox, Modal, Text } from 'src/components';
import { useFetchUser, useNavigate } from 'src/hooks';
import { colors } from 'src/styles';
import { formattedDepartment } from 'src/utils';

import { UserLogo } from '../../../assets/images';

import * as S from './styled';

export const UserInfoScreen: React.FC = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { data, isLoading } = useFetchUser();
  const [isSecessionClick, setIsSecessionClick] = useState<boolean>(false);

  const userData = data && data.data;
  const verifyUser = userData && userData.verification;
  const classRoom = verifyUser && verifyUser.classroom;
  const grade = verifyUser && verifyUser.grade;
  const department = verifyUser && verifyUser.department;
  const number = verifyUser && verifyUser.number;

  const onLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigate('AuthMain');
  };

  const onSubmit = () => {
    setIsSecessionClick(false);
    console.log('submit');
  };

  return (
    <>
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
                <Text
                  size={15}
                  fontFamily="medium"
                  color={verifyUser ? colors.black : colors.danger}
                >
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
              <Button isSecondary onPress={onLogout}>
                로그아웃
              </Button>
              <Button isDanger onPress={() => setIsSecessionClick(true)}>
                회원 탈퇴하기
              </Button>
            </S.UserInfoButtonContainer>
          </S.UserInfoContainer>
        )}
      </S.UserInfoWrapper>
      {isSecessionClick && (
        <>
          <DummyContainer />
          <Modal
            title="회원 탈퇴하기"
            text={`회원 탈퇴를 진행하면 즉시 모든 한움 서비스의 제공이 중단되고, 모든 개인정보는 즉시 파기됩니다. 이에 따라 그동안 이용하셨던 한움 서비스는 다음과 같이 처리됩니다.
              \n- 작성한 대나무숲 글은 모두 삭제됩니다. \n- 한움페이의 모든 잔액은 즉시 소멸됩니다. \n- 사용한 재학생 인증 코드는 복구되지 않으며, 추후 동일 코드로 재가입하실 수 없습니다. 
              \n회원탈퇴를 진행하면 위와 같은 사항에 동의하신 것으로 간주되며, “회원탈퇴" 버튼을 누르신 순간 이 결정은 돌이킬 수 없게 됩니다.
              \n정말로 계속하시겠습니까?`}
            modalVisible={isSecessionClick}
            button={
              <S.UserInfoModalButtonContainer>
                <Button onPress={() => setIsSecessionClick(false)} isSecondary isModalBtn>
                  취소
                </Button>
                <Button onPress={onSubmit} isModalBtn isDanger>
                  회원 탈퇴
                </Button>
              </S.UserInfoModalButtonContainer>
            }
          />
        </>
      )}
    </>
  );
};
