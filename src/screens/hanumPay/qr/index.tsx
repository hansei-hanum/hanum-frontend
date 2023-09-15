import React, { useEffect, useState } from 'react';
import { BarCodeReadEvent } from 'react-native-camera';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';
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
    const checkCameraPermission = async () => {
      console.log('checkCameraPermission');
      const result = await check(PERMISSIONS.ANDROID.CAMERA);

      switch (result) {
        case RESULTS.UNAVAILABLE:
          setModalVisible(true);
          console.log('This feature is not available (on this device / in this context)');
          break;
        case RESULTS.DENIED:
          setModalVisible(true);
          console.log('The permission has not been requested / is denied but requestable');
          break;
        case RESULTS.LIMITED:
          setModalVisible(true);
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.BLOCKED:
          setModalVisible(true);
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    };
    checkCameraPermission();
  }, []);

  return (
    <S.HanumPayQRWrapper>
      <S.HanumPayQRHeaderWrapper>
        <HanumPayHeader title="결제하기" />
      </S.HanumPayQRHeaderWrapper>
      {modalVisible ? (
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
