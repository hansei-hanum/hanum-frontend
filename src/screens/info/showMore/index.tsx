import React from 'react';

import {
  ShowMoreSection,
  Spinner,
  ShowMoreHeader,
  UserSection,
  NoScrollbarScrollView,
} from 'src/components';
import { useGetUser } from 'src/hooks';
import { SHOW_MORE_LIST } from 'src/constants/showMore';

import * as S from './styled';

export const ShowMoreScreen: React.FC = () => {
  const { userData, isLoading } = useGetUser();

  return (
    <S.ShowMoreScreenWrapper>
      <NoScrollbarScrollView
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <ShowMoreHeader />
        <S.ShowMoreScreenContainer>
          {isLoading ? <Spinner /> : !isLoading && userData && <UserSection />}
          <S.SectionContainer>
            {SHOW_MORE_LIST.map(({ name, section }, i) => (
              <ShowMoreSection name={name} section={section} key={i} />
            ))}
          </S.SectionContainer>
        </S.ShowMoreScreenContainer>
      </NoScrollbarScrollView>
    </S.ShowMoreScreenWrapper>
  );
};
