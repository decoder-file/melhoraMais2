import React, { useEffect, useState } from "react";

import { TouchableOpacityProps } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";

import {
  Container,
  Title,
  ContainerDescription,
  Description,
  Localization,
  ButtonDelete,
  ContainerLocalization,
  TitleTag,
  Tag,
} from "./styles";
import { api } from "../../services/api";

export interface ButtonProps extends TouchableOpacityProps {
  tagId?: string;
  title: string;
  result: string;
  marginTop?: number;
  clickCalculationCard: () => void;
  deleteCalculation: () => void;
}

export function CardCalculation({
  tagId,
  title,
  result,
  marginTop,
  clickCalculationCard,
  deleteCalculation,
}: ButtonProps) {
  const [listTag, setListTag] = useState<any[]>([]);
  const [tagInfo, setTagInfo] = useState<any[]>([]);

  const tagSearch = async () => {
    api
      .get("/tag-calculations")
      .then((response) => {
        console.log(response.data);
        setListTag(response.data);
      })
      .catch((err) => {
        showMessage({
          message: "Error!",
          description: "Ocorreu para carregar as tag personalizadas",
          type: "danger",
          icon: "danger",
        });
      });
  };

  const selectedTagSearch = () => {
    if (tagId) {
      function buscarNumerosPares(value) {
        if (value.id === tagId) return value;
      }

      if (listTag) {
        const tag = listTag.filter(buscarNumerosPares);
        // console.log('######', listTag)
        setTagInfo(tag);
      }
    }
  };

  useEffect(() => {
    tagSearch();
  }, []);

  useEffect(() => {
    selectedTagSearch();
  }, [listTag]);

  return (
    <Container marginTop={marginTop}>
      <ContainerDescription activeOpacity={0.8} onPress={clickCalculationCard}>
        {tagInfo.length > 0 && (
          <Tag
            activeOpacity={0.8}
            style={{ backgroundColor: tagInfo[0].color }}
          >
            <TitleTag>{tagInfo[0].title}</TitleTag>
          </Tag>
        )}

        <Title>{title}</Title>
        <Description>R$ {parseInt(result)}</Description>
        {/* <ContainerLocalization>
          <Entypo name="location-pin" size={20} color="black" />
          <Localization>Janaúba - MG</Localization>
        </ContainerLocalization> */}
      </ContainerDescription>

      <ButtonDelete activeOpacity={0.8} onPress={deleteCalculation}>
        <FontAwesome name="trash" size={24} color="#F91E1E" />
      </ButtonDelete>
    </Container>
  );
}
