import React from 'react';
import MI from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@emotion/react';

import { LimitedArticleScopeOfDisclosure } from 'src/api';

export interface ScopeOptionItems {
  text: string;
  type: LimitedArticleScopeOfDisclosure | null;
}

export const SCOPE_OPTION_LIST: ScopeOptionItems[] = [
  {
    text: '전체 보기',
    type: null,
  },
  {
    text: '교직원',
    type: LimitedArticleScopeOfDisclosure.Faculty,
  },
  {
    text: '졸업생',
    type: LimitedArticleScopeOfDisclosure.Alumni,
  },
  {
    text: '학생',
    type: LimitedArticleScopeOfDisclosure.Student,
  },
  {
    text: '동급생',
    type: LimitedArticleScopeOfDisclosure.Peer,
  },
];
