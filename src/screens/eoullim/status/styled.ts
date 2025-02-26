import styled from '@emotion/native';
import LottieView from 'lottie-react-native';

export const RaffleStatusWrapper = styled.View`
  width: 120px;
  height: 120px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.primary};
`;

export const RaffleStatusLottie = styled(LottieView)`
  width: 130px;
  height: 130px;
`;
