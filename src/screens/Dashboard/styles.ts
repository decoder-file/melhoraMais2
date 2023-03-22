import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_50};
`;

export const ButtonAddNewCalculation = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const TitleButtonAddNewCalculation = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-left: 5px;
`;

export const ContainerCard = styled.View`
  padding-bottom: 100px;
`;

export const TitleContainerCard = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-bottom: 10px;
`;

export const ContainerTemperature = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  width: 100%;
`;

export const LoadingHourly = styled.ActivityIndicator``;

export const TextLoadingHourly = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  margin-left: 10px;
`;

export const NotCalculations = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_700};
  text-align: center;
  margin-top: 40%;
  opacity: 0.5;
`;