import React from 'react';
import { HapticFeedbackTypes, trigger } from 'react-native-haptic-feedback';

import { useTheme } from '@emotion/react';

import { NoScrollbarScrollView, ScaleOpacity, Text } from 'src/components/common';
import { MAIN_MENU_LIST } from 'src/constants';
import { LimitedArticleScopeOfDisclosure } from 'src/api';
import { isIos } from 'src/utils';

import * as S from './styled';

export interface PostMenuProps {
  setPostScope: React.Dispatch<React.SetStateAction<LimitedArticleScopeOfDisclosure>>;
  postScope: LimitedArticleScopeOfDisclosure;
}

export const PostMenu: React.FC<PostMenuProps> = ({ setPostScope, postScope }) => {
  const theme = useTheme();

  const onPress = (scope: LimitedArticleScopeOfDisclosure) => {
    trigger(isIos ? HapticFeedbackTypes.selection : HapticFeedbackTypes.impactLight);
    setPostScope(scope);
  };

  return (
    <S.CommunityMainMenuContainer>
      <NoScrollbarScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'space-between',
        }}
      >
        {MAIN_MENU_LIST.map(({ scope, text }) => (
          <ScaleOpacity key={scope} activeOpacity={1} onPress={() => onPress(scope)}>
            <S.CommunityMainMenu
              style={[
                {
                  borderRadius: 16,
                  backgroundColor: postScope === scope ? theme.primary : theme.secondary,
                },
              ]}
            >
              <Text size={16} color={postScope !== scope ? theme.default : theme.white}>
                {text}
              </Text>
            </S.CommunityMainMenu>
          </ScaleOpacity>
        ))}
      </NoScrollbarScrollView>
    </S.CommunityMainMenuContainer>
  );
};
