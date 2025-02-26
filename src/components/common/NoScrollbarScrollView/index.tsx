import React, { forwardRef } from 'react';
import { ScrollViewProps, ScrollView } from 'react-native';

export const NoScrollbarScrollView = forwardRef<ScrollView, ScrollViewProps>(
  ({ children, ...props }, ref) => (
    <ScrollView
      ref={ref}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...props}
      style={{ width: '100%' }}
    >
      {children}
    </ScrollView>
  ),
);
