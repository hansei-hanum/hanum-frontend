import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { AppLayout, Text } from 'src/components';
import { HANOWL_APPLY } from 'src/constants';
import { hanowlApplyAtom } from 'src/atoms';

import * as S from './styled';

export interface FinalConfirmProps {
  subject: string;
  text: string;
}

export const FinalConfirmTextContainer: React.FC<FinalConfirmProps> = ({ subject, text }) => {
  const theme = useTheme();
  return (
    <S.FinalConfirmTextContainer>
      <Text size={14} color={theme.placeholder}>
        {subject}
      </Text>
      <Text size={16}>{text}</Text>
    </S.FinalConfirmTextContainer>
  );
};

export const FinalConfirmScreen: React.FC = () => {
  const theme = useTheme();
  const hanowlApply = useRecoilValue(hanowlApplyAtom);

  const [timer, setTimer] = useState<number>(10);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : prev));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isFocused]);

  return (
    <AppLayout
      headerText={`작성하신 내용을\n확인해 주세요`}
      subHeaderText={
        <View>
          {HANOWL_APPLY.FINAL_CONFIRM_SUBTEXTS.map((item, index) => (
            <Text key={index} size={14} color={theme.danger}>
              {item}
            </Text>
          ))}
        </View>
      }
      isDisabled={timer !== 0}
      bottomText={`최종 제출하기 ${timer === 0 ? '' : `(${timer})`}`}
      withScrollView
      onPress={() => {}}
    >
      <FinalConfirmTextContainer subject="부서" text={hanowlApply.team} />
      <FinalConfirmTextContainer subject="자기소개" text={hanowlApply.introduce} />
      <FinalConfirmTextContainer subject="지원 동기" text={hanowlApply.motive} />
      <FinalConfirmTextContainer subject="포부" text={hanowlApply.aspiration} />
    </AppLayout>
  );
};
