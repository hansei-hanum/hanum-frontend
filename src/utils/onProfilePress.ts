import Toast from 'react-native-toast-message';

export const onProfilePress = (authorId?: number, verificationInfo?: string) => {
  console.log('verificationInfo', verificationInfo);
  if (verificationInfo) {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: `${verificationInfo}`,
    });
  } else if (authorId) {
    Toast.show({
      type: 'info',
      position: 'top',
      text1: '미인증 사용자에요',
    });
  } else {
    Toast.show({
      type: 'info',
      position: 'top',
      text1: '익명 사용자에요',
    });
  }
};
