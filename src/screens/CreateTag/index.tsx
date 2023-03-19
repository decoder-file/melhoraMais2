import React, { useState } from "react";

import { ScrollView, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import {
  Container,
  ContainerTag,
  Title,
  CardTag,
  TagSelect,
  ButtonSave,
} from "./styles";
import {api} from "../../services/api";

const CreateTagSchema = Yup.object().shape({
  title: Yup.string().min(1).required("Campo senha obrigatório"),
});

export function CreateTag() {
  const navigation = useNavigation();

  const [tagSelect, setTagSelect] = useState("");

  const handleTag = (color: string) => {
    setTagSelect(color);
  };

  const submitTag = async (value: object) => {
    api.post("/tag-calculations", value);
  };

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: CreateTagSchema,
      initialValues: { title: "" },

      onSubmit: async (v) => {
        try {
          if (!tagSelect) {
            showMessage({
              message: "Erro ao criar tag",
              description: "É obrigatorio selecionar uma cor",
              type: "danger",
              icon: "danger",
            });
          } else {
            const sendValue = { title: v.title, color: tagSelect };
            await submitTag(sendValue);
            navigation.navigate("RegisterCalculation");
            showMessage({
              message: "Sucesso!",
              description: "Tag criada com sucesso!",
              type: "success",
              icon: "success",
            });
          }
        } catch (err: any) {
          showMessage({
            message: "Erro ao criar tag",
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
      <Header title="Personalizar etiqueta " />
      <StatusBar backgroundColor="#FF5531" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: "#FCF9F2" }}
      >
        <Container>
          <Input
            title="Título etiqueta"
            placeholder="Título da etiqueta"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardAppearance="dark"
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
            error={errors.title}
            touched={touched.title}
            onSubmitEditing={() => handleSubmit()}
            value={values.title}
          />

          <ContainerTag>
            <Title>Selecionar uma cor</Title>
            <TagSelect>
              <CardTag
                color="#F14C4C"
                select={tagSelect === "#F14C4C" && true}
                onPress={() => handleTag("#F14C4C")}
              />
              <CardTag
                color="#46A619"
                select={tagSelect === "#46A619" && true}
                onPress={() => handleTag("#46A619")}
              />
              <CardTag
                color="#219EC6"
                select={tagSelect === "#219EC6" && true}
                onPress={() => handleTag("#219EC6")}
              />
              <CardTag
                color="#D81371"
                select={tagSelect === "#D81371" && true}
                onPress={() => handleTag("#D81371")}
              />
              <CardTag
                color="#A608CE"
                select={tagSelect === "#A608CE" && true}
                onPress={() => handleTag("#A608CE")}
              />
            </TagSelect>

            <TagSelect>
              <CardTag
                color="#F5AB3A"
                select={tagSelect === "#F5AB3A" && true}
                onPress={() => handleTag("#F5AB3A")}
              />
              <CardTag
                color="#C5A1A1"
                select={tagSelect === "#C5A1A1" && true}
                onPress={() => handleTag("#C5A1A1")}
              />
              <CardTag
                color="#16D84C"
                select={tagSelect === "#16D84C" && true}
                onPress={() => handleTag("#16D84C")}
              />
              <CardTag
                color="#ffd5a1"
                select={tagSelect === "#ffd5a1" && true}
                onPress={() => handleTag("#ffd5a1")}
              />
              <CardTag
                color="#48093E"
                select={tagSelect === "#48093E" && true}
                onPress={() => handleTag("#48093E")}
              />
            </TagSelect>
          </ContainerTag>

          <ButtonSave>
            <Button title="Salvar" onPress={() => handleSubmit()} />
          </ButtonSave>
        </Container>
      </ScrollView>
    </>
  );
}
