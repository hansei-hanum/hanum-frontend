import React, { useEffect, useState, useMemo } from 'react';
import { ViewProps } from 'react-native';

import { useTheme } from '@emotion/react';

import { Text, formatName } from 'src/components';
import { TimeTableData } from 'src/constants/timTableData';

import { Content } from '../Content';

import * as S from './styled';

export interface TimeTableProps {
  mainText?: string;
  subText: string;
  fontSize: number;
}

export type TimeTableCustomProps = TimeTableProps & ViewProps;

const TimeTableText: React.FC<TimeTableProps> = ({ mainText, subText, fontSize }) => {
  const theme = useTheme();

  return (
    <S.TimeTableTextContainer>
      <Text size={14} fontFamily="medium" color={theme.placeholder}>
        {subText}
      </Text>
      <Text size={fontSize} fontFamily="bold">
        {mainText !== undefined ? mainText : '-'}
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

  const getLesson = (index: number | undefined) => {
    if (index !== undefined && todayTimeTable[index]) {
      return todayTimeTable[index];
    } else {
      return '-';
    }
  };

  const currentLesson = getLesson(lessonIndex);
  const previousLesson = getLesson(lessonIndex !== undefined ? lessonIndex - 1 : undefined);
  const nextLesson = getLesson(lessonIndex !== undefined ? lessonIndex + 1 : undefined);

  return (
    <Content icon="⏰" name="시간표" navigateUrl="TimeTable">
      <S.TimeTableTextWrapper>
        <TimeTableText fontSize={20} subText="이번수업" mainText={formatName(currentLesson)} />
        <S.SecondText>
          <TimeTableText fontSize={15} subText="이전수업" mainText={formatName(previousLesson)} />
          <S.ScreenTimeleLine />
          <TimeTableText fontSize={15} subText="다음수업" mainText={formatName(nextLesson)} />
        </S.SecondText>
      </S.TimeTableTextWrapper>
    </Content>
  );
};
