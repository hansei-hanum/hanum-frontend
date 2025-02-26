import { LimitedArticleScopeOfDisclosure } from 'src/api';

export interface VisibleTypeItems {
  text: LimitedArticleScopeOfDisclosure;
  icon: string;
}

export const VISIBLE_TYPE_LIST: VisibleTypeItems[] = [
  {
    text: LimitedArticleScopeOfDisclosure.Public,
    icon: '🌏',
  },
  {
    text: LimitedArticleScopeOfDisclosure.Faculty,
    icon: '👨‍🏫',
  },
  {
    text: LimitedArticleScopeOfDisclosure.Alumni,
    icon: '👨‍🎓',
  },
  {
    text: LimitedArticleScopeOfDisclosure.Student,
    icon: '📚',
  },
  {
    text: LimitedArticleScopeOfDisclosure.Peer,
    icon: '👥',
  },
];

export const PUBLIC_VISIBLE_TYPE_LIST: VisibleTypeItems[] = [
  {
    text: LimitedArticleScopeOfDisclosure.Public,
    icon: '🌏',
  },
];

export const STUDENT_VISIBLE_TYPE_LIST: VisibleTypeItems[] = [
  {
    text: LimitedArticleScopeOfDisclosure.Public,
    icon: '🌏',
  },
  {
    text: LimitedArticleScopeOfDisclosure.Student,
    icon: '📚',
  },
  {
    text: LimitedArticleScopeOfDisclosure.Peer,
    icon: '👥',
  },
];

export const TEACHER_VISIBLE_TYPE_LIST: VisibleTypeItems[] = [
  {
    text: LimitedArticleScopeOfDisclosure.Public,
    icon: '🌏',
  },
  {
    text: LimitedArticleScopeOfDisclosure.Faculty,
    icon: '👨‍🏫',
  },
];

export const GRADUATED_VISIBLE_TYPE_LIST: VisibleTypeItems[] = [
  {
    text: LimitedArticleScopeOfDisclosure.Public,
    icon: '🌏',
  },
  {
    text: LimitedArticleScopeOfDisclosure.Alumni,
    icon: '👨‍🎓',
  },
];

export const LIMITED_VISIBLE_TYPE_LIST: string[] = [
  '전체 공개',
  '교직원 공개',
  '졸업생 공개',
  '재학생 공개',
  '동급생 공개',
];
