import React, { useState } from "react";
import * as S from "./styled";
import { Button, HanumPayHeader, Modal, QRScanner, QRScannerBox } from "src/components";
import { Linking } from "react-native";
import { colors } from "src/styles";
import { useNavigation } from "@react-navigation/native";

export const EoullimRaffleScreen:React.FC = () => {
  const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    
    const closeModal = () => {
        setModalVisible(false);
        navigation.goBack();
    };
    return(
        <>
      <S.EoullimRaffleWrapper>
        <S.EoullimRaffleHeaderWrapper>
          <HanumPayHeader title="추첨번호 받기" />
        </S.EoullimRaffleHeaderWrapper>
        {modalVisible ? (
          <QRScannerBox.Permission>
            <QRScannerBox qrName='추첨번호 받기' />
          </QRScannerBox.Permission>
        ) : (
          <QRScanner onSuccess={() => {console.log('wqre')}} qrName='리플렛에 있는' />
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
    )
}