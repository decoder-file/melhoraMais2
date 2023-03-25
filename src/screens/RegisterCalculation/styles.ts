import styled from "styled-components/native";
import { Button } from "../../components/Button";

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_50};
`;

export const TitleTag = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  margin-bottom: 10px;
  margin-top: 30px;
`;

export const ContainerTag = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  width: 100%;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const ButtonAddTag = styled.TouchableOpacity`
  margin-bottom: 30px;
`;

export const TitleButtonTag = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  text-decoration: underline ${({ theme }) => theme.COLORS.PRIMARY};
`;

export const ButtonHandleSubmit = styled(Button)`
  margin-top: 30px;
  margin-bottom: 30px;
`;
