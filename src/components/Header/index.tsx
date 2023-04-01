import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Container, Title, ButtonExit, SafeArea } from "./styles";

interface headerProps {
  title: string;
}

export function Header({ title }: headerProps) {
  const navigation = useNavigation();
  return (
    <Container>
      <SafeArea>
        <ButtonExit activeOpacity={0.8} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#FFFFFF" />
        </ButtonExit>
        <Title>{title}</Title>
        <View />
      </SafeArea>
    </Container>
  );
}
