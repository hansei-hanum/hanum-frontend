import React, { useEffect, useState, useMemo } from 'react';

import { Content } from '../Content';

import * as S from './styled';

import { Text } from 'src/components';

import { useTheme } from '@emotion/react';

import { TimeTableData } from 'src/constants/timTableData';

export interface TimeTableProps {
  mainText?: string;
  subText: string;
  fontSize: number;
}

const TimeTableText: React.FC<TimeTableProps> = ({ mainText, subText, fontSize }) => {
  const theme = useTheme();

  const getShrinkedMainText = (maxLength: number) => {
    if (mainText && mainText.length > maxLength) {
      return `${mainText.slice(0, maxLength - 3)}...`;
    }
    return mainText ?? '-';
  };

  return (
    <S.TimeTableTextContainer>
      <Text size={14} fontFamily="medium" color={theme.placeholder}>
        {subText}
      </Text>
      <Text size={fontSize} fontFamily="bold">
        {getShrinkedMainText(fontSize === 20 ? 13 : 10)}
      </Text>
    </S.TimeTableTextContainer>
  );
};

export const TimeTable: React.FC = () => {
  const [lessonIndex, setLessonIndex] = useState<number | undefined>(undefined);
  const lessonDuration = 50;
  const today = new Date();

  const todayTimeTable = useMemo(() => {
    const todayIndex = TimeTableData.data.findIndex((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === today.getFullYear() &&
        itemDate.getMonth() === today.getMonth() &&
        itemDate.getDate() === today.getDate()
      );
    });

    return todayIndex !== -1 ? TimeTableData.data[todayIndex].data : [];
  }, [TimeTableData.data, today]);

  useEffect(() => {
    let animationFrameId: number;

    const updateLessonIndex = () => {
      const currentDate = new Date();
      const totalMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();
      const startingPoint = 8 * 60 + 40;
      let lessonCount = Math.floor((totalMinutes - startingPoint) / lessonDuration);
      lessonCount = Math.max(0, lessonCount);
      setLessonIndex(lessonCount);
      animationFrameId = requestAnimationFrame(updateLessonIndex);
    };

    updateLessonIndex();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const currentLesson =
    lessonIndex !== undefined && todayTimeTable[lessonIndex]
      ? todayTimeTable[lessonIndex].replace(/\s/g, '')
      : undefined;

  const previousLesson =
    lessonIndex !== undefined && lessonIndex > 0 && todayTimeTable[lessonIndex - 1]
      ? todayTimeTable[lessonIndex - 1].replace(/\s/g, '')
      : undefined;

  const nextLesson =
    lessonIndex !== undefined &&
    lessonIndex < todayTimeTable.length - 1 &&
    todayTimeTable[lessonIndex + 1]
      ? todayTimeTable[lessonIndex + 1].replace(/\s/g, '')
      : undefined;

  return (
    <Content icon="⌚︎" name="시간표" navigateUrl="TimeTable">
      <S.TimeTableTextWrapper>
        <TimeTableText fontSize={20} subText="이번수업" mainText={currentLesson} />
        <S.SecondText>
          <TimeTableText fontSize={15} subText="이전수업" mainText={previousLesson} />
          <S.ScreenTimeleLine />
          <TimeTableText fontSize={15} subText="다음수업" mainText={nextLesson} />
        </S.SecondText>
      </S.TimeTableTextWrapper>
    </Content>
  );
};
