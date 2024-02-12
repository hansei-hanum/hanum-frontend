import React from 'react';

import { Text } from 'src/components';
import { ShowMoreItem } from 'src/constants/showMore';

import { ShowMoreCard } from '../ShowMoreCard';

import * as S from './styled';

export interface ShowMoreCardInterface extends ShowMoreItem {}

export const ShowMoreSection: React.FC<ShowMoreCardInterface> = ({ name, section }) => {
  return (
    <S.ShowMoreSectionContainer key={name}>
      <Text size={18} fontFamily="bold">
        {name}
      </Text>
      {section.map(({ name, icon, navigateUrl }) => (
        <ShowMoreCard key={name} name={name} icon={icon} navigateUrl={navigateUrl} />
      ))}
    </S.ShowMoreSectionContainer>
  );
};
