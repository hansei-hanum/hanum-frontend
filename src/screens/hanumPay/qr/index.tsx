import React, { useEffect, useState } from 'react';
import { BarCodeReadEvent } from 'react-native-camera';
import { PERMISSIONS } from 'react-native-permissions';
import { Linking } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button, DummyContainer, HanumPayHeader, Modal, QRScanner, Text } from 'src/components';
import { colors } from 'src/styles';

import * as S from './styled';

export const HanumPayQRScreen: React.FC = () => {
  const permissionNotfound =
    PERMISSIONS.ANDROID.CAMERA === undefined || PERMISSIONS.IOS.CAMERA === undefined;

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  /** 바코드가 감지되면 실행되는 함수 */
  const onSuccess = ({ data }: BarCodeReadEvent) => {
    console.log(data);
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  useEffect(() => {
    if (permissionNotfound) {
      setModalVisible(true);
    }
  }, [PERMISSIONS]);

  return (
    <S.HanumPayQRWrapper>
      <S.HanumPayQRHeaderWrapper>
        <HanumPayHeader title="결제하기" />
      </S.HanumPayQRHeaderWrapper>
      {permissionNotfound ? (
        <S.HanumPayQRBoxWrapper>
          <S.HanumPayQRBoxContainer>
            <Text.Column>
              <Text size={16} isCenter color={colors.white}>
                한움페이 결제 QR코드를 {'\n'}아래 상자에 맞춰주세요
              </Text>
            </Text.Column>
            <S.HanumPayQrBox>
              <S.HanumPayQrBoxContainer>
                <S.HanumPayQRBoxLeftTop />
                <S.HanumPayQRBoxRightTop />
              </S.HanumPayQrBoxContainer>
              <S.HanumPayQrBoxContainer>
                <S.HanumPayQRBoxLeftBottom />
                <S.HanumPayQRBoxRightBottom />
              </S.HanumPayQrBoxContainer>
            </S.HanumPayQrBox>
          </S.HanumPayQRBoxContainer>
        </S.HanumPayQRBoxWrapper>
      ) : (
        <QRScanner onSuccess={onSuccess} />
      )}
      {modalVisible && (
        <>
          <DummyContainer />
          <Modal
            title="카메라 접근 권한 설정"
            text={
              '한움페이 결제 기능을 사용하려면\n' + 'QR 스캔을 위해 카메라 접근 권한이 필요해요.'
            }
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
        </>
      )}
    </S.HanumPayQRWrapper>
  );
};
