import { useCallback } from 'react';
import { Platform } from 'react-native';
import Permissions, { PERMISSIONS } from 'react-native-permissions';

import { PhotoPermissionProps, status } from 'src/screens';

import { isAndroid, isIos } from '../utils/checkOs';

export interface CheckPermissionProps {
  setPermission: (value: React.SetStateAction<PhotoPermissionProps>) => void;
  openImageBottomSheet: ({ granted, limited }: PhotoPermissionProps) => void;
}

export const useCheckPhotoPermission = ({
  setPermission,
  openImageBottomSheet,
}: CheckPermissionProps) => {
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

  return { checkPhotoPermission };
};
