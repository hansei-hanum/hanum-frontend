import styled from '@emotion/native';

export const SelectBox = styled.View`
  padding: 16px 10px;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.selectBox};
  border-width: 3px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const SelectBoxTextWrapper = styled.View`
  flex: 0.8;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const SelectBoxIconWrapper = styled.View`
  position: absolute;
  right: 0;
  flex: 0.2;
  padding-right: 10px;
`;
