// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { ButtonProps } from "./index";

export const Container = styled.View<ButtonProps>`
  width: 100%;
  flex-direction: row;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : 0)}px;
  margin-bottom: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const ContainerDescription = styled.TouchableOpacity`
  width: 80%;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 15px;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-top: 1px;
`;

export const Description = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  margin-top: 1px;
`;

export const Localization = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_700};
`;

export const ButtonDelete = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 3px;
  margin-left: 5px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const ContainerLocalization = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 1px;
`;

export const Tag = styled.TouchableOpacity`
  border-radius: 8px;
  padding: 5px;
  align-items: center;
`;

export const TitleTag = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: 12px;
  color: ${({ theme }) => theme.COLORS.WHITE};
  text-transform: capitalize;
`;
