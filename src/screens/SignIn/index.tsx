import React, { useState } from "react";

import * as Yup from "yup";

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import { useTheme } from "styled-components";

import { PasswordInput } from "@components/PasswordInput";
import { Input } from "@components/Input";

import * as S from "./styles";
import { showMessage } from "react-native-flash-message";
import { BorderlessButton } from "react-native-gesture-handler";

export default function SignIn() {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("A senha é obrigatório"),
      });

      await schema.validate({ email, password });
      showMessage({
        message: "Sucesso!",
        description: "Login realizado com sucesso!",
        type: "success",
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        showMessage({
          message: "Opa",
          description: error.message,
          type: "danger",
        });
      } else {
        showMessage({
          message: "Error na autenticação",
          description:
            "Ocorreu um erro ao fazer login, verifique as credenciais",
          type: "danger",
        });
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="height"
        enabled
        style={{
          flex: 1,
          backgroundColor: theme.COLORS.GRAY_50,
          justifyContent: "center",
        }}
      >
        <S.Container>
          <S.Header>
            <S.Title>Estamos{"\n"}quase lá.</S.Title>
            <S.SubTitle>
              Sua ferramenta inteligente para tomada de decisões na compra de
              gado.
            </S.SubTitle>
          </S.Header>
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={setEmail}
            value={email}
          />
          <PasswordInput
            placeholder="Senha"
            onChangeText={setPassword}
            value={password}
          />

          <BorderlessButton>
            <S.ButtonForgotPassword>Esqueci minha senha</S.ButtonForgotPassword>
          </BorderlessButton>

          <S.ButtonLogin
            title="Entrar"
            onPress={handleSignIn}
            enabled={true}
            loading={false}
          />
        </S.Container>

        <S.Footer>
          <BorderlessButton>
            <S.ButtonCreateAccount>
              Não tem uma conta? Faça seu cadastro
            </S.ButtonCreateAccount>
          </BorderlessButton>
        </S.Footer>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
