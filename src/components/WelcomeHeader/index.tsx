// import { useNavigation } from "@react-navigation/native";
import React from "react";
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
}

export function WelcomeHeader({ name }: WelcomeHeaderProps) {
  // const navigation = useNavigation();

  const { signOut } = useAuth();

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
