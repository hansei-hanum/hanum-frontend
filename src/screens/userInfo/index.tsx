import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button, DummyContainer, InfoBox, Modal, Text } from 'src/components';
import { useDisConnectNotification, useGetUser, useNavigate } from 'src/hooks';
import { colors } from 'src/styles';
import { UserLogo } from 'src/assets/';

import * as S from './styled';

export const UserInfoScreen: React.FC = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { mutate } = useDisConnectNotification();
  const [isSecessionClick, setIsSecessionClick] = useState<boolean>(false);

  const { userData, userProfile, verifyUser, formatUser, userType } = useGetUser();

  const formattedDate = (date: string | null) => {
    return date && date.split('T')[0];
  };

  const formattedPhone = (phone: string) => {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  const onLogout = async () => {
    await AsyncStorage.removeItem('token');
    mutate;
    navigate('AuthMain');
  };

  const onSubmit = () => {
    setIsSecessionClick(false);
    navigate('Main');
  };

  return (
    <>
      <S.UserInfoWrapper>
        {userData && (
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
                  {userData.name}
                </Text>
                <Text
                  size={15}
                  fontFamily="medium"
                  color={verifyUser ? colors.black : colors.danger}
                >
                  {verifyUser ? `${formatUser()}` : '정회원 인증 안 됨'}
                </Text>
              </S.UserInfoProfile>
              <InfoBox
                number={formattedPhone(userData.phone)}
                isVerify={verifyUser ? userType() : ''}
                endDate={verifyUser ? formattedDate(verifyUser.valid_until) : '없음'}
              />
            </S.UserInfoProfileContainer>
            <S.UserInfoButtonContainer>
              <Button
                backgroundColor={colors.secondary}
                textColor={colors.black}
                onPress={onLogout}
              >
                로그아웃
              </Button>
              <Button backgroundColor={colors.danger} onPress={() => setIsSecessionClick(true)}>
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
            title="탈퇴 절차 안내"
            text={`이 계정은 탈퇴하기 전에 확인할 사항이 있어요.\n이 계정을 탈퇴하기 위해선 메인 페이지 > 문의하기를 통해 문의해주세요.`}
            modalVisible={isSecessionClick}
            button={<Button onPress={onSubmit}>확인</Button>}
          />
        </>
      )}
    </>
  );
};
