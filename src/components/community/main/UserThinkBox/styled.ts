import styled from '@emotion/native';

export const UserThinkBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  column-gap: 10px;
`;

export const UserThinkBoxWrapper = styled.View`
  flex: 1;
  align-items: flex-start;
  padding: 14px;
  justify-content: center;
  background-color: ${({ theme }) => theme.lightGray};
  border-radius: 12px;
`;
