import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/Ionicons';

import { Theme } from '@emotion/react';

import { REPORT_LIST } from 'src/constants';
import { Text } from 'src/components';

import * as S from './styled';

export interface OptionListProps {
  onPress: () => void;
  theme: Theme;
  isUserReport?: boolean;
}

const USER_REPORT_DESCRIPTION = `이 유저를 신고하는 이유를 알려주세요.
접수해주신 신고는 면밀히 검토하여 이용약관 위반이 확인될 경우,
해당 사용자에 대해 이용제한 조치를 취할게요.
`;

const POST_REPORT_DESCRIPTION = `회원님의 신고는 모두 익명으로 처리됩니다. 누군가 위급한 상황에 있다고 생각된다면 즉시 문의주시기 바랍니다.`;

export const OptionList: React.FC<OptionListProps> = ({ onPress, theme, isUserReport }) => {
  return (
    <>
      <S.ReportBottomSheetHeader>
        <Text size={16} fontFamily="bold" color={theme.default}>
          {isUserReport ? '이 유저를 신고하는 이유' : '이 게시물을 신고하는 이유'}
        </Text>
        <Text size={13} color={theme.placeholder}>
          {isUserReport ? USER_REPORT_DESCRIPTION : POST_REPORT_DESCRIPTION}
        </Text>
      </S.ReportBottomSheetHeader>
      <View style={{ width: '100%', paddingTop: 10 }}>
        {REPORT_LIST.map((item, index) => (
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
        ))}
      </View>
    </>
  );
};
