import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button, DummyContainer, InfoBox, Modal, Text } from 'src/components';
import { useGetUser, useNavigate } from 'src/hooks';
import { colors } from 'src/styles';

import { UserLogo } from '../../../assets/images';

import * as S from './styled';

export const UserInfoScreen: React.FC = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [isSecessionClick, setIsSecessionClick] = useState<boolean>(false);

  const { userLoading, userData, userProfile, verifyUser, formatUser } = useGetUser();

  const onLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigate('AuthMain');
  };

  const onSubmit = () => {
    setIsSecessionClick(false);
    navigate('Main');
  };

  return (
    <>
      <S.UserInfoWrapper>
        {!userLoading && userData && (
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
                  source={userProfile ? { uri: userProfile } : UserLogo}
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
                  {/* {verifyUser
                    ? `${formatUser({ type, department, graduated_at, grade, classRoom, number })}`
                    : `정회원 인증이 안되어 있어요.`} */}
                  {verifyUser ? `${formatUser()}` : '정회원 인증이 안되어 있어요.'}
                </Text>
              </S.UserInfoProfile>
              <InfoBox
                number={'010-3176-0552'}
                isVerify={verifyUser ? true : false}
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
            text={`탈퇴를 진행하려면 메인 페이지에서 지원을 요청해주세요`}
            modalVisible={isSecessionClick}
            button={
              <S.UserInfoModalButtonContainer>
                <Button onPress={() => setIsSecessionClick(false)} isSecondary isModalBtn>
                  취소
                </Button>
                <Button onPress={onSubmit} isModalBtn isDanger>
                  확인
                </Button>
              </S.UserInfoModalButtonContainer>
            }
          />
        </>
      )}
    </>
  );
};
