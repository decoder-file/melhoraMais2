import styled from "styled-components/native";
// import { RFValue, RFPercentage } from "react-native-responsive-fontsize";


export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 3px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_50};
`;

export const ContainerInput = styled.View``;

export const Separator = styled.View`
  margin-bottom: 20px;
`;
