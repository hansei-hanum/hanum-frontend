import styled from '@emotion/native';

export const HanumPayContainer = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  row-gap: 20px;
`;

export const HanumPayButtonContainer = styled(HanumPayContainer)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

export const HanumPayButton = styled.TouchableOpacity`
  width: 49%;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.lightGray};
  padding: 10px 0;
`;
