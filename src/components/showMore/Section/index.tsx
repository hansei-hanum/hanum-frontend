import React from 'react';

import { Text } from 'src/components';
import { SHOW_MORE_SECTION_LIST } from 'src/constants/showMore';

import { SectionItem } from '../SectionItem';

import * as S from './styled';

export const Section: React.FC = () => {
  return (
    <S.SectionContainer>
      {SHOW_MORE_SECTION_LIST.map(({ name, section }) => (
        <S.Section key={name}>
          <Text size="18" fontFamily="bold">
            {name}
          </Text>
          {section.map(({ name, icon, navigateUrl }) => (
            <SectionItem key={name} name={name} icon={icon} navigateUrl={navigateUrl} />
          ))}
        </S.Section>
      ))}
    </S.SectionContainer>
  );
};
