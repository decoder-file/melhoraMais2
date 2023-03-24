// import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert } from "react-native";
import { useAuth } from "../../hooks/auth";

import {
  Container,
  ContainerName,
  Name,
  Welcome,
  ButtonExit,
  TitleExit,
  ButtonName,
} from "./styles";

interface WelcomeHeaderProps {
  name: string;
  signOut: () => void;
}

export function WelcomeHeader({ name, signOut }: WelcomeHeaderProps) {
  return (
    <Container>
      <ContainerName>
        <Welcome>Bem-vindo,</Welcome>
        <ButtonName
          activeOpacity={0.8}
          /* onPress={() => navigation.navigate("Profile")}*/
        >
          <Name>{name}</Name>
        </ButtonName>
      </ContainerName>

      <ButtonExit onPress={signOut}>
        <TitleExit>Sair</TitleExit>
      </ButtonExit>
    </Container>
  );
}
