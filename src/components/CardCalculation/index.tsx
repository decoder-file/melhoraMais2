import React, { useEffect, useState } from "react";
import moment from "moment";
import { TouchableOpacityProps } from "react-native";
import { Calendar } from "phosphor-react-native";

import { FontAwesome } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";

import { api } from "../../services/api";

import {
  Container,
  Title,
  ContainerDescription,
  Description,
  ButtonDelete,
  TitleTag,
  Tag,
  CreationData,
  CreationDataText,
  TextBold,
  ContainerTag,
} from "./styles";

export interface ButtonProps extends TouchableOpacityProps {
  tagId?: string;
  title: string;
  result: string;
  marginTop?: number;
  updatedAt: string;
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
  updatedAt,
}: ButtonProps) {
  const [listTag, setListTag] = useState<any[]>([]);
  const [tagInfo, setTagInfo] = useState<any[]>([]);

  const tagSearch = async () => {
    api
      .get("/tag-calculations")
      .then((response) => {
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
      function buscarNumerosPares(value: any) {
        if (value.id === tagId) return value;
      }

      if (listTag) {
        const tag = listTag.filter(buscarNumerosPares);
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
    <Container>
      <ContainerDescription activeOpacity={0.8} onPress={clickCalculationCard}>
        {tagInfo.length > 0 && (
          <ContainerTag>
            <Tag
              activeOpacity={0.8}
              style={{ backgroundColor: tagInfo[0].color }}
            >
              <TitleTag>{tagInfo[0].title}</TitleTag>
            </Tag>
          </ContainerTag>
        )}

        <Title>{title}</Title>

        <Description>
          <TextBold>Total: </TextBold>
          {isNaN(parseInt(result))
            ? 0
            : parseInt(result).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
        </Description>

        <CreationData>
          <Calendar size={20} />
          <CreationDataText>{moment(updatedAt).format('DD/MM/YYYY')}</CreationDataText>
        </CreationData>
      </ContainerDescription>

      <ButtonDelete activeOpacity={0.8} onPress={deleteCalculation}>
        <FontAwesome name="trash" size={24} color="#F91E1E" />
      </ButtonDelete>
    </Container>
  );
}
