import React, { useEffect, useState } from 'react';
import VersionCheck from 'react-native-version-check';
import { Linking } from 'react-native';

import { isAndroid } from 'src/utils';

import { Modal } from '../Modal';
import { Button } from '../Button';
import { Text } from '../Text';

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

    //기기에 설치되있는 버전과 앱에 올려져있는 최신버전을 비교
    VersionCheck.needUpdate({
      currentVersion: CurrentVersion,
      latestVersion: LatestVersion,
    }).then((res) => {
      setIsLoading(false);
      setIsVersionCorrect(!res.isNeeded);
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
        title="업데이트 안내"
        linkText={
          <Text size={16} isCenter>
            {isAndroid ? 'Google Play' : 'App Store'}에 필수 업데이트가 있어요{'\n'}
            앱을 사용하려면 업데이트를 진행해 주세요
          </Text>
        }
        modalVisible={true}
        button={<Button onPress={onButtonPress}>업데이트 하기</Button>}
      />
    );
  } else {
    return null;
  }
};
