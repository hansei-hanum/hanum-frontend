import { useState } from 'react';

import { useRecoilValue } from 'recoil';

import { authState } from 'src/atoms';
import { Button, Modal, TextFieldForm } from 'src/components';

export const PhoneScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const auth = useRecoilValue(authState);

  if (auth.errorModal.ratedLimit || auth.errorModal.externalApi) {
    setModalVisible(true);
  }

  const message = auth.errorModal.ratedLimit
    ? '동일 IP로 인증을 수차례 요청하여 해당 네트워크에서의 메시지 발송 요청이 일시적으로 차단되었습니다.'
    : '메시지 발송 서버가 응답하지 않아 메시지를 발송할 수 없습니다.';

  return (
    <>
      {modalVisible && (
        <Modal
          title="에러"
          text={message}
          modalVisible={modalVisible}
          button={
            <Button
              onPress={() => {
                setModalVisible(false);
              }}
              isModalBtn
            >
              예!
            </Button>
          }
        />
      )}{' '}
      <TextFieldForm title="전화번호를 알려주세요" placeHolder="전화번호" />
    </>
  );
};
