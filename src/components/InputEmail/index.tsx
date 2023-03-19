import { useState } from "react";

import { Envelope } from "phosphor-react-native";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";

import * as S from "./styles";

interface Props extends TextInputProps {
  value?: string;
}

export function InputEmail({ value, ...rest }: Props) {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }
  return (
    <S.Container>
      <S.IconContainer>
        <Envelope
          size={24}
          color={
            isFocused || isFilled ? theme.COLORS.PRIMARY : theme.COLORS.GRAY_200
          }
        />
      </S.IconContainer>
      <S.InputText
        {...rest}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </S.Container>
  );
}
