import { Eye, EyeSlash, Lock } from "phosphor-react-native";
import { useState } from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";
import {
  ChangePasswordVisibilityButton,
  Container,
  IconContainer,
  InputText,
} from "./styles";

export function PasswordInput({ ...rest }: TextInputProps) {
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  function handlePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  return (
    <Container>
      <IconContainer>
        <Lock size={24} color={theme.COLORS.GRAY_200} />
      </IconContainer>
      <InputText {...rest} secureTextEntry={isPasswordVisible} />
      <ChangePasswordVisibilityButton onPress={handlePasswordVisibility}>
        {isPasswordVisible ? (
          <Eye size={24} color={theme.COLORS.GRAY_200} />
        ) : (
          <EyeSlash size={24} color={theme.COLORS.GRAY_200} />
        )}
      </ChangePasswordVisibilityButton>
    </Container>
  );
}
