import styled from "@emotion/native";
import LottieView from "lottie-react-native";
import { colors } from "src/styles";

export const RaffleStatusWrapper = styled.View`
    width: 100px;
    height: 100px;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    background-color: ${colors.primary};
`;

export const RaffleStatusLottie = styled(LottieView)`
  width: 130px;
  height: 130px;
`;