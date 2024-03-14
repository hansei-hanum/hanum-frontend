import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';

import { useTheme } from '@emotion/react';

export enum CommunityMineBottomSheetTextEnum {
  EDIT = '편집',
  DELETE = '삭제',
}

export interface CommunityMineBottomSheetOptionItems {
  text: CommunityMineBottomSheetTextEnum;
  icon: React.ReactNode;
  isDanger?: boolean;
}

export const COMMUNITY_MINE_BOTTOM_SHEET_OPTION_LIST = () => {
  const theme = useTheme();

  const options = [
    {
      text: CommunityMineBottomSheetTextEnum.EDIT,
      icon: <Octicons name="pencil" size={24} color={theme.default} />,
    },
    {
      text: CommunityMineBottomSheetTextEnum.DELETE,
      icon: <Icon name="trash-alt" size={24} color={theme.danger} />,
      isDanger: true,
    },
  ];

  return { options };
};
