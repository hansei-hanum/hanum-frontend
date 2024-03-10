import { DimensionValue, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { RPH } from 'src/utils';

import { TeamsSkeletonProps } from '../HanowlApplyTeamsSkeleton';

import * as S from './styled';

export interface CommunityPostDetailSkeleton extends TeamsSkeletonProps {}

export interface CommunityPostDetailSkeletonProps extends CommunityPostDetailSkeleton {
  width: DimensionValue;
  height: number;
  borderRadius?: number;
}
const CommunityPostDetailSkeletonPlaceholder: React.FC<CommunityPostDetailSkeletonProps> = ({
  width,
  height,
  theme,
  borderRadius = 4,
}) => {
  return (
    <SkeletonPlaceholder backgroundColor={theme.blackSkeleton} highlightColor={theme.lightGray}>
      <View style={{ width: width, height: height, borderRadius: borderRadius }} />
    </SkeletonPlaceholder>
  );
};

const CommunityPostDetailContentSkeleton: React.FC<CommunityPostDetailSkeleton> = ({ theme }) => {
  return (
    <S.PostDetailContentSkeletonContainer>
      <S.PostDetailContentSkeletonInnerContainer>
        <CommunityPostDetailSkeletonPlaceholder width={'40%'} height={24} theme={theme} />
        <CommunityPostDetailSkeletonPlaceholder width={'70%'} height={24} theme={theme} />
        <CommunityPostDetailSkeletonPlaceholder width={'65%'} height={24} theme={theme} />
        <CommunityPostDetailSkeletonPlaceholder width={'100%'} height={RPH(30)} theme={theme} />
      </S.PostDetailContentSkeletonInnerContainer>
      <CommunityPostDetailSkeletonPlaceholder width={'20%'} height={24} theme={theme} />

      <S.PostDetailContentSkeletonInnerContainer>
        <CommunityPostDetailSkeletonPlaceholder width={'40%'} height={24} theme={theme} />
        <CommunityPostDetailSkeletonPlaceholder width={'70%'} height={24} theme={theme} />
        <CommunityPostDetailSkeletonPlaceholder width={'65%'} height={24} theme={theme} />
      </S.PostDetailContentSkeletonInnerContainer>
    </S.PostDetailContentSkeletonContainer>
  );
};

const CommunityPostDetailHeaderSkeleton: React.FC<CommunityPostDetailSkeleton> = ({ theme }) => {
  return (
    <S.PostDetailSkeletonHeaderContainer>
      <S.PostDetailSkeletonHeaderInnerContainer>
        <CommunityPostDetailSkeletonPlaceholder
          width={40}
          height={40}
          theme={theme}
          borderRadius={100}
        />

        <View style={{ rowGap: 2 }}>
          <CommunityPostDetailSkeletonPlaceholder width={50} height={16} theme={theme} />
          <CommunityPostDetailSkeletonPlaceholder width={70} height={16} theme={theme} />
        </View>
      </S.PostDetailSkeletonHeaderInnerContainer>
      <CommunityPostDetailSkeletonPlaceholder width={30} height={12} theme={theme} />
    </S.PostDetailSkeletonHeaderContainer>
  );
};

export const CommunityPostDetailSkeleton = Object.assign(
  {},
  {
    Header: CommunityPostDetailHeaderSkeleton,
    Content: CommunityPostDetailContentSkeleton,
  },
);
