import { TextInput } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

export const IconContainer = styled.View`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const InputText = styled(TextInput)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  border-radius: 8px;
  padding: 0 23px;
`;

export const ChangePasswordVisibilityButton = styled(BorderlessButton)`
  height: 56px;
  width: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding-right: 16px;

  background-color: ${({ theme }) => theme.COLORS.WHITE};
`;
