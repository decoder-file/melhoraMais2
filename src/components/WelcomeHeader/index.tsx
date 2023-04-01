import React from "react";

import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  Container,
  ContainerName,
  Name,
  Welcome,
  ButtonExit,
  TitleExit,
  ButtonName,
  SafeArea
} from "./styles";

interface WelcomeHeaderProps {
  name: string;
  signOut: () => void;
}

export function WelcomeHeader({ name, signOut }: WelcomeHeaderProps) {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar backgroundColor="#FF5531" barStyle="light-content" />
      <Container>
        <SafeArea>
          <ContainerName>
            <Welcome>Bem-vindo,</Welcome>
            <ButtonName
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Profile")}
            >
              <Name>{name}</Name>
            </ButtonName>
          </ContainerName>

          <ButtonExit onPress={signOut}>
            <TitleExit>Sair</TitleExit>
          </ButtonExit>
        </SafeArea>
      </Container>
    </>
  );
}
