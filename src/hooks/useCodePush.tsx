import { useEffect, useState } from 'react';
import CodePush, { RemotePackage } from 'react-native-code-push';

type UseCodePushReturn = [boolean, CodePush.SyncStatus | null];

export const useCodePush = (): UseCodePushReturn => {
  const [isUpdating, setIsUpdating] = useState<boolean>(true);
  const [syncProgress, setSyncProgress] = useState<CodePush.SyncStatus | null>(null);
  
  useEffect(() => {
    const checkAndGetCodePush = async () => {
      try {
        const update: RemotePackage | null = await CodePush.checkForUpdate();
        
        // 필수(mandatory) 업데이트가 존재하는 경우 업데이트 프로세스 실행 
        if (update && update.isMandatory) {
            console.log("Updating Now")
            await CodePush.sync(
                {
                    installMode: CodePush.InstallMode.IMMEDIATE,
                    mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
                },
                (progress) => {
                    setSyncProgress(progress);
                },
            );
          return;
        }
        
        // 필수(mandatory) 업데이트가 존재하지 않는 경우 isUpdating 상태 false로 변경
        setIsUpdating(false);
        return;
      } catch (err) {
        setIsUpdating(false);
      }
    };
            
    checkAndGetCodePush();
  }, []);
            
  return [isUpdating, syncProgress];
};