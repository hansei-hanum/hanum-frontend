import { LimitedArticleScopeOfDisclosure } from 'src/api';
import { useGetUser } from 'src/hooks';

export interface ScopeOptionItems {
  text: string;
  type: LimitedArticleScopeOfDisclosure | null;
}

export const FACULTY_SCOPE_OPTION_LIST: ScopeOptionItems[] = [
  {
    text: '전체 보기',
    type: null,
  },
  {
    text: '교직원',
    type: LimitedArticleScopeOfDisclosure.Faculty,
  },
];

export const ALUMNI_SCOPE_OPTION_LIST: ScopeOptionItems[] = [
  {
    text: '전체 보기',
    type: null,
  },
  {
    text: '졸업생',
    type: LimitedArticleScopeOfDisclosure.Alumni,
  },
];

export const STUDENT_SCOPE_OPTION_LIST: ScopeOptionItems[] = [
  {
    text: '전체 보기',
    type: null,
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

export const SCOPE_OPTION_LIST = () => {
  const { userType } = useGetUser();

  switch (userType()) {
    case '교직원':
      return FACULTY_SCOPE_OPTION_LIST;
    case '졸업생':
      return ALUMNI_SCOPE_OPTION_LIST;
    case '재학생':
      return STUDENT_SCOPE_OPTION_LIST;
  }
};
