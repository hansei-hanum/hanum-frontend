import React, { useEffect, useState } from 'react';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { Linking } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button, HanumPayHeader, Modal, QRScanner, QRScannerBox } from 'src/components';
import { colors } from 'src/styles';
import { useNavigate } from 'src/hooks';

import * as S from './styled';

export const TeacherVerifyScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const navigation = useNavigation();
  const navigate = useNavigate();

  /** 바코드가 감지되면 실행되는 함수 */
  const onSuccess = () => {
    navigate('Name');
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  useEffect(() => {
    request(PERMISSIONS.ANDROID.CAMERA || PERMISSIONS.IOS.CAMERA).then((result) => {
      if (
        result === RESULTS.DENIED ||
        result === RESULTS.BLOCKED ||
        result === RESULTS.UNAVAILABLE
      ) {
        setModalVisible(true);
      }
    });
  }, []);

  return (
    <>
      <S.TeacherVerifyWrapper>
        <S.TeacherVerifyHeaderWrapper>
          <HanumPayHeader title="교직원 인증" />
        </S.TeacherVerifyHeaderWrapper>
        {modalVisible ? (
          <QRScannerBox.Permission>
            <QRScannerBox />
          </QRScannerBox.Permission>
        ) : (
          <QRScanner onSuccess={onSuccess} />
        )}
      </S.TeacherVerifyWrapper>
      {modalVisible && (
        <Modal
          title="카메라 접근 권한 설정"
          text={'교직원 회원가입을 진행하시려면\n' + 'QR 스캔을 위해 카메라 접근 권한이 필요해요.'}
          button={
            <Button.Container>
              <Button
                onPress={closeModal}
                isModalBtn
                backgroundColor={colors.secondary}
                textColor={colors.black}
              >
                취소
              </Button>
              <Button
                onPress={() => {
                  Linking.openSettings();
                }}
                isModalBtn
              >
                설정
              </Button>
            </Button.Container>
          }
          modalVisible={true}
        />
      )}
    </>
  );
};
