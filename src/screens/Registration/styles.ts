import styled from "styled-components/native";

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

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-bottom: 35px;
`;

export const BackButton = styled.TouchableOpacity`
  width: 41px;
  height: 41px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;
`;
