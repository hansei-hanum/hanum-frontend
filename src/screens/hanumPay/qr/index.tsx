import React, { useEffect, useState } from 'react';
import { BarCodeReadEvent } from 'react-native-camera';
import { PERMISSIONS } from 'react-native-permissions';
import { Linking } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';

import {
  Button,
  DummyContainer,
  HanumPayHeader,
  Modal,
  QRScanner,
  QRScannerBox,
} from 'src/components';
import { colors } from 'src/styles';
import { boothState } from 'src/atoms';

import * as S from './styled';

export const HanumPayQRScreen: React.FC = () => {
  const permissionNotfound =
    PERMISSIONS.ANDROID.CAMERA === undefined || PERMISSIONS.IOS.CAMERA === undefined;

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const setBooth = useSetRecoilState(boothState);

  const navigation = useNavigation();

  /** 바코드가 감지되면 실행되는 함수 */
  const onSuccess = ({ data }: BarCodeReadEvent) => {
    setBooth(JSON.parse(data));
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
        <QRScannerBox.Permission>
          <QRScannerBox />
        </QRScannerBox.Permission>
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
