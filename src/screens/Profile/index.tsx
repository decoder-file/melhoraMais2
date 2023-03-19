import React from "react";

import { ScrollView, StatusBar } from "react-native";
import { showMessage } from "react-native-flash-message";

import { useNavigation } from "@react-navigation/native";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

import {api} from "../../services/api";

import { Container, ContainerInput, Separator } from "./styles";
import { useAuth } from "../../hooks/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().min(2).required("Campo nome obrigatório"),
  email: Yup.string()
    .email("Email inválido")
    .required("Campo e-mail obrigatório"),
  location: Yup.string().min(2).required("Campo localização obrigatório"),
  password: Yup.string().min(4).required("Campo senha obrigatório"),
});

export function Profile() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: RegistrationSchema,
      initialValues: {
        name: user.name,
        email: user.email,
        location: user.location,
        password: "",
      },

      onSubmit: async (v) => {
        try {
          await api.patch(`/users/${user.id}`, v);
          showMessage({
            message: "Alteração realizada com sucesso!",
            description: "As informações de cadastro foram atualizadas",
            type: "success",
            icon: "success",
          });
          const updatedUer = {
            email: values.email,
            id: user.id,
            location: values.location,
            name: values.name,
          };

          // await AsyncStorage.removeItem("@melhoraMaisApp:use");

          // await AsyncStorage.setItem(
          //   "@melhoraMaisApp:use",
          //   JSON.stringify(updatedUer)
          // );

          navigation.goBack();
        } catch (err: any) {
          showMessage({
            message: "Erro na atualização de cadastro",
            description:
              "Ocorreu um erro inesperado. Tente novamente mais tarde!",
            type: "danger",
            icon: "danger",
          });
        }
      },
    });

  return (
    <>
      <Header title="Perfil" />
      <StatusBar backgroundColor="#FF5531" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: "#FCF9F2" }}
      >
        <Container>
          <ContainerInput>
            <Input
              title="Nome"
              placeholder="Informe seu nome"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardAppearance="dark"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              error={errors.name}
              touched={touched.name}
              value={values.name}
            />
            <Separator />
            <Input
              title="Email "
              placeholder="Informe seu E-mail "
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              keyboardAppearance="dark"
              autoComplete="email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              value={values.email}
            />
            <Separator />
            <Input
              title="Senha"
              secureTextEntry
              placeholder="Informe sua senha"
              autoCorrect={false}
              autoComplete="password"
              autoCapitalize="none"
              keyboardAppearance="dark"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              onSubmitEditing={() => handleSubmit()}
              value={values.password}
            />
          </ContainerInput>

          <Button
            title="Salvar"
            marginTop={30}
            onPress={() => handleSubmit()}
          />
        </Container>
      </ScrollView>
    </>
  );
}
