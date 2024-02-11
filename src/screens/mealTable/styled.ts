import styled from '@emotion/native';

export const LunchTableWrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  width: 100%;
`;

export const MealTableWrapper = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;

export const MealTableContainer = styled.View`
  flex-direction: column;
  row-gap: 30px;
  padding-top: 20px;
  padding-bottom: 70px;
`;

export const MealTableListContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
