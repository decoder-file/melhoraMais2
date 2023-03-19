import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { api } from "../../services/api";

import {
  Container,
  ContainerInput,
  Separator,
  Title,
  BackButton,
} from "./styles";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().min(2).required("Campo nome obrigatório"),
  email: Yup.string()
    .email("Email inválido")
    .required("Campo e-mail obrigatório"),
  password: Yup.string().min(4).required("Campo senha obrigatório"),
  confirmPassword: Yup.string()
    .min(4)
    .required("Campo confirmar senha obrigatório"),
});

export function Registration() {
  const navigation = useNavigation();

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: RegistrationSchema,
      initialValues: { name: "", email: "", password: "", confirmPassword: "" },

      onSubmit: async (v) => {
        if (values.password === values.confirmPassword) {
          try {
            await api.post("/users", v);
            showMessage({
              message: "Cadastro realizado com sucesso!",
              description: "Você já pode realizar o login no aplicativo",
              type: "success",
              icon: "success",
            });
            navigation.goBack();
          } catch (err: any) {
            showMessage({
              message: "Erro no cadastro",
              description:
                "Ocorreu um erro inesperado. Tente novamente mais tarde!",
              type: "danger",
              icon: "danger",
            });
          }
        } else {
          showMessage({
            message: "Erro no cadastro",
            description: "Os campos senhas devem ser iguais!",
            type: "danger",
            icon: "danger",
          });
        }
      },
    });

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#FCF9F2" }}
    >
      <Container>
        <BackButton activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
        </BackButton>
        <Title>Criar conta</Title>
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
            onChangeText={handleChange("confirmPassword")}
            onBlur={handleBlur("confirmPassword")}
            error={errors.confirmPassword}
            touched={touched.confirmPassword}
            onSubmitEditing={() => handleSubmit()}
            value={values.confirmPassword}
          />
          <Separator />
          <Input
            title="Confirme sua senha"
            secureTextEntry
            placeholder="confirme sua senha"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            autoComplete="password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            onSubmitEditing={() => handleSubmit()}
            value={values.password}
          />
        </ContainerInput>

        <Button
          title="Criar conta"
          onPress={() => handleSubmit()}
        />
      </Container>
    </ScrollView>
  );
}
