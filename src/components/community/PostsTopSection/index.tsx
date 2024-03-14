import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { isIos } from 'src/utils';
import { LimitedArticleScopeOfDisclosure } from 'src/api';

import { UserThinkBox } from '../main';
import { PostMenu } from '../PostMenu';

import * as S from './styled';

export interface CommunityMainTopSectionProps {
  postScope: LimitedArticleScopeOfDisclosure | null;
  setPostScope: React.Dispatch<React.SetStateAction<LimitedArticleScopeOfDisclosure | null>>;
  withUserThinkBox?: boolean;
  hasPadding?: boolean;
}

export const PostsTopSection: React.FC<CommunityMainTopSectionProps> = ({
  postScope,
  setPostScope,
  withUserThinkBox = true,
  hasPadding = true,
}) => {
  const inset = useSafeAreaInsets();
  return (
    <FlatList
      contentContainerStyle={{
        ...(hasPadding && { paddingTop: isIos ? inset.top + 24 : 64 }),
      }}
      scrollEnabled={false}
      ListHeaderComponent={
        <S.PostsTopSectionContainer>
          {withUserThinkBox && <UserThinkBox />}
          <PostMenu setPostScope={setPostScope} postScope={postScope} />
        </S.PostsTopSectionContainer>
      }
      data={[1]}
      keyExtractor={(_, index) => index.toString()}
      renderItem={() => null}
    />
  );
};
