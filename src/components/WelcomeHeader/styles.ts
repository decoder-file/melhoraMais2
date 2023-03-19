import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  border-radius: 8px;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.SECONDARY};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-top: 50px;
`;

export const ContainerName = styled.View``;

export const Welcome = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: 14px;
  margin-bottom: 0.5px;
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
