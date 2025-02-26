import styled from '@emotion/native';

export const ConfirmBox = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.selectBox};
  padding: 16px 10px;
  border-radius: 14px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ConfirmBoxTextContainer = styled.View`
  flex-direction: column;
  flex: 1;
  row-gap: 3px;
`;
