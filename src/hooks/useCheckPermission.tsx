import { useCallback, useState } from 'react';
import { Platform, TextInput } from 'react-native';
import Permissions, { PERMISSIONS } from 'react-native-permissions';

import { PhotoPermissionProps } from 'src/screens';
import { RPH } from 'src/utils';
import { BottomSheetRefProps } from 'src/types';

import { isAndroid, isIos } from '../utils/checkOs';

const HAS_PERMISSION_SCROLL_HEIGHT = -RPH(70);
const NO_PERMISSION_SCROLL_HEIGHT = -RPH(38);

export const status = {
  isAllGranted: { granted: true, limited: true },
  isBlocked: { granted: false, limited: false },
  isGranted: { granted: true, limited: false },
  isLimited: { granted: false, limited: true },
};

export interface CheckPermissionProps {
  ImageListBottomSheetRef: React.RefObject<BottomSheetRefProps>;
  commentInputRef: React.RefObject<TextInput>;
}

export const useCheckPhotoPermission = ({
  ImageListBottomSheetRef,
  commentInputRef,
}: CheckPermissionProps) => {
  const [permission, setPermission] = useState<PhotoPermissionProps>({
    granted: false,
    limited: false,
  });

  const permissionHeight =
    permission.granted || permission.limited
      ? HAS_PERMISSION_SCROLL_HEIGHT
      : NO_PERMISSION_SCROLL_HEIGHT;

  const openImageBottomSheet = useCallback(({ granted, limited }: PhotoPermissionProps) => {
    const isActive = ImageListBottomSheetRef?.current?.isActive();
    if (isActive) {
      ImageListBottomSheetRef?.current?.scrollTo(0);
    } else {
      ImageListBottomSheetRef?.current?.scrollTo(
        granted || limited ? HAS_PERMISSION_SCROLL_HEIGHT : NO_PERMISSION_SCROLL_HEIGHT,
      );
    }
    commentInputRef.current?.blur();
  }, []);

  const checkAndroidPermissions = useCallback(async () => {
    if (parseInt(Platform.Version as string, 10) >= 33) {
      const permissions = await Permissions.checkMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);
      if (
        permissions[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === Permissions.RESULTS.GRANTED &&
        permissions[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.GRANTED
      ) {
        setPermission(status.isGranted);
        openImageBottomSheet(status.isGranted);
        return;
      }
      const res = await Permissions.requestMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === Permissions.RESULTS.GRANTED &&
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.GRANTED
      ) {
        setPermission(status.isGranted);
        openImageBottomSheet(status.isGranted);
      }
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === Permissions.RESULTS.DENIED ||
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.DENIED
      ) {
        checkAndroidPermissions();
      }
      if (
        res[PERMISSIONS.ANDROID.READ_MEDIA_IMAGES] === Permissions.RESULTS.BLOCKED ||
        res[PERMISSIONS.ANDROID.READ_MEDIA_VIDEO] === Permissions.RESULTS.BLOCKED
      ) {
        setPermission(status.isBlocked);
        openImageBottomSheet(status.isBlocked);
      }
    } else {
      const permission = await Permissions.check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (permission === Permissions.RESULTS.GRANTED) {
        setPermission(status.isGranted);
        openImageBottomSheet(status.isGranted);
        return;
      }
      const res = await Permissions.request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (res === Permissions.RESULTS.GRANTED) {
        setPermission(status.isGranted);
        openImageBottomSheet(status.isGranted);
      }
      if (res === Permissions.RESULTS.DENIED) {
        checkAndroidPermissions();
      }
      if (res === Permissions.RESULTS.BLOCKED) {
        setPermission(status.isBlocked);
        openImageBottomSheet(status.isBlocked);
      }
    }
  }, []);

  const checkPhotoPermission = useCallback(async () => {
    if (isIos) {
      const permission = await Permissions.check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (permission === Permissions.RESULTS.GRANTED) {
        setPermission(status.isGranted);
        openImageBottomSheet(status.isGranted);
        return;
      } else if (permission === Permissions.RESULTS.LIMITED) {
        setPermission(status.isLimited);
        openImageBottomSheet(status.isLimited);
        return;
      }
      const res = await Permissions.request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (res === Permissions.RESULTS.GRANTED) {
        setPermission(status.isGranted);
        openImageBottomSheet(status.isGranted);
      } else if (res === Permissions.RESULTS.LIMITED) {
        setPermission(status.isLimited);
        openImageBottomSheet(status.isLimited);
      } else {
        setPermission(status.isBlocked);
        openImageBottomSheet(status.isBlocked);
      }
    } else if (isAndroid) {
      checkAndroidPermissions();
    }
  }, [checkAndroidPermissions]);

  return { checkPhotoPermission, permissionHeight, permission };
};
