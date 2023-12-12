import React from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ReAnimated, { ScrollHandlerProcessed } from 'react-native-reanimated';
import Icons from 'react-native-vector-icons/Ionicons';

import { Theme } from '@emotion/react';

import { REPORT_LIST } from 'src/constants';
import { Text } from 'src/components';
import { RPH, iosCheckHeight } from 'src/utils';

import * as S from './styled';

export interface OptionWindowProps {
  flatListRef: React.RefObject<FlatList>;
  enableScroll: boolean;
  onScroll: ScrollHandlerProcessed<Record<string, unknown>>;
  onPress: () => void;
  theme: Theme;
}

export const OptionWindow: React.FC<OptionWindowProps> = ({
  flatListRef,
  enableScroll,
  onPress,
  onScroll,
  theme,
}) => {
  return (
    <>
      <S.ReportBottomSheetHeader>
        <Text size={16} fontFamily="bold" color={theme.default}>
          이 게시물을 신고하는 이유
        </Text>
        <Text size={13} color={theme.placeholder}>
          지적재산권 침해를 신고하는 경우를 제외하고 회원님의 신고는 익명으로 처리됩니다. 누군가
          위급한 상황에 있다고 생각된다면 즉시 문의 주시기 바랍니다.
        </Text>
      </S.ReportBottomSheetHeader>
      <ReAnimated.FlatList
        data={REPORT_LIST}
        scrollEnabled={enableScroll}
        bounces={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        numColumns={1}
        contentContainerStyle={{
          width: '100%',
          paddingBottom: iosCheckHeight ? RPH(10) : RPH(4),
          paddingTop: 10,
        }}
        initialScrollIndex={0}
        ref={flatListRef}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity activeOpacity={0.7} onPress={onPress} key={index}>
              <S.ReportBottmoSheetOptionList
                style={[
                  {
                    borderTopColor: theme.lightGray,
                    borderTopWidth: 1,
                    backgroundColor: theme.modalBg,
                  },
                  index === REPORT_LIST.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.lightGray,
                  },
                ]}
              >
                <Text size={15} color={theme.default}>
                  {item}
                </Text>
                <Icons name="chevron-forward" size={26} color={theme.placeholder} />
              </S.ReportBottmoSheetOptionList>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};
