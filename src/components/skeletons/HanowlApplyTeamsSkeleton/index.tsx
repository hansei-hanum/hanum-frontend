import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { Theme, useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { themeAtom } from 'src/atoms';

export interface TeamsSkeletonProps {
  theme: Theme;
}

const SkeletonItem: React.FC<{ paddingLeft?: number; theme: Theme }> = ({ paddingLeft, theme }) => (
  <SkeletonPlaceholder backgroundColor={theme.blackSkeleton} highlightColor={theme.lightGray}>
    <View style={{ alignItems: 'flex-start', rowGap: 20 }}>
      <View style={{ width: '24%', height: 24, borderRadius: 4 }} />
      <View style={{ width: '100%', rowGap: 6, paddingLeft: paddingLeft || 0, borderRadius: 4 }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <View
            key={index}
            style={{ width: `${Math.round(Math.random() * 110) + 20}%`, height: 18 }}
          />
        ))}
      </View>
    </View>
  </SkeletonPlaceholder>
);

const TeamsSkeleton: React.FC<TeamsSkeletonProps> = ({ theme }) => {
  return (
    <View style={{ flex: 0.8, paddingHorizontal: 20 }}>
      <View style={{ rowGap: 40, marginTop: 16 }}>
        <SkeletonItem theme={theme} />
        <SkeletonItem paddingLeft={22} theme={theme} />
        <SkeletonItem paddingLeft={22} theme={theme} />
      </View>
    </View>
  );
};

const TeamsSelectSkeleton: React.FC = () => {
  const themeColor = useRecoilValue(themeAtom);
  const isDark = themeColor === 'dark';

  const theme = useTheme();
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <View style={{ width: '100%' }} key={index}>
          <SkeletonPlaceholder
            backgroundColor={isDark ? theme.selectBox : theme.lightGray}
            highlightColor={isDark ? theme.lightGray : theme.selectBox}
          >
            <View
              style={{
                width: '100%',
                height: 60,
                borderRadius: 14,
              }}
            />
          </SkeletonPlaceholder>
        </View>
      ))}
    </>
  );
};

export const HanowlApplySkeleton = Object.assign(
  {},
  {
    Teams: TeamsSkeleton,
    TeamsSelect: TeamsSelectSkeleton,
  },
);
