import styled from "styled-components/native";
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { PropsShowResult } from "./index";

export const Container = styled.View<PropsShowResult>`
  width: ${({ isWidth }) => (isWidth ? 100 : 45)}%;
`;

export const Content = styled.View<PropsShowResult>`
  width: 100%;
  height: 51px;
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 10px;
  border: 1px;
  border-color: #ebebec;
  flex-direction: row;
  align-items: center;

  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : 0)}px;
`;

export const Text = styled.Text`
  padding-left: 16px;
  font-size: 16px;
`;

export const Title = styled.Text<PropsShowResult>`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-bottom: 2px;
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : 0)}px;
`;
