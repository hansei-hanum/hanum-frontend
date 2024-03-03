import { LimitedArticleScopeOfDisclosure } from 'src/api';
import { VisibleTypeItems } from 'src/constants';

export const formatVisibleType = (type: VisibleTypeItems['text']) => {
  switch (type) {
    case LimitedArticleScopeOfDisclosure.Public:
      return '전체 공개';
    case LimitedArticleScopeOfDisclosure.Faculty:
      return '교직원 공개';
    case LimitedArticleScopeOfDisclosure.Alumni:
      return '졸업생 공개';
    case LimitedArticleScopeOfDisclosure.Student:
      return '학생 공개';
    case LimitedArticleScopeOfDisclosure.Peer:
      return '동급생 공개';
    default:
      return '';
  }
};
