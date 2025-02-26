import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { isIos } from 'src/utils';

import { UserThinkBox } from '../main';

import * as S from './styled';

export interface CommunityMainTopSectionProps {
  withUserThinkBox?: boolean;
  hasPadding?: boolean;
}

export const PostsTopSection: React.FC<CommunityMainTopSectionProps> = ({
  withUserThinkBox = true,
  hasPadding = true,
}) => {
  const inset = useSafeAreaInsets();
  return (
    <FlatList
      contentContainerStyle={{
        ...(hasPadding && { paddingTop: isIos ? inset.top + 14 : 24 }),
      }}
      scrollEnabled={false}
      ListHeaderComponent={
        <S.PostsTopSectionContainer>
          {withUserThinkBox && <UserThinkBox />}
        </S.PostsTopSectionContainer>
      }
      data={[1]}
      keyExtractor={(_, index) => index.toString()}
      renderItem={() => null}
    />
  );
};
