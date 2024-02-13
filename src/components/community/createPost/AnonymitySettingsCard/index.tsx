import React from 'react';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '@emotion/react';

import { Icon, ScaleOpacity, Text } from 'src/components/common';
import { AnonymityOptionItems } from 'src/constants';
import { AnonymityActiveOptionType } from 'src/screens';

import * as S from './styled';

export interface AnonymitySettingsCardProps extends AnonymityOptionItems {
  index: number;
  onPressVisibleType: (index: number) => void;
  activeOption: AnonymityActiveOptionType;
}

export const AnonymitySettingsCard: React.FC<AnonymitySettingsCardProps> = ({
  onPressVisibleType,
  index,
  icon,
  title,
  description,
  activeOption,
}) => {
  const theme = useTheme();

  return (
    <ScaleOpacity onPress={() => onPressVisibleType(index)}>
      <S.AnonymitySettingsListContainer>
        <S.AnonymitySettingsList>
          <Icon icon={icon} size={34} includeBackground={false} />
          <Text.Column>
            <Text size={18}>{title}</Text>
            <Text size={15}>{description}</Text>
          </Text.Column>
        </S.AnonymitySettingsList>
        <MCI
          name={activeOption[title] ? 'circle-slice-8' : 'circle-outline'}
          size={30}
          color={activeOption[title] ? theme.primary : theme.placeholder}
        />
      </S.AnonymitySettingsListContainer>
    </ScaleOpacity>
  );
};
