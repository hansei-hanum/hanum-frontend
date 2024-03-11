import { LimitedArticleScopeOfDisclosure } from 'src/api';

import { useGetUser } from './useGetUser';

export const useFilteredVisibleType = () => {
  const { userType } = useGetUser();

  const userVisibleTypeMap: { [key: string]: LimitedArticleScopeOfDisclosure[] } = {
    졸업생: [LimitedArticleScopeOfDisclosure.Public, LimitedArticleScopeOfDisclosure.Alumni],
    재학생: [
      LimitedArticleScopeOfDisclosure.Public,
      LimitedArticleScopeOfDisclosure.Student,
      LimitedArticleScopeOfDisclosure.Peer,
    ],
    교직원: [LimitedArticleScopeOfDisclosure.Public, LimitedArticleScopeOfDisclosure.Faculty],
    default: [LimitedArticleScopeOfDisclosure.Public],
  };

  const filteredVisibleType = (text: LimitedArticleScopeOfDisclosure) => {
    const allowedTypes = userVisibleTypeMap[userType() || 'default'];
    return allowedTypes.includes(text);
  };

  return {
    filteredVisibleType,
  };
};
