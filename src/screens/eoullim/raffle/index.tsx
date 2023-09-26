/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Linking } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Button, HanumPayHeader, Modal, QRScanner, QRScannerBox } from 'src/components';
import { colors } from 'src/styles';
import { useLuckyDraw } from 'src/hooks/query/eoullim/useLuckyDraw';
import { useNavigate } from 'src/hooks';

import * as S from './styled';

export const EoullimRaffleScreen: React.FC = () => {
  const { mutate } = useLuckyDraw();
  const navigation = useNavigation();

  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onSucess = (data: any) => {
    console.log(data, 'asdf'); //  url 들어간거는 나오는데 text data는 안나옴
    try {
      // if (typeof data.data === 'string' && data.data.length === 5) {
      //   mutate({ token: 'HELLOO' });
      //   navigate('EoullimStatus');
      // } else {
      //   return null;
      // }
      mutate({ token: 'HELLOO' });
      navigate('EoullimStatus');
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };
  return (
    <>
      <S.EoullimRaffleWrapper>
        <S.EoullimRaffleHeaderWrapper>
          <HanumPayHeader title="추첨번호 받기" />
        </S.EoullimRaffleHeaderWrapper>
        {modalVisible ? (
          <QRScannerBox.Permission>
            <QRScannerBox qrName="추첨번호 받기" />
          </QRScannerBox.Permission>
        ) : (
          <QRScanner onSuccess={onSucess} qrName="리플렛에 있는" reactivate={false} />
        )}
      </S.EoullimRaffleWrapper>
      {modalVisible && (
        <Modal
          title="카메라 접근 권한 설정"
          text={'추첨번호를 받으시려면\n' + 'QR 스캔을 위해 카메라 접근 권한이 필요해요.'}
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
