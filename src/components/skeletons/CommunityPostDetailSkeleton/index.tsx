import { DimensionValue, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { useTheme } from '@emotion/react';

import { RPH } from 'src/utils';

import * as S from './styled';

export interface CommunityPostDetailSkeletonProps {
  width: DimensionValue;
  height: number;
  borderRadius?: number;
}

const CommunityPostDetailSkeletonPlaceholder: React.FC<CommunityPostDetailSkeletonProps> = ({
  width,
  height,
  borderRadius = 4,
}) => {
  const theme = useTheme();

  return (
    <SkeletonPlaceholder backgroundColor={theme.skeleton} highlightColor={theme.lightGray}>
      <View style={{ width: width, height: height, borderRadius: borderRadius }} />
    </SkeletonPlaceholder>
  );
};

const CommunityPostDetailContentSkeleton: React.FC = () => {
  return (
    <S.PostDetailContentSkeletonContainer>
      <S.PostDetailContentSkeletonInnerContainer>
        <CommunityPostDetailSkeletonPlaceholder width={'40%'} height={24} />
        <CommunityPostDetailSkeletonPlaceholder width={'70%'} height={24} />
        <CommunityPostDetailSkeletonPlaceholder width={'65%'} height={24} />
        <CommunityPostDetailSkeletonPlaceholder width={'100%'} height={RPH(30)} />
      </S.PostDetailContentSkeletonInnerContainer>
      <CommunityPostDetailSkeletonPlaceholder width={'20%'} height={24} />
      <S.PostDetailContentSkeletonInnerContainer>
        <CommunityPostDetailSkeletonPlaceholder width={'40%'} height={24} />
        <CommunityPostDetailSkeletonPlaceholder width={'70%'} height={24} />
        <CommunityPostDetailSkeletonPlaceholder width={'65%'} height={24} />
      </S.PostDetailContentSkeletonInnerContainer>
    </S.PostDetailContentSkeletonContainer>
  );
};

const CommunityPostDetailHeaderSkeleton: React.FC = () => {
  return (
    <S.PostDetailSkeletonHeaderContainer>
      <S.PostDetailSkeletonHeaderInnerContainer>
        <CommunityPostDetailSkeletonPlaceholder width={40} height={40} borderRadius={100} />

        <View style={{ rowGap: 2 }}>
          <CommunityPostDetailSkeletonPlaceholder width={50} height={16} />
          <CommunityPostDetailSkeletonPlaceholder width={70} height={16} />
        </View>
      </S.PostDetailSkeletonHeaderInnerContainer>
      <CommunityPostDetailSkeletonPlaceholder width={30} height={12} />
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
