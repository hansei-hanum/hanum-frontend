import React from 'react';

import { useRecoilValue } from 'recoil';

import { authAtom, userVerifyAtom } from 'src/atoms';
import { Button, Modal, Spinner } from 'src/components/common';
import { useModal } from 'src/hooks';
import { formattedDepartment } from 'src/utils';

export interface ConfirmModalProps {
  isLoading: boolean;
  onSubmit: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ isLoading, onSubmit }) => {
  const { isOpen, close } = useModal();
  const userVerify = useRecoilValue(userVerifyAtom);

  const authValue = useRecoilValue(authAtom);

  return (
    <Modal
      title="본인 확인"
      text={
        isLoading ? (
          <Spinner />
        ) : userVerify.isUsed ? (
          `이미 사용된 인증코드에요.`
        ) : userVerify.type === 'TEACHER' ? (
          `한세사이버보안고등학교 교직원이 맞으신가요?`
        ) : userVerify.type === 'STUDENT' ? (
          `${formattedDepartment(userVerify.department)} ${userVerify.grade}학년 ${
            userVerify.classroom
          }반 ${userVerify.number}번 학생이 맞나요?`
        ) : (
          `${authValue.errorMessage}`
        )
      }
      modalVisible={isOpen}
      button={
        authValue.errorMessage === '' && !userVerify.isUsed ? (
          <Button.Container>
            <Button onPress={close} isWhite isModalBtn>
              아니오
            </Button>
            <Button onPress={onSubmit} isModalBtn>
              예!
            </Button>
          </Button.Container>
        ) : (
          <Button onPress={close}>확인</Button>
        )
      }
    />
  );
};
