import { LimitedArticleScopeOfDisclosure } from 'src/api';

export interface MainMenuItems {
  text: string;
  scope: LimitedArticleScopeOfDisclosure;
}

export const MAIN_MENU_LIST = [
  {
    text: '전체',
    scope: LimitedArticleScopeOfDisclosure.Public,
  },
  {
    text: '학생',
    scope: LimitedArticleScopeOfDisclosure.Student,
  },
  {
    text: '동급생',
    scope: LimitedArticleScopeOfDisclosure.Peer,
  },
  {
    text: '교직원',
    scope: LimitedArticleScopeOfDisclosure.Faculty,
  },
  {
    text: '졸업생',
    scope: LimitedArticleScopeOfDisclosure.Alumni,
  },
];
