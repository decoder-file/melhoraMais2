import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { showMessage } from "react-native-flash-message";

import { Header } from "../../components/Header";
import { InputSlider } from "../../components/InputSlider";
import { Input } from "../../components/Input";
import { Tag } from "../../components/Tag";

import { StackScreenProps } from "@react-navigation/stack";

import { api } from "../../services/api";

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
          <TitleTag>Etiqueta:</TitleTag>
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

          <ShowResult
            title="Peso de entrada(Kg)"
            label={parseFloat(listCalculations?.entrance_weight)}
          />
          <ShowResult
            title="Custo diario(R$)"
            label={parseFloat(listCalculations?.daily_cost)}
            isMoney
          />

          <ShowResult
            title="Preço @ compra(R$)"
            label={parseFloat(listCalculations?.sale_price)}
            isMoney
          />
          <ShowResult
            title="GMD(g)"
            label={parseFloat(listCalculations?.gmd)}
          />

          <ShowResult
            title="Tempo Permanência(dias)"
            label={parseFloat(listCalculations?.length_of_stay)}
          />
          <ShowResult
            title="Peso de saída(Kg)"
            label={parseFloat(listCalculations?.output_weight)}
          />

          <ShowResult
            title="RC inicial(%)"
            label={parseFloat(listCalculations?.rc_initial)}
          />
          <ShowResult
            title="RC final(%)"
            label={parseFloat(listCalculations?.rc_end)}
          />

          <ShowResult
            title="Preço @ produzida(R$)"
            label={parseFloat(listCalculations?.produced_price)}
            isMoney
          />
          <ShowResult
            title="Valor de compra(R$)"
            label={parseFloat(listCalculations?.purchase_price)}
            isMoney
          />

          <ShowResult
            title="Quantidade de @ Produzidas"
            label={parseFloat(listCalculations?.bash)}
          />
          <ShowResult
            title="Preço @ de venda(R$)"
            label={parseFloat(listCalculations?.sale_price)}
            isMoney
          />

          <ShowResult
            title="Rendimento do capital(%)"
            label={parseFloat(listCalculations?.return_on_capital)}
          />

          <ShowResult
            title="Resultado"
            label={parseFloat(listCalculations?.result)}
            isMoney
          />
        </Container>
      </ScrollView>
    </>
  );
}
