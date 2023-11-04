/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { Linking } from 'react-native';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSetRecoilState } from 'recoil';

import {
  AuthFailedModal,
  Button,
  HanumPayHeader,
  Modal,
  QRScanner,
  QRScannerBox,
} from 'src/components';
import { colors } from 'src/styles';
import { boothAtom } from 'src/atoms';
import { useCheckUserType, useNavigate } from 'src/hooks';

import * as S from './styled';

export const HanumPayQRScreen: React.FC = () => {
  const [cameraModal, setCameraModal] = useState<boolean>(false);
  const setBooth = useSetRecoilState(boothAtom);
  const { verifyUser, modalVisible, setModalVisible } = useCheckUserType();

  const navigation = useNavigation();
  const navigate = useNavigate();

  /** 바코드가 감지되면 실행되는 함수 */
  const onSuccess = ({ data }: any) => {
    try {
      data = JSON.parse(data);
      if (typeof data.id === 'number' && typeof data.name === 'string') {
        setBooth({
          id: data.id,
          name: data.name,
        });
        navigate('HanumPay');
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const closeModal = () => {
    setCameraModal(false);
    navigation.goBack();
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    request(PERMISSIONS.ANDROID.CAMERA || PERMISSIONS.IOS.CAMERA).then((result) => {
      if (result !== RESULTS.GRANTED) {
        setCameraModal(true);
      }
    });
  }, [isFocused]);

  if (verifyUser) {
    return (
      <>
        <S.HanumPayQRWrapper>
          <S.HanumPayQRHeaderWrapper>
            <HanumPayHeader title="결제하기" />
          </S.HanumPayQRHeaderWrapper>
          {cameraModal ? (
            <QRScannerBox.Permission>
              <QRScannerBox qrName={'결제'} />
            </QRScannerBox.Permission>
          ) : isFocused ? (
            <QRScanner onSuccess={onSuccess} qrName={'결제'} />
          ) : null}
        </S.HanumPayQRWrapper>
        {cameraModal && (
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
        )}
      </>
    );
  } else {
    return (
      <>
        <S.HanumPayQRWrapper>
          <S.HanumPayQRHeaderWrapper>
            <HanumPayHeader title="결제하기" />
          </S.HanumPayQRHeaderWrapper>
        </S.HanumPayQRWrapper>
        <AuthFailedModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </>
    );
  }
};
