import React from "react";

import { Container, Content, Text, Title } from "./styles";

export interface PropsShowResult {
  title: string;
  label: number;
  marginTop?: number;
  marginBottom?: number;
  isMoney?: boolean;
  isWidth?: boolean;
}

export function ShowResult({
  marginBottom,
  marginTop,
  title,
  label,
  isMoney,
  isWidth,
}: PropsShowResult) {
  return (
    <Container isWidth={isWidth}>
      <Title marginTop={marginTop}>{title}</Title>
      <Content marginBottom={marginBottom}>
        {isMoney ? (
          <Text>
            {isNaN(label)
              ? 0
              : label.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
          </Text>
        ) : (
          <Text>{isNaN(label) ? 0 : label}</Text>
        )}
      </Content>
    </Container>
  );
}
