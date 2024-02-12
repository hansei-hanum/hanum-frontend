import React from 'react';
import { ScrollView } from 'react-native';

import { ShowMoreSection, Spinner, ShowMoreHeader, UserSection } from 'src/components';
import { useGetUser } from 'src/hooks';
import { SHOW_MORE_LIST } from 'src/constants/showMore';

import * as S from './styled';

export const ShowMoreScreen: React.FC = () => {
  const { userData, isLoading } = useGetUser();

  return (
    <S.ShowMoreScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <ShowMoreHeader />
        <S.ShowMoreScreenContainer>
          {isLoading ? <Spinner /> : !isLoading && userData && <UserSection />}
          <S.SectionContainer>
            {SHOW_MORE_LIST.map(({ name, section }) => (
              <ShowMoreSection name={name} section={section} />
            ))}
          </S.SectionContainer>
        </S.ShowMoreScreenContainer>
      </ScrollView>
    </S.ShowMoreScreenWrapper>
  );
};
