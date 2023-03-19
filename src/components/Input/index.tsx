import { Envelope } from "phosphor-react-native";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import { Container, IconContainer, InputText } from "./styles";

interface Props extends TextInputProps {
  IconName?: string;
}

export function Input({ iconName, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Container>
      <IconContainer>
        <Envelope size={24} color={theme.COLORS.GRAY_200} />
      </IconContainer>
      <InputText {...rest} />
    </Container>
  );
}
