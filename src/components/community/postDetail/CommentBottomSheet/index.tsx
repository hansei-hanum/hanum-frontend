import React, { forwardRef } from 'react';
import { View } from 'react-native';

import { BottomSheet, ScaleOpacity, Text } from 'src/components/common';
import { BottomSheetRefProps } from 'src/types';

export const CommentBottomSheet = forwardRef<BottomSheetRefProps>((props, ref) => {
  return (
    <BottomSheet ref={ref} scrollHeight={-100}>
      <View style={{ padding: 10 }}>
        <ScaleOpacity onPress={() => console.log('신고')}>
          <Text size={16}>신고</Text>
        </ScaleOpacity>
      </View>
    </BottomSheet>
  );
});
