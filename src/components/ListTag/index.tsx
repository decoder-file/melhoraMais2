import React from "react";
import { CaretRight } from "phosphor-react-native";

import { Color, Container, ContainerInfo, Title } from "./styles";

interface ListTagProps {
  title: string;
  color: string;
}

export function ListTag({title, color}: ListTagProps) {
  return (
    <Container>
      <ContainerInfo>
      <Color style={{backgroundColor: color}}/>
      <Title>{title}</Title>
      </ContainerInfo>
      <CaretRight size={18} weight="bold" />
    </Container>
  );
}
