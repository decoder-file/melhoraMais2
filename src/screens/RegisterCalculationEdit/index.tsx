import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { showMessage } from "react-native-flash-message";

import { Header } from "../../components/Header";
import { InputSlider } from "../../components/InputSlider";
import { Input } from "../../components/Input";
import { Tag } from "../../components/Tag";

import { StackScreenProps } from "@react-navigation/stack";

import {api} from "../../services/api";

import { RootStackParamList } from "../../routes/app.routes";

import {
  Container,
  ContainerInputSlider,
  ContainerTag,
  TitleTag,
} from "./styles";
import { ShowResult } from "../../components/ShowResult";

export interface RegisterCalculationEditProps {
  id: string;
}

interface RegisterCalculationEditNavigateProps
  extends StackScreenProps<RootStackParamList, "RegisterCalculationEdit"> {}

interface CalculationsProps {
  bash: string;
  created_at: string;
  daily_cost: string;
  description: string;
  entrance_weight: string;
  gmd: string;
  id: string;
  length_of_stay: string;
  output_weight: string;
  produced_price: string;
  purchase_price: string;
  rc_end: string;
  rc_initial: string;
  result: string;
  return_on_capital: string;
  sale_price: string;
  tag: string;
  title: string;
  updated_at: string;
}

interface TagProps {
  title: string;
  color: string;
}

export function RegisterCalculationEdit({
  route,
}: RegisterCalculationEditNavigateProps) {
  const [listCalculations, setListCalculations] = useState(
    {} as CalculationsProps
  );
  const [selectTagId, setSelectTagId] = useState("");
  const [selectTagList, setSelectTagList] = useState({} as TagProps);

  const calculationsSearch = async () => {
    const value = route.params.id.valueOf();
    api
      .get(`/calculations/${value}`)
      .then((response) => {
        setListCalculations(response.data);
        console.log("response.data", response.data);
        setSelectTagId(response.data.tag);
      })
      .catch((err) => {
        showMessage({
          message: "Error!",
          description: "Ocorreu para carregar cálculos",
          type: "danger",
          icon: "danger",
        });
      });
  };

  const tagSearch = async () => {
    if (selectTagId.length > 0) {
      api
        .get(`/tag-calculations/${selectTagId}`)
        .then((response) => {
          setSelectTagList(response.data);
        })
        .catch((err) => {
          showMessage({
            message: "Error!",
            description: "Ocorreu para carregar as tag",
            type: "danger",
            icon: "danger",
          });
        });
    }
  };

  useEffect(() => {
    tagSearch();
  }, [selectTagId]);

  useEffect(() => {
    calculationsSearch();
  }, [route.params.id]);

  return (
    <>
      <Header title="Editar cálculo" />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: "#FCF9F2" }}
      >
        <Container>
          <TitleTag>Etiquetas</TitleTag>
          <ContainerTag>
            {selectTagList && (
              <Tag title={selectTagList.title} color={selectTagList.color} />
            )}
          </ContainerTag>
          <Input
            title="Título"
            editable={false}
            value={listCalculations?.title}
          />

          <ContainerInputSlider>
            <InputSlider
              title="Peso de entrada(Kg)"
              editable={false}
              value={listCalculations?.entrance_weight}
            />
            <InputSlider
              title="Custo diario(R$)"
              editable={false}
              value={listCalculations?.daily_cost}
            />
          </ContainerInputSlider>

          <ContainerInputSlider>
            <InputSlider
              title="Preço @ compra(R$)"
              editable={false}
              value={listCalculations?.sale_price}
            />
            <InputSlider
              title="GMD(g)"
              editable={false}
              value={listCalculations?.gmd}
            />
          </ContainerInputSlider>

          <ContainerInputSlider>
            <InputSlider
              title="Tempo Permanência(dias)"
              editable={false}
              value={listCalculations?.length_of_stay}
            />
            <InputSlider
              title="Peso de saída(Kg)"
              editable={false}
              value={listCalculations?.output_weight}
            />
          </ContainerInputSlider>

          <ContainerInputSlider>
            <InputSlider
              title="RC inicial(%)"
              editable={false}
              value={listCalculations?.rc_initial}
            />
            <InputSlider
              title="RC final(%)"
              editable={false}
              value={listCalculations?.rc_end}
            />
          </ContainerInputSlider>

          <ContainerInputSlider>
            <InputSlider
              title="Preço @ produzida(R$)"
              editable={false}
              value={listCalculations?.produced_price}
            />
            <InputSlider
              title="Valor de compra(R$)"
              editable={false}
              value={listCalculations?.purchase_price}
            />
          </ContainerInputSlider>

          <ContainerInputSlider>
            <InputSlider
              title="Quantidade de @ Produzidas"
              editable={false}
              value={listCalculations?.bash}
            />
            <InputSlider
              title="Preço @ de venda(R$)"
              editable={false}
              value={listCalculations?.sale_price}
            />
          </ContainerInputSlider>

          <ContainerInputSlider>
            <ShowResult
              title="Rendimento do capital(%)"
              isWidth
              label={listCalculations?.return_on_capital}
            />
          </ContainerInputSlider>

          <Input
            title="Resultado"
            editable={false}
            value={listCalculations?.result}
          />
        </Container>
      </ScrollView>
    </>
  );
}
