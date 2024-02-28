import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { Theme } from '@emotion/react';

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

export const TeamsSkeleton: React.FC<TeamsSkeletonProps> = ({ theme }) => {
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
