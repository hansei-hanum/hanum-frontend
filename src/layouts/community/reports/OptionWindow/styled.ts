import styled from '@emotion/native';

export const ReportBottomSheetHeader = styled.View`
  width: 100%;
  row-gap: 10px;
  padding: 14px;
`;

export const ReportBottmoSheetOptionList = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 14px;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.modalBg};
`;
