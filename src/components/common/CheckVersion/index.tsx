import React, { useEffect, useState } from 'react';
import VersionCheck from 'react-native-version-check';
import { Linking } from 'react-native';

import { isAndroid, isIos } from 'src/utils';

import { Modal } from '../Modal';
import { Button } from '../Button';

const ANDROID_STORE_URL = 'https://play.google.com/store/apps/details?id=com.hanowl.hanum';
const APP_STORE_URL = 'https://apps.apple.com/kr/app/%ED%95%9C%EC%9B%80/id6463776026?l';

export const CheckVersion: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVersionCorrect, setIsVersionCorrect] = useState<boolean>(false);

  const AppVersionCheck = async () => {
    console.log('첫진입 시작');
    //기기에 설치되 있는 버전
    const CurrentVersion = VersionCheck.getCurrentVersion();
    //앱의 최신버전
    const LatestVersion = await VersionCheck.getLatestVersion();
    console.log('LatestVersion', LatestVersion, 'CurrentVersion', CurrentVersion, isIos);

    //기기에 설치되있는 버전과 앱에 올려져있는 최신버전을 비교
    VersionCheck.needUpdate({
      currentVersion: CurrentVersion,
      latestVersion: LatestVersion,
    }).then(({ isNeeded }) => {
      setIsLoading(false);
      setIsVersionCorrect(!isNeeded);
    });
  };

  const onButtonPress = () => {
    Linking.openURL(isAndroid ? ANDROID_STORE_URL : APP_STORE_URL);
  };

  useEffect(() => {
    AppVersionCheck();
  }, []);

  if (!isLoading && !isVersionCorrect) {
    return (
      <Modal
        title="업데이트 확인"
        text={'새로운 버전이 출시되었으니, 업데이트를 진행해주세요'}
        modalVisible={true}
        button={<Button onPress={onButtonPress}>업데이트 하기</Button>}
      />
    );
  } else {
    return null;
  }
};
