import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";


export const Container = styled.View`
  width: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: ${Platform.OS === "ios" ? 0 : 20}px;
  padding-top: 10px;
`;

export const ContainerName = styled.View``;

export const Welcome = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: 14px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const ButtonName = styled.TouchableOpacity`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const ButtonExit = styled.TouchableOpacity``;

export const TitleExit = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: 16px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export const SafeArea = styled(SafeAreaView)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`