import styled from '@emotion/native';

export const ApplyDetailInput = styled.TextInput<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  padding: 16px 10px;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.background};
  border-width: 3px;
  width: 100%;
  font-size: 16px;
  color: ${({ theme }) => theme.default};
`;
