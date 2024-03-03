import React from 'react';
import { SafeAreaView } from 'react-native';

import { ScreenHeader, Spinner, Text } from 'src/components';
import { useGetBlockList } from 'src/hooks';

export const UserBlockListScreen: React.FC = () => {
  const { data, isLoading } = useGetBlockList();
  console.log(data);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScreenHeader title="차단된 사용자" />
      {isLoading ? (
        <Spinner isCenter />
      ) : (
        <Text size={15}>{data?.data.blocks.map((item) => item.id)}</Text>
      )}
    </SafeAreaView>
  );
};
