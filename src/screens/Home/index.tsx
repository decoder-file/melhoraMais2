import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text } from "react-native";
import * as S from "./styles";

export default function Home() {
  return (
    <S.Container>
      <Text>Screen Home</Text>
      <StatusBar style="auto" />
    </S.Container>
  );
}
