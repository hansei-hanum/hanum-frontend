import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';

import { Text } from 'src/components';
import { SHOW_MORE_SECTION_LIST } from 'src/constants/showMore';
import { colors } from 'src/styles';

import * as S from './styled';

export const Section: React.FC = () => {
  return (
    <S.SectionContainer>
      {SHOW_MORE_SECTION_LIST.map(({ name, section }) => (
        <S.Section>
          <Text key={name} size="18" fontFamily="bold">
            {name}
          </Text>
          {section.map(({ name, icon }) => (
            <S.SectionItem>
              <S.SectionIconContainer>
                <S.SectionIconWrapper>
                  <Text key={name} size="30" fontFamily="tossIcon">
                    {icon}
                  </Text>
                </S.SectionIconWrapper>
                <Text key={name} size="16">
                  {name}
                </Text>
              </S.SectionIconContainer>
              <MaterialIcons name="chevron-right" size={30} color={colors.placeholder} />
            </S.SectionItem>
          ))}
        </S.Section>
      ))}
    </S.SectionContainer>
  );
};
