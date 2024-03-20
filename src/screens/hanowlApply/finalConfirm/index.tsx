import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { AppLayout, Text } from 'src/components';
import { HANOWL_APPLY } from 'src/constants';
import { hanowlApplyAtom, hanowlApplyDataAtom } from 'src/atoms';
import { useCreateHanowlApplication } from 'src/hooks/query/hanowlApply';
import { useBlockGesture, useNavigate } from 'src/hooks';

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
  const hanowlApplyData = useRecoilValue(hanowlApplyDataAtom);

  const { mutate, isLoading } = useCreateHanowlApplication();

  const theme = useTheme();
  const hanowlApply = useRecoilValue(hanowlApplyAtom);
  const hasData = hanowlApply.motive;

  const [timer, setTimer] = useState<number>(5);

  const navigate = useNavigate();

  useBlockGesture(isLoading);

  const onButtonPress = () => {
    if (hasData) {
      mutate({
        departmentId: hanowlApply.team.id,
        introduction: hanowlApply.introduce,
        motivation: hanowlApply.motive,
        aspiration: hanowlApply.aspiration,
        isSubmit: true,
      });
    } else {
      navigate('Main');
      return;
    }
  };

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
      headerText={hasData ? `작성하신 내용을\n확인해 주세요` : `제출하신 내용은\n다음과 같아요`}
      subHeaderText={
        hasData ? (
          <View>
            {HANOWL_APPLY.FINAL_CONFIRM_SUBTEXTS.map((item, index) => (
              <Text key={index} size={14} color={theme.danger}>
                {item}
              </Text>
            ))}
          </View>
        ) : (
          <Text size={14} color={theme.danger}>
            {HANOWL_APPLY.CHECK_SUBTEXTS}
          </Text>
        )
      }
      isDisabled={hasData ? timer !== 0 : false}
      bottomText={!hasData ? '확인' : `최종 제출하기 ${timer === 0 ? '' : `(${timer})`}`}
      withScrollView
      isLoading={isLoading}
      onPress={onButtonPress}
    >
      {hasData ? (
        <>
          <FinalConfirmTextContainer subject="부서" text={hanowlApply.team.name} />
          <FinalConfirmTextContainer subject="자기소개" text={hanowlApply.introduce} />
          <FinalConfirmTextContainer subject="지원 동기" text={hanowlApply.motive} />
          <FinalConfirmTextContainer subject="포부" text={hanowlApply.aspiration} />
        </>
      ) : (
        <>
          <FinalConfirmTextContainer subject="부서" text={hanowlApplyData[0].department.name} />
          <FinalConfirmTextContainer subject="자기소개" text={hanowlApplyData[0].introduction} />
          <FinalConfirmTextContainer subject="지원 동기" text={hanowlApplyData[0].motivation} />
          <FinalConfirmTextContainer subject="포부" text={hanowlApplyData[0].aspiration} />
        </>
      )}
    </AppLayout>
  );
};
