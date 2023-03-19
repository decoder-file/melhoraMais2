import React from "react";

import { PasswordInput } from "@components/PasswordInput";
import { Input } from "@components/Input";

import * as S from "./styles";

export default function SignIn() {
  return (
    <S.Container>
      <Input
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <PasswordInput 
        placeholder="Senha"
      />
    </S.Container>
  );
}
