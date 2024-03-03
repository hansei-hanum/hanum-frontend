import styled from '@emotion/native';

export const BlockListContainer = styled.View`
  width: 100%;
  flex-direction: column;
  row-gap: 24px;
  padding: 14px;
  padding-top: 20px;
`;

export const BlockListBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BlockListUserContainer = styled.View`
  flex-direction: row;
  align-items: center;
  column-gap: 6px;
`;

export const BlockListUserImage = styled.Image`
  border-radius: 100px;
  width: 50px;
  height: 50px;
`;

export const BlockListUserInfoContainer = styled.View`
  flex-direction: column;
  row-gap: 2px;
`;

export const BlockListCancelButton = styled.View`
  padding: 8px 12px;
  background: ${({ theme }) => theme.primary};
  border-radius: 6px;
`;
