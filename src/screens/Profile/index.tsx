import React, { useState } from "react";
import * as Yup from "yup";

import { ScrollView, StatusBar } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import { User, MapPin } from "phosphor-react-native";

import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { InputEmail } from "@components/InputEmail";
import { PasswordInput } from "@components/PasswordInput";

import {
  ButtonHandleSubmit,
  Container,
  ContainerConfirmPassword,
  ContainerInput,
  Separator,
  Title,
  TitleConfirmPassword,
} from "./styles";

export function Profile() {
  const navigation = useNavigation();
  const { user, updatedUser } = useAuth();

  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState(user.location || "");

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Campo nome obrigatório"),
        location: Yup.string(),
        password: Yup.string().required("Informe sua senha para avançar"),
      });

      await schema.validate({ email: "", name, location, password });
      const teste = await api.patch(`/users/${user.user_id}`, {
        name,
        email: user.email,
        location,
        password,
      });
      await updatedUser({
        id: user.id,
        user_id: user.user_id,
        name: name,
        email: user.email,
        access_token: user.access_token,
      });
      showMessage({
        message: "Alteração realizada com sucesso!",
        description: "As informações de cadastro foram atualizadas",
        type: "success",
        icon: "success",
      });
      navigation.navigate("Dashboard");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        showMessage({
          message: "Opa",
          description: error.message,
          type: "danger",
        });
        setLoading(false);
      } else {
        showMessage({
          message: "Erro na atualização de cadastro",
          description:
            "Ocorreu um erro inesperado. Tente novamente mais tarde!",
          type: "danger",
          icon: "danger",
        });
        setLoading(false);
      }
    }
    setLoading(false);
  }

  return (
    <>
      <Header title="Perfil" />
      <StatusBar backgroundColor="#FF5531" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: "#FCF9F2" }}
      >
        <Container>
          <Title>Informação do Perfil</Title>
          <ContainerInput>
            <InputEmail
              placeholder={user.name}
              autoCorrect={false}
              onChangeText={setName}
              value={name}
              returnKeyType="next"
              icon={<User />}
            />
            <Separator />
            <InputEmail
              placeholder={user.location}
              autoCorrect={false}
              onChangeText={setLocation}
              value={location}
              returnKeyType="next"
              icon={<MapPin />}
            />
          </ContainerInput>

          <ContainerConfirmPassword>
            <TitleConfirmPassword>
              Informe sua senha para alterar as informações
            </TitleConfirmPassword>
            <PasswordInput
              placeholder="Informe sua senha"
              onChangeText={setPassword}
              returnKeyType="next"
              value={password}
            />
          </ContainerConfirmPassword>

          <ButtonHandleSubmit
            title="Salvar"
            onPress={handleSubmit}
            enabled={!loading}
            loading={loading}
          />
        </Container>
      </ScrollView>
    </>
  );
}
