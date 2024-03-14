import { LimitedArticleScopeOfDisclosure } from 'src/api';

export type CommunityStackParamList = {
  CommunityMain: undefined;
  CommunityPostDetail: { id: number };
  CommunityCreatePost: { isEdit: boolean };
  CommunityVisibleType: undefined;
  CommunityAnonymitySettings: undefined;
  CommunitySearch: { scope: LimitedArticleScopeOfDisclosure | null };
};
