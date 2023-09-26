import { useNavigation } from '@react-navigation/native';

import { Modal } from '../Modal';
import { Button } from '../Button';

export interface AuthFailedModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthFailedModal: React.FC<AuthFailedModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const navigation = useNavigation();
  return (
    <Modal
      modalVisible={modalVisible}
      title="인증 실패"
      text={
        `이 서비스는 인증된 사용자만 이용할 수 있어요.\n` +
        `만약 인증된 사용자라면 프로필에서 인증을 진행하고 다시 시도해보세요.`
      }
      button={
        <Button
          onPress={() => {
            navigation.goBack(), setModalVisible(false);
          }}
        >
          확인
        </Button>
      }
    />
  );
};
