import styled from '@emotion/native';

export const AlertBoxContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AlertBoxContentContainer = styled(AlertBoxContainer)`
  column-gap: 10px;
  width: auto;
`;

export const AlertBoxTextContainer = styled.View`
  row-gap: 3px;
`;
